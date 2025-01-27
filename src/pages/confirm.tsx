"use client"; // Ensure this is a client component

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Confirm: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query; // Get the token from query parameters

    if (token) {
      // Make a request to your API to confirm the email
      const confirmEmail = async () => {
        const response = await fetch(`/api/confirm?token=${token}`, {
          method: 'POST',
        });

        if (response.ok) {
          toast.success('Email confirmed successfully! You can now log in.');
          // Redirect to the login page after confirmation
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          const error = await response.json();
          toast.error(error.message || 'Confirmation failed. Please try again.');
        }
      };

      confirmEmail();
    }
  }, [router]);

  return (
    <div>
      <ToastContainer position="top-right" />
      <h1>Confirming your email...</h1>
    </div>
  );
};

export default Confirm;
