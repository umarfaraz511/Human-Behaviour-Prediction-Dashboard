import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'BEHAVR — Human Behavior Prediction Dashboard',
  description: 'AI-powered human behavior prediction, intent classification, churn prediction and engagement forecasting platform by Umar Faraz',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" toastOptions={{
          style: { background: 'rgba(4,13,26,0.95)', color: '#f0f9ff', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '12px', fontFamily: 'Inter' }
        }} />
      </body>
    </html>
  )
}
