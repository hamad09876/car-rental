import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/BookingSuccess.css";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;

  const handleConfirm = async () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const userEmail = user?.email || "unknown";

  const fullCar = booking.car; // ✅ full car object chahiye for frontend

  const bookingData = {
    name: booking.name,
    cnic: booking.cnic,
    number: booking.number,
    address: booking.address,
    startDate: booking.startDate,
    endDate: booking.endDate,
    days: booking.days,
    totalBill: booking.days * fullCar.rentPerDay,
    paymentStatus: booking.paymentStatus || "unpaid",
    userEmail,
    car: fullCar // ✅ full object for image access
  };

  try {
    if (booking._id && booking.isPayNow) {
      // ✅ Update existing booking
      await axios.put(`https://c8e59ba2-bc33-4837-9759-b23d43a1dc76-00-2410258q572b7.sisko.replit.dev/api/bookings/${booking._id}`, {
        ...bookingData,
        paymentStatus: "paid"
      });
      toast.success("🎉 Payment Confirmed!");
    } else {
      // ✅ New booking
      await axios.post("https://c8e59ba2-bc33-4837-9759-b23d43a1dc76-00-2410258q572b7.sisko.replit.dev/api/bookings", bookingData);
      toast.success("🎉 Booking Confirmed!");
    }

    setTimeout(() => {
      navigate("/cars");
    }, 2000);
  } catch (err) {
    console.error(err);
    toast.error("❌ Failed to save booking.");
  }
};


  if (!booking) {
    return (
      <div className="vip-no-booking">
        <h3>Booking not found</h3>
        <button
          onClick={() => navigate("/cars")}
          className="vip-back-button"
        >
          Back to Luxury Fleet
        </button>
      </div>
    );
  }

  return (
    <div className="vip-booking-container">
      <div className="vip-confirmation-header">
        <div className="vip-confirmation-badge">BOOKING CONFIRMATION</div>
        <h1 className="vip-heading">Your Luxury Experience Awaits</h1>
        <div className="vip-gold-divider"></div>
      </div>

      <div className="vip-summary-card">
        <h3 className="vip-section-title">👤 Customer Information</h3>
        <div className="vip-detail-grid">
          <div className="vip-detail-item">
            <span className="vip-detail-label">Name:</span>
            <span>{booking.name}</span>
          </div>
          <div className="vip-detail-item">
            <span className="vip-detail-label">CNIC:</span>
            <span>{booking.cnic}</span>
          </div>
          <div className="vip-detail-item">
            <span className="vip-detail-label">Phone:</span>
            <span>{booking.number}</span>
          </div>
          <div className="vip-detail-item">
            <span className="vip-detail-label">Address:</span>
            <span>{booking.address}</span>
          </div>
        </div>

        <h3 className="vip-section-title">🚗 Luxury Vehicle Details</h3>
        <div className="vip-car-content">
          <div className="vip-car-image-container">
            <img
              src={booking.car.images?.[0]}
              alt={booking.car.name}
              className="vip-car-image"
            />
            <div className="vip-price-tag">
              Rs. {booking.car.rentPerDay}/day
            </div>
          </div>
          <div className="vip-car-details">
            <h4 className="vip-car-name">{booking.car.name}</h4>
            <p className="vip-car-model">{booking.car.model}</p>
            <div className="vip-car-specs">
              <p>
                <span className="vip-spec-label">Fuel Avg:</span>{" "}
                {booking.car.fuelAverage} km/L
              </p>
              <p>
                <span className="vip-spec-label">AC:</span> {booking.car.ac}
              </p>
            </div>
          </div>
        </div>

        <h3 className="vip-section-title">📅 Booking Period</h3>
        <div className="vip-dates-grid">
          <div className="vip-date-item">
            <span className="vip-date-label">Pickup Date:</span>
            <span className="vip-date-value">{booking.startDate}</span>
          </div>
          <div className="vip-date-item">
            <span className="vip-date-label">Return Date:</span>
            <span className="vip-date-value">{booking.endDate}</span>
          </div>
          <div className="vip-date-item">
            <span className="vip-date-label">Total Days:</span>
            <span className="vip-date-value">{booking.days}</span>
          </div>
        </div>

        <div className="vip-total-section">
          <div className="vip-total-item">
            <span className="vip-total-label">Total Amount:</span>
            <span className="vip-total-amount">
              Rs. {booking.days * booking.car.rentPerDay}
            </span>
          </div>
        </div>
      </div>

      <button onClick={handleConfirm} className="vip-confirm-button">
        Confirm & {booking.paymentStatus === "paid" ? "Mark as Paid" : "Complete Booking"}
      </button>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default BookingSuccess;
