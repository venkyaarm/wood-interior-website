// src/pages/admin/ManageProducts.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import axios from "axios";
import { getAuth } from "firebase/auth";
import AdminNavbar from "../../components/AdminNavbar";
import "./ManageProducts.css";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: null, category: "" });
  const [message, setMessage] = useState("");

  const auth = getAuth();
  const currentAdmin = auth.currentUser;

  // Fetch only products created by this admin
  const fetchProducts = async () => {
    try {
      const snap = await getDocs(collection(db, "products"));
      const allProducts = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const adminProducts = allProducts.filter(p => p.adminId === currentAdmin?.uid);
      setProducts(adminProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const snap = await getDocs(collection(db, "categories"));
      const allCategories = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Optional: show only categories created by this admin
      const adminCategories = allCategories.filter(cat => cat.adminId === currentAdmin?.uid);
      setCategories(adminCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    if (form.image) {
      const data = new FormData();
      data.append("file", form.image);
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      const res = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, data);
      imageUrl = res.data.secure_url;
    }

    await addDoc(collection(db, "products"), {
      name: form.name,
      price: form.price,
      image: imageUrl,
      category: form.category,
      adminId: currentAdmin?.uid, // store adminId
      adminEmail: currentAdmin?.email // optional
    });

    setForm({ name: "", price: "", image: null, category: "" });
    setMessage("✔ Product added successfully!");
    fetchProducts();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await deleteDoc(doc(db, "products", id));
    setMessage("🗑️ Product deleted.");
    fetchProducts();
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="products-container">
      <AdminNavbar />

      <header className="products-header">
        <h1 className="products-title">✨ Manage Products ✨</h1>
        {message && <p className="message">{message}</p>}
      </header>

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <button type="submit" className="btn-add">Add Product</button>
      </form>

      <ul className="products-list">
        {products.map((p) => (
          <li key={p.id} className="product-item">
            <img src={p.image} alt={p.name} className="product-img" />
            <div className="product-info">
              <p><strong>{p.name}</strong> - ₹{p.price}</p>
              <p>Category: {p.category}</p>
            </div>
            <button onClick={() => handleDelete(p.id)} className="btn-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
