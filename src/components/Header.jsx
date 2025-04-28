import { useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaHeadphonesAlt,
  FaRegClock
} from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate(); // ✅ dùng để chuyển trang

  return (
    <div className="bg-yellow-400 text-black font-medium w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-2 gap-2 md:gap-0">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-black text-yellow-400 rounded-full px-2 py-1">🛒</span>
          ShopcuaToi
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Bạn tìm gì..."
          className="flex-1 md:w-1/2 px-4 py-2 rounded-full bg-white shadow-inner text-sm"
        />

        {/* Đăng nhập + Giỏ hàng */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/login")}>
            <FaUserAlt />
            Đăng nhập
          </div>
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            Giỏ hàng
          </div>
          <div className="hidden md:flex items-center gap-1 cursor-pointer">
            <FaMapMarkerAlt />
            Hồ Chí Minh
          </div>
        </div>
      </div>

      {/* Menu ngang */}
      <div className="bg-yellow-300 text-sm flex flex-wrap px-4 md:px-10 py-2 gap-4 items-center">
        <div className="flex items-center gap-1 cursor-pointer"><FaMobileAlt /> Điện thoại</div>
        <div className="flex items-center gap-1 cursor-pointer"><FaLaptop /> Laptop</div>
        <div className="flex items-center gap-1 cursor-pointer"><FaHeadphonesAlt /> Phụ kiện</div>
        <div className="flex items-center gap-1 cursor-pointer"><FaRegClock /> Đồng hồ</div>
        <div className="flex items-center gap-1 cursor-pointer"><FaTabletAlt /> Tablet</div>
        <div className="flex items-center gap-1 cursor-pointer">Dịch vụ tiện ích</div>
      </div>
    </div>
  );
}
