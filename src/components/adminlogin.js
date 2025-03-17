import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
// import "./styles/adminlogin.css"; // Import your styles

const AdminLoginPage = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  const handleAdminLogin = () => {
    const adminCredentials = {
      email: "admin@gmail.com", // Replace with your admin email
      password: "Admin@1234", // Replace with your admin password
    };

    if (adminEmail === adminCredentials.email && adminPassword === adminCredentials.password) {
      navigate("/admin"); // Redirect to admin page
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <div>
      {/* Add the Navbar */}
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Home</Link>
        </div>
      </div>

      {/* Admin Login Form */}
      <div className="admin-login-page">
        <h2>Admin Login</h2>
        <div className="input-field">
          <input
            type="text"
            placeholder="Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleAdminLogin}>
          Login as Admin
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLoginPage;