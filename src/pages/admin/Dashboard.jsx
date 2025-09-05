import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Import the custom CSS

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">✨ Admin Dashboard ✨</h1>
        <p className="dashboard-subtitle">Manage your website content with ease</p>
      </header>

      <main className="dashboard-links">
        <Link to="/admin/categories" className="dashboard-btn">
          Manage Categories
        </Link>
	 <Link to="/admin/products" className="dashboard-btn">
          Manage Products
        </Link>
      </main>

      <footer className="dashboard-footer">
        <p>© 2025 Wood Interiors | All Rights Reserved</p>
      </footer>
    </div>
  );
}
