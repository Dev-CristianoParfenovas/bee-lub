import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Animated,
  Easing,
  ActivityIndicator,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./quick_stock_screen.js";
import { CameraView } from "expo-camera";
import { useCameraPermission } from "../../context/CameraPermissionContext";
import api from "../../constants/api.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TextBox from "../../components/textbox/textbox.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme.js";

function QuickStockScreen() {
  const navigation = useNavigation();
  const { hasPermission, requestPermission, isLoading } = useCameraPermission();
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState([]); // <-- lista de produtos atualizados
  const { authToken, companyId } = useAuth();

  const animation = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      // Ao entrar na tela, limpa a lista
      setUpdatedProducts([]);
    }, [])
  );

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, []);

  useEffect(() => {
    if (isScannerActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ])
      ).start();
    }
  }, [isScannerActive]);

  const handleBarcodeScanned = async (scannedData) => {
    if (scanned) return; // Evita múltiplas leituras
    setScanned(true);

    console.log("Código escaneado:", scannedData);
    setBarcode(scannedData);

    await handleUpdateStock(scannedData);

    setTimeout(() => {
      setScanned(false);
      setIsCameraOpen(false);
      setIsScannerActive(false);
    }, 1000);
  };

  const handleUpdateStock = async (scannedBarcode = barcode) => {
    if (!quantity || !scannedBarcode) {
      Alert.alert(
        "Erro",
        "Preencha a quantidade e escaneie o código de barras."
      );
      return;
    }

    try {
      const response = await api.put(
        "/products/stock/updatestockbarcode",
        {
          quantity: Number(quantity),
          barcode: scannedBarcode,
          company_id: companyId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const updatedProduct = response.data.data;
      console.log("Estoque rapido: " + updatedProduct);
      // Exemplo: { barcode: '123456789', quantity: 15, name: 'Produto X' }

      Alert.alert(
        "Sucesso",
        `Estoque atualizado! Nova quantidade: ${updatedProduct.quantity}`
      );

      // Atualiza a lista de produtos atualizados:
      setUpdatedProducts((prev) => {
        // Se o produto já existe na lista, atualiza, senão adiciona novo
        const index = prev.findIndex(
          (p) => p.barcode === updatedProduct.barcode
        );
        if (index >= 0) {
          const newList = [...prev];
          newList[index] = updatedProduct;
          return newList;
        } else {
          return [updatedProduct, ...prev];
        }
      });

      setQuantity("");
      setBarcode("");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        error.response?.data?.error || "Erro ao atualizar estoque."
      );
    }
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 280],
  });

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Carregando permissões...</Text>
      </View>
    );
  }

  // Render item para FlatList dos produtos atualizados
  const renderProductItem = ({ item }) => (
    <View
      style={{
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 20,
        backgroundColor: "#222",
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
        {item.name || "Produto sem nome"}
      </Text>
      <Text style={{ color: "#ccc" }}>Código de Barras: {item.barcode}</Text>
      <Text style={{ color: "#ccc" }}>
        Quantidade em estoque: {item.quantity}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atualizar Estoque</Text>
      </View>

      <Text
        style={{
          color: COLORS.yellowbee,
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Por favor, insira a qtde. em seguida clique no icone da camera para
        escanear o produto.
      </Text>

      <View style={styles.inputWithIcon}>
        <TextInput
          placeholder="Quantidade"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.searchContainer}>
        {isCameraOpen ? (
          <>
            {Platform.OS === "android" && <StatusBar hidden />}

            <CameraView
              style={styles.camera}
              facing="back"
              onBarcodeScanned={({ data }) => handleBarcodeScanned(data)}
              barCodeScannerSettings={{
                barCodeTypes: [
                  "ean13",
                  "qr",
                  "upce",
                  "code128",
                  "ean8",
                  "pdf417",
                ],
              }}
            >
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
          <>
            <TouchableOpacity onPress={() => setIsCameraOpen(true)}>
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>

            <TextBox
              placeholder="Código de Barras"
              style={styles.searchInput}
              value={barcode}
              onChangeText={setBarcode}
              editable={!isScannerActive}
            />
          </>
        )}
      </View>

      {/* FlatList com os produtos atualizados */}
      {updatedProducts.length > 0 && (
        <>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            Produtos Atualizados
          </Text>
          <FlatList
            data={updatedProducts}
            keyExtractor={(item) => item.barcode}
            renderItem={renderProductItem}
            style={{ width: "100%", marginTop: 10 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

export default QuickStockScreen;
