import Annonces from '@/components/Annonces'
import Hero from '@/components/Hero'
import Image from 'next/image'
import Slider from '@/components/Slider'
import Programs from '@/components/Programs'
import Footer from '@/components/Footer'
import Navbar from '@/components/newNavbar'
export default function Page() {
  return (
    <main className="flex flex-col items-center ">
      <Navbar/>
     <Hero />
     <Slider />
     <Programs />
     <Footer />
    </main>
  )
}
