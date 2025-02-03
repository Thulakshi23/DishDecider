"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import "./payment.css"; // Import CSS file

const Paid: React.FC = () => {
  const searchParams = useSearchParams();
  const plan = searchParams ? searchParams.get("plan") : "Basic Plan"; // Default to Basic Plan
  const price = searchParams ? searchParams.get("price") : "0"; // Default price
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="paid-container">
      <h1 className="paid-title">Payment for {plan}</h1>
      <p className="paid-price">Amount: ${price}</p>
      <p className="paid-description">Choose your payment method below:</p>

      <div className="payment-options">
        <button className="payment-button" onClick={() => setSelectedMethod("card")}>
          💳 Pay with Card
        </button>
        <button className="payment-button" onClick={() => setSelectedMethod("bank")}>
          🏦 Pay with Bank Transfer
        </button>
      </div>

      {selectedMethod === "card" && (
        <div className="payment-details">
          <h2>💳 Card Payment</h2>
          <p>Enter your card details to proceed with the payment.</p>
          <input type="text" placeholder="Card Number" />
          <input type="text" placeholder="CVC" />
          <input type="text" placeholder="Card Holder Name" />
          <button className="confirm-button">Confirm Payment</button>
        </div>
      )}

      {selectedMethod === "bank" && (
        <div className="payment-details">
          <h2>🏦 Bank Transfer</h2>
          <p>Use the following details to complete your bank transfer:</p>
          <p><strong>Account Name:</strong> Dish Decider Inc.</p>
          <p><strong>Account Number:</strong> 123456789</p>
          <p><strong>Bank Name:</strong> ABC Bank</p>
          <button className="confirm-button">I have transferred</button>
        </div>
      )}
    </div>
  );
};

export default Paid;
