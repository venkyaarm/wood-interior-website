import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to Wood Interiors</h1>
        <p className="landing-subtitle">Please choose your role</p>

        <div className="landing-buttons">
          <button className="landing-btn" onClick={() => navigate("/login")}>
            User
          </button>
          <button className="landing-btn" onClick={() => navigate("/admin")}>
            Admin
          </button>
        </div>
      </div>

      <p className="landing-footer">
        © 2025 Wood Interiors. All Rights Reserved.
      </p>
    </div>
  );
}
