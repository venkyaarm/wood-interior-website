// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const snap = await getDocs(collection(db, "products"));
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <span className="loading-text">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="products-page">
      <Navbar />
      <div className="products-container">
        <h2 className="products-title">Our Latest Products</h2>

        {products.length === 0 ? (
          <p className="no-products">No products available at the moment.</p>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={p.image} alt={p.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">₹{p.price}</p>
                  {p.category && (
                    <span className="product-category">{p.category}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
