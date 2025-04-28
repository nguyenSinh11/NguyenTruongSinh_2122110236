import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // 🔄 Lấy giỏ hàng từ localStorage (nếu có)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 🔢 Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // 💾 Lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 🚀 Điều hướng sang trang giỏ hàng
    navigate("/cart");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition relative">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-cover mb-3 rounded"
      />
      <h3 className="text-sm font-semibold line-clamp-2 min-h-[3em]">{product.name}</h3>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-red-600 font-bold text-lg">{product.price.toLocaleString()}đ</p>
        <p className="text-gray-400 text-sm line-through">
          {(product.price * 1.15).toLocaleString()}đ
        </p>
      </div>
      <div className="mt-2">
        <button
          onClick={handleBuyNow}
          className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
        >
          Mua ngay
        </button>
      </div>
      <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
        ⚡ Sale
      </div>
    </div>
  );
}
