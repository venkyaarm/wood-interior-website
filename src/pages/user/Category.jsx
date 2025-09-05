// src/pages/user/Categories.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "../../components/Navbar"; // ✅ Import Navbar
import "./Categories.css"; // Custom styling

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products by category
  const fetchProductsByCategory = async (categoryName) => {
    setSelected(categoryName);
    setLoading(true);

    try {
      const q = query(
        collection(db, "products"),
        where("category", "==", categoryName)
      );
      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="categories-container">
      <Navbar /> {/* ✅ Navbar */}

      <h2 className="glow-heading">Browse by Category</h2>

      {/* Categories List */}
      <div className="categories-list">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => fetchProductsByCategory(cat.name)}
            className={`category-button ${selected === cat.name ? "active" : ""}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Section */}
      {selected && (
        <div className="products-section">
          <h3 className="glow-subheading">Products in {selected}</h3>

          {loading ? (
            <p className="loading-text">Loading products...</p>
          ) : products.length > 0 ? (
            <div className="categories-products-grid">
              {products.map((p) => (
                <div key={p.id} className="product-card">
                  <img
                    src={p.image || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="product-image"
                  />
                  <h4 className="product-name">{p.name}</h4>
                  <p className="product-price">₹ {p.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-products">No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
