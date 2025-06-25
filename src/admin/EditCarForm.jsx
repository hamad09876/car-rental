import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EditCarForm.css";

const EditCarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios
      .get(`https://car-rental-backend-1-6buw.onrender.com/api/cars/${id}`)
      .then((res) => {
        const carData = res.data;
        // Ensure images field is initialized
        if (!Array.isArray(carData.images)) {
          carData.images = [""];
        }
        setCar(carData);
      })
      .catch(() => {
        alert("Car not found!");
        navigate("/admin-dashboard");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...car.images];
    updatedImages[index] = value;
    setCar((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleImageFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "car_upload_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlgonnqjl/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        handleImageChange(index, data.secure_url);
      } else {
        alert("Image upload failed!");
      }
    } catch (err) {
      alert("Upload error: " + err.message);
    }
  };

  const addImageField = () => {
    setCar((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    if (car.images.length <= 1) return;
    const updatedImages = car.images.filter((_, i) => i !== index);
    setCar((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedCar = {
        ...car,
        rentPerDay: Number(car.rentPerDay),
        images: car.images.filter((img) => img.trim() !== ""),
      };

      await axios.put(`https://car-rental-backend-1-6buw.onrender.com/api/cars/${id}`, updatedCar);

      alert("✅ Car updated successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update car.");
    }
  };

  if (!car) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="vip-ribbon">VIP CAR EDITOR</div>
      <div className="card">
        <div className="header">
          <h1 className="title">Edit Car Details</h1>
          <div className="logo">
            <span className="logo-text">ADMIN</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>
            <div className="input-grid">
              {[ 
                { name: "name", label: "Car Name" },
                { name: "model", label: "Model" },
                { name: "fuelAverage", label: "Fuel Average" },
                { name: "rentPerDay", label: "Rent per Day (Rs.)", type: "number" }
              ].map(({ name, label, type = "text" }) => (
                <div className="input-group" key={name}>
                  <label className="label">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={car[name] || ""}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>
              ))}

              <div className="input-group">
                <label className="label">AC</label>
                <select
                  name="ac"
                  value={car.ac || "No"}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2 className="section-title">Car Images</h2>
              <button
                type="button"
                onClick={addImageField}
                className="add-button"
              >
                + Add Image
              </button>
            </div>

            <div className="image-grid">
              {car.images.map((img, index) => (
                <div key={index} className="image-input-group">
                  <label className="label">Image {index + 1}</label>
                  <div className="image-input-container">
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="Image URL"
                      className="input"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, index)}
                      className="input"
                    />
                    {car.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="remove-button"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  {img && (
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="image-preview"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard")}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarForm;
