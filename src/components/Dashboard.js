import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import Footer1 from "./Footer"; // Adjust the path as needed
import logo from './logo.png'; // Import your logo here
import "./styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/deposit">Deposit</Link>
          <Link to="/withdraw">Withdraw</Link>
          <Link to="/transaction">History</Link>
          <Link to="/">logout</Link>
        </div>
      </div>
      <div className="dashboard-page">
        <div className="content">
          <h2>Dashboard</h2>
          <button onClick={() => navigate("/deposit")}>Deposit</button>
          <button onClick={() => navigate("/withdraw")}>Withdraw</button>
        </div>
        <Footer1 />
      </div>
    </div>
  );
};

export default Dashboard;
