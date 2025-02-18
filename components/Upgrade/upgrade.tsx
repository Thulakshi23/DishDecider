"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "./upgrade.css";

// Example user ID (replace this with your actual user ID logic)
const userId = "USER_ID_HERE"; // Replace this with the actual user ID

const plans = [
  { name: "Free Plan", price: "Free", description: "1 attempt for 1 day." },
  { name: "Basic Plan", price: "Rs 800", description: "50 attempts per month with a daily limit of 3" },
  { name: "Pro Plan", price: "Rs 1,200", description: "100 attempts per month with a daily limit of 5" },
];

const Upgrade: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (plan: string, price: string) => {
    if (plan === "Free Plan") {
      router.push("/");
    } else {
      setLoading(true);
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, plan, price }), // Send user ID along with plan and price
        });

        const data = await response.json();
        if (data.url) {
          window.location.href = data.url; // Redirect to Stripe Checkout
        } else {
          alert("Payment failed!");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Choose Your Plan</h1>
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="plan-card"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="plan-title">{plan.name}</h2>
            <p className="plan-price">{plan.price}</p>
            <p className="plan-description">{plan.description}</p>
            <button
              className="plan-button"
              onClick={() => handlePurchase(plan.name, plan.price)}
              disabled={loading}
            >
              {loading ? "Processing..." : "Select Plan"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
