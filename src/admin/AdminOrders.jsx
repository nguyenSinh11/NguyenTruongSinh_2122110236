import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5167/api/Order", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch(`http://localhost:5167/api/Order/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      setOrders(
        orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">🧾 Quản lý Đơn hàng</h2>
      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Người đặt</th>
            <th className="border p-2">Ngày đặt</th>
            <th className="border p-2">Tổng tiền</th>
            <th className="border p-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={order.id}>
              <td className="border p-2 text-center">{i + 1}</td>
              <td className="border p-2">{order.username || `ID: ${order.userId}`}</td>
              <td className="border p-2">{new Date(order.orderDate).toLocaleString()}</td>
              <td className="border p-2 text-right">{order.totalAmount?.toLocaleString() || "..."}đ</td>
              <td className="border p-2 text-center">
                <select
                  value={order.status || "Đang xử lý"}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option>Đang xử lý</option>
                  <option>Đang giao</option>
                  <option>Đã giao</option>
                  <option>Huỷ</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
