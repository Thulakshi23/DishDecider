"use client";
import { useRouter } from "next/navigation";
import React from "react";
import "./index.css";

const Cancel = () => {
  const router = useRouter();

  return (
    <div className="cancel-container">
      <h1>Payment Canceled ❌</h1>
      <p>Your payment was not completed.</p>
      <button onClick={() => router.push("/upgrade")}>Try Again</button>
    </div>
  );
};

export default Cancel;
