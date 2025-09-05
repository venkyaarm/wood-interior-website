// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation
import "./Home.css"; // custom styling

const Home = () => {
  const [content, setContent] = useState({ homeText: "", latestHighlight: "" });
  const navigate = useNavigate(); // ✅ Hook for navigation

  useEffect(() => {
    const fetchContent = async () => {
      const snap = await getDoc(doc(db, "websiteContent", "main"));
      if (snap.exists()) setContent(snap.data());
    };
    fetchContent();
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <h1 className="glow-text">Welcome to Wood Interiors</h1>
        <p className="hero-text">
          {content.homeText || "We design luxury wooden interiors with elegance and perfection."}
        </p>
        {/* ✅ Navigate to Products on click */}
        <button 
          className="glow-button" 
          onClick={() => navigate("/products")}
        >
          Explore More
        </button>
      </section>

      {/* Highlight Section */}
      <section className="highlight">
        <h2 className="glow-text">✨ Latest Highlight ✨</h2>
        <p className="highlight-text">
          {content.latestHighlight || "Premium handcrafted furniture collection now available."}
        </p>
      </section>

      {/* About Section */}
      <section className="about">
        <h2 className="glow-text">About Us</h2>
        <p>
          At <b>Wood Interiors</b>, we craft luxury furniture and interiors that 
          bring timeless elegance into your home. Our designs blend tradition with 
          modern luxury for a truly premium experience.
        </p>
      </section>
    </div>
  );
};

export default Home;
