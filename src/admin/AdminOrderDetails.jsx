import { useEffect, useState } from "react";

export default function AdminOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5167/api/OrderDetail", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => setOrderDetails(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">📋 Chi tiết đơn hàng</h2>
      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Đơn hàng</th>
            <th className="border p-2">Sản phẩm</th>
            <th className="border p-2">Số lượng</th>
            <th className="border p-2">Đơn giá</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((d, i) => (
            <tr key={`${d.orderId}-${d.productId}`}>
              <td className="border p-2 text-center">{i + 1}</td>
              <td className="border p-2 text-center">#{d.orderId}</td>
              <td className="border p-2">{d.productName || `ID: ${d.productId}`}</td>
              <td className="border p-2 text-center">{d.quantity}</td>
              <td className="border p-2 text-right">{d.unitPrice.toLocaleString()}đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
