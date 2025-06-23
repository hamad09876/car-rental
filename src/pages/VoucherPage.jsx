import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Voucher.css";

const Voucher = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="vip-no-data">No booking data found!</div>;
  }

  const {
    name,
    cnic,
    number,
    address,
    startDate,
    endDate,
    days,
    totalBill,
    car,
  } = state;

  return (
    <div className="vip-voucher-container">
      {/* VIP Header with Ribbon */}
      <div className="vip-header">
        <div className="vip-ribbon">
          <span className="vip-ribbon-text">Al-madina BOOKING</span>
        </div>
        <div className="vip-watermark">VIP</div>
      </div>

      {/* Golden Decorative Elements */}
      <div className="vip-gold-line"></div>

      {/* Main Content */}
      <div className="vip-content-wrapper">
        <h2 className="vip-main-heading">Booking Voucher</h2>

        <div className="vip-details-container">
          {/* Car Details Section */}
          <div className="vip-section">
            <div className="vip-section-header">
              <div className="vip-icon-box">🚗</div>
              <h3 className="vip-section-title">Car Details</h3>
            </div>
            <div className="vip-details-grid">
              <p className="vip-detail-item"><span className="vip-detail-label">Name:</span> {car.name}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">Model:</span> {car.model}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">Fuel Avg:</span> {car.fuelAverage}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">AC:</span> {car.airConditioned ? "Yes" : "No"}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">Price/Day:</span> Rs. {car.rentPerDay}</p>
            </div>
            <img 
              src={car.images?.[0]} 
              alt={car.name} 
              className="vip-car-image" 
            />
          </div>

          {/* User Details Section */}
          <div className="vip-section">
            <div className="vip-section-header">
              <div className="vip-icon-box">👤</div>
              <h3 className="vip-section-title">User Details</h3>
            </div>
            <div className="vip-details-grid">
              <p className="vip-detail-item"><span className="vip-detail-label">Name:</span> {name}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">CNIC:</span> {cnic}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">Number:</span> {number}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">Address:</span> {address}</p>
            </div>
          </div>

          {/* Booking Summary Section */}
          <div className="vip-section">
            <div className="vip-section-header">
              <div className="vip-icon-box">📅</div>
              <h3 className="vip-section-title">Booking Summary</h3>
            </div>
            <div className="vip-details-grid">
              <p className="vip-detail-item"><span className="vip-detail-label">Start Date:</span> {startDate}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">End Date:</span> {endDate}</p>
              <p className="vip-detail-item"><span className="vip-detail-label">Days:</span> {days}</p>
              <p className="vip-detail-item">
                <span className="vip-detail-label">Total Bill:</span>
                <span className="vip-total-bill">Rs. {totalBill}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Badge */}
      <div className="vip-confirmation-badge">
        <span className="vip-confirmation-text">CONFIRMED</span>
      </div>

      {/* Proceed Button */}
      <button
        onClick={() => navigate("/payment", { state })}
        className="vip-confirm-button"
      >
        Proceed to Payment
      </button>

      {/* VIP Footer */}
      <div className="vip-footer">
        <p className="vip-footer-text">Thank you for choosing our VIP service!</p>
        <p className="vip-footer-contact">Contact us at vip@madinarentals.com</p>
      </div>
    </div>
  );
};

export default Voucher;
