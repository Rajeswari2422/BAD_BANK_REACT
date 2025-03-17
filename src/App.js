import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import DepositPage from "./components/DepositPage";
import WithdrawalPage from "./components/WithdrawalPage";
import AdminLoginPage from "./components/adminlogin";
import AdminPage from "./components/admin";
import Transaction from './components/TransactionHistory'



const App = () => {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/withdraw" element={<WithdrawalPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
};

export default App;