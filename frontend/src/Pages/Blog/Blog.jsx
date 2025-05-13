// src/pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './blog.css'; // Optional: include if needed for card styles

const Blog = () => {
  const blogs = [
    {
      id: 'performance-grade-bitumen',
      title: 'Performance Grade Bitumen',
      image: '/images/blogImages/blog_high_performance_bitumen_small.webp',
    },
    {
      id: 'gabion-structures-erosion-control',
      title: 'Gabion Structures Erosion Control',
      image: '/images/blogImages/blog_gabion_structure_small.webp',
    },
    {
      id: 'top-5-construction-chemicals',
      title: 'Top 5 Construction Chemicals',
      image: '/images/blogImages/blog_construction_chemical_small.webp',
    },
  ];

  return (
    <section className="w-100 section-padding all-blog-section theme-bg">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h3 className="section-head">All Blogs</h3>
        </div>
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-sm-6 col-lg-4 mb-4" key={blog.id}>
              <div className="card h-100 border-0 bg-transparent custom-blog-card">
                <div className="blog-image">
                  <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                    <img
                      src={blog.image}
                      className="article-image w-100 h-100 rounded"
                      alt={blog.title}
                      style={{ objectFit: 'cover', height: '200px' }}
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
        </div>
      </div>
    </section>
  );
};

export default Blog;
