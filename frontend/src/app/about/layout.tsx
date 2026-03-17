import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Jay Patel — Creator',
  description: 'Meet Jay Patel, the creator of NeuralScan.AI. Full-stack developer specializing in Machine Learning, AI, MERN stack, Next.js, and .NET — building intelligent digital solutions.',
  openGraph: {
    title: 'About Jay Patel | NeuralScan.AI Creator',
    description: 'Full-stack developer specializing in Machine Learning & AI, MERN stack, Next.js, and .NET systems.',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
