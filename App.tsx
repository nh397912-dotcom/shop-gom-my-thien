
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CartDrawer from './components/CartDrawer';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Product, CartItem } from './types';

const MainApp = () => {
  const { products } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const hasSale = product.salePercent && product.salePercent > 0;
      const finalPrice = hasSale ? product.price * (1 - product.salePercent! / 100) : product.price;
      
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, price: finalPrice }];
    });
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
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

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-pottery-texture">
      <Header 
        totalItems={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        isCartAnimating={isAnimating}
      />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Flash Sale / Promotion Banner */}
        <div className="bg-brand-terracotta text-white py-3 overflow-hidden whitespace-nowrap relative">
          <div className="animate-marquee inline-block">
            🔥 Miễn phí vận chuyển cho đơn hàng gốm trên 1.000.000đ tại Quảng Ngãi! • Tặng bộ ấm trà mini cho hóa đơn từ 2.000.000đ • Giảm ngay 10% khi mua tại xưởng • 
          </div>
          <div className="animate-marquee2 inline-block absolute">
            🔥 Miễn phí vận chuyển cho đơn hàng gốm trên 1.000.000đ tại Quảng Ngãi! • Tặng bộ ấm trà mini cho hóa đơn từ 2.000.000đ • Giảm ngay 10% khi mua tại xưởng • 
          </div>
        </div>

        <div className="container mx-auto px-4 space-y-24 py-12">
          <ProductGallery onAddToCart={addToCart} onBuyNow={handleBuyNow} />
        </div>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity} 
      />
      
      <Chatbot />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
