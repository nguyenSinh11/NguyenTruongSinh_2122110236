import { useEffect, useState } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5167/api/Category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5167/api/Category/${editingId}`
      : "http://localhost:5167/api/Category";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      const updated = await res.json();
      if (editingId) {
        setCategories(categories.map((c) => (c.id === editingId ? updated : c)));
      } else {
        setCategories([...categories, updated]);
      }
      setName("");
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá danh mục này?")) return;

    await fetch(`http://localhost:5167/api/Category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setName(currentName);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800">🗂️ Quản lý Danh mục</h2>
      <form onSubmit={handleAddOrUpdate} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Tên danh mục"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">
          {editingId ? "Lưu" : "Thêm"}
        </button>
      </form>

      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2 text-center">#</th>
            <th className="border px-4 py-2">Tên danh mục</th>
            <th className="border px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center text-gray-600 font-medium">{i + 1}</td>
              <td className="border px-4 py-2 text-gray-900 font-semibold">{c.name}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(c.id, c.name)}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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
  );
}
