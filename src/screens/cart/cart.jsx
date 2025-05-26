import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./cart.style.js";
import { products } from "../../constants/dados.js";
import ButtonPaymentCart from "../../components/button_payment_cart/button_payment_cart.jsx";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useRoute } from "@react-navigation/native";

function Cart(props) {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const navigation = useNavigation(); // Hook para acessar a navegação
  const { userName, employeeId } = useAuth();

  // Pega o customer e employee da navegação
  const route = useRoute();
  const { customer } = route.params || {};

  console.log("Customer:", customer);
  console.log("EmployeeId no contexto:", employeeId);

  // Função para calcular o total de itens no carrinho
  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  // Função para incrementar a quantidade
  const incrementQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      addToCart(item, 1); // Passa 1 para incrementar a quantidade
    }
  };

  // Função para decrementar a quantidade
  const decrementQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      addToCart(item, -1); // Passa -1 para reduzir a quantidade
    }
  };

  // Função para remover o item do carrinho
  const removeItem = (id) => {
    Alert.alert("Remover item", "Deseja realmente remover este item?", [
      { text: "Cancelar" },
      {
        text: "Remover",
        onPress: () => {
          removeFromCart(id);
        },
      },
    ]);
  };

  // Calcular o valor total do carrinho
  const calculateTotal = () =>
    cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("R$", "").replace(",", "."));
      return total + price * item.quantity;
    }, 0);

  return (
    <View style={styles.container}>
      {/* Banner no topo */}
      <View style={styles.banner}>
        <View style={styles.containerbanner}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.text}>{userName}</Text>
          <View style={styles.cartIconContainer}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => Alert.alert("Ação do Carrinho")}
            >
              <Ionicons name="cart-outline" size={30} color="white" />
            </TouchableOpacity>
            {getCartCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Exibir Nome do Cliente apenas se definido */}
      {customer && (
        <View style={styles.customerBanner}>
          <Text style={styles.customerText}>Cliente: {customer.name}</Text>
        </View>
      )}

      {/* Se o carrinho estiver vazio, exibe mensagem */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartBanner}>
          <Text style={styles.emptyCartText}>Não há produtos no carrinho</Text>
        </View>
      ) : (
        <View style={styles.containerproducts}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.price}>
                    R${" "}
                    {(
                      parseFloat(
                        item.price.replace("R$", "").replace(",", ".")
                      ) * item.quantity
                    ).toFixed(2)}
                  </Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.btnSmall}
                      onPress={() => decrementQuantity(item.id)}
                    >
                      <Text style={styles.btnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.btnSmall}
                      onPress={() => incrementQuantity(item.id)}
                    >
                      <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalValue}>R$ {calculateTotal().toFixed(2)}</Text>
        <View>
          <ButtonPaymentCart
            text="Pagamento"
            onPress={() => {
              console.log("customer:", customer); // Verifique se o customer está definido
              console.log("cartItems:", cartItems); // Verifique se o cartItems está definido
              console.log("employeeId na navegação:", employeeId);
              navigation.navigate("Pagamento", {
                customer,
                cartItems,
                employeeId: employeeId,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default Cart;
