import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Secure credential check (in production, use proper authentication)
      if (email === "admin@almadina.com" && password === "Admin@1234!") {
        toast.success("🛡️ Admin Access Granted");
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("⚠️ Unauthorized Access Attempt");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1 className="admin-login-title">
            ALMADINA <span className="vip-text">ADMIN</span> PORTAL
          </h1>
          <p className="admin-login-subtitle">Restricted Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-login-input"
              required
            />
            <span className="input-icon">🛡️</span>
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Security Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login-input"
              required
            />
            <span className="input-icon">🔑</span>
            <span 
              className={`password-toggle ${showPassword ? 'visible' : ''}`}
              onClick={togglePasswordVisibility}
            >
              👁
            </span>
          </div>

          <button 
            type="submit" 
            className="admin-login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying Identity...' : 'AUTHENTICATE'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>For authorized personnel only. All access is monitored.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;