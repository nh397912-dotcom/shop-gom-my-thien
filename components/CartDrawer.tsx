
import React from 'react';
import { Product, CartItem } from '../types';

// Use shared CartItem from types.ts to ensure type compatibility across components

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, updateQuantity }) => {
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b flex justify-between items-center bg-brand-dark text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 className="font-bold uppercase tracking-widest text-sm">Giỏ hàng của bạn ({totalItems})</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <span className="text-6xl mb-6 grayscale opacity-30">🏺</span>
              <p className="font-medium">Chưa có bảo vật nào trong giỏ</p>
              <button onClick={onClose} className="mt-4 text-brand-clay font-bold text-sm underline">Tiếp tục khám phá</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-brand-dark mb-1 truncate">{item.name}</h4>
                  <p className="text-brand-terracotta font-bold text-sm mb-3">
                    {item.price.toLocaleString('vi-VN')}đ
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500">-</button>
                      <span className="text-xs w-8 text-center font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500">+</button>
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                      className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Tổng thanh toán:</span>
            <span className="text-2xl font-bold text-brand-terracotta">{totalAmount.toLocaleString('vi-VN')}đ</span>
          </div>
          <button 
            className="w-full bg-brand-terracotta text-white font-bold py-4 rounded-sm hover:bg-brand-clay transition-all shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transform active:scale-95"
            disabled={cart.length === 0}
            onClick={() => alert("Cảm ơn quý khách! Đơn hàng gốm đã được gửi đến nghệ nhân Mỹ Thiện.")}
          >
            TIẾN HÀNH THANH TOÁN
          </button>
          <p className="text-center text-[10px] text-gray-400 uppercase tracking-tighter">
            An toàn • Bảo mật • Hỗ trợ 24/7 bởi Sứ giả Mỹ Thiện
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
