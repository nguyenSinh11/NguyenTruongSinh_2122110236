import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5167/api/Product/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => alert("Không tìm thấy sản phẩm"));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };

    const existing = cart.items.find(p => p.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("🛒 Đã thêm vào giỏ hàng!");
    navigate("/"); // hoặc navigate("/cart");
  };

  if (!product) return <div className="p-10 text-center">Đang tải sản phẩm...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded shadow">
        {/* Ảnh */}
        <div className="w-full md:w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full object-cover rounded" />
        </div>

        {/* Thông tin */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-lg text-red-600 font-semibold mb-1">
            {product.price.toLocaleString()}đ
          </p>
          <p className="text-sm text-gray-400 line-through mb-3">
            {(product.price * 1.15).toLocaleString()}đ
          </p>

          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <span>Số lượng:</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded font-semibold"
          >
            🛒 Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}
