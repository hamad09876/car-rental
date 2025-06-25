import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Cars.css";

const Cars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [bookedCarNames, setBookedCarNames] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, bookingsRes] = await Promise.all([
          axios.get("https://car-rental-backend-1-6buw.onrender.com/api/cars"),
          axios.get("https://car-rental-backend-1-6buw.onrender.com/api/bookings"),
        ]);

        setCars(carsRes.data);
        setAllCars(carsRes.data);

        const bookedNames = bookingsRes.data
          .map((b) => b.car?.name)
          .filter(Boolean);
        setBookedCarNames(bookedNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const applyFilters = () => {
    let filtered = [...allCars];
    
    // Price range filter
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;
    filtered = filtered.filter(car => {
      const price = Number(car.rentPerDay || 0);
      return price >= min && price <= max;
    });
    
    // Search by name filter
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sorting
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => (a.rentPerDay || 0) - (b.rentPerDay || 0));
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => (b.rentPerDay || 0) - (a.rentPerDay || 0));
    }
    
    setCars(filtered);
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSearchTerm("");
    setSortOrder("");
    setCars(allCars);
  };

  useEffect(() => {
    applyFilters();
  }, [minPrice, maxPrice, searchTerm, sortOrder]);

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
          <button onClick={handleLogout} className="vip-logout-btn">
            <span className="vip-icon">🚪</span> LOGOUT
          </button>
        </div>
      </header>

      <section className="vip-filter-section">
        <div className="vip-filter-container">
          <div className="vip-filter-group">
            <label className="vip-filter-label">MIN PRICE</label>
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
            <label className="vip-filter-label">MAX PRICE</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="vip-filter-input"
              placeholder="No limit"
              min="0"
            />
          </div>

          <div className="vip-filter-group">
            <label className="vip-filter-label">SORT BY</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="vip-filter-input"
            >
              <option value="">Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          <div className="vip-filter-group">
            <label className="vip-filter-label">SEARCH</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="vip-filter-input"
              placeholder="Car name..."
            />
          </div>

          <button onClick={resetFilters} className="vip-reset-btn">
            RESET FILTERS
          </button>
        </div>
      </section>

      <main className="vip-cars-grid">
        {cars.length > 0 ? (
          cars.map((car) => {
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
          })
        ) : (
          <div className="vip-no-results">
            <p>No cars match your filters. Please try different criteria.</p>
          </div>
        )}
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