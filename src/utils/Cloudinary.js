import axios from "axios";

// Cloudinary config
const CLOUD_NAME = "dlgonnqjl"; // ✅ Your Cloudinary cloud name
const UPLOAD_PRESET = "car_upload_preset"; // ✅ Your upload preset

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
  formData
);

    return response.data.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    return null;
  }
};