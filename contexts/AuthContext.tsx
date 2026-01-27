
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product } from '../types';

const initialProducts: Product[] = [
    {
      id: 1,
      name: 'Vò Gốm Men Mật Khắc Văn Sóng',
      description: 'Vật dụng kinh điển của gốm Mỹ Thiện, men nâu mộc mạc giúp giữ nước mát tự nhiên, bền bỉ cùng thời gian.',
      imageUrl: 'https://i.imgur.com/ZqNMAKr.jpeg',
      isBestSeller: true
    },
    {
      id: 2,
      name: 'Chum Gốm Men Tro Dáng Tròn Cổ Lượn',
      description: 'Thiết kế thanh thoát với sắc men ngọc lục bảo, phù hợp cho không gian trang trí sang trọng và tinh tế.',
      imageUrl: 'https://i.imgur.com/2jbc00s.jpeg',
      salePercent: 15
    },
    {
      id: 3,
      name: 'Chum Gốm Men Rêu Hoa Văn Dọc Thân',
      description: 'Tác phẩm tâm linh thượng hạng với họa tiết rồng chầu mặt nguyệt được đắp nổi thủ công 100%.',
      imageUrl: 'https://i.imgur.com/Xdjwy1A.jpeg',
      isNew: true,
      isBestSeller: true
    },
    {
      id: 4,
      name: 'Bình Gốm Men Mật Chạm Rồng Bay',
      description: 'Sự kết hợp hoàn mỹ giữa dáng hồ lô truyền thống mang ý nghĩa phong thủy tốt lành và lớp men hỏa biến sắc xanh hổ phách kỳ ảo.',
      imageUrl: 'https://i.imgur.com/tK0pTaX.jpeg',
      isNew: true
    },
    {
      id: 5,
      name: 'Bình Gốm Men Rêu Chữ Phúc',
      description: 'Tái hiện nét văn hóa trầu cau Việt Nam với kỹ thuật gốm đắp nổi đặc trưng của nghệ nhân Mỹ Thiện.',
      imageUrl: 'https://i.imgur.com/KBFkxPE.jpeg',
      isBestSeller: true,
      salePercent: 5
    },
    {
      id: 6,
      name: 'Bình Gốm Men Mật Dáng Bầu Chạm Hoa',
      description: 'Vật phẩm tâm linh trang trọng với sắc men hỏa biến kỳ ảo, được chế tác tỉ mỉ để tôn vinh không gian thờ tự.',
      imageUrl: 'https://i.imgur.com/3xLElDm.jpeg',
      salePercent: 10
    },
    {
      id: 7,
      name: 'Chum Gốm Men Mật Quai Tai Cổ Lượn',
      description: 'Hệ thống lỗ thoát sáng được đục tay hoàn toàn, tạo hiệu ứng ánh sáng ấm cúng cho phòng ngủ.',
      imageUrl: 'https://i.imgur.com/2WmCfe7.jpeg',
      salePercent: 20,
      isNew: true
    },
    {
      id: 8,
      name: 'Chum Gốm Men Tro Khắc Hạt Nổi',
      description: 'Vẻ đẹp nguyên bản từ đất sét nung già, giữ trọn hương vị trà đạo truyền thống.',
      imageUrl: 'https://i.imgur.com/AAtTat9.jpeg',
      isBestSeller: true
    },
    {
      id: 9,
      name: 'Chum đựng nước Men Nâu',
      description: 'Biểu tượng của sự thăng tiến và bền bỉ, được khắc họa sống động trên nền men rạn cổ.',
      imageUrl: 'https://dulichquangngai.vn/uploads/news/2023_12/lang-gom-my-thien.jpg',
      salePercent: 12
    },
    {
      id: 10,
      name: 'Bình hoa Dáng Tỏi Men Ngọc',
      description: 'Hình dáng hữu cơ lấy cảm hứng từ cây trái vườn nhà, mang đậm hơi thở làng quê Quảng Ngãi.',
      imageUrl: 'https://resource.kinhtedothi.vn/2021/12/25/trinh.jpg',
      isNew: true
    },
    {
      id: 11,
      name: 'Bình hoa Đắp Nổi Song Long',
      description: 'Tác phẩm điêu khắc gốm dân gian, tái hiện cảnh thanh bình của làng quê Việt Nam xưa.',
      imageUrl: 'https://media.baovanhoa.vn/zoom/600_400/Portals/0/EasyGalleryImages/1/56864/g%E1%BB%91m-1.jpg',
      isBestSeller: true
    },
    {
      id: 12,
      name: 'Bình vôi cổ di sản',
      description: 'Sắc lam truyền thống vẽ tay tỉ mỉ, tạo nét xưa cũ đầy hoài niệm cho mâm cơm gia đình.',
      imageUrl: 'https://resource.kinhtedothi.vn/2024/01/29/fbe69c260171ab2ff26051.jpg',
      salePercent: 15,
      isNew: true
    }
];


interface AuthContextType {
  isLoggedIn: boolean;
  products: Product[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateProductImage: (productId: number, newImageUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateProductImage = (productId: number, newImageUrl: string) => {
    setProducts(currentProducts =>
      currentProducts.map(p =>
        p.id === productId ? { ...p, imageUrl: newImageUrl } : p
      )
    );
  };

  const value = { isLoggedIn, products, login, logout, updateProductImage };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
