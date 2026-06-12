import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScroll'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import GrainOverlay from '@/components/ui/GrainOverlay'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CartDrawer from '@/components/ui/CartDrawer'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Luminis — Objects for Quiet Rituals',
  description:
    'Handcrafted candles and home ritual objects designed for slow living, warmth, and atmosphere. Not products — rituals.',
  keywords: ['luxury candles', 'home ritual', 'handmade', 'slow living', 'atmosphere'],
}

export const viewport: Viewport = {
  themeColor: '#0D0A08',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <LanguageProvider>
          <CartProvider>
            <LoadingScreen />
            <GrainOverlay />
            <CartDrawer />
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
