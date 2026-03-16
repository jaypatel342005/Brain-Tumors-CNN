# Vercel Deployment Guide

To deploy this project, we must host the **Frontend** on Vercel and the **Backend** elsewhere (like Render). 

> [!WARNING]
> You **cannot** deploy your Python backend (which uses PyTorch) on Vercel. Vercel has a strict 250MB limit for Serverless Functions. PyTorch alone is over 800MB uncompressed, meaning Vercel will always fail to build it. 
> To deploy your project for free, use **Vercel** for the frontend UI and **Render** for the Python backend.

## Step 1: Push your code to GitHub
Vercel deploys directly from your GitHub repository.
1. Create a repository on [GitHub](https://github.com).
2. Push your entire project folder (frontend, backend, data) to this new GitHub repository.

## Step 2: Deploy Backend to Render (First)
You need the Backend running first so you can give its URL to Vercel.
1. Go to [Render.com](https://render.com) and sign in with GitHub.
2. Click **New +** and select **Web Service**.
3. Select **Build and deploy from a Git repository**.
4. Connect your GitHub repository.
5. In the settings, configure the following:
   - **Name**: `brain-tumor-api` (or anything you like)
   - **Language**: `Docker`
   - **Root Directory**: `backend` (This is critical!)
   - **Instance Type**: Free
6. Click **Create Web Service**.
7. Wait 5-10 minutes for the build to finish. Once done, Render will give you a URL like `https://brain-tumor-api-xxxx.onrender.com`. Save this URL!

## Step 3: Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** -> **Project**.
3. Import the GitHub repository you created in Step 1.
4. On the configuration page, you must make two critical changes:
   
   **A. Framework Preset & Root Directory**
   - **Framework Preset**: Make sure it says **Next.js**.
   - **Root Directory**: Click the "Edit" button and select the `frontend` folder.

   **B. Environment Variables**
   - Expand the **Environment Variables** section.
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Paste the URL Render gave you in Step 2, and add `/api/predict` to the end.
     *(Example: `https://brain-tumor-api-xxxx.onrender.com/api/predict`)*
5. Click **Deploy**.

## Step 4: Test Your App
Once Vercel finishes deploying, it will give you a live `.vercel.app` link. 
1. Open the Vercel app link.
2. Try uploading a brain scan image.
3. The Vercel frontend will securely send the image to your Render backend to get the prediction!
