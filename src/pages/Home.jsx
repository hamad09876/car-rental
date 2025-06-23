import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

const Home = () => (
  <div className="vip-home-container">
    {/* Admin Portal Button in Top Right Corner */}
    <Link to="/admin-login" className="admin-portal-corner">
      <span className="button-icon">🔐</span>
      ADMIN PORTAL
    </Link>

    <div className="vip-content">
      <h1 className="vip-heading">ALMADINA <span className="vip-highlight">VIP</span> RENTALS</h1>
      <p className="vip-subtitle">Premium Vehicle Experience</p>
      
      <div className="vip-buttons">
        <Link to="/login" className="vip-button client-login">
          <span className="button-icon">🚗</span>
          CLIENT PORTAL
        </Link>
      </div>
      
      <div className="vip-features">
        <div className="feature-card">
          <span className="feature-icon">⭐</span>
          <p>Luxury Fleet</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🏆</span>
          <p>VIP Service</p>
        </div>
        <div className="feature-card">
          <a 
            href="https://wa.me/923088487789?text=Assalamualaikum%20Sir%2C%20I%20need%20help" 
            className="support-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="feature-icon">🔑</span>
            <p>24/7 Support</p>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Home;