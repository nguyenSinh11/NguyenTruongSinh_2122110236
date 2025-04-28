import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      alert("Đăng nhập thành công!");
      navigate("/dashboard");
    } catch {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/your-background.jpg')` }}>
      <div className="bg-black bg-opacity-70 text-white p-8 rounded-xl shadow-lg max-w-4xl w-full flex">
        {/* Bên trái */}
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold mb-6">Đăng nhập tài khoản</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-semibold">
              ĐĂNG NHẬP
            </button>
            <div className="text-right text-sm text-gray-400 hover:underline cursor-pointer">
              Quên mật khẩu?
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-gray-400">OR</div>
          <button className="w-full mt-2 bg-white text-black font-bold py-2 rounded hover:bg-gray-200">
            ĐĂNG NHẬP VỚI GOOGLE
          </button>
        </div>

        {/* Bên phải */}
        <div className="w-1/2 border-l border-gray-700 pl-8 flex flex-col justify-center items-center">
          <h3 className="text-xl mb-4">Chưa có tài khoản?</h3>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-semibold text-white"
          >
            ĐĂNG KÝ NGAY
          </button>
        </div>
      </div>
    </div>
  );
}
