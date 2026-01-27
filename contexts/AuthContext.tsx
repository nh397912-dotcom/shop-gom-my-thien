
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product } from '../types';

const initialProducts: Product[] = [
    {
      id: 1,
      name: 'Chum đựng nước Men Nâu',
      description: 'Vật dụng kinh điển của gốm Mỹ Thiện, men nâu mộc mạc giúp giữ nước mát tự nhiên, bền bỉ cùng thời gian.',
      imageUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1200&auto=format&fit=crop',
      isBestSeller: true
    },
    {
      id: 2,
      name: 'Bình hoa Dáng Tỏi Men Ngọc',
      description: 'Thiết kế thanh thoát với sắc men ngọc lục bảo, phù hợp cho không gian trang trí sang trọng và tinh tế.',
      imageUrl: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?q=80&w=1200&auto=format&fit=crop',
      salePercent: 15
    },
    {
      id: 3,
      name: 'Bình hoa Đắp Nổi Song Long',
      description: 'Tác phẩm tâm linh thượng hạng với họa tiết rồng chầu mặt nguyệt được đắp nổi thủ công 100%.',
      imageUrl: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?q=80&w=1200&auto=format&fit=crop',
      isNew: true,
      isBestSeller: true
    },
    {
      id: 4,
      name: 'Bình Gốm Dáng Hồ Lô Men Hỏa Biến',
      description: 'Sự kết hợp hoàn mỹ giữa dáng hồ lô truyền thống mang ý nghĩa phong thủy tốt lành và lớp men hỏa biến sắc xanh hổ phách kỳ ảo.',
      imageUrl: 'https://images.unsplash.com/photo-1525974738374-d4ad5dfb0a24?q=80&w=1200&auto=format&fit=crop',
      isNew: true
    },
    {
      id: 5,
      name: 'Bình vôi cổ di sản',
      description: 'Tái hiện nét văn hóa trầu cau Việt Nam với kỹ thuật gốm đắp nổi đặc trưng của nghệ nhân Mỹ Thiện.',
      imageUrl: 'https://images.unsplash.com/photo-1574367157504-137f7f28ed5f?q=80&w=1200&auto=format&fit=crop',
      isBestSeller: true,
      salePercent: 5
    },
    {
      id: 6,
      name: 'Lư Hương Men Hỏa Biến',
      description: 'Vật phẩm tâm linh trang trọng với sắc men hỏa biến kỳ ảo, được chế tác tỉ mỉ để tôn vinh không gian thờ tự.',
      imageUrl: 'https://images.unsplash.com/photo-1621347065330-671217e923ce?q=80&w=1200&auto=format&fit=crop',
      salePercent: 10
    },
    {
      id: 7,
      name: 'Đèn gốm trang trí Mỹ thuật',
      description: 'Hệ thống lỗ thoát sáng được đục tay hoàn toàn, tạo hiệu ứng ánh sáng ấm cúng cho phòng ngủ.',
      imageUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1200&auto=format&fit=crop',
      salePercent: 20,
      isNew: true
    },
    {
      id: 8,
      name: 'Bộ Ấm Trà Đất Nung Mộc',
      description: 'Vẻ đẹp nguyên bản từ đất sét nung già, giữ trọn hương vị trà đạo truyền thống.',
      imageUrl: 'https://images.unsplash.com/photo-1576020488411-7681625d61aa?q=80&w=1200&auto=format&fit=crop',
      isBestSeller: true
    },
    {
      id: 9,
      name: 'Đĩa Gốm Họa Tiết Cá Chép',
      description: 'Biểu tượng của sự thăng tiến và bền bỉ, được khắc họa sống động trên nền men rạn cổ.',
      imageUrl: 'https://images.unsplash.com/photo-1590374585152-ca0e8194c0d6?q=80&w=1200&auto=format&fit=crop',
      salePercent: 12
    },
    {
      id: 10,
      name: 'Bình Hoa Dáng Đu Đủ Men Xanh',
      description: 'Hình dáng hữu cơ lấy cảm hứng từ cây trái vườn nhà, mang đậm hơi thở làng quê Quảng Ngãi.',
      imageUrl: 'https://images.unsplash.com/photo-1518991043280-1da61d9f3ac5?q=80&w=1200&auto=format&fit=crop',
      isNew: true
    },
    {
      id: 11,
      name: 'Tượng Gốm Mục Đồng Cưỡi Trâu',
      description: 'Tác phẩm điêu khắc gốm dân gian, tái hiện cảnh thanh bình của làng quê Việt Nam xưa.',
      imageUrl: 'https://images.unsplash.com/photo-1621434336021-ff6f2675c74a?q=80&w=1200&auto=format&fit=crop',
      isBestSeller: true
    },
    {
      id: 12,
      name: 'Bát Ăn Cơm Men Lam Cổ',
      description: 'Sắc lam truyền thống vẽ tay tỉ mỉ, tạo nét xưa cũ đầy hoài niệm cho mâm cơm gia đình.',
      imageUrl: 'https://images.unsplash.com/photo-1578749553858-1d1df9955ee1?q=80&w=1200&auto=format&fit=crop',
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
