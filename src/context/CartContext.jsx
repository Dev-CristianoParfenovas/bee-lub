import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        // Se a nova quantidade for 0 ou negativa, remove o item
        if (newQuantity <= 0) {
          return prevItems.filter((item) => item.id !== product.id);
        }
        // Atualiza a quantidade do item existente
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      // Adiciona um novo item ao carrinho
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => setCartItems([]);

  // Função para agrupar itens do carrinho por cliente e veículo
  const groupCartItems = (cartItems) => {
    const groups = [];

    cartItems.forEach((item) => {
      const { customer, vehicle } = item; // supondo que o item tenha essas propriedades

      // Tenta encontrar grupo com cliente e veículo iguais
      let group = groups.find(
        (g) => g.customer?.id === customer?.id && g.vehicle?.id === vehicle?.id
      );

      if (!group) {
        group = { customer, vehicle, items: [] };
        groups.push(group);
      }

      group.items.push(item);
    });

    return groups;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        groupCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
