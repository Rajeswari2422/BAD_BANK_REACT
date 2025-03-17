import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import "./styles/signUp.css";

const SignUpPage = () => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    password: "",
    balance: 0, // Initialize balance to 0
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validate = {
    email: (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
    password: (v) =>
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v),
    name: (v) => /^[A-Za-z\s'-]+$/.test(v),
    mobile: (v) => /^\d{10}$/.test(v),
    fullName: (firstName, lastName) => {
      return validate.name(firstName) && validate.name(lastName);
    },
  };

  const handleSubmit = () => {
    const newErrors = {};

    // Validate full name
    if (!validate.fullName(form.firstName, form.lastName)) {
      newErrors.firstName = "First name cannot contain numbers";
      newErrors.lastName = "Last name cannot contain numbers";
    }

    if (!form.gender) newErrors.gender = "Please select gender";
    if (!validate.mobile(form.mobile)) newErrors.mobile = "Mobile number must be exactly 10 digits";
    if (!validate.email(form.email)) newErrors.email = "Invalid email address";
    if (!validate.password(form.password)) newErrors.password = "Password must contain 8 characters with upper, lower, and special characters";

    if (Object.keys(newErrors).length) return setErrors(newErrors);

    // Check existing user
    const existing = JSON.parse(localStorage.getItem("user"));
    if (existing?.email === form.email) {
      return setErrors({ general: "Email already exists" });
    }

    // Save user data and clear form data
    localStorage.setItem("user", JSON.stringify(form));
    setForm(initialFormState);
    setErrors({});
    setSuccess("Registration successful!");

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <div className="signup-page">
        <div className="signup-content">
          <h2>Create Account</h2>
          <div className="input-field">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div className="input-field">
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className={errors.gender ? "error-border" : ""}
            >
              <option value="">Select Gender</option>
              {["Male", "Female", "Others"].map((opt) => (
                <option key={opt} value={opt.toLowerCase()}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button className="signup-button" onClick={handleSubmit}>
            Create Account
          </button>
          {errors.general && <p className="error general-error">{errors.general}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SignUpPage;