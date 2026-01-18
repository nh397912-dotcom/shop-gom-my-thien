
import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section id="gioi-thieu" className="scroll-mt-24 py-12">
      <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-brand-clay font-bold tracking-widest uppercase text-sm mb-2 block">Hành trình 200 năm di sản</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6 leading-tight">
            Mỹ Thiện: Khúc hát từ <span className="text-brand-clay">Lòng Sông Trà Bồng</span>
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
            <p>
              Từ thế kỷ 19, những lò bầu ven sông Trà Bồng (Châu Ổ, Quảng Ngãi) đã bắt đầu đỏ lửa, khai sinh ra dòng gốm Mỹ Thiện lừng lẫy miền Trung. 
            </p>
            <p>
              Điểm làm nên linh hồn của Mỹ Thiện chính là sự kết hợp tuyệt mĩ giữa <strong>đất sét mỡ</strong> địa phương và kỹ thuật <strong>tráng men hỏa biến</strong>. Không dùng khuôn đúc công nghiệp, mỗi sản phẩm Mỹ Thiện là một bản thể duy nhất, mang dấu ấn vân tay và tâm hồn của nghệ nhân đắp nổi.
            </p>
            <p>
              Dưới bàn tay tài hoa của những nghệ nhân đời thứ 5, thứ 6 như nghệ nhân ưu tú Đặng Văn Trịnh, Mỹ Thiện hôm nay không chỉ là vật dụng gia đình mà đã trở thành những bảo vật trang trí, mang hơi thở của lịch sử hòa quyện cùng mỹ thuật đương đại.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-gray-100">
              <div>
                <h4 className="font-bold text-brand-terracotta mb-1">Men Hỏa Biến</h4>
                <p className="text-sm opacity-80">Màu sắc biến ảo tự nhiên trong lò nung củi truyền thống.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-terracotta mb-1">Đắp Nổi Thủ Công</h4>
                <p className="text-sm opacity-80">Từng cánh sen, vảy rồng được nhào nặn tỉ mỉ bằng tay.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 min-h-[500px] relative">
          <img 
            src="https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=1200" 
            alt="Nghệ nhân nặn gốm Mỹ Thiện" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white bg-black/30 backdrop-blur-md p-4 rounded-lg">
            <p className="text-sm italic">"Đất sét Trà Bồng, lửa lò Châu Ổ, hồn người Quảng Ngãi."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
