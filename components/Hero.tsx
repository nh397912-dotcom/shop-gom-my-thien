
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden flex items-center justify-center bg-brand-dark"
      aria-label="Giới thiệu shop đồ gốm Mỹ Thiện"
    >
      {/* Background Image Container with Parallax-like feel */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Lớp phủ đa tầng tạo chiều sâu và độ tương phản cho chữ */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-brand-terracotta/10 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 opacity-15 z-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      </div>

      <div className="relative z-30 container mx-auto px-6 text-left text-white flex flex-col items-start">
        <div className="overflow-hidden mb-6">
          <div className="inline-block px-4 py-1.5 border border-brand-clay/40 rounded-full text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase backdrop-blur-md bg-white/5 animate-reveal text-brand-sand">
            Tinh hoa gốm cổ Quảng Ngãi
          </div>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 drop-shadow-2xl leading-[1] animate-fade-in-up">
          <span className="block overflow-hidden">
            <span className="inline-block">Tuyệt tác</span>
          </span>
          <span className="text-brand-clay italic block overflow-hidden mt-2">
            <span className="inline-block">Đất & Lửa</span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl font-light mb-10 max-w-xl opacity-85 leading-relaxed animate-fade-in-up delay-200 text-balance">
          Khám phá vẻ đẹp huyền bí của men hỏa biến và kỹ nghệ đắp nổi thủ công truyền thống tại làng gốm Mỹ Thiện với lịch sử hơn 200 năm.
        </p>
        
        <div className="flex flex-wrap gap-6 items-center animate-fade-in-up delay-500">
          <a href="#san-pham" className="group relative bg-brand-clay hover:bg-brand-terracotta text-white font-bold py-5 px-14 rounded-full transition-all overflow-hidden shadow-2xl flex items-center gap-3">
            <span className="relative z-10 uppercase tracking-widest text-xs">Xem sản phẩm</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          
          <a href="#gioi-thieu" className="text-xs uppercase tracking-[0.3em] font-bold border-b border-white/30 pb-2 hover:border-brand-clay transition-colors">
            Tìm hiểu di sản
          </a>
        </div>
      </div>

      {/* Decorative text element */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block opacity-10 select-none pointer-events-none rotate-90 origin-right">
        <span className="text-[120px] leading-none text-white font-serif font-black tracking-tighter uppercase whitespace-nowrap">MY THIEN POTTERY</span>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 opacity-40 animate-pulse">
        <span className="text-[10px] uppercase tracking-widest text-white">Khám phá tiếp</span>
        <div className="w-px h-12 bg-white/50"></div>
      </div>

      <style>{`
        @keyframes reveal {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal {
          animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .delay-200 { animation-delay: 200ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
    </section>
  );
};

export default Hero;
