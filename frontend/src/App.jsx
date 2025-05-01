import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Announcement from './Components/Announcement/Announcement';
import FooterNew from './Components/FooterNew/FooterNew';
import About from './Pages/About/About';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Contact from './Pages/Contact/Contact';
import Product from './Pages/Product/Product';
import ScrollToTopBtn from './Components/ScrollToTopBtn/ScrollToTopBtn';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Career from './Pages/Career/Career';
import SubcategoryPage from './Components/SubcategoryPage/SubcategoryPage';
import Blog from './Pages/Blog/Blog';
import BlogDetail from './Pages/Blog/BlogDetail/BlogDetail';

const App = () => {
  return (
    <div>
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <AppContent />
      </BrowserRouter>
    </div>
  )
}

function AppContent() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Announcement />
      <Navbar isSticky={isSticky} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
        <Route path="/subcategory/:id" element={<SubcategoryPage />} />
        <Route path='/product' element={<Product />} />
        <Route path='/careers' element={<Career />} />
        <Route path='/blogs' element={<Blog />} />
        <Route path='/blogs/:id' element={<BlogDetail />} />
      </Routes>
      <FooterNew />
      <ScrollToTopBtn />
    </>
  );
}
export default App