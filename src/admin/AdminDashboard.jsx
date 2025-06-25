import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCarData,
  deleteCar,
  getBookings,
  deleteBooking,
} from "../data/carData";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Car filters state
  const [carFilters, setCarFilters] = useState({
    type: "all",
    sort: "newest",
  });
  
  // Booking filters state
  const [bookingFilters, setBookingFilters] = useState({
    status: "all",
    sort: "newest",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allCars, serverBookings] = await Promise.all([
          getCarData(),
          getBookings(),
        ]);

        setCarData(allCars);

        const mergedBookings = serverBookings.map((booking) => {
          const matchedCar = allCars.find(
            (car) => car._id === booking.carId || car._id === booking.car?._id
          );
          return {
            ...booking,
            car: matchedCar || booking.car || {},
          };
        });

        setBookings(mergedBookings);
      } catch (error) {
        console.error("Data loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Clear admin auth token or session
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const handleEditCar = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDeleteCar = async (id) => {
    try {
      await deleteCar(id);
      setCarData((prev) => prev.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Filter and sort cars
  const getFilteredCars = () => {
    let filtered = [...carData];
    
    // Apply type filter
    if (carFilters.type !== "all") {
      filtered = filtered.filter(car => car.type === carFilters.type);
    }
    
    // Apply sorting
    if (carFilters.sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    return filtered;
  };

  // Filter and sort bookings
  const getFilteredBookings = () => {
    let filtered = [...bookings];
    
    // Apply status filter
    if (bookingFilters.status !== "all") {
      filtered = filtered.filter(booking => booking.paymentStatus === bookingFilters.status);
    }
    
    // Apply sorting
    if (bookingFilters.sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    return filtered;
  };

  if (loading) {
    return <div className="admin-loading">Loading luxury fleet data...</div>;
  }

  const filteredCars = getFilteredCars();
  const filteredBookings = getFilteredBookings();

  // Get unique car types for filter dropdown
  const carTypes = [...new Set(carData.map(car => car.type))];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <div className="admin-header-top">
          <div className="vip-admin-badge">ADMIN DASHBOARD</div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <h1 className="admin-title">Luxury Fleet Management</h1>
      </div>

      <button onClick={() => navigate("/admin/add")} className="add-car-button">
        + Add New Luxury Vehicle
      </button>

      {/* Cars Section */}
      <div className="cars-section">
        <div className="section-header">
          <div className="section-icon">🚗</div>
          <h3 className="section-title">Premium Fleet Inventory</h3>
        </div>

        <div className="cars-filters">
          <div className="cars-filter">
            <label className="cars-filter-label">Vehicle Type</label>
            <select
              className="cars-filter-select"
              value={carFilters.type}
              onChange={(e) => setCarFilters({...carFilters, type: e.target.value})}
            >
              <option value="all">All Types</option>
              {carTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="cars-filter">
            <label className="cars-filter-label">Sort By</label>
            <select
              className="cars-filter-select"
              value={carFilters.sort}
              onChange={(e) => setCarFilters({...carFilters, sort: e.target.value})}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="cars-grid">
          {filteredCars.length === 0 ? (
            <div className="no-cars-found">
              <div className="no-cars-icon">🚫</div>
              <p className="no-cars-text">No vehicles match your filters</p>
            </div>
          ) : (
            filteredCars.map((car) => (
              <div key={car._id} className="car-card">
                <div className="car-image-container">
                  <img
                    src={car.images?.[0] || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={car.model}
                    className="car-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x250?text=Error";
                    }}
                  />
                  <div className="car-price-tag">Rs. {car.rentPerDay || car.price}/day</div>
                </div>

                <div className="car-details">
                  <h4 className="car-name">{car.name}</h4>
                  <p className="car-model">{car.model}</p>

                  <div className="specs-grid">
                    <div className="spec-item">
                      <span className="spec-label">Fuel:</span>
                      <span>{car.fuelAverage} km/L</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">AC:</span>
                      <span>{car.airConditioned ? "Yes" : "No"}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Seats:</span>
                      <span>{car.seatingCapacity || "-"}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Type:</span>
                      <span>{car.type || "-"}</span>
                    </div>
                  </div>

                  <div className="button-group">
                    <button
                      onClick={() => handleEditCar(car._id)}
                      className="edit-button"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="delete-button"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bookings Section */}
      <div className="vip-booking-section">
        <div className="vip-booking-header">
          <div className="vip-booking-icon">📅</div>
          <h3 className="vip-booking-title">VIP Bookings Management</h3>
        </div>

        <div className="vip-booking-filters">
          <div className="vip-booking-filter">
            <label className="vip-booking-filter-label">Status</label>
            <select
              className="vip-booking-filter-select"
              value={bookingFilters.status}
              onChange={(e) => setBookingFilters({...bookingFilters, status: e.target.value})}
            >
              <option value="all">All Bookings</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="vip-booking-filter">
            <label className="vip-booking-filter-label">Sort By</label>
            <select
              className="vip-booking-filter-select"
              value={bookingFilters.sort}
              onChange={(e) => setBookingFilters({...bookingFilters, sort: e.target.value})}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="vip-no-bookings">
            <div className="vip-no-bookings-icon">📭</div>
            <p className="vip-no-bookings-text">No bookings match your filters</p>
          </div>
        ) : (
          <div className="vip-bookings-grid">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="vip-booking-card">
                <div className="vip-booking-card-header">
                  <div>
                    <h4 className="vip-booking-card-title">
                      {booking.car?.name || "Car Deleted"}
                      <span className="vip-booking-card-id">#{booking._id.slice(-6)}</span>
                    </h4>
                  </div>
                  <div className={`vip-booking-status ${
                    booking.paymentStatus === "paid" 
                      ? "vip-booking-status-paid" 
                      : booking.paymentStatus === "cancelled" 
                        ? "vip-booking-status-cancelled" 
                        : "vip-booking-status-pending"
                  }`}>
                    {booking.paymentStatus.toUpperCase()}
                  </div>
                </div>

                <div className="vip-booking-content">
                  <div className="vip-booking-image-container">
                    <img
                      src={booking.car?.images?.[0] || "https://via.placeholder.com/400x250?text=VIP+Car"}
                      alt={booking.car?.name || "Car"}
                      className="vip-booking-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x250?text=Not+Found";
                      }}
                    />
                  </div>

                  <div className="vip-booking-details">
                    <div className="vip-booking-detail">
                      <span className="vip-booking-detail-label">Customer</span>
                      <span className="vip-booking-detail-value">{booking.name}</span>
                    </div>
                    <div className="vip-booking-detail">
                      <span className="vip-booking-detail-label">Contact</span>
                      <span className="vip-booking-detail-value">{booking.number}</span>
                    </div>
                    <div className="vip-booking-detail">
                      <span className="vip-booking-detail-label">Dates</span>
                      <span className="vip-booking-detail-value">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="vip-booking-detail">
                      <span className="vip-booking-detail-label">Duration</span>
                      <span className="vip-booking-detail-value">{booking.days} days</span>
                    </div>
                    <div className="vip-booking-detail">
                      <span className="vip-booking-detail-label">Rate</span>
                      <span className="vip-booking-detail-value">
                        Rs. {booking.car?.rentPerDay || booking.car?.price || 0}/day
                      </span>
                    </div>
                    <div className="vip-booking-detail">
                      <span className="vip-booking-detail-label">Total</span>
                      <span className="vip-booking-detail-value vip-booking-total">
                        Rs. {booking.days * (booking.car?.rentPerDay || booking.car?.price || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="vip-booking-actions">
                  <button className="vip-booking-action-btn vip-booking-view-btn">
                    View Details
                  </button>
                  {booking.paymentStatus !== "cancelled" && (
                    <button
                      className="vip-booking-action-btn vip-booking-cancel-btn"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      {booking.paymentStatus === "paid" ? "Refund" : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;