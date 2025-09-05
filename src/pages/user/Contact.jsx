// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar"; // ✅ Import Navbar
import "./Contact.css";

const Contact = () => {
  const [info, setInfo] = useState({ contactInfo: "" });

  useEffect(() => {
    const fetchInfo = async () => {
      const snap = await getDoc(doc(db, "websiteContent", "main"));
      if (snap.exists()) setInfo(snap.data());
    };
    fetchInfo();
  }, []);

  return (
    <div className="contact-container">
      <Navbar /> {/* ✅ Add Navbar here */}

      <h2 className="glow-heading">Contact Us</h2>

      <p className="contact-info">
        {info.contactInfo ||
          "For luxury wooden interiors, collaborations, and product inquiries, please contact us directly."}
      </p>

      <div className="contact-box">
        <h3 className="glow-subheading">Official Contact</h3>
        <p className="email-display">📧 simpleboyvenkyaa@gmail.com</p>

        <p className="note">
          👉 Use this email if you want to:  
          <br /> • Buy our premium wooden products  
          <br /> • Request to include your products on our website  
          <br /> • Contact us for admin privileges
        </p>
      </div>
    </div>
  );
};

export default Contact;
