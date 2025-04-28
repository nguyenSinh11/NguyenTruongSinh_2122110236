import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    orders: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/admin-login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    const fetchStats = async () => {
      try {
        const [pRes, cRes, uRes, oRes] = await Promise.all([
          fetch("http://localhost:5167/api/Product", authHeader),
          fetch("http://localhost:5167/api/Category", authHeader),
          fetch("http://localhost:5167/api/User", authHeader),
          fetch("http://localhost:5167/api/Order", authHeader),
        ]);

        if (!pRes.ok || !cRes.ok || !uRes.ok || !oRes.ok) {
          throw new Error("Lỗi xác thực hoặc không thể lấy dữ liệu");
        }

        const [p, c, u, o] = await Promise.all([
          pRes.json(),
          cRes.json(),
          uRes.json(),
          oRes.json(),
        ]);

        setStats({
          products: p.length,
          categories: c.length,
          users: u.length,
          orders: o.length,
        });
      } catch (err) {
        console.error("Lỗi khi lấy thống kê:", err);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: "Sản phẩm", value: stats.products },
    { name: "Danh mục", value: stats.categories },
    { name: "Người dùng", value: stats.users },
    { name: "Đơn hàng", value: stats.orders },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              🔧 Trang Quản Trị
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              👤 Đăng nhập:{" "}
              <span className="font-semibold text-gray-800">{username}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition shadow"
          >
            Đăng xuất
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
            <div className="text-sm">Sản phẩm</div>
            <div className="text-2xl font-bold">{stats.products}</div>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center">
            <div className="text-sm">Danh mục</div>
            <div className="text-2xl font-bold">{stats.categories}</div>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow text-center">
            <div className="text-sm">Người dùng</div>
            <div className="text-2xl font-bold">{stats.users}</div>
          </div>
          <div className="bg-purple-100 text-purple-800 p-4 rounded shadow text-center">
            <div className="text-sm">Đơn hàng</div>
            <div className="text-2xl font-bold">{stats.orders}</div>
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="mt-10 mb-14">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📊 Thống kê tổng quan
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="bg-blue-600 text-white p-6 rounded-xl text-center shadow hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-2">📦</div>
            <div className="font-semibold text-lg">Quản lý Sản phẩm</div>
          </Link>
          <Link
            to="/admin/categories"
            className="bg-green-600 text-white p-6 rounded-xl text-center shadow hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-2">🗂️</div>
            <div className="font-semibold text-lg">Quản lý Danh mục</div>
          </Link>
          <Link
            to="/admin/users"
            className="bg-yellow-500 text-white p-6 rounded-xl text-center shadow hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-2">👤</div>
            <div className="font-semibold text-lg">Quản lý Người dùng</div>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-purple-600 text-white p-6 rounded-xl text-center shadow hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-2">🧾</div>
            <div className="font-semibold text-lg">Quản lý Đơn hàng</div>
          </Link>
          <Link
            to="/admin/order-details"
            className="bg-pink-500 text-white p-6 rounded-xl text-center shadow hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-2">📋</div>
            <div className="font-semibold text-lg">Chi tiết Đơn hàng</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
