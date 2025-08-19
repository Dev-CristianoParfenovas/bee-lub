import React, { useCallback, useEffect, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useRoute } from "@react-navigation/native";
import api from "../../constants/api.js";

function Cart(props) {
  const { cartItems, addToCart, removeFromCart, groupCartItems } = useCart();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigation = useNavigation();
  const { userName, employeeId, authToken } = useAuth();

  const route = useRoute();

  const [customer, setCustomer] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  // Atualiza customer/vehicle sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      const params = route.params;

      if (params?.customer || params?.vehicle) {
        setCustomer(params.customer || null);
        setVehicle(params.vehicle || null);
      } else {
        // Se nenhum parâmetro foi enviado, limpa os dados
        setCustomer(null);
        setVehicle(null);
      }
    }, [route.params])
  );

  // Zera customer e vehicle se carrinho for esvaziado
  useEffect(() => {
    if (cartItems.length === 0) {
      setCustomer(null);
      setVehicle(null);

      // Remove dados antigos da rota
      navigation.setParams({
        customer: null,
        vehicle: null,
      });
    }
  }, [cartItems]);

  // Calcula total de itens
  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const incrementQuantity = async (id, company_id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    try {
      const response = await api.get(`/products/stock/  ${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const stockAvailable = response.data.quantity;
      if (item.quantity < stockAvailable) {
        addToCart(item, 1);
      } else {
        alert("Quantidade em estoque insuficiente!");
      }
    } catch (error) {
      console.error("Erro ao buscar estoque:", error);
      alert("Erro ao verificar estoque.");
    }
  };

  const decrementQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      addToCart(item, -1);
    }
  };

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
          {vehicle?.license_plate && vehicle?.model && (
            <Text style={styles.customerText}>
              Placa: {vehicle.license_plate} - Modelo: {vehicle.model}
            </Text>
          )}
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
                      onPress={() =>
                        incrementQuantity(item.id, item.company_id)
                      }
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
              navigation.navigate("Pagto", {
                customer,
                cartItems,
                employeeId: employeeId,
                vehicle: selectedVehicle || vehicle,
              });
            }}
            //disabled={!selectedVehicle}
          />
        </View>
      </View>
    </View>
  );
}

export default Cart;
