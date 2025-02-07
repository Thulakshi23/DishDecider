"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion
import "./payment.css"; // Import CSS file

const Paid: React.FC = () => {
  const searchParams = useSearchParams();
  const plan = searchParams ? searchParams.get("plan") : "Basic Plan"; // Default plan
  const price = searchParams ? searchParams.get("price") : "0"; // Default price
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>(""); // Expiration date as a single string
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean | null>(null);

  const handlePayment = () => {
    // Simulate payment processing
    if (selectedMethod === "card") {
      // Here you would normally call your payment API
      // For demonstration, we're just simulating success
      if (cardNumber && cvc && cardHolderName && expirationDate) {
        setIsPaymentSuccessful(true);
      } else {
        setIsPaymentSuccessful(false);
      }
    }
  };

  return (
    <div className="payment-wrapper">
      <motion.div 
        className="paid-container"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="paid-title">Payment for {plan}</h1>
        <p className="paid-price">Amount: Rs{price}</p>
        <p className="paid-description">Choose your payment method below:</p>

        <div className="payment-options">
          <motion.button 
            className={`payment-button ${selectedMethod === "card" ? "active" : ""}`} 
            onClick={() => setSelectedMethod(selectedMethod === "card" ? null : "card")}
            whileHover={{ scale: 1.05 }} // Scale effect on hover
            whileTap={{ scale: 0.95 }} // Scale down effect on tap
          >
            💳 Pay with Card
          </motion.button>

          <motion.button 
            className={`payment-button ${selectedMethod === "bank" ? "active" : ""}`} 
            onClick={() => setSelectedMethod(selectedMethod === "bank" ? null : "bank")}
            whileHover={{ scale: 1.05 }} // Scale effect on hover
            whileTap={{ scale: 0.95 }} // Scale down effect on tap
          >
            🏦 Pay with Bank Transfer
          </motion.button>
        </div>

        {/* Show Card Payment Form when "Pay with Card" is clicked */}
        {selectedMethod === "card" && (
          <motion.div 
            className="payment-container"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <h2 className="visa-logo">
              <span className="logo-text">VISA</span>
            </h2>
            <div className="form-group">
              <label>Card Number</label>
              <input 
                type="text" 
                placeholder="7419 9412 5910 9218" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)} 
              />
              <label>CVC</label>
              <input 
                type="text" 
                placeholder="253" 
                value={cvc} 
                onChange={(e) => setCvc(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Card Holder Name</label>
              <input 
                type="text" 
                placeholder="Hari Kumar" 
                value={cardHolderName} 
                onChange={(e) => setCardHolderName(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Expiration Date</label>
              <input 
                type="text" 
                placeholder="MM/YY" 
                value={expirationDate} 
                onChange={(e) => setExpirationDate(e.target.value)} 
              />
            </div>
            <motion.button 
              className="complete-order" 
              onClick={handlePayment}
              whileHover={{ scale: 1.05 }} // Scale effect on hover
              whileTap={{ scale: 0.95 }} // Scale down effect on tap
            >
              COMPLETE ORDER (TOTAL ${price})
            </motion.button>

            {isPaymentSuccessful !== null && (
              <motion.div 
                className={`payment-feedback ${isPaymentSuccessful ? 'success' : 'error'}`}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
              >
                {isPaymentSuccessful ? "Payment successful!" : "Payment failed! Please check your details."}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Show Bank Transfer details when "Pay with Bank Transfer" is clicked */}
        {selectedMethod === "bank" && (
          <motion.div 
            className="payment-details"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <h2>🏦 Bank Transfer</h2>
            <p>Use the following details to complete your bank transfer:</p>
            <p><strong>Account Name:</strong> Dish Decider Inc.</p>
            <p><strong>Account Number:</strong> 123456789</p>
            <p><strong>Bank Name:</strong> BOC Bank</p>
            <motion.button className="confirm-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              I have transferred
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Paid;
