import axios from "axios";

const API = "http://localhost:5167/api/Product";

export const fetchProducts = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
