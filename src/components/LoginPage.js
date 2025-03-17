import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import "./styles/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (storedUser.email.trim() === email.trim() && storedUser.password === password) {
      alert("Login successful!");
      sessionStorage.setItem("loggedInUser", storedUser.email); // Store logged-in user's email
      navigate("/dashboard");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/adminlogin">Admin</Link>
        </div>
      </div>
      <div className="login-page">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;