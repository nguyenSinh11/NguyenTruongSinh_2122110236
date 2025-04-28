import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5167/api/User", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá người dùng này?")) return;

    await fetch(`http://localhost:5167/api/User/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800">👤 Quản lý Người dùng</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full table-auto text-sm text-left border border-gray-200 bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">👤 Tên người dùng</th>
              <th className="border px-4 py-2">📧 Email</th>
              <th className="border px-4 py-2">🛡️ Role</th>
              <th className="border px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center font-medium text-gray-600">{i + 1}</td>
                <td className="border px-4 py-2 text-gray-900 font-semibold">{u.username}</td>
                <td className="border px-4 py-2 text-gray-700">{u.gmail}</td>
                <td className="border px-4 py-2 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${u.role?.toLowerCase() === 'admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {u.role || "User"}
                  </span>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:text-red-800 hover:underline font-medium"
                  >
                    Xoá
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
