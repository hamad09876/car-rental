// src/data/carData.js
const API_URL = "https://car-rental-backend-1-6buw.onrender.com/api/cars";
const BOOKINGS_URL = "https://car-rental-backend-1-6buw.onrender.com/api/bookings";

// -------------------- CAR APIs --------------------

export const getCarData = async () => {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to fetch car data:", error);
    return [];
  }
};

export const addCar = async (car) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to add car:", error);
    throw error;
  }
};

export const updateCar = async (id, updatedCar) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to update car:", error);
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete car");
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to delete car:", error);
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to fetch car by ID:", error);
    throw error;
  }
};

// -------------------- BOOKINGS APIs --------------------

export const getBookings = async () => {
  try {
    const res = await fetch(BOOKINGS_URL);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to get bookings:", error);
    return [];
  }
};

export const deleteBooking = async (id) => {
  try {
    const res = await fetch(`${BOOKINGS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete booking");
    return await res.json();
  } catch (error) {
    console.error("❌ Failed to delete booking:", error);
    throw error;
  }
};
