import React, { useState } from "react";
import { motion } from "framer-motion";
import "./contact.css";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { toast } from "react-toastify";

const ContactUs: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !phone || !message) {
      toast.error("All fields are required ");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! ✅");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        toast.error("Failed to send message. Please try again later. ❌");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later. ");
    }
  };

  return (
    <div
      id="contact-us-page"
      className="contact-us-page"
      style={{
        // backgroundImage: `url('https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622733/Backround3_m2rxq9.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="contact-box">
        <motion.h1
          className="heading"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>

        <motion.form
          className="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="contact-name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="contact-name"
            name="contact-name"
            required
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="contact-email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="contact-email"
            name="contact-email"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="contact-phone" className="label">
            Phone:
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="contact-phone"
            required
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="contact-message" className="label">
            Message:
          </label>
          <textarea
            id="contact-message"
            name="contact-message"
            required
            className="input textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Enter your question or message here..."
          ></textarea>

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
