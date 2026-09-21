import { Hero } from '../components/sections/Hero'
import { Marquee } from '../components/sections/Marquee'
import { FeaturedProducts } from '../components/sections/FeaturedProducts'
import { Categories } from '../components/sections/Categories'
import { Newsletter } from '../components/sections/Newsletter'

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <Categories />
      <Newsletter />
    </>
  )
}