import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MiniCart() {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    try {
      const parsed = JSON.parse(stored);
      if (parsed && Array.isArray(parsed.items)) {
        setCart(parsed);
      }
    } catch {
      // Nếu lỗi JSON.parse hoặc format sai
      setCart({ items: [] });
    }
  }, []);

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className="bg-white border shadow-lg rounded-full px-5 py-3 cursor-pointer flex items-center gap-2 hover:bg-gray-100"
        onClick={() => navigate("/cart")}
        title="Xem giỏ hàng"
      >
        <FaShoppingCart className="text-xl text-blue-600" />
        <span className="text-sm font-semibold">
          {totalItems} SP - {totalPrice.toLocaleString()}đ
        </span>
      </div>
    </div>
  );
}
