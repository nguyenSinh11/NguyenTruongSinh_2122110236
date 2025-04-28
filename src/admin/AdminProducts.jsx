import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5167/api/Product", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm này?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5167/api/Product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📦 Quản lý Sản phẩm</h1>
        <Link
          to="/admin/products/create"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          ➕ Thêm sản phẩm
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-yellow-800">
            <tr>
              <th className="border p-3">#</th>
              <th className="border p-3">Ảnh</th>
              <th className="border p-3">Tên & Danh mục</th>
              <th className="border p-3">Giá</th>
              <th className="border p-3">Kho</th>
              <th className="border p-3">Trạng thái</th>
              <th className="border p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.id} className="hover:bg-yellow-50">
                <td className="border p-3 text-center">{index + 1}</td>

                {/* Ảnh sản phẩm */}
                <td className="border p-3 text-center">
                  {p.imageUrl ? (
                    <img
                      src={`http://localhost:5167${p.imageUrl}`}
                      alt={p.name}
                      className="w-16 h-16 object-cover mx-auto rounded shadow"
                    />
                  ) : (
                    <span className="text-gray-400">Không có ảnh</span>
                  )}
                </td>

                {/* Tên và Danh mục */}
                <td className="border p-3">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-blue-500 text-sm">
                    {p.category?.name || "Chưa phân loại"}
                  </div>
                </td>

                {/* Giá */}
                <td className="border p-3 text-center text-blue-700 font-bold">
                  {p.price.toLocaleString()}đ
                </td>

                {/* Kho */}
                <td className="border p-3 text-center">{p.stockQuantity}</td>

                {/* Trạng thái */}
                <td className="border p-3 text-center">
                  {p.published ? (
                    <span className="text-green-600 font-bold">🟢 Hiển thị</span>
                  ) : (
                    <span className="text-red-600 font-bold">🔴 Ẩn</span>
                  )}
                </td>

                {/* Hành động */}
                <td className="border p-3 space-x-3 text-center">
                  <Link
                    to={`/admin/products/edit/${p.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    ✏️ Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    🗑️ Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
