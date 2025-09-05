import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBoxOpen, FaThList, FaEnvelope, FaBars } from "react-icons/fa"; // Added FaBars

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [menuOpen, setMenuOpen] = useState(false); // toggle dropdown

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      {!isMobile && (
        <nav style={styles.nav}>
          <h2 style={styles.logo}>Wood Interiors</h2>
          <ul style={styles.menu}>
            <li><Link style={styles.link} to="/home">Home</Link></li>
            <li><Link style={styles.link} to="/products">Latest Products</Link></li>
            <li><Link style={styles.link} to="/categories">Categories</Link></li>
            <li><Link style={styles.link} to="/contact">Contact</Link></li>
            <li><Link style={styles.link} to="/">Logout</Link></li>
          </ul>
        </nav>
      )}

      {/* Mobile Navbar */}
      {isMobile && (
        <nav style={styles.mobileNav}>
          <FaBars style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} />
          <h2 style={styles.mobileLogo}>Wood Interiors</h2>
        </nav>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobile && menuOpen && (
        <div style={styles.dropdown}>
          <Link style={styles.dropdownLink} to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link style={styles.dropdownLink} to="/products" onClick={() => setMenuOpen(false)}>Latest Products</Link>
          <Link style={styles.dropdownLink} to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link style={styles.dropdownLink} to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link style={styles.dropdownLink} to="/" onClick={() => setMenuOpen(false)}>Logout</Link>
        </div>
      )}

      {/* Mobile Footer */}
      {isMobile && (
        <footer style={styles.mobileFooter}>
          <Link style={styles.footerLink} to="/home">
            <FaHome size={20} />
            <span style={styles.footerText}>Home</span>
          </Link>
          <Link style={styles.footerLink} to="/products">
            <FaBoxOpen size={20} />
            <span style={styles.footerText}>Products</span>
          </Link>
          <Link style={styles.footerLink} to="/categories">
            <FaThList size={20} />
            <span style={styles.footerText}>Categories</span>
          </Link>
          <Link style={styles.footerLink} to="/contact">
            <FaEnvelope size={20} />
            <span style={styles.footerText}>Contact</span>
          </Link>
        </footer>
      )}
    </>
  );
};

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "98%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg, #000000, #111111, #000000)",
    padding: "15px 20px",
    zIndex: 1000,
    boxShadow: "0px 4px 15px rgba(255, 215, 0, 0.3)",
  },
  logo: {
    color: "gold",
    fontSize: "26px",
    margin: 0,
    fontFamily: "'Cinzel', serif",
    textShadow: "0 0 8px gold, 0 0 12px goldenrod",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "25px",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  link: {
    color: "gold",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
    textShadow: "0 0 6px gold",
  },
  mobileNav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    background: "#111",
    padding: "12px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1000,
    boxShadow: "0px 2px 10px rgba(255, 215, 0, 0.3)",
  },
  mobileLogo: {
    color: "gold",
    fontSize: "20px",
    margin: "0 auto", // keeps it centered even with hamburger
    fontFamily: "'Cinzel', serif",
    textShadow: "0 0 6px gold, 0 0 8px goldenrod",
  },
  hamburger: {
    color: "gold",
    fontSize: "22px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  dropdown: {
    position: "fixed",
    top: "50px",
    left: 0,
    width: "100%",
    background: "#111",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.3)",
    zIndex: 999,
  },
  dropdownLink: {
    padding: "12px",
    color: "gold",
    textDecoration: "none",
    fontSize: "16px",
    borderBottom: "1px solid rgba(255,215,0,0.2)",
    textAlign: "center",
  },
  mobileFooter: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "#111",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "8px 0",
    boxShadow: "0 -2px 10px rgba(255, 215, 0, 0.3)",
    zIndex: 1000,
  },
  footerLink: {
    color: "gold",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
  },
  footerText: {
    fontSize: "10px",
    marginTop: "2px",
  },
};

export default Navbar;
