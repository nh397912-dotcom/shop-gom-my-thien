
import React from 'react';

const Footer: React.FC = () => {
  return (
      <footer className="bg-brand-dark text-brand-glaze pt-16 pb-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-serif text-2xl font-bold mb-4 text-brand-clay">Mỹ Thiện</h4>
            <p className="text-sm opacity-70 leading-relaxed font-sans">
              Làng nghề gốm cổ truyền tại thị trấn Châu Ổ, huyện Bình Sơn, tỉnh Quảng Ngãi. 
              Gốm Mỹ Thiện là niềm tự hào của người dân miền Ấn Trà.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest font-sans">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm opacity-70 font-sans">
              <li><a href="#san-pham" className="hover:text-brand-clay transition-colors">Bộ sưu tập sản phẩm</a></li>
              <li>
                <a 
                  href="https://nan-gom.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-clay transition-colors font-bold text-brand-accent flex items-center gap-2 pt-1 border-t border-white/10 mt-2"
                >
                  <span className="text-lg">🏺</span> Xưởng Gốm 3D (Trải nghiệm ảo)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest font-sans">Địa chỉ liên hệ</h4>
            <p className="text-sm opacity-70 font-sans">
              Thị trấn Châu Ổ, Huyện Bình Sơn,<br />
              Tỉnh Quảng Ngãi, Việt Nam.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-6 border-t border-white/10 pt-8 text-center">
          <p className="text-xs opacity-50 font-sans">&copy; {new Date().getFullYear()} Làng Gốm Mỹ Thiện. Một sản phẩm tôn vinh di sản văn hóa Việt.</p>
        </div>
      </footer>
  );
};

export default Footer;
