import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : { items: [] };
  });

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    const updatedItems = cart.items.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    const updatedCart = { items: updatedItems };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedItems = cart.items.filter((item) => item.productId !== productId);
    const updatedCart = { items: updatedItems };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.items?.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0;

  const handleOrder = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Vui lòng đăng nhập trước khi đặt hàng.");
      return;
    }

    const orderData = {
      userId: parseInt(userId),
      orderDetails: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch("http://localhost:5167/api/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        localStorage.removeItem("cart");
        alert("✅ Đơn hàng đã được đặt thành công!");
        navigate("/orders");
      } else {
        alert("❌ Lỗi khi tạo đơn hàng.");
      }
    } catch (error) {
      alert("⚠️ Lỗi kết nối server.");
      console.error(error);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <AnimatePresence>
        <motion.div
          className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/empty-cart.png"
            alt="Giỏ hàng trống"
            className="w-60 md:w-80 mb-6"
          />
          <h2 className="text-xl font-bold mb-2 text-gray-800">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-4">Không có sản phẩm nào trong giỏ hàng</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
          >
            Về trang chủ
          </motion.button>
          <p className="text-xs text-gray-400 mt-4">
            Khi cần trợ giúp vui lòng gọi{" "}
            <span className="text-blue-600 font-medium">1900 1000</span> hoặc{" "}
            <span className="text-blue-600 font-medium">012.3456.789</span> (8h00 – 21h30)
          </p>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="max-w-5xl mx-auto py-10 px-4 md:px-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-2xl font-bold mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          🛒 Giỏ hàng của bạn
        </motion.h2>
        <div className="space-y-4">
          {cart.items.map((item) => (
            <motion.div
              key={item.productId}
              className="flex items-center gap-4 bg-white p-4 rounded shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-red-600 font-bold">{item.price.toLocaleString()}đ</p>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                className="w-16 border rounded px-2 py-1"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => removeItem(item.productId)}
                className="text-red-600 hover:underline text-sm"
              >
                Xoá
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-right mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xl font-bold text-blue-600 mb-2">
            Tổng cộng: {totalPrice.toLocaleString()}đ
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleOrder}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
          >
            🚀 Tạo đơn hàng
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
