import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import BrandSection from '@/components/sections/BrandSection'
import CollectionsSection from '@/components/sections/CollectionsSection'
import FeaturedObjects from '@/components/sections/FeaturedObjects'
import ImmersiveSection from '@/components/sections/ImmersiveSection'
import GallerySection from '@/components/sections/GallerySection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BrandSection />
        <CollectionsSection />
        <FeaturedObjects />
        <ImmersiveSection />
        <GallerySection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
