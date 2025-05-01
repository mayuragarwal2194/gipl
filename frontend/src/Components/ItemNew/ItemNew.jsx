import React from "react";
import { Link } from "react-router-dom";
import "./ItemNew.css";

const ItemNew = ({ image, itemName, id, isSubcategory = false }) => {
  const targetLink = isSubcategory ? `/subcategory/${id}` : `/product/${id}`;

  return (
    <div className="itemnew">
      <Link to={targetLink} className="mega-card text-decoration-none">
        <div className="item-image w-100 position-relative overflow-hidden">
          <img src={`${image}`} alt={itemName} className="w-100" />
        </div>
        <div className="card-body text-center mt-3 letter-216 py-0 px-1 px-lg-3">
          <h6 className="product-title xs-small-fonts large-fonts">{itemName}</h6>
        </div>
      </Link>
    </div>
  );
};

export default ItemNew;