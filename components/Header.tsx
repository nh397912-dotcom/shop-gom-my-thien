
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLoginModal from './AdminLoginModal';

interface HeaderProps {
  totalItems?: number;
  onCartClick?: () => void;
  isCartAnimating?: boolean;
}

const Header: React.FC<HeaderProps> = ({ totalItems = 0, onCartClick, isCartAnimating }) => {
  const { isLoggedIn, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShareWebsite = async () => {
    const shareData = {
      title: 'Làng Gốm Mỹ Thiện - Di sản Quảng Ngãi',
      text: 'Khám phá tinh hoa gốm men hỏa biến Mỹ Thiện - Quảng Ngãi.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (err) {
      console.error('Lỗi chia sẻ:', err);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40 border-b border-brand-sand">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-4">
          
          {/* Top Row: Logo & Icons Container */}
          <div className="flex items-center justify-between w-full md:w-auto md:flex-1">
            <a href="https://gom-my-thien.vercel.app/" className="flex items-center gap-3 group">
              <div className="bg-brand-clay text-white w-10 h-10 rounded-lg flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform">
                🏺
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-brand-terracotta leading-none">MỸ THIỆN</h1>
                <p className="text-[10px] text-brand-dark tracking-widest font-bold uppercase mt-1">Shop Di Sản</p>
              </div>
            </a>

            {/* Icons Section - Always at the Right on Mobile, Far Right on Desktop */}
            <div className="flex items-center gap-1 md:order-3">
              {/* Giỏ hàng */}
              <button 
                onClick={onCartClick}
                className={`relative p-2 text-brand-terracotta hover:bg-brand-sand/20 rounded-full transition-all ${isCartAnimating ? 'scale-125' : ''}`}
                title="Giỏ hàng"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Nút Chia sẻ */}
              <button 
                onClick={handleShareWebsite}
                className="p-2 text-brand-terracotta hover:bg-brand-sand/20 rounded-full transition-all active:scale-95"
                title="Chia sẻ trang web"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>

              {/* Dải ngăn cách (Desktop only) */}
              <div className="hidden md:block w-px h-6 bg-gray-200 mx-1"></div>

              {/* Nút Admin */}
              <button 
                onClick={isLoggedIn ? logout : () => setIsModalOpen(true)}
                className={`p-2 rounded-full transition-all hover:bg-brand-sand/20 ${isLoggedIn ? 'text-brand-accent' : 'text-brand-clay'}`}
                title={isLoggedIn ? "Đăng xuất" : "Đăng nhập Quản trị"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Middle Row: Search Bar - Centers in desktop row, below logo in mobile */}
          <div className="flex-1 w-full max-w-2xl md:order-2">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Tìm kiếm gốm Mỹ Thiện..." 
                className="w-full bg-gray-100 border-2 border-transparent focus:border-brand-clay rounded-full px-5 py-2.5 text-sm outline-none transition-all"
              />
              <button className="absolute right-1 top-1 bg-brand-clay hover:bg-brand-terracotta text-white px-5 py-1.5 rounded-full text-sm font-bold transition-colors">
                Tìm
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-brand-dark uppercase tracking-wider md:order-1">
            <a href="https://t-l-ch-workshop.vercel.app/" className="hover:text-brand-clay transition-colors whitespace-nowrap">Workshop</a>
            <a href="#san-pham" className="hover:text-brand-clay transition-colors whitespace-nowrap">Sản phẩm</a>
          </nav>
        </div>
        
        {/* Share Toast */}
        {showToast && (
          <div className="fixed top-24 right-4 bg-brand-dark text-white px-4 py-2 rounded-lg shadow-2xl text-xs font-bold animate-fade-in z-50">
            ✅ Đã sao chép liên kết trang web!
          </div>
        )}
      </header>
      {!isLoggedIn && <AdminLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
