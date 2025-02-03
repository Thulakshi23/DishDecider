"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./upgrade.css";

const plans = [
  { name: " Free Plan", price: "Free", description: "1 attempts for 1 day." },
  { name: "Basic Plan", price: "Rs 800", description: "50 attempts per month with a daily limit 3" },
  { name: "Pro Plan", price: "Rs 1,200", description: "100 attempts per month with a daily limit 5" },
];

const Payment: React.FC = () => {
  const router = useRouter();

  const handlePurchase = (plan: string, price: string) => {
    router.push(`/paid?plan=${encodeURIComponent(plan)}&price=${encodeURIComponent(price)}`);
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Choose Your Plan</h1>
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            <h2 className="plan-title">{plan.name}</h2>
            <p className="plan-price">{plan.price}</p>
            <p className="plan-description">{plan.description}</p>
            <button className="plan-button" onClick={() => handlePurchase(plan.name, plan.price)}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
