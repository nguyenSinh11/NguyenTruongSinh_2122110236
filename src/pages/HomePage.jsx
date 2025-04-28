import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import BannerSlider from '../components/BannerSlider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function SectionTitle({ title }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <button className="text-blue-500 hover:underline text-sm">Xem tất cả</button>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const cateRes = await fetch('http://localhost:5167/api/Category');
      const categories = await cateRes.json();

      const token = localStorage.getItem("token");

      const promises = categories.map(async (category) => {
        const res = await fetch(`http://localhost:5167/api/Product/ByCategory/${category.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const products = await res.json();
        return { category, products };
      });

      const data = await Promise.all(promises);
      setCategoryProducts(data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm theo danh mục:", err);
    }
  };

  const flashSaleProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 space-y-14">
        {/* Slider Banner */}
        <BannerSlider />

        {/* Flash Sale */}
        {flashSaleProducts.length > 0 && (
          <section>
            <SectionTitle title="🔥 Sale Sốc Hôm Nay" />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Sản phẩm theo danh mục */}
        {categoryProducts.map(({ category, products }) => (
          <section key={category.id}>
            <SectionTitle title={category.name} />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}