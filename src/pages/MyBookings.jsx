import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = () => {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!currentUser) {
      setBookings([]);
      setLoading(false);
      toast.warn("Please login to view bookings", { autoClose: 3000 });
      return;
    }

    axios
      .get("https://car-rental-backend-1-6buw.onrender.com/api/bookings")
      .then((res) => {
        const userBookings = res.data.filter(
          (b) => b.userEmail === currentUser.email
        );
        setBookings(userBookings);
        setLoading(false);

        if (userBookings.length === 0) {
          toast.info("You have no bookings yet", { autoClose: 2500 });
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings", { autoClose: 4000 });
        setLoading(false);
      });
  };

  const handleDelete = async (_id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      const res = await axios.delete(`https://car-rental-backend-1-6buw.onrender.com/api/bookings/${_id}`);
      if (res.status === 200) {
        setBookings((prev) => prev.filter((b) => b._id !== _id));
        toast.success("Booking cancelled successfully", { autoClose: 3000 });
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err) {
      toast.error("Failed to cancel booking", { autoClose: 4000 });
    }
  };

  const handlePayNow = (booking) => {
    toast.info("Redirecting to payment...", { autoClose: 2000 });

    const updatedBooking = {
      ...booking,
      isPayNow: true,
    };

    setTimeout(() => navigate("/payment", { state: updatedBooking }), 2000);
  };

  if (loading) {
    return <div className="loading-container">⏳ Loading your bookings...</div>;
  }

  return (
    <div className="bookings-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bookings-header">
        <h1 className="bookings-title"><span className="vip-highlight">MY</span> BOOKINGS</h1>
        <p className="bookings-subtitle">Your Booking History</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          📭 No bookings found for your account.
          <button onClick={() => navigate("/cars")} className="explore-cars-btn">
            Explore VIP Cars
          </button>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-card-header">
                <img
                  src={booking.car?.images?.[0] || "https://via.placeholder.com/600x400?text=VIP+Car"}
                  alt={booking.car?.name || "VIP Car"}
                  className="booking-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400?text=VIP+Car";
                  }}
                />
                <div className="booking-status">
                  {booking.paymentStatus === "paid" ? (
                    <span className="status-badge paid">PAID</span>
                  ) : (
                    <span className="status-badge unpaid">PENDING PAYMENT</span>
                  )}
                </div>
              </div>

              <div className="booking-details">
                <h3 className="car-name">{booking.car?.name || "VIP Car"}</h3>
                <p className="car-model">{booking.car?.model || "Luxury Model"}</p>

                <div className="booking-info-grid">
                  <div className="info-item">
                    <span className="info-label">Start Date</span>
                    <span className="info-value">{booking.startDate}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">End Date</span>
                    <span className="info-value">{booking.endDate}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Duration</span>
                    <span className="info-value">{booking.days} days</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total</span>
                    <span className="info-value highlight">Rs. {booking.totalBill}</span>
                  </div>
                </div>

                <div className="customer-info">
                  <p className="customer-name">{booking.name}</p>
                  <p className="customer-phone">{booking.number}</p>
                </div>

                <div className="booking-actions">
                  {booking.paymentStatus !== "paid" && (
                    <button
                      onClick={() => handlePayNow(booking)}
                      className="pay-now-btn"
                    >
                      💳 Pay Now
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="cancel-btn"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;