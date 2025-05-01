import React, { useRef } from "react";
import Swal from "sweetalert2";

const VariantForm = ({ index, subProduct, onChange, onRemove, isRemovable }) => {
  const aboutImageRef = useRef(null);

  // Handle form field changes
  const handleChange = (field, value) => {
    console.log(`handleChange called for field: ${field}, value:`, value);
    const updated = { ...subProduct };

    if (field === "aboutImage") {
      if (!value) return;

      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(value.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid file type',
          text: 'Only JPG, PNG, WEBP, GIF images are allowed.',
        });
        return;
      }

      if (value.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'File too large',
          text: 'Image must be less than 5MB.',
        });
        return;
      }

      if (updated.aboutImagePreview) {
        console.log('Revoking previous image URL:', updated.aboutImagePreview);
        URL.revokeObjectURL(updated.aboutImagePreview);
      }

      updated.aboutImage = value;
      updated.aboutImagePreview = URL.createObjectURL(value);

      console.log('Updated aboutImage and aboutImagePreview:', updated);
    } else {
      updated[field] = value;
      console.log(`Updated ${field}:`, updated);
    }

    onChange(index, updated);
    console.log('Calling onChange with updated subProduct:', updated);
  };


  // Handle removing the about image
  const handleRemoveImage = () => {
    console.log('handleRemoveImage called');
    if (subProduct.aboutImagePreview) {
      console.log('Revoking aboutImagePreview URL:', subProduct.aboutImagePreview);
      URL.revokeObjectURL(subProduct.aboutImagePreview);
    }
    const updated = {
      ...subProduct,
      aboutImage: null,
      aboutImagePreview: null,
    };
    if (aboutImageRef.current) {
      console.log('Clearing input file value');
      aboutImageRef.current.value = null;
    }
    onChange(index, updated);
    console.log('Calling onChange with updated (removed image):', updated);
  };

  // Handle changes in array fields (description, specialFeatures, applications)
  const handleArrayChange = (field, i, value) => {
    console.log(`handleArrayChange called for field: ${field}, index: ${i}, value:`, value);
    const updated = { ...subProduct };
    updated[field][i] = value;
    onChange(index, updated);
    console.log(`Updated array ${field} at index ${i}:`, updated);
  };

  // Add a new item to an array field
  const addToArray = (field) => {
    console.log(`addToArray called for field: ${field}`);
    const updated = { ...subProduct };
    updated[field] = [...updated[field], ""];
    onChange(index, updated);
    console.log(`Added new item to array ${field}:`, updated);
  };

  // Remove an item from an array field
  const removeFromArray = (field, i) => {
    console.log(`removeFromArray called for field: ${field}, index: ${i}`);
    const updated = { ...subProduct };
    updated[field] = updated[field].filter((_, index) => index !== i);
    onChange(index, updated);
    console.log(`Removed item from array ${field} at index ${i}:`, updated);
  };

  const fieldId = (base, i = null) => `variant-${index}-${base}${i !== null ? `-${i}` : ""}`;

  return (
    <div className="border rounded p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Variant {index + 1}</h5>
        {isRemovable && (
          <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemove(index)}>
            Remove Variant
          </button>
        )}
      </div>

      {/* Variant Name */}
      <div className="mb-3">
        <label htmlFor={fieldId("name")} className="form-label">Variant Name</label>
        <input
          type="text"
          id={fieldId("name")}
          name={fieldId("name")}
          className="form-control"
          value={subProduct.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      {/* About Image */}
      <div className="mb-3">
        <label htmlFor={fieldId("aboutImage")} className="form-label">About Image</label>
        <input
          type="file"
          id={fieldId("aboutImage")}
          name={fieldId("aboutImage")}
          className="form-control"
          ref={aboutImageRef}
          onChange={(e) => handleChange("aboutImage", e.target.files[0])}
        />
        {subProduct.aboutImagePreview && (
          <div className="position-relative d-inline-block mt-4">
            <img
              src={subProduct.aboutImagePreview}
              alt="Preview"
              className="border border-dark-subtle rounded"
              style={{ width: '100px' }}
            />
            <i
              className="fa-solid fa-circle-xmark position-absolute top-0 end-0"
              style={{ cursor: "pointer", fontSize: "1.2rem", transform: "translate(50%, -50%)" }}
              onClick={handleRemoveImage}
              title="Remove Image"
            />
          </div>
        )}
      </div>

      {/* Dynamic Fields (description, specialFeatures, applications) */}
      {["description", "specialFeatures", "applications"].map((field) => (
        <div className="mb-3" key={field}>
          <h6 className="fw-semibold text-capitalize">{field.replace(/([A-Z])/g, " $1")}</h6>
          {subProduct[field]?.map((item, i) => (
            <div key={`${field}-${i}`} className="d-flex align-items-center mb-2">
              <input
                type="text"
                id={fieldId(field, i)}
                name={fieldId(field, i)}
                className="form-control me-2"
                value={item || ""}
                onChange={(e) => handleArrayChange(field, i, e.target.value)}
              />
              {subProduct[field].length > 1 && (
                <i
                  className="fa-solid fa-minus text-danger"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  title={`Remove ${field}`}
                  onClick={() => removeFromArray(field, i)}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary btn-sm mt-2"
            onClick={() => addToArray(field)}
          >
            <i className="fas fa-plus-circle me-1" /> Add {field.slice(0, -1)}
          </button>
        </div>
      ))}
    </div>
  );
};

export default VariantForm;