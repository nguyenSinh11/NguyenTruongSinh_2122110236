import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password, gmail });
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch {
      alert("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
    style={{
      backgroundImage: "url('/public/Yone2.jpg')",
    }}
  >

      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">

        {/* Form đăng ký */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Đăng ký tài khoản mới</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full border border-gray-300 px-4 py-3 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Gmail"
              className="w-full border border-gray-300 px-4 py-3 rounded"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full border border-gray-300 px-4 py-3 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold"
            >
              Đăng ký
            </button>
          </form>
        </div>

        {/* Khối bên phải */}
        <div className="w-full md:w-1/2 bg-blue-50 border-l border-blue-200 px-8 flex flex-col justify-center items-center">
          <h3 className="text-xl mb-4 font-medium">Đã có tài khoản?</h3>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold"
          >
            ĐĂNG NHẬP NGAY
          </button>
        </div>
      </div>
    </div>
  );
}
