import React, { useState } from "react";
import { uploadToCloudinary } from "../utils/Cloudinary";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddCarForm.css";

const AddCarForm = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [ac, setAc] = useState("Yes");
  const [rentPerDay, setRentPerDay] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIsLoading(true);
      try {
        const uploadPromises = files.map((file) => uploadToCloudinary(file));
        const urls = await Promise.all(uploadPromises);
        setImageUrls((prev) => [...prev, ...urls.filter((url) => url)]);
      } catch (error) {
        toast.error("❌ Some images failed to upload");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const removeImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (imageUrls.length === 0) {
      toast.error("❌ Please upload at least one image");
      setIsLoading(false);
      return;
    }

    const newCar = {
      name: model,
      model,
      fuelAverage: fuel,
      ac,
      rentPerDay: parseInt(rentPerDay),
      images: imageUrls,
    };

    try {
      await axios.post("https://c8e59ba2-bc33-4837-9759-b23d43a1dc76-00-2410258q572b7.sisko.replit.dev/api/cars", newCar);
      toast.success("🎉 VIP Car Added Successfully!");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 2500);

      // Clear form
      setModel("");
      setFuel("");
      setAc("Yes");
      setRentPerDay("");
      setImageUrls([]);
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("❌ Failed to add car. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="vip-form-container">
      <h2 className="vip-form-heading">🚘 Add New VIP Car</h2>

      <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        {[
          {
            label: "Car Model",
            value: model,
            setValue: setModel,
            type: "text",
            placeholder: "e.g., Toyota Corolla",
          },
          {
            label: "Fuel Average",
            value: fuel,
            setValue: setFuel,
            type: "text",
            placeholder: "e.g., 12-14 KM/L",
          },
          {
            label: "Rent Price (PKR)",
            value: rentPerDay,
            setValue: setRentPerDay,
            type: "number",
            placeholder: "e.g., 4500",
          },
        ].map(({ label, value, setValue, type, placeholder }, idx) => (
          <div key={idx} className="vip-form-group">
            <label className="vip-form-label">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              placeholder={placeholder}
              className="vip-form-input"
            />
          </div>
        ))}

        {/* AC Select */}
        <div className="vip-form-group">
          <label className="vip-form-label">AC Available</label>
          <select
            value={ac}
            onChange={(e) => setAc(e.target.value)}
            required
            className="vip-form-select"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="vip-form-group">
          <label className="vip-form-label">Car Images (Multiple)</label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="vip-image-upload"
          />
        </div>

        {/* Image Previews */}
        {imageUrls.length > 0 && (
          <div className="vip-image-preview-container">
            {imageUrls.map((url, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="vip-image-preview"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="vip-remove-image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="vip-submit-button"
        >
          {isLoading ? "Adding VIP Car..." : "➕ Add VIP Car"}
        </button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddCarForm;
