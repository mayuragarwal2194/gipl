import React from 'react';
import './BlogSection.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogs = [
    {
      id: 'performance-grade-bitumen',
      title: 'Performance Grade Bitumen',
      image: '/images/blogImages/blog_high_performance_bitumen.jpg',
    },
    {
      id: 'gabion-structures-erosion-control',
      title: 'Gabion Structures Erosion Control',
      image: '/images/blogImages/blog_gabion_structure.jpg',
    },
    {
      id: 'top-5-construction-chemicals',
      title: 'Top 5 Construction Chemicals',
      image: '/images/blogImages/blog_construction_chemical.jpg',
    },
  ];

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          speed: 200,
        },
      },
    ],
  };

  return (
    <section className="blog-section w-100 section-padding theme-bg">
      <div className="container">
        <div className="section-header text-center">
          <h6 className="section-subhead">Blogs</h6>
          <h3 className="section-head">More Of Our Stories</h3>
        </div>
        <div className="section-body">
          <div className="slider-container" id="blog-sliderContainer">
            <Slider {...settings}>
              {blogs.map((blog) => (
                <div className="slide" key={blog.id}>
                  <div className="card h-100 border-0 bg-transparent custom-blog-card">
                    <div className="blog-image">
                      <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                        <img
                          src={blog.image}
                          className="article-image w-100 h-100 rounded"
                          alt={blog.title}
                        />
                      </Link>
                    </div>
                    <div className="card-body px-0 pb-0 mt-3">
                      <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                        <h5 className="blog-title fw-normal mb-3 text-uppercase">
                          {blog.title}
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <Link
            to="/blogs"
            role="button"
            id="discover-btn"
            className="ff-btn ff-btn-fill-dark discover-btn text-uppercase text-decoration-none d-block w-fit-content m-auto xs-small-fonts"
          >
            Discover all our stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;