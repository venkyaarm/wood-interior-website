import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // custom styles

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // toggle form
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle register
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful! You can now login.");
      setIsRegister(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">
        {isRegister ? "User Registration" : "User Login"}
      </h2>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {isRegister ? (
        <button className="glow-button" onClick={handleRegister}>
          Register
        </button>
      ) : (
        <button className="glow-button" onClick={handleLogin}>
          Login
        </button>
      )}

      <p className="toggle-text">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <span onClick={() => setIsRegister(false)} className="toggle-link">
              Login
            </span>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <span onClick={() => setIsRegister(true)} className="toggle-link">
              Register
            </span>
          </>
        )}
      </p>
    </div>
  );
}
