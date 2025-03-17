import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Adjust the path as needed
import Footer1 from "./Footer"; // Adjust the path as needed
import "./styles/styles.css"; // Ensure the CSS file is imported
import logo from "./logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (<>
    <div className="logo">
      
          <img src={logo} alt="Logo" className="logo" />
      </div>
    <div className="home-page">
      <Header />
      <div className="buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <Footer1 />
    </div></>
  );
};

export default HomePage;
