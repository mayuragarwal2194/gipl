import { useState } from "react";
import Swal from "sweetalert2";
import { submitJobApplication } from "../../../Services/api";

const CareerForm = ({ submitButtonText = "Submit Application" }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "+91",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    resume: null, // File upload
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      Swal.fire({
        title: "Invalid File",
        text: "Only PDF files are allowed!",
        icon: "error",
      });
      e.target.value = ""; // Reset file input
      return;
    }

    setFormData({ ...formData, resume: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          form.append(key, formData[key]);
        }
      });

      const response = await submitJobApplication(form);

      Swal.fire({
        title: "Success!",
        text: response.message || "Application submitted successfully!",
        icon: "success",
      });

      setFormData({
        name: "",
        dob: "",
        phone: "+91",
        email: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: "",
        resume: null,
      });

      document.getElementById("resume").value = ""; // Reset file input field
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="career-form-section">
      <div className="container">
        <div className="career-form">
          <form onSubmit={handleSubmit}>
            <div className="d-flex w-100 gap-3">
              <div className="mb-3 w-50">
                <label htmlFor="name" className="form-label cursor-pointer">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="form-control" autoComplete="name" />
              </div>

              <div className="mb-3 w-50">
                <label htmlFor="dob" className="form-label cursor-pointer">Birth Date</label>
                <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} required className="form-control" />
              </div>
            </div>

            <div className="d-flex w-100 gap-3">
              <div className="mb-3 w-50">
                <label htmlFor="phone" className="form-label cursor-pointer">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="form-control" autoComplete="on" />
              </div>

              <div className="mb-3 w-50">
                <label htmlFor="email" className="form-label cursor-pointer">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="form-control" autoComplete="email" />
              </div>
            </div>

            <div className="d-flex w-100 gap-3">
              <div className="mb-3 w-50">
                <label htmlFor="addressLine1" className="form-label cursor-pointer">Address Line 1</label>
                <input type="text" name="addressLine1" id="addressLine1" value={formData.addressLine1} onChange={handleChange} required className="form-control" />
              </div>

              <div className="mb-3 w-50">
                <label htmlFor="addressLine2" className="form-label cursor-pointer">Address Line 2</label>
                <input type="text" name="addressLine2" id="addressLine2" value={formData.addressLine2} onChange={handleChange} className="form-control" />
              </div>
            </div>

            <div className="d-flex w-100 gap-3">
              <div className="mb-3 w-50">
                <label htmlFor="city" className="form-label cursor-pointer">City</label>
                <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="form-control" />
              </div>

              <div className="mb-3 w-50">
                <label htmlFor="state" className="form-label cursor-pointer">State</label>
                <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} required className="form-control" />
              </div>
            </div>

            <div className="d-flex w-100 gap-3">
              <div className="mb-3 w-50">
                <label htmlFor="zip" className="form-label cursor-pointer">Zip Code</label>
                <input type="text" name="zip" id="zip" value={formData.zip} onChange={handleChange} required className="form-control" />
              </div>

              <div className="mb-3 w-50">
                <label htmlFor="resume" className="form-label cursor-pointer">Resume (PDF only)</label>
                <input type="file" name="resume" id="resume" accept="application/pdf" onChange={handleFileChange} required className="form-control" />
              </div>
            </div>

            <div className="w-100 text-center mt-5">
              <button type="submit" className="ff-btn ff-btn-small ff-btn-fill-dark blog-btn text-capitalize text-decoration-none d-inline-block w-fit-content" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CareerForm;