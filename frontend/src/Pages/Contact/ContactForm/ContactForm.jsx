import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './ContactForm.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ContactForm = ({ submitButtonText = 'Submit' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.fire("Success!", "Your quote request has been sent.", "success");
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error("Error submitting quote:", err);
      Swal.fire("Error!", err.message || "Failed to send your quote request.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='contact-form-section'>
      <div className="container">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label cursor-pointer">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label cursor-pointer">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label cursor-pointer">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="on"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label cursor-pointer">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div className="w-100 text-center mt-5">
              <button
                type="submit"
                className="ff-btn ff-btn-small ff-btn-fill-dark blog-btn text-capitalize text-decoration-none d-inline-block w-fit-content"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;