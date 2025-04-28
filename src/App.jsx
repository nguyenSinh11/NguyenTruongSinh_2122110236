import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductList from "./components/ProductList";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import MiniCart from './components/MiniCart';
import CartPage from "./pages/CartPage";


import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout"; // 🆕 Layout mới
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminProductForm from "./admin/AdminProductForm";
import AdminCategories from "./admin/AdminCategories";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";
import AdminOrderDetails from "./admin/AdminOrderDetails";

function App() {
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <BrowserRouter>
      <Routes>
        {/* Trang người dùng */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/category/:id" element={<ProductList />} />

        {/* Trang Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin khu vực sử dụng AdminLayout */}
        <Route path="/admin" element={isAdmin ? <AdminLayout /> : <Navigate to="/admin-login" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/create" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="order-details" element={<AdminOrderDetails />} />
        </Route>
      </Routes>

      {/* MiniCart luôn hiển thị */}
      <MiniCart />
    </BrowserRouter>
  );
}

export default App;
