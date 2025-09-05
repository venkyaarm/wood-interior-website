// src/pages/admin/Categories.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AdminNavbar from "../../components/AdminNavbar";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  // Get currently logged-in admin
  const auth = getAuth();
  const currentAdmin = auth.currentUser; // has uid, email, etc.

  // Fetch categories created by this admin only
  const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "categories"));
      const allCategories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const adminCategories = allCategories.filter(cat => cat.adminId === currentAdmin?.uid);
      setCategories(adminCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentAdmin]); // fetch again when currentAdmin loads

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Category name is required");

    try {
      await addDoc(collection(db, "categories"), {
        name: form.name,
        description: form.description,
        adminId: currentAdmin?.uid,
        adminEmail: currentAdmin?.email // optional
      });
      setForm({ name: "", description: "" });
      setMessage("✔ Category added successfully!");
      fetchCategories();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error adding category:", err);
      setMessage("❌ Failed to add category. Try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteDoc(doc(db, "categories", id));
      setMessage("🗑️ Category deleted.");
      fetchCategories();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting category:", err);
      setMessage("❌ Failed to delete category.");
    }
  };

  return (
    <div className="categories-container">
      <AdminNavbar />

      <header className="categories-header">
        <h1 className="categories-title">✨ Manage Categories ✨</h1>
        {message && <p className="message">{message}</p>}
      </header>

      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" className="btn-add">Add Category</button>
      </form>

      <ul className="categories-list">
        {categories.map((cat) => (
          <li key={cat.id} className="category-item">
            <div className="category-info">
              <strong>{cat.name}</strong>
              {cat.description && <span> - {cat.description}</span>}
            </div>
            <button onClick={() => handleDelete(cat.id)} className="btn-delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
