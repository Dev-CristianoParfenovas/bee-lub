import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./products.style.js";
import { products } from "../../constants/dados.js";
import { useNavigation } from "@react-navigation/native";
import TextBox from "../../components/textbox/textbox.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import api from "../../constants/api.js";
import { useRoute } from "@react-navigation/native";
import { useCameraPermission } from "../../context/CameraPermissionContext.jsx";
import { CameraView } from "expo-camera";

function Products(props) {
  const { userName } = useAuth();
  const { authToken, companyId, employeeId } = useAuth();
  const [cartCount, setCartCount] = useState(0); // Contador do carrinho
  const [searchText, setSearchText] = useState(""); //Para pesquisa de produtos
  const [loading, setLoading] = useState(false);
  const { addToCart, cartItems } = useCart(); // Usa o contexto do carrinho
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const { hasPermission, requestPermission, isLoading } = useCameraPermission();
  const [barcode, setBarcode] = useState("");
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [scannedCode, setScannedCode] = useState();

  // Pega o customer e employee da navegação
  const route = useRoute();
  const { customer, vehicle } = route.params || {};

  const navigation = useNavigation(); // Hook para acessar a navegação

  // Função para buscar os produtos da API
  const fetchProducts = async () => {
    if (!authToken || !companyId) {
      console.warn("Token ou Company ID ausente.");
      return;
    }

    try {
      setLoading(true); // Inicia o indicador de carregamento
      const response = await api.get(`/products/${companyId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const productsData = response.data;

      console.log("Produtos recebidos:", productsData);

      // Atualiza o estado com os produtos recebidos
      setProducts(productsData);
      setFilteredProducts(productsData); // Inicialmente exibe todos os produtos
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false); // Finaliza o indicador de carregamento
    }
  };

  useEffect(() => {
    console.log("Auth Token:", authToken);
    console.log("Company ID:", companyId);
    console.log("Employee ID: ", employeeId);
    fetchProducts();
  }, [authToken, companyId, employeeId]);

  // Função para quando o item for clicado
  const handlePress = (item) => {
    Alert.alert("Produto", `Você clicou no produto: ${item.name}`);
  };

  // Função para atualizar os produtos com base na pesquisa
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Função para adicionar ao carrinho
  // Adiciona o produto ao carrinho junto com o cliente
  const handleAddToCart = (item) => {
    addToCart(item, 1, customer); // Adiciona o cliente ao carrinho
    Alert.alert("Carrinho", `${item.name} foi adicionado ao carrinho!`, [
      {
        text: "Ir para o carrinho",
        onPress: () => navigation.navigate("Carrinho", { customer, vehicle }),
      },
      { text: "Continuar comprando", style: "cancel" },
    ]);
  };

  // Função para solicitar permissão da câmera
  const handleOpenScanner = async () => {
    if (isLoading) {
      return; // Aguarda enquanto as permissões estão sendo carregadas
    }

    if (hasPermission) {
      setIsCameraOpen(true); // Abre a câmera
      setIsScannerActive(true); // Ativa o scanner
      console.log("Scanner ativado.");
    } else {
      await requestPermission(); // Solicita permissão novamente
      if (!hasPermission) {
        Alert.alert(
          "Permissão Negada",
          "É necessário conceder permissão para acessar a câmera."
        );
      }
    }
  };

  useEffect(() => {
    console.log("hasPermission:", hasPermission); // Verifique se o estado está sendo atualizado corretamente
  }, [hasPermission]);

  // Verifica o estado de carregamento da permissão
  if (isLoading) {
    return <Text>Carregando permissões...</Text>;
  }

  const handleBarcodeScanned = (barcode) => {
    const scannedProduct = products.find(
      (product) => product.barcode === barcode
    );

    if (scannedProduct) {
      handleAddToCart(scannedProduct); // Adiciona o produto ao carrinho
    } else {
      Alert.alert(
        "Produto não encontrado",
        "Nenhum produto corresponde a este código de barras."
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.containerbanner}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.text}>{userName}</Text>
          {/* Botão do Carrinho */}
          <View style={styles.cartContainer}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() =>
                navigation.navigate("Carrinho", { customer, vehicle })
              }
            >
              <Ionicons name="cart-outline" size={30} color="white" />
            </TouchableOpacity>
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.subtitle}>Explore nossos itens exclusivos</Text>
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

      {/* Campo de Pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextBox
          style={styles.searchInput}
          placeholder="Buscar produtos..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.searchContainer}>
        {isCameraOpen ? (
          <>
            {/* Log para depuração */}
            {console.log("Camera Open: ", isCameraOpen)}

            {/* Oculta o StatusBar no Android quando a câmera está aberta */}
            {Platform.OS === "android" && <StatusBar hidden />}

            <CameraView
              style={styles.camera}
              facing="back"
              onBarcodeScanned={({ data }) => {
                console.log(data); // Exibe o código escaneado no console
                setScannedCode(data);
                handleBarcodeScanned(data); // Verifica e adiciona o produto ao carrinho
                setBarcode(data);
                setIsScannerActive(false);
                setIsCameraOpen(false);
                setBarcode("");
              }}
              barCodeScannerSettings={{
                barCodeTypes: [
                  "ean13",
                  "qr",
                  "upce",
                  "code128",
                  "ean8",
                  "pdf417",
                ], // Tipos de códigos de barras suportados
              }}
            >
              {/* Botão para fechar a câmera */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setIsCameraOpen(false);
                  setIsScannerActive(false);
                }}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </CameraView>
          </>
        ) : (
          <View>
            {/* Botão para abrir a câmera */}
            <TouchableOpacity onPress={() => setIsCameraOpen(true)}>
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>

            {/* Campo de texto para o código de barras */}
            <TextBox
              placeholder="Código de Barras"
              style={styles.searchInput}
              value={barcode} // Exibe o código escaneado
              onChangeText={(text) => setBarcode(text)} // Atualiza o estado com o valor digitado
              editable={!isScannerActive} // Campo somente leitura após o escaneamento
            />
          </View>
        )}
      </View>

      {/* Lista de Produtos */}
      <View style={styles.containerproducts}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>R$ {item.price}</Text>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={20}
                      color="white"
                    />
                    <Text style={styles.addToCartText}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

export default Products;
