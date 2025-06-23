import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookingForm from "./pages/BookingForm";
import VoucherPage from "./pages/VoucherPage";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddCarForm from "./admin/AddCarForm";
import EditCarForm from "./admin/EditCarForm";

// ❌ REMOVE THIS: import { initializeCarData } from "./data/carData";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ❌ REMOVE THIS: initializeCarData(); // Not needed anymore

    // ✅ Check login status from localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/cars" element={isLoggedIn ? <Cars /> : <Navigate to="/login" />} />
        <Route path="/cars/:id" element={isLoggedIn ? <CarDetails /> : <Navigate to="/login" />} />
        <Route path="/booking" element={isLoggedIn ? <BookingForm /> : <Navigate to="/login" />} />
        <Route path="/voucher" element={isLoggedIn ? <VoucherPage /> : <Navigate to="/login" />} />
        <Route path="/payment" element={isLoggedIn ? <Payment /> : <Navigate to="/login" />} />
        <Route path="/booking-success" element={isLoggedIn ? <BookingSuccess /> : <Navigate to="/login" />} />
        <Route path="/my-bookings" element={isLoggedIn ? <MyBookings /> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddCarForm />} />
        <Route path="/admin/edit/:id" element={<EditCarForm />} />
      </Routes>
    </Router>
  );
}

export default App;
