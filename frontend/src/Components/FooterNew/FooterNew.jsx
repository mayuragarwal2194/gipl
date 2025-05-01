/* eslint-disable */
import React, { useState } from 'react';
import './FooterNew.css';
import { Link } from 'react-router-dom';
import { products } from '../../Data/ProductData';
import { subscribeToNewsletter } from '../../Services/api';
import Swal from "sweetalert2";

const FooterNew = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address!",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await subscribeToNewsletter(email);

      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: response.message,
      });

      setEmail(""); // Clear input after success
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error,
      });
    } finally {
      setLoading(false);
    }
  };


  // Extract Bitumen and Gabion Products
  const bitumenProducts = products
    .find((category) => category.shortName === "Bitumens")
    ?.subCategories?.map((subCategory) => ({
      id: subCategory.name, // Using subcategory name as ID
      name: subCategory.name, // Display subcategory name
      featuredImage: subCategory.products?.[0]?.featuredImage || "", // First product’s image as a preview
    })) || [];

  const gabionProducts = products
    .find((category) => category.shortName === "Gabions")
    ?.subCategories?.map((subCategory) => ({
      id: subCategory.name, // Using subcategory name as ID
      name: subCategory.name, // Display subcategory name
      featuredImage: subCategory.products?.[0]?.featuredImage || "", // First product’s image as a preview
    })) || [];


  return (
    <>
      <footer className="footer-section text-start text-lg-start text-creame bg-black">
        <div className="w-100 footer-bg py-5">
          <div className="container">
            <div className="row align-items-start footer-main-row">
              <div className="col-12 col-lg-3">
                <h5 className="footer-head text-uppercase fw-normal footer-collection-head letter-216 mt-4 mt-lg-0">
                  Newsletter
                </h5>
                <p className="footer-detail mt-3">
                  Subscribe to receive updates, access to exclusive deals, and more.
                </p>
                <div className="footer-email">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="E-mail"
                    className="bg-transparent w-100 mt-3 text-creame"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    role="button"
                    className="ff-btn ff-btn-fill-light text-uppercase text-decoration-none d-block w-fit-content mt-3"
                    onClick={handleSubscribe}
                    disabled={loading}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-9">
                {/* <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="footer-wrapper w-100 w-fit-content">
                      <h5 className="footer-head text-uppercase fw-normal footer-collection-head letter-216">
                        Bitumen Products
                      </h5>
                      <div className="footer-collection mt-3">
                        <ul className="text-capitalize list-unstyled mb-0">
                          <li>
                            <Link to={'/'} className="text-decoration-none">
                              Modified Bitumen
                            </Link>
                          </li>
                          <li>
                            <Link to={'/'} className="text-decoration-none">
                              Bitumen Emulsions
                            </Link>
                          </li>
                          <li>
                            <Link to={'/'} className="text-decoration-none"> Micro Surfacing Emulsions </Link>
                          </li>
                          <li>
                            <Link to={'/'} className="text-decoration-none"> Penetration Grade Bitumen </Link>
                          </li>
                          <li>
                            <Link to={'/'} className="text-decoration-none"> Viscosity Grade Bitumen </Link>
                          </li>
                          <li>
                            <Link to={'/'} className="text-decoration-none"> Industrial Grade Mastic Bitumen </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="footer-wrapper w-100 w-fit-content mt-4 mt-lg-0">
                      <h5 className="footer-head text-uppercase fw-normal letter-216">
                        Construction Chemicals
                      </h5>
                      <div className="footer-quick-links mt-3">
                        <ul className="ps-0 mb-0">
                          <li className="list-unstyled underline-hover-effect">
                            <Link to={'/'} className="text-decoration-none mb-0 pb-0">
                              Concrete Admixture
                            </Link>
                          </li>
                          <li className="list-unstyled underline-hover-effect">
                            <Link to={'/'} className="text-decoration-none mb-0 pb-0">
                              Curing Compounds
                            </Link>
                          </li>
                          <li className="list-unstyled underline-hover-effect">
                            <Link to={'/contact'} className="text-decoration-none mb-0 pb-0">
                              Grout & Anchors
                            </Link>
                          </li>
                          <li className="list-unstyled underline-hover-effect">
                            <Link to={'/'} className="text-decoration-none mb-0 pb-0">
                              Readymix Mortar & Adhesive
                            </Link>
                          </li>
                          <li className="list-unstyled underline-hover-effect">
                            <Link to={'/'} className="text-decoration-none mb-0 pb-0">
                              Sealants
                            </Link>
                          </li>
                          <li className="list-unstyled underline-hover-effect">
                            <Link to={'/'} className="text-decoration-none mb-0 pb-0">
                              Surface Treatment
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="mt-4 mt-lg-0">
                      <h5 className="footer-head text-uppercase fw-normal mb-3 letter-216">
                        About the shop
                      </h5>
                      <p className="line-height-24 text-creame">
                        <span><strong>Corporate Address</strong> : 21, 4th Floor, “4D” Square.
                          Opp. Govt. Engineering College Visat – Gandhinagar Road Motera – Sabarmati, Ahmedabad – 380005
                          Gujarat, INDIA</span>
                      </p>
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  {/* Bitumen Products */}
                  <div className="col-12 col-lg-4">
                    <div className="footer-wrapper w-100 w-fit-content">
                      <h5 className="footer-head text-uppercase fw-normal footer-collection-head letter-216">
                        Bitumen Products
                      </h5>
                      <div className="footer-collection mt-3">
                        <ul className="text-capitalize list-unstyled mb-0">
                          {bitumenProducts.map((product) => (
                            <li key={product.id}>
                              <Link to={`/subcategory/${product.id}`} className="text-decoration-none">
                                {product.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Gabion Products */}
                  <div className="col-12 col-lg-4">
                    <div className="footer-wrapper w-100 w-fit-content mt-4 mt-lg-0">
                      <h5 className="footer-head text-uppercase fw-normal letter-216">
                        Gabion Products
                      </h5>
                      <div className="footer-collection mt-3">
                        <ul className="text-capitalize list-unstyled mb-0">
                          {gabionProducts.map((product) => (
                            <li key={product.id}>
                              <Link to={`/subcategory/${product.id}`} className="text-decoration-none">
                                {product.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="mt-4 mt-lg-0">
                      <h5 className="footer-head text-uppercase fw-normal mb-3 letter-216">
                        Address
                      </h5>
                      <p className="line-height-24 text-creame">
                        <span><strong>Corporate Address</strong> : Gajpati Industries Pvt. Ltd.
                          Near Power Grid, SIDCO IGC Phase III, Samba, Jammu, J&K
                          184121
                        </span>
                      </p>
                        <div>9571299666</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="footer-navs d-flex align-items-center justify-content-center justify-content-md-start gap-3 flex-wrap list-unstyled mt-4 mt-lg-5">
              {/* <li className="share-link mb-0">
                <Link to={'/'} className="d-block mb-0">
                  <i className="ri-facebook-fill"></i>
                </Link>
              </li> */}
              {/* <li className="share-link mb-0">
                <Link to={'/'} className="d-block mb-0">
                  <i className="ri-twitter-x-fill"></i>
                </Link>
              </li> */}
              {/* <li className="share-link mb-0">
                <Link to={'/'} className="d-block mb-0">
                  <i className="ri-instagram-line"></i>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="footer-below text-center text-lg-start mt-4">
          <div className="container">
            <div className="copyright-footer d-flex align-items-center justify-content-between">
              <div className="text-lg-start text-center">
                <p className="mb-0 text-creame">
                  &copy; 2023 Leo & Violette. All Rights Reserved
                </p>
              </div>
              <div className="mt-lg-3 mt-lg-0 flex-1">
                <ul className="footer-bottom-navs list-unstyled d-flex justify-content-center justify-content-lg-end mb-0">
                  <li>
                    <Link to={'/'} className="text-creame text-decoration-none ps-0 ps-lg-3">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'} className="text-creame text-decoration-none ps-0 ps-lg-3">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterNew;