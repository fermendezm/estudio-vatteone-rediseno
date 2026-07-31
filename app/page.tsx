import Hero from '@/components/Hero'
import ServicesList from '@/components/ServicesList'
import WhyUs from '@/components/WhyUs'
import Clients from '@/components/Clients'
import Contact from '@/components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesList />
      <WhyUs />
      <Clients />
      <Contact />
    </>
  )
}
