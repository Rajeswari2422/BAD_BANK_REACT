import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/admin.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsers([storedUser]);
    }

    // Retrieve transaction history from localStorage
    const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    setTransactions(transactionHistory);
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Logout</Link>
        </div>
      </div>
      <div className="admin-page">
        <div className="content">
          <h2>Admin Dashboard</h2>

          {/* User Details Table */}
          <h3>User Details</h3>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Current Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.mobile}</td>
                  <td>{user.email}</td>
                  <td>₹{user.balance || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Transaction History Table */}
          <h3>Transaction History</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th>Balance After Transaction</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{users[0]?.firstName} {users[0]?.lastName}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>₹{transaction.amount}</td>
                  <td>₹{transaction.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;