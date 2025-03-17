import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import "./styles/withdrawal.css";

const WithdrawalPage = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const loggedInUser = sessionStorage.getItem("loggedInUser");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === loggedInUser) {
      setBalance(storedUser.balance || 0);
    }
  }, [loggedInUser]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWithdrawal = () => {
    const withdrawalAmount = Number(amount);
    if (withdrawalAmount <= 0) {
      alert("Please enter a positive amount");
    } else if (withdrawalAmount > balance) {
      alert("Insufficient balance");
    } else if (withdrawalAmount > 100000) {
      alert("Amount exceeds the limit of ₹100000");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === loggedInUser) {
        const newBalance = (storedUser.balance || 0) - withdrawalAmount;
        storedUser.balance = newBalance;

        // Add transaction to history
        const transaction = {
          phone: storedUser.mobile,
          amount: withdrawalAmount,
          type: "Withdrawal",
          balance: newBalance,
          date: new Date().toLocaleString(),
        };
        const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
        history.push(transaction);
        localStorage.setItem("transactionHistory", JSON.stringify(history));

        localStorage.setItem("user", JSON.stringify(storedUser));
        setBalance(newBalance);
        alert(`Withdrawn ₹${withdrawalAmount}`);
        setAmount("");
      }
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/deposit">Deposit</Link>
          <Link to="/">Logout</Link>
        </div>
      </div>
      <div className="withdrawal-page">
        <div className="content">
          <h2>Withdraw</h2>
          <p>Current Balance: ₹{balance}</p>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <button onClick={handleWithdrawal}>Submit</button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WithdrawalPage;
