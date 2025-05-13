import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../Components/Hero/Hero';
import AboutSection from '../Components/AboutSection/AboutSection';
import BlogSection from '../Components/BlogSection/BlogSection';
import VideoSection from '../Components/VideoSection/VideoSection';
// import Brand from '../Components/Brand/Brand';
import BestProducts from '../Components/BestProducts/BestProducts';
import ScrollToTopBtn from '../Components/ScrollToTopBtn/ScrollToTopBtn';

const Home = () => {
  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="/images/hero2.webp"
          type="image/webp"
        />
      </Helmet>

      <Hero />
      {/* <Brand /> */}
      <BestProducts />
      <AboutSection />
      <VideoSection />
      <BlogSection />
      <ScrollToTopBtn />
    </>
  );
};

export default Home;