import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        // Register → Save as pending
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await setDoc(doc(db, "pendingAdmins", userCred.user.uid), {
          email,
          status: "pending",
          createdAt: serverTimestamp(),
        });

        alert("Registration request sent! Wait for super-admin approval.");
        setIsRegister(false);
      } else {
        // Login → Check approval
        const userCred = await signInWithEmailAndPassword(auth, email, password);

        console.log("Auth UID:", userCred.user.uid);

        const docRef = doc(db, "pendingAdmins", userCred.user.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          console.log("Firestore data:", data);

          if (data.status === "approved") {
            navigate("/admin/dashboard");
          } else {
            alert("Your account is still pending approval.");
          }
        } else {
          alert("No admin record found in Firestore.");
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        {isRegister ? "Admin Register" : "Admin Login"}
      </h2>

      <input
        type="email"
        placeholder="Admin Email"
        className="admin-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Admin Password"
        className="admin-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit} className="glow-button">
        {isRegister ? "Register" : "Login"}
      </button>

      <p className="toggle-text">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Register"}
        </span>
      </p>
    </div>
  );
}
