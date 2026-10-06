import LandingHeader from '../../components/landing/LandingHeader'
import Hero from '../../components/landing/Hero'
import Marquee from '../../components/landing/Marquee'
import IntroSection from '../../components/landing/IntroSection'
import CustomizationSection from '../../components/landing/CustomizationSection'
import CollectionSection from '../../components/landing/CollectionSection'
import EditorialSection from '../../components/landing/EditorialSection'
import ProcessSection from '../../components/landing/ProcessSection'
import FinalCTA from '../../components/landing/FinalCTA'
import LandingFooter from '../../components/landing/LandingFooter'
import LogoIntro from '../../components/landing/LogoIntro'

export default function LandingPage() {
  return (
    <>
      <LogoIntro />
      <LandingHeader />
      <main>
        <Hero />
        <Marquee />
        <IntroSection />
        <CustomizationSection />
        <CollectionSection />
        <EditorialSection />
        <ProcessSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </>
  )
}
