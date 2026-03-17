import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Brain Tumor Analyzer',
  description: 'Upload a brain MRI scan and get instant AI-powered classification. Our fine-tuned ResNet18 model detects Glioma, Meningioma, Pituitary Tumor, and No Tumor with high accuracy.',
  openGraph: {
    title: 'AI Brain Tumor Analyzer | NeuralScan.AI',
    description: 'Upload a brain MRI scan and get instant AI-powered classification across 4 tumor categories.',
  },
  alternates: {
    canonical: '/analyzer',
  },
}

export default function AnalyzerLayout({ children }: { children: React.ReactNode }) {
  return children
}
