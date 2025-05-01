import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../BlogData/BlogData';

const BlogDetail = () => {
  const { id } = useParams();

  const blog = blogData.find((b) => b.id === id);
  const otherBlogs = blogData.filter((b) => b.id !== id).slice(0, 2); // show only 2 other blogs

  if (!blog) {
    return <h2 className="text-center my-5">Blog not found</h2>;
  }

  return (
    <section className="blog-detail-section section-padding">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="section-head text-uppercase">{blog.title}</h2>
          <div className="heading-seperator m-auto my-2"></div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className="card border-0 bg-transparent">
              <div className="image-wrapper overflow-hidden">
                <img src={blog.image} className="w-100 rounded" alt={blog.title} />
              </div>
              <div className="card-body ps-0">
                {blog.date && (
                  <div className="date-created my-2">
                    DATE CREATED: <span>{blog.date}</span>
                  </div>
                )}
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="blog-sidebar">
              <h4 className="sidebar-head">Popular Posts</h4>
              {otherBlogs.map((item) => (
                <Link to={`/blogs/${item.id}`} key={item.id} className="text-decoration-none text-dark">
                  <div className="sidebar-blog-card d-flex align-items-center gap-3 mb-3">
                    <div
                      className="sidebar-card-image flex-shrink-0"
                      style={{ width: '80px', height: '60px', overflow: 'hidden' }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-100 h-100 object-cover rounded"
                      />
                    </div>
                    <div className="sidebar-card-body">
                      <h6 className="sidebar-blog-title w-75 mb-1">{item.shortName}</h6>
                      <div className="sidebar-blog-date text-muted" style={{ fontSize: '0.85rem' }}>{item.date}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;