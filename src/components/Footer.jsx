export default function Footer() {
    return (
      <footer className="bg-yellow-400 text-black mt-10 px-4 md:px-10 py-8">
        <div className="max-w-[1200px] mx-auto">
  
          {/* Grid chính 4 cột */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  
            {/* Info */}
            <div>
              <h6 className="font-bold uppercase mb-2">📌 Công ty</h6>
              <ul className="text-sm space-y-1">
                <li>TECH SHOP VN</li>
                <li>Địa chỉ: 123 Lập Trình, TP.HCM</li>
                <li>Email: techshop@gmail.com</li>
                <li>Hotline: 1900 1234</li>
              </ul>
            </div>
  
            {/* Chính sách */}
            <div>
              <h6 className="font-bold uppercase mb-2">📋 Chính sách</h6>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline">Bảo hành</a></li>
                <li><a href="#" className="hover:underline">Đổi trả</a></li>
                <li><a href="#" className="hover:underline">Thanh toán</a></li>
                <li><a href="#" className="hover:underline">Trả góp</a></li>
              </ul>
            </div>
  
            {/* Nhận tin */}
            <div>
              <h6 className="font-bold uppercase mb-2">📧 Nhận tin khuyến mãi</h6>
              <form className="space-y-2">
                <input type="email" placeholder="Nhập email của bạn"
                  className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                />
                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                  Đăng ký
                </button>
              </form>
              <div className="flex gap-3 mt-4 text-xl">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-youtube"></i>
                <i className="bi bi-tiktok"></i>
                <i className="bi bi-instagram"></i>
              </div>
            </div>
  
            {/* Google Map */}
            <div>
              <h6 className="font-bold uppercase mb-2">📍 Cửa hàng</h6>
              <div className="aspect-w-4 aspect-h-3">
                <iframe
                  className="w-full h-full rounded"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12..."
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
  
          {/* QR chuyển khoản */}
          <div className="mt-10 text-center">
            <h6 className="font-bold uppercase">💳 Quét mã chuyển khoản</h6>
            <img src="/public/qr-momo.jpg" alt="QR MoMo" className="mx-auto mt-2 w-[150px]" />
            <p className="text-sm text-gray-700 mt-2">Tên TK: TECHSHOP | Momo/MB Bank</p>
          </div>
  
          {/* Line + bản quyền */}
          <hr className="my-6 border-black" />
          <p className="text-center text-sm text-gray-800">
            &copy; 2025 TECHSHOP.VN — All rights reserved |{" "}
            <a href="#" className="hover:underline">Chính sách bảo mật</a>
          </p>
        </div>
      </footer>
    );
  }
  