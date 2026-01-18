
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

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40 border-b border-brand-sand">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-4">
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="https://gom-my-thien.vercel.app/" className="flex items-center gap-3 group">
              <div className="bg-brand-clay text-white w-10 h-10 rounded-lg flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform">
                🏺
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-brand-terracotta leading-none">MỸ THIỆN</h1>
                <p className="text-[10px] text-brand-dark tracking-widest font-bold uppercase mt-1">Shop Di Sản</p>
              </div>
            </a>
            
            {/* Mobile Cart Button */}
            <button onClick={onCartClick} className="md:hidden relative p-2 text-brand-terracotta">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{totalItems}</span>}
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Tìm kiếm gốm men hỏa biến, bình vôi, lu nước..." 
                className="w-full bg-gray-100 border-2 border-transparent focus:border-brand-clay rounded-full px-5 py-2.5 text-sm outline-none transition-all"
              />
              <button className="absolute right-1 top-1 bg-brand-clay hover:bg-brand-terracotta text-white px-5 py-1.5 rounded-full text-sm font-bold transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Tìm</span>
              </button>
            </div>
          </div>

          {/* Nav & Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-brand-dark uppercase tracking-wider">
              <a href="https://t-l-ch-workshop.vercel.app/" className="hover:text-brand-clay transition-colors">Workshop</a>
              <a href="#san-pham" className="hover:text-brand-clay transition-colors">Sản phẩm</a>
            </nav>
            
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onCartClick}
                className={`hidden md:block relative p-2 text-brand-terracotta hover:bg-brand-sand/20 rounded-full transition-all ${isCartAnimating ? 'scale-125' : ''}`}
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

              {isLoggedIn ? (
                <button onClick={logout} className="text-[10px] font-bold text-brand-accent border border-brand-accent px-3 py-1.5 rounded-full uppercase">Thoát</button>
              ) : (
                <button onClick={() => setIsModalOpen(true)} className="text-[10px] font-bold text-brand-clay uppercase tracking-tighter">Admin</button>
              )}
            </div>
          </div>
        </div>
      </header>
      {!isLoggedIn && <AdminLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
