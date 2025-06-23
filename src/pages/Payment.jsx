import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const isFromPayNow = bookingData?.isPayNow === true;

  const handlePayment = (e) => {
    e.preventDefault();

    // Sirf paymentStatus ke sath agay bhejna hai
    navigate("/booking-success", {
      state: {
        ...bookingData,
        paymentStatus: "paid",
        isPayNow: isFromPayNow,
      },
    });
  };

  const handleCashPayment = () => {
    // Sirf unpaid status agay bhejna
    navigate("/booking-success", {
      state: {
        ...bookingData,
        paymentStatus: "unpaid",
        isPayNow: isFromPayNow,
      },
    });
  };

  if (!bookingData) {
    return <div className="vip-loading-message">Loading...</div>;
  }

  return (
    <div className="vip-payment-container">
      <div className="vip-payment-header">
        <div className="vip-payment-badge">VIP PAYMENT</div>
        <h1 className="vip-payment-title">Complete Your Booking</h1>
        <div className="vip-gold-divider"></div>
      </div>

      <div className="vip-payment-summary">
        <h2 className="vip-car-name">{bookingData.car.name}</h2>
        <div className="vip-total-amount">
          Total Amount: Rs. {bookingData.days * bookingData.car.rentPerDay}
        </div>
      </div>

      <form onSubmit={handlePayment} className="vip-payment-form">
        <h3 className="vip-form-title">💳 Card Payment</h3>
        <input
          type="text"
          placeholder="Card Number"
          required
          className="vip-input-field"
        />
        <input
          type="text"
          placeholder="Card Holder Name"
          required
          className="vip-input-field"
        />
        <div style={{ display: "flex", gap: "15px" }}>
          <input
            type="text"
            placeholder="Expiry (MM/YY)"
            required
            className="vip-input-field"
            style={{ flex: 1 }}
          />
          <input
            type="text"
            placeholder="CVV"
            required
            className="vip-input-field"
            style={{ flex: 1 }}
          />
        </div>
        <button type="submit" className="vip-payment-button">
          Confirm Payment
        </button>
      </form>

      <button
        onClick={handleCashPayment}
        className="vip-cash-button"
        disabled={isFromPayNow}
        style={{
          backgroundColor: isFromPayNow ? "#ccc" : "#007bff",
          cursor: isFromPayNow ? "not-allowed" : "pointer",
          marginTop: "15px",
        }}
      >
        💵 Pay with Cash on Delivery
      </button>
    </div>
  );
};

export default Payment;
