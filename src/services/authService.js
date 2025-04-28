import axios from "axios";

const API_URL = "http://localhost:5167/api/Auth";

// Đăng nhập
export const login = async (username, password) => {
  const response = await axios.post("http://localhost:5167/api/Auth/login", {
    username,
    password,
  });

  const token = response.data.token;
  localStorage.setItem("token", token);
  localStorage.setItem("username", username); // ✅ lưu tên đăng nhập
  return token;
};

// Đăng ký
export const registerUser = async ({ username, password, gmail }) => {
  const res = await axios.post("http://localhost:5167/api/Auth/register", {
    username,
    password,
    gmail,
  });
  return res.data;
};

