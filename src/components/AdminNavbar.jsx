// src/components/AdminNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; // ✅ adjust path if needed
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login"); // ✅ redirect to admin login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* ✅ Top Navbar */}
      <nav className="admin-navbar">
        <h2 className="admin-logo">Admin Panel</h2>
        <ul className="admin-links">
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/categories">Categories</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* ✅ Mobile Footer Navigation */}
      <div className="admin-footer">
        <Link to="/admin/dashboard">
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/categories">
          <i className="fas fa-list"></i>
          <span>Categories</span>
        </Link>
        <Link to="/admin/products">
          <i className="fas fa-box"></i>
          <span>Products</span>
        </Link>
        <button className="footer-logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
