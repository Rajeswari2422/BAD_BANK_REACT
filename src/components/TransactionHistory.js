import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./styles/transactionHistory.css";

const TransactionHistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch transaction history from localStorage
    const storedHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/deposit">Deposit</Link>
          <Link to="/withdraw">Withdraw</Link>
          <Link to="/">Logout</Link>
        </div>
      </div>
      <div className="transaction-history-page">
        <div className="content">
          <h2>Transaction History</h2>
          {history.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                   
                    <th>Date & Time</th>
                    <th>Type</th>
                    <th>Amount (₹)</th>
                    <th>Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((transaction, index) => (
                    <tr key={index}>
                     
                      <td>{transaction.date}</td>
                      <td>{transaction.type}</td>
                      <td>₹{transaction.amount.toLocaleString()}</td>
                      <td>₹{transaction.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No transactions found</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TransactionHistoryPage;