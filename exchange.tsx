
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  salePercent?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const EXCHANGE_PRODUCTS: Product[] = [
  { id: 101, name: 'Bình Hồ Lô Men Hỏa Biến', price: 1150000, imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop', category: 'Trang trí', isNew: true },
  { id: 102, name: 'Chum Rượu Mỹ Thiện Cổ', price: 1200000, imageUrl: 'https://dulichquangngai.vn/uploads/news/2023_12/lang-gom-my-thien.jpg', category: 'Gia dụng', isBestSeller: true },
  { id: 103, name: 'Ấm Trà Đất Nung Mỹ Thiện', price: 650000, imageUrl: 'https://media.baovanhoa.vn/zoom/600_400/Portals/0/EasyGalleryImages/1/56864/g%E1%BB%91m-1.jpg', category: 'Gia dụng', salePercent: 10 },
  { id: 104, name: 'Bình Vôi Đắp Nổi Rồng', price: 350000, imageUrl: 'https://resource.kinhtedothi.vn/2021/12/25/trinh.jpg', category: 'Tâm linh', isBestSeller: true, isNew: true },
  { id: 105, name: 'Lọ Hoa Men Ngọc Mỹ Thiện', price: 580000, imageUrl: 'https://resource.kinhtedothi.vn/2024/01/29/fbe69c260171ab2ff26051.jpg', category: 'Trang trí', isNew: true, salePercent: 5 },
  { id: 106, name: 'Bát Ăn Cơm Gốm Cổ', price: 85000, imageUrl: 'https://covatdanang.com/wp-content/uploads/2024/11/bst-gom-chau-o.jpg', category: 'Gia dụng', isBestSeller: true },
  { id: 107, name: 'Đĩa Trang Trí Hoa Văn Xưa', price: 220000, imageUrl: 'https://vnanet.vn/Data/Articles/2025/07/10/8141479/vna_potal_nghe_gom_my_thien_-_di_san_van_hoa_phi_vat_the_quoc_gia_stand.jpg', category: 'Trang trí', salePercent: 20 },
];

const ExchangeApp: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const finalPrice = product.salePercent ? product.price * (1 - product.salePercent / 100) : product.price;
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, price: finalPrice, quantity: 1 }];
    });
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleShare = async (product: Product) => {
    const shareData = {
      title: product.name,
      text: `Sản phẩm gốm Mỹ Thiện tuyệt đẹp: ${product.name}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Đã sao chép liên kết sản phẩm!');
      }
    } catch (err) { console.error(err); }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        @keyframes fire-burning-exchange {
          0% { box-shadow: 0 0 8px #ff4d00, 0 0 15px #ff4d00; border-color: #ff8c00; transform: scale(1); }
          50% { box-shadow: 0 0 20px #ff8c00, 0 0 45px #ff0000, 0 0 20px #ffcc00; border-color: #ff4d00; transform: scale(1.02); }
          100% { box-shadow: 0 0 8px #ff4d00, 0 0 15px #ff4d00; border-color: #ff8c00; transform: scale(1); }
        }
        .fire-btn-exchange {
          background: linear-gradient(135deg, #ff4d00 0%, #ff0000 100%);
          animation: fire-burning-exchange 1.2s infinite ease-in-out;
          border: 2px solid #ff4d00;
        }
      `}</style>
      
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="https://gom-my-thien.vercel.app/" className="flex items-center gap-3">
            <span className="text-2xl">🏺</span>
            <span className="font-serif font-bold text-brand-terracotta text-xl hidden sm:inline uppercase">MỸ THIỆN EXCHANGE</span>
          </a>
          
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm sản phẩm gốm..." 
                className="w-full bg-gray-100 border-none rounded-full px-5 py-2 focus:ring-2 focus:ring-brand-clay text-sm outline-none"
              />
            </div>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 text-brand-terracotta hover:bg-gray-100 rounded-full transition-all ${isAnimating ? 'scale-110' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-shopee-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
          <span className="w-1 h-8 bg-brand-clay"></span>
          Sàn Giao lưu Gốm Mỹ Thiện
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {EXCHANGE_PRODUCTS.map(product => {
            const hasSale = product.salePercent && product.salePercent > 0;
            const finalPrice = hasSale ? product.price * (1 - product.salePercent! / 100) : product.price;

            return (
              <div key={product.id} className="bg-white rounded-sm shadow-sm hover:shadow-md transition-all group flex flex-col relative">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-brand-accent text-white text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-tighter">Mới</span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-tighter">Hot</span>
                    )}
                  </div>

                  {/* Share button overlay */}
                  <button 
                    onClick={() => handleShare(product)}
                    className="absolute top-2 right-2 p-1.5 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>

                <div className="p-3 flex-grow flex flex-col">
                  <h3 className="text-xs font-medium line-clamp-2 h-8 mb-2 group-hover:text-shopee-orange transition-colors">{product.name}</h3>
                  <div className="mt-auto">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-shopee-orange font-bold text-base">
                        {finalPrice.toLocaleString('vi-VN')}đ
                      </span>
                      {hasSale && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 text-[10px] line-through">{product.price.toLocaleString('vi-VN')}đ</span>
                          <span className="text-red-600 text-[9px] font-bold">-{product.salePercent}%</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-1.5 mt-3">
                      <button 
                        onClick={() => addToCart(product)}
                        className="flex-[1.2] border border-shopee-orange text-shopee-orange hover:bg-shopee-orange hover:text-white py-1.5 rounded-sm text-[9px] font-bold transition-all uppercase tracking-tighter"
                      >
                        Thêm vào giỏ
                      </button>
                      <button 
                        onClick={() => handleBuyNow(product)}
                        className="flex-1 fire-btn-exchange text-white py-1.5 rounded-sm text-[9px] font-bold transition-all shadow-sm uppercase tracking-tighter"
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-white border-t py-8 text-center text-gray-500 text-[10px] uppercase tracking-widest">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Sàn Gốm Mỹ Thiện - Quảng Ngãi</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)}></div>
            <div className="relative w-full max-sm:w-full w-[400px] bg-white h-full shadow-2xl flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-brand-dark text-white">
                    <h2 className="font-bold text-sm uppercase tracking-widest">Giỏ hàng ({totalItems})</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-xl">&times;</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex gap-3 border-b pb-3">
                            <img src={item.imageUrl} className="w-16 h-16 object-cover bg-gray-100 border" />
                            <div className="flex-1">
                                <h4 className="text-xs font-bold truncate">{item.name}</h4>
                                <p className="text-shopee-orange font-bold text-sm">{item.price.toLocaleString('vi-VN')}đ</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 border text-xs">-</button>
                                    <span className="text-xs">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 border text-xs">+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-gray-50 border-t">
                    <div className="flex justify-between mb-4">
                        <span className="font-medium text-xs">Tổng:</span>
                        <span className="text-lg font-bold text-shopee-orange">{totalAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <button className="w-full bg-shopee-orange text-white font-bold py-3 text-xs" onClick={() => alert("Đã ghi nhận yêu cầu!")}>MUA HÀNG</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('exchange-root')!);
root.render(<ExchangeApp />);
