
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product } from '../types';

const initialProducts: Product[] = [
    {
      id: 1,
      name: 'Chum đựng nước Men Nâu',
      description: 'Vật dụng kinh điển của gốm Mỹ Thiện, men nâu mộc mạc giúp giữ nước mát tự nhiên, bền bỉ cùng thời gian.',
      imageUrl: 'https://dulichquangngai.vn/uploads/news/2023_12/lang-gom-my-thien.jpg',
    },
    {
      id: 2,
      name: 'Bình hoa Dáng Tỏi Men Ngọc',
      description: 'Thiết kế thanh thoát với sắc men ngọc lục bảo, phù hợp cho không gian trang trí sang trọng và tinh tế.',
      imageUrl: 'https://resource.kinhtedothi.vn/2021/12/25/trinh.jpg',
    },
    {
      id: 3,
      name: 'Bình hoa Đắp Nổi Song Long',
      description: 'Tác phẩm tâm linh thượng hạng với họa tiết rồng chầu mặt nguyệt được đắp nổi thủ công 100%.',
      imageUrl: 'https://media.baovanhoa.vn/zoom/600_400/Portals/0/EasyGalleryImages/1/56864/g%E1%BB%91m-1.jpg',
    },
    {
      id: 4,
      name: 'Bộ tách trà Men Hỏa Biến',
      description: 'Sự kỳ diệu của nhiệt độ tạo nên sắc màu không bao giờ lặp lại, mang lại trải nghiệm thưởng trà đẳng cấp.',
      imageUrl: 'https://images.unsplash.com/photo-1576020488410-21149ba0140a?q=80&w=1200&auto=format&fit=crop',
    },
     {
      id: 5,
      name: 'Bình vôi cổ di sản',
      description: 'Tái hiện nét văn hóa trầu cau Việt Nam với kỹ thuật gốm đắp nổi đặc trưng của nghệ nhân Mỹ Thiện.',
      imageUrl: 'https://resource.kinhtedothi.vn/2024/01/29/fbe69c260171ab2ff26051.jpg',
    },
     {
      id: 6,
      name: 'Lư Hương Men Hỏa Biến',
      description: 'Vật phẩm tâm linh trang trọng với sắc men hỏa biến kỳ ảo, được chế tác tỉ mỉ để tôn vinh không gian thờ tự.',
      imageUrl: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 7,
      name: 'Đèn gốm trang trí Mỹ thuật',
      description: 'Hệ thống lỗ thoát sáng được đục tay hoàn toàn, tạo hiệu ứng ánh sáng ấm cúng cho phòng ngủ.',
      imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 8,
      name: 'Lu nước Cỡ đại Men Rạn',
      description: 'Tác phẩm ngoại thất hoành tráng với men rạn cổ điển, khẳng định gu thẩm mỹ di sản của gia chủ.',
      imageUrl: 'https://images.unsplash.com/photo-1590424744257-fdb035767566?q=80&w=1200&auto=format&fit=crop',
    },
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
    // In a real app, you'd use a proper auth system.
    // Here, we'll use simple hardcoded credentials.
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
