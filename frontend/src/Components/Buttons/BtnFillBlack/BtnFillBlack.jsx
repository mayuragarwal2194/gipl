import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './BtnFillBlack.css';

const BtnFillBlack = ({ btn_name, link }) => {
  return (
    <div className="BtnFillBlack">
      <Link 
        to={link} 
        className="ff-btn ff-btn-fill-dark text-capitalize text-decoration-none d-inline-block w-fit-content"
      >
        {btn_name}
      </Link>
    </div>
  );
};

export default BtnFillBlack;