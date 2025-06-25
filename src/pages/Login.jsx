import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try { const response = await axios.post('https://car-rental-backend-1-6buw.onrender.com/api/users/login', {
     
        email,
        password,
      });

      const user = response.data?.user;

      if (response.data.success && user && user._id) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        onLogin();
        navigate('/cars');
      } else {
        alert(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1 className="login-title">
            ALMADINA <span className="vip-text">Car</span> RENTALS
          </h1>
          <p className="login-subtitle">Premium Vehicle Experience</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <span className="input-icon">✉️</span>
          </div>

          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <span className="input-icon">🔒</span>
            <span
              className={`password-toggle ${showPassword ? 'visible' : ''}`}
              onClick={togglePasswordVisibility}
            >
              👁
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'LOGIN'}
          </button>

          <div className="login-divider">
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </div>

          <Link to="/signup" className="signup-link">
            Create Account!
            <span className="arrow-icon">→</span>
          </Link>
        </div>

        <div className="login-footer">
          <p>Exclusive Member Access Only</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
