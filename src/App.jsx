import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";   // 👈 new landing page
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import Category from "./pages/user/Category";
import Contact from "./pages/user/Contact";
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageCategories from "./pages/admin/ManageCategories";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* User Panel */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

        {/* Admin Panel */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><ManageCategories /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
