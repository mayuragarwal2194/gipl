import React from 'react'
import Hero from '../Components/Hero/Hero'
import AboutSection from '../Components/AboutSection/AboutSection'
import BlogSection from '../Components/BlogSection/BlogSection'
import VideoSection from '../Components/VideoSection/VideoSection'
// import Brand from '../Components/Brand/Brand'
import BestProducts from '../Components/BestProducts/BestProducts'
import ScrollToTopBtn from '../Components/ScrollToTopBtn/ScrollToTopBtn'

const Home = () => {
  return (
    <>
      <Hero />
      {/* <Brand /> */}
      <BestProducts />
      <AboutSection />
      <VideoSection />
      <BlogSection />
      <ScrollToTopBtn />
    </>
  )
}

export default Home