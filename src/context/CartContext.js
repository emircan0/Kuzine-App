import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Sepet öğeleri
  const [favorites, setFavorites] = useState([]); // Favori mutfaklar

  // Sepete ürün ekleme
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.chefId === item.chefId); // Hem id hem de chefId'yi kontrol et
      if (existingItem) {
        // Eğer ürün zaten varsa, miktarını artır
        return prevItems.map((i) =>
          i.id === item.id && i.chefId === item.chefId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Eğer ürün yoksa, yeni bir öğe ekle
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Sepetten ürün çıkarma
  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.chefId === item.chefId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Eğer miktar 1'den büyükse, miktarı azalt
          return prevItems.map((i) =>
            i.id === item.id && i.chefId === item.chefId ? { ...i, quantity: i.quantity - 1 } : i
          );
        } else {
          // Eğer miktar 1 ise, öğeyi tamamen sil
          return prevItems.filter((i) => i.id !== item.id || i.chefId !== item.chefId);
        }
      }
      return prevItems;
    });
  };

  // Sepeti temizleme
  const clearCart = () => {
    setCartItems([]); // Sepeti boşalt
  };

  // Miktar güncelleme
  const updateQuantity = (item, quantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((i) =>
        i.id === item.id && i.chefId === item.chefId ? { ...i, quantity } : i
      );
    });
  };

  // Favorilere ürün ekleme
  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.find((i) => i.id === item.id)) {
        return [...prevFavorites, item]; // Favorilere ekle
      }
      return prevFavorites; // Zaten varsa, ekleme
    });
  };

  // Favorilerden ürün çıkarma
  const removeFromFavorites = (item) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((i) => i.id !== item.id) // Favorilerden kaldır
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      updateQuantity, // updateQuantity burada sağlanmalı
      addToFavorites, 
      removeFromFavorites, 
      favorites 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
