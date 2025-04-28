import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-6">
        <div className="text-2xl font-bold text-blue-600 mb-8">
          🛠️ Admin Panel
        </div>
        <div className="flex flex-col gap-4">
          <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">🏠 Dashboard</Link>
          <Link to="/admin/products" className="text-gray-700 hover:text-blue-600 font-medium">📦 Sản phẩm</Link>
          <Link to="/admin/categories" className="text-gray-700 hover:text-blue-600 font-medium">🗂️ Danh mục</Link>
          <Link to="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium">👤 Người dùng</Link>
          <Link to="/admin/orders" className="text-gray-700 hover:text-blue-600 font-medium">🧾 Đơn hàng</Link>
          <Link to="/admin/order-details" className="text-gray-700 hover:text-blue-600 font-medium">📋 Chi tiết đơn</Link>
        </div>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Đăng xuất
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">
            {username && `👤 ${username}`}
          </p>
        </div>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
