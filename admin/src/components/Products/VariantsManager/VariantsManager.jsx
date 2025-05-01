import React from "react";
import VariantForm from "../VariantForm/VariantForm";

const VariantsManager = ({ subProducts, setSubProducts }) => {
  const handleSubProductChange = (index, updatedSubProduct) => {
    const updated = [...subProducts];
    updated[index] = updatedSubProduct;
    setSubProducts(updated);
  };

  const addSubProduct = () => {
    setSubProducts((prev) => [
      ...prev,
      {
        name: "",
        aboutImage: null,
        aboutImagePreview: null,
        description: [""],
        specialFeatures: [""],
        applications: [""],
      },
    ]);
  };

  const removeSubProduct = (index) => {
    const updated = [...subProducts];
    updated.splice(index, 1);
    setSubProducts(updated);
  };

  return (
    <>
      <h4 className="mt-5">Variants</h4>
      {subProducts.map((subProduct, index) => (
        <VariantForm
          key={index}
          index={index}
          subProduct={subProduct}
          onChange={handleSubProductChange}
          onRemove={removeSubProduct}
          isRemovable={subProducts.length > 1}
        />
      ))}
      <button type="button" className="btn btn-secondary mb-4" onClick={addSubProduct}>
        + Add Variant
      </button>
    </>
  );
};

export default VariantsManager;