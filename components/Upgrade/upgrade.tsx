"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import "./upgrade.css";

const plans = [
  { name: "Free Plan", price: "Free", description: "1 attempt for 1 day." },
  { name: "Basic Plan", price: "Rs 800", description: "50 attempts per month with a daily limit of 3" },
  { name: "Pro Plan", price: "Rs 1,200", description: "100 attempts per month with a daily limit of 5" },
];

const Upgrade: React.FC = () => {
  const router = useRouter();

  const handlePurchase = (plan: string, price: string) => {
    if (plan === "Free Plan") {
      // Redirect to the home page for Free Plan
      router.push("/");
    } else {
      // Redirect to the payment page for Basic and Pro Plans
      router.push("/payment");
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
            initial={{ opacity: 0, translateY: 20 }} // Initial state for animation
            animate={{ opacity: 1, translateY: 0 }} // Animate to these values
            transition={{ duration: 0.3 }} // Animation duration
            whileHover={{ scale: 1.05 }} // Scale effect on hover
          >
            <h2 className="plan-title">{plan.name}</h2>
            <p className="plan-price">{plan.price}</p>
            <p className="plan-description">{plan.description}</p>
            <button className="plan-button" onClick={() => handlePurchase(plan.name, plan.price)}>
              Select Plan
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
