import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('https://c8e59ba2-bc33-4837-9759-b23d43a1dc76-00-2410258q572b7.sisko.replit.dev/api/users/signup', {
        name,
        email,
        password,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success('✅ VIP Account Created!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(res.data?.message || '❌ Signup Failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error(err.response?.data?.message || '❌ Server Error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="signup-box">
        <div className="signup-header">
          <h1 className="signup-title">
            ALMADINA <span className="vip-text">Car</span> CLUB
          </h1>
          <p className="signup-subtitle">New Member Registration</p>
        </div>

        <div className="signup-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-input"
              required
            />
            <span className="input-icon">👤</span>
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
            <span className="input-icon">✉️</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
            />
            <span className="input-icon">🔒</span>
          </div>

          <button
            onClick={handleSignup}
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating VIP Account...' : 'Signup'}
          </button>

          <div className="signup-divider">
            <span className="divider-line"></span>
            <span className="divider-text">EXISTING MEMBER</span>
            <span className="divider-line"></span>
          </div>

          <Link to="/login" className="login-link">
            Already have account!
            <span className="arrow-icon">→</span>
          </Link>
        </div>

        <div className="signup-footer">
          <p>By joining, you agree to our VIP Terms</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
