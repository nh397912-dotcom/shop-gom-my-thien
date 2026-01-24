
import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import EditProductModal from './EditProductModal';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onAddToCart, onBuyNow }) => {
  const { isLoggedIn } = useAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const basePrice = 150000 + (product.id * 50000);
  const hasSale = product.salePercent && product.salePercent > 0;
  const currentPrice = hasSale ? basePrice * (1 - product.salePercent! / 100) : basePrice;

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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: product.name,
      text: `Khám phá tuyệt phẩm gốm Mỹ Thiện: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
      }
    } catch (err) {
      console.error('Lỗi chia sẻ:', err);
    }
  };

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
          
          {/* Top-left Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.isNew && (
              <div className="bg-brand-accent text-white text-[9px] px-1.5 py-0.5 font-bold shadow-sm uppercase">
                ✨ Mới nhất
              </div>
            )}
            {product.isBestSeller && (
              <div className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 font-bold shadow-sm uppercase">
                🔥 Bán chạy
              </div>
            )}
          </div>

          {/* Share Button Overlay */}
          <button 
            onClick={handleShare}
            className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors z-20 opacity-0 group-hover:opacity-100"
            title="Chia sẻ sản phẩm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          {isLoggedIn && (
            <button
              onClick={() => setEditModalOpen(true)}
              className="absolute bottom-2 right-2 bg-brand-clay text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              ✏️
            </button>
          )}

          {showShareToast && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/40 backdrop-blur-[2px] z-30 transition-opacity">
              <span className="bg-white px-3 py-1 rounded text-[10px] font-bold text-brand-dark shadow-lg">Đã copy link!</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-sm font-medium text-brand-dark line-clamp-2 min-h-[2.5rem] group-hover:text-brand-terracotta transition-colors">
              {product.name}
            </h3>
          </div>
          
          <div className="mt-auto">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
              <div className="text-brand-terracotta font-bold text-lg">
                {currentPrice.toLocaleString('vi-VN')}đ
              </div>
              {hasSale && (
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 text-xs line-through">{basePrice.toLocaleString('vi-VN')}đ</span>
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1 rounded border border-red-100">-{product.salePercent}%</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => onAddToCart({ ...product, price: currentPrice } as any)}
                className="flex-[1.2] bg-brand-clay hover:bg-brand-terracotta text-white py-2 rounded-sm text-[10px] font-bold transition-all duration-300 flex items-center justify-center gap-1 shadow-sm uppercase tracking-tighter"
              >
                Thêm vào giỏ
              </button>
              <button 
                onClick={() => onBuyNow({ ...product, price: currentPrice } as any)}
                className="flex-1 fire-effect text-white py-2 rounded-sm text-[10px] font-bold transition-all duration-300 flex items-center justify-center gap-1 shadow-md uppercase tracking-tighter"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn && <EditProductModal product={product} isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} />}
    </>
  );
};

const ProductGallery: React.FC<{ onAddToCart: (p: Product) => void; onBuyNow: (p: Product) => void }> = ({ onAddToCart, onBuyNow }) => {
  const { products } = useAuth();
  const [filter, setFilter] = useState('Tất cả');

  const filteredProducts = products.filter(p => {
    if (filter === 'Tất cả') return true;
    if (filter === 'Gia dụng') return [1, 5].includes(p.id);
    if (filter === 'Trang trí') return [2, 7].includes(p.id);
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
          <ProductCard 
            key={product.id} 
            product={product} 
            index={index} 
            onAddToCart={onAddToCart} 
            onBuyNow={onBuyNow}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGallery;
