
import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import EditProductModal from './EditProductModal';

const ProductCard: React.FC<{ product: Product; index: number; onAddToCart: (p: Product) => void }> = ({ product, index, onAddToCart }) => {
  const { isLoggedIn } = useAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const price = 150000 + (product.id * 50000);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div 
        ref={cardRef}
        className={`bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group relative flex flex-col ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          {product.id === 4 && (
            <div className="absolute top-2 left-2 bg-brand-accent text-white text-[10px] px-2 py-1 font-bold z-10 shadow-sm">
              NEW ARRIVAL
            </div>
          )}
          {isLoggedIn && (
            <button
              onClick={() => setEditModalOpen(true)}
              className="absolute top-2 right-2 bg-white/90 text-brand-dark p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✏️
            </button>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-sm font-medium text-brand-dark line-clamp-2 min-h-[2.5rem] mb-2">{product.name}</h3>
          <div className="mt-auto">
            <div className="text-brand-terracotta font-bold text-lg mb-3">
              {price.toLocaleString('vi-VN')}đ
            </div>
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-brand-clay hover:bg-brand-terracotta text-white py-2 rounded-sm text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      {isLoggedIn && <EditProductModal product={product} isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} />}
    </>
  );
};

const ProductGallery: React.FC<{ onAddToCart: (p: Product) => void }> = ({ onAddToCart }) => {
  const { products } = useAuth();
  const [filter, setFilter] = useState('Tất cả');

  const filteredProducts = products.filter(p => {
    if (filter === 'Tất cả') return true;
    if (filter === 'Gia dụng') return [1, 4, 8].includes(p.id);
    if (filter === 'Trang trí') return [2, 5, 7].includes(p.id);
    if (filter === 'Tâm linh') return [3, 6].includes(p.id);
    return true;
  });

  return (
    <section id="san-pham" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-brand-clay font-bold tracking-[0.3em] uppercase text-xs">Cửa hàng trực tuyến</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mt-2">
            Tuyệt phẩm từ Làng Gốm
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
          {['Tất cả', 'Gia dụng', 'Trang trí', 'Tâm linh'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${filter === cat ? 'bg-brand-clay text-white border-brand-clay' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-clay'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default ProductGallery;
