import os
import io
import torch
import torch.nn as nn
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from torchvision import models, transforms
from PIL import Image

# --- Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define labels
# Order restored to the original training mapping since the checkpoint 'categories' was misleading.
CLASSES = ["notumor", "glioma", "meningioma", "pituitary"]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "EfficientNet-V2-S.pth")

# Global model variable
model_ft = None

# Image preprocessing — EfficientNet-V2-S is trained at 384×384
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def load_model():
    """Loads the fine-tuned EfficientNet-V2-S model."""
    if not os.path.exists(MODEL_PATH):
        logger.error(f"Model file not found at {MODEL_PATH}")
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    
    logger.info(f"Loading EfficientNet-V2-S model from {MODEL_PATH} on {device}...")
    
    # Rebuild EfficientNet-V2-S with the exact custom classifier head used in training
    model = models.efficientnet_v2_s(weights=None)

    # Custom head: Dropout→Linear(1280→512)→ReLU→BN(512)→Dropout→Linear(512→256)→ReLU→BN(256)→Dropout→Linear(256→4)
    in_features = model.classifier[1].in_features  # 1280
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.2),
        nn.Linear(in_features, 512),
        nn.ReLU(),
        nn.BatchNorm1d(512),
        nn.Dropout(p=0.3),
        nn.Linear(512, 256),
        nn.ReLU(),
        nn.BatchNorm1d(256),
        nn.Dropout(p=0.3),
        nn.Linear(256, len(CLASSES))
    )

    # Load weights — checkpoint is a dict, weights are under 'state_dict'
    try:
        checkpoint = torch.load(MODEL_PATH, map_location=device)
        state_dict = checkpoint["state_dict"] if isinstance(checkpoint, dict) and "state_dict" in checkpoint else checkpoint
        model.load_state_dict(state_dict)
        model = model.to(device)
        model.eval()
        logger.info("EfficientNet-V2-S model loaded successfully.")
        return model
    except Exception as e:
        logger.error(f"Error loading model weights: {e}")
        raise

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for FastAPI."""
    global model_ft
    try:
        model_ft = load_model()
    except Exception as e:
        logger.critical(f"Failed to initialize model during startup: {e}")
    
    yield
    
    # Shutdown logic
    logger.info("Shutting down... clearing model resources.")
    model_ft = None

app = FastAPI(title="Brain Tumor Classification API", lifespan=lifespan)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/")
def read_root():
    return {
        "message": "Brain Tumor Classification API is up and running.",
        "usage": "Send a POST request to /api/predict with a form-data field named 'file' containing the image.",
        "status": "Online",
        "device": str(device)
    }

@app.post("/predict")
@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint to predict brain tumor class from an uploaded MRI scan.
    """
    # 1. Validate Model Initialization
    if model_ft is None:
        logger.error("Inference requested but model is not initialized.")
        return JSONResponse(status_code=503, content={"error": "Model initialization failed. Please try again later."})
    
    # 2. Validate File Content Type
    if not file.content_type.startswith("image/"):
        logger.warning(f"Invalid file type uploaded: {file.content_type}")
        return JSONResponse(status_code=400, content={"error": "Invalid file type. Please upload a valid image file (JPEG, PNG)."})
    
    try:
        # 3. Read File Contents
        contents = await file.read()
        if not contents:
            logger.warning("Empty file uploaded.")
            return JSONResponse(status_code=400, content={"error": "The uploaded file is empty."})
            
        # 4. Open and Convert Image
        try:
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        except Exception as img_eval_err:
            logger.error(f"Failed to open image file: {img_eval_err}")
            return JSONResponse(status_code=400, content={"error": "The uploaded file is corrupted or not a valid image format."})
        
        # 5. Preprocess Image
        try:
            input_tensor = transform(image).unsqueeze(0).to(device)
        except Exception as transform_err:
            logger.error(f"Error during image tensor transformation: {transform_err}")
            return JSONResponse(status_code=500, content={"error": "Failed to process image features. Please try a different image."})
        
        # 6. Model Inference
        with torch.no_grad():
            outputs = model_ft(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
            _, preds = torch.max(outputs, 1)
            
        predicted_class_idx = preds.item()
        
        # 7. Validate Output Index
        if predicted_class_idx < 0 or predicted_class_idx >= len(CLASSES):
            logger.critical(f"Model predicted out-of-bounds index: {predicted_class_idx}")
            return JSONResponse(status_code=500, content={"error": "Internal inference calculation error."})
            
        predicted_class = CLASSES[predicted_class_idx]
        
        # 8. Calculate Confidences
        confidences = {CLASSES[i]: round(probabilities[i].item() * 100, 2) for i in range(len(CLASSES))}
        
        logger.info(f"Inference successful: {predicted_class} ({confidences[predicted_class]}%)")
        
        return {
            "prediction": predicted_class,
            "class_idx": predicted_class_idx,
            "confidences": confidences,
            "success": True
        }
        
    except Exception as e:
        logger.exception(f"Unexpected inference error: {e}")
        return JSONResponse(status_code=500, content={"error": "An unexpected error occurred during analysis. Please contact support."})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)