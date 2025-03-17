import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import "./styles/deposit.css";

const DepositPage = () => {
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

  const handleDeposit = () => {
    const depositAmount = Number(amount);

    if (depositAmount <= 0) {
      alert("Please enter a valid amount greater than 0");
    } else if (depositAmount > 100000) {
      alert("Amount exceeds the limit of ₹100000");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === loggedInUser) {
        const newBalance = (storedUser.balance || 0) + depositAmount;
        storedUser.balance = newBalance;

        // Add transaction to history
        const transaction = {
          phone: storedUser.mobile,
          amount: depositAmount,
          type: "Deposit",
          balance: newBalance,
          date: new Date().toLocaleString(),
        };
        const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
        history.push(transaction);
        localStorage.setItem("transactionHistory", JSON.stringify(history));

        localStorage.setItem("user", JSON.stringify(storedUser));
        setBalance(newBalance);
        alert(`Deposited ₹${depositAmount}`);
        setAmount("");
      }
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/deposit">Deposit</Link>
          <Link to="/withdraw">Withdraw</Link>
          <Link to="/">Logout</Link>
        </div>
      </div>
      <div className="deposit-page">
        <div className="content">
          <h2>Deposit</h2>
          <p>Current Balance: ₹{balance}</p>
          <input
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <button onClick={handleDeposit} disabled={!amount || Number(amount) <= 0}>
            Submit
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DepositPage;
