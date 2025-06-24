import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/BookingForm.css";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);

  useEffect(() => {
    const carId = location.state?.carId;
    if (carId) {
      axios
        .get(`https://c8e59ba2-bc33-4837-9759-b23d43a1dc76-00-2410258q572b7.sisko.replit.dev/api/cars/${carId}`)
        .then((res) => {
          setCar(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setCar(null);
        });
    }
  }, [location.state]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays > 0 ? diffDays : 0);
    }
  }, [startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingInfo = {
      name,
      cnic,
      number,
      address,
      startDate,
      endDate,
      days,
      totalBill: days * car.rentPerDay,
      car,
    };

    navigate("/voucher", { state: bookingInfo });
  };

  if (isLoading) {
    return (
      <div className="vip-loading-container">
        <div className="vip-spinner"></div>
        <p className="vip-loading-text">Loading Luxury Vehicle Details...</p>
      </div>
    );
  }

  if (!car) {
    return <div className="vip-no-car">Car not found</div>;
  }

  return (
    <div className="vip-booking-container">
      <div className="vip-header">
        <div className="vip-badge">Dream BOOKING</div>
        <h1 className="vip-heading">Almadina Reservation</h1>
        <div className="vip-gold-divider"></div>
      </div>

      <div className="vip-car-card">
        <div className="vip-car-header">
          <h2 className="vip-car-title">{car.name}</h2>
          <div className="vip-price-tag">Rs. {car.rentPerDay}/day</div>
        </div>

        <div className="vip-car-details">
          <div className="vip-car-image-container">
            <img
              src={car.images?.[0] || "https://via.placeholder.com/300"}
              alt={car.name}
              className="vip-car-image"
            />
            <div className="vip-image-overlay"></div>
          </div>

          <div className="vip-car-specs">
            <p className="vip-spec-item">
              <span className="vip-spec-label">Model:</span> {car.model}
            </p>
            <p className="vip-spec-item">
              <span className="vip-spec-label">Fuel Efficiency:</span>{" "}
              {car.fuelAverage} km/L
            </p>
            <p className="vip-spec-item">
              <span className="vip-spec-label">AC:</span>{" "}
              {car.airConditioned ? "Yes" : "No"}
            </p>
            <p className="vip-spec-item">
              <span className="vip-spec-label">Status:</span>{" "}
              <span className="vip-available">Available</span>
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="vip-form">
        <div className="vip-form-header">
          <div className="vip-form-icon">📝</div>
          <h3 className="vip-form-title">Personal Information</h3>
        </div>

        <div className="vip-form-grid">
          <div className="vip-input-group">
            <label className="vip-input-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="vip-input"
            />
          </div>

          <div className="vip-input-group">
            <label className="vip-input-label">CNIC</label>
            <input
              type="text"
              placeholder="XXXXX-XXXXXXX-X"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              required
              className="vip-input"
            />
          </div>

          <div className="vip-input-group">
            <label className="vip-input-label">Phone Number</label>
            <input
              type="text"
              placeholder="03XX-XXXXXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="vip-input"
            />
          </div>

          <div className="vip-input-group">
            <label className="vip-input-label">Address</label>
            <input
              type="text"
              placeholder="Your complete address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="vip-input"
            />
          </div>
        </div>

        <div className="vip-date-section">
          <div className="vip-date-picker">
            <label className="vip-date-label">Pickup Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="vip-date-input"
            />
          </div>

          <div className="vip-date-picker">
            <label className="vip-date-label">Return Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="vip-date-input"
            />
          </div>
        </div>

        <div className="vip-summary-card">
          <div className="vip-summary-item">
            <span>Rental Days:</span>
            <span className="vip-summary-value">{days} days</span>
          </div>
          <div className="vip-summary-item">
            <span>Daily Rate:</span>
            <span className="vip-summary-value">Rs. {car.rentPerDay}</span>
          </div>
          <div className="vip-summary-divider"></div>
          <div className="vip-summary-item vip-total">
            <span>Total Amount:</span>
            <span className="vip-summary-value">Rs. {days * car.rentPerDay}</span>
          </div>
        </div>

        <div className="vip-button-container">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="vip-back-button"
          >
            &larr; Back
          </button>
          <button
            type="submit"
            className="vip-submit-button"
            disabled={days === 0}
          >
            Next
          </button>
        </div>
      </form>

      <div className="vip-footer">
        <p>Premium Service • VIP Concierge • Luxury Fleet</p>
        <p>24/7 Support: +92 308 8487789</p>
        <p>Whatsapp: 0308 8487789</p>
      </div>
    </div>
  );
};

export default BookingForm;
