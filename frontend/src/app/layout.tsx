import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const outfit = Outfit({ 
  subsets: ['latin'], 
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NeuralScan.AI — Brain Tumor Detection with Deep Learning',
    template: '%s | NeuralScan.AI',
  },
  description: 'NeuralScan.AI uses a fine-tuned EfficientNet-V2-S deep learning model to classify brain MRI scans into 4 categories: Glioma, Meningioma, Pituitary Tumor, and No Tumor — with high accuracy.',
  keywords: [
    'brain tumor detection', 'brain tumor classifier', 'MRI classification',
    'deep learning', 'EfficientNet-V2-S', 'AI medical imaging', 'neural network',
    'brain cancer detection', 'PyTorch', 'image classification',
    'NeuralScan', 'brain MRI analysis', 'tumor prediction',
  ],
  authors: [{ name: 'Jay Patel', url: 'https://github.com/jaypatel342005' }],
  creator: 'Jay Patel',
  publisher: 'NeuralScan.AI',
  metadataBase: new URL('https://neuralscan-ai.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'NeuralScan.AI',
    title: 'NeuralScan.AI — Brain Tumor Detection with Deep Learning',
    description: 'Upload a brain MRI scan and let our fine-tuned EfficientNet-V2-S AI model instantly classify tumors across 4 categories with high accuracy.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralScan.AI — Brain Tumor Detection with Deep Learning',
    description: 'Upload a brain MRI scan and let our fine-tuned EfficientNet-V2-S AI model instantly classify tumors across 4 categories.',
    creator: '@jaypatel342005',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#030712" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${outfit.className} min-h-screen bg-background text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}>
        <Navbar />
        <main className="pt-16 sm:pt-[72px] flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
