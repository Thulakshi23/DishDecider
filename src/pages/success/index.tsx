"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "./index.css";


const Success = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <div className="success-container">
      <h1>Payment Successful 🎉</h1>
      <p>Thank you for your subscription!</p>
      <p>Redirecting to homepage...</p>
    </div>
  );
};

export default Success;
