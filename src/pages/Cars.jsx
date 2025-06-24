import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Cars.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [bookedCarNames, setBookedCarNames] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, bookingsRes] = await Promise.all([
          axios.get("https://c8e59ba2-bc33-4837-9759-b23d43a1dc76-00-2410258q572b7.sisko.replit.dev/api/cars"),
          axios.get("https://c8e59ba2-bc33-4837-9759-b23d43a1dc76-00-2410258q572b7.sisko.replit.dev/api/bookings"),
        ]);

        setCars(carsRes.data);

        // Get booked car names
        const bookedNames = bookingsRes.data
          .map((b) => b.car?.name)
          .filter(Boolean);

        setBookedCarNames(bookedNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };ttp://localhost:5000/api/cars

    fetchData();
  }, []);

  const handleFilter = async () => {
    try {
      const res = await axios.get("h");
      const min = Number(minPrice) || 0;
      const max = Number(maxPrice) || Infinity;

      const filtered = res.data.filter((car) => {
        const price = Number(car.rentPerDay || 0);
        return price >= min && price <= max;
      });

      setCars(filtered);
    } catch (err) {
      console.error("Error filtering cars:", err);
    }
  };

  if (loading) {
    return <div className="loading-screen">Loading VIP Cars...</div>;
  }

  return (
    <div className="vip-container">
      <header className="vip-header">
        <div className="vip-header-content">
          <h1 className="vip-title">
            <span className="vip-highlight">ALMADINA</span> EXCLUSIVE CARS
          </h1>
          <p className="vip-subtitle">Premium Vehicle Rental Experience</p>
        </div>
        <div className="vip-actions">
          <Link to="/my-bookings" className="vip-bookings-btn">
            <span className="vip-icon">📋</span> MY BOOKINGS
          </Link>
        </div>
      </header>

      <section className="vip-filter-section">
        <div className="vip-filter-container">
          <div className="vip-filter-group">
            <label className="vip-filter-label">MIN RENT</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="vip-filter-input"
              placeholder="0"
              min="0"
            />
          </div>

          <div className="vip-filter-group">
            <label className="vip-filter-label">MAX RENT</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="vip-filter-input"
              placeholder="No limit"
              min="0"
            />
          </div>

          <button onClick={handleFilter} className="vip-filter-btn">
            SEARCH CARS
          </button>
        </div>
      </section>

      <main className="vip-cars-grid">
        {cars.map((car) => {
          const isBooked = bookedCarNames.includes(car.name);

          return (
            <article key={car._id} className={`vip-car-card ${isBooked ? "booked" : ""}`}>
              {isBooked && <div className="vip-booked-badge">RESERVED</div>}

              <div className="vip-car-image-container">
                <img
                  src={car.images?.[0] || "https://via.placeholder.com/600x400?text=VIP+Car"}
                  alt={car.name}
                  className="vip-car-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400?text=VIP+Car";
                  }}
                />
                <div className="vip-car-overlay">
                  <span className="vip-car-price">{car.rentPerDay} PKR/day</span>
                </div>
              </div>

              <div className="vip-car-details">
                <h3 className="vip-car-name">{car.name}</h3>
                <p className="vip-car-model">{car.model}</p>
                <div className="vip-car-specs">
                  <span className="vip-car-spec">{car.fuelAverage || "--"} km/l</span>
                  <span className="vip-car-spec">
                    {car.airConditioned ? "AC" : "No AC"}
                  </span>
                  <span className="vip-car-spec">
                    {car.seatingCapacity || "--"} seats
                  </span>
                </div>

                {isBooked ? (
                  <button className="vip-view-btn reserved" disabled>
                    BOOKED
                  </button>
                ) : (
                  <Link to={`/cars/${car._id}`} className="vip-view-btn">
                    VIEW DETAILS
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </main>

      <footer className="vip-footer">
        <p>© 2025 ALMADINA VIP CARS - PREMIUM RENTAL SERVICES</p>
        <div className="vip-social-links">
          <span>Follow us:</span>
          <a href="https://www.instagram.com/hamad_hanif098?igsh=MWdwd3Byd3dxZ252ZQ==" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.facebook.com/share/1CzfJPuYiq/" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://x.com/HamadHanif56880?t=3gJAlmkpkKMFboKP4TIeOg&s=09" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Cars;