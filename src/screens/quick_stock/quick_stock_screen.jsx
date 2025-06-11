import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Animated,
  Easing,
  ActivityIndicator,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { styles } from "./quick_stock_screen.js";
import { CameraView } from "expo-camera";
import { useCameraPermission } from "../../context/CameraPermissionContext";
import api from "../../constants/api.js";
import { useNavigation } from "@react-navigation/native";
import TextBox from "../../components/textbox/textbox.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext.jsx";

function QuickStockScreen() {
  const navigation = useNavigation();
  const { hasPermission, requestPermission, isLoading } = useCameraPermission();
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scanned, setScannedCode] = useState(false);
  const { authToken, companyId, employeeId } = useAuth();

  const company_id = 1; // Substitua conforme necessário

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
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

  const handleOpenScanner = async () => {
    if (isLoading) return;

    if (hasPermission) {
      setIsScannerActive(true);
      setScannedCode(false);
    } else {
      await requestPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permissão Negada",
          "É necessário conceder permissão para acessar a câmera."
        );
      }
    }
  };

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

  const handleUpdateStock = async (scannedBarcode = barcode) => {
    if (!quantity || !scannedBarcode) {
      Alert.alert(
        "Erro",
        "Preencha a quantidade e escaneie o código de barras."
      );
      return;
    }

    try {
      console.log("Dados enviados:", {
        quantity: Number(quantity),
        barcode: scannedBarcode,
        company_id: companyId,
      });

      // const token = await AsyncStorage.getItem("authToken");
      const response = await api.put(
        "/update-stock-by-barcode",
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

      Alert.alert(
        "Sucesso",
        `Estoque atualizado! Nova quantidade: ${response.data.data.quantity}`
      );
      setQuantity("");
      setBarcode("");
      setScannedCode(false);
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
        <ActivityIndicator size="large" color={COLORS.white} />
        <Text style={styles.text}>Carregando permissões...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontWeight: "bold", marginBottom: 20 }]}>
        Atualizar Estoque Rápido
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
            {/* Log para depuração */}
            {console.log("Camera Open: ", isCameraOpen)}

            {/* Oculta o StatusBar no Android quando a câmera está aberta */}
            {Platform.OS === "android" && <StatusBar hidden />}

            <CameraView
              style={styles.camera}
              facing="back"
              onBarcodeScanned={({ data }) => {
                console.log("Escaneado:", data); // Exibe o código escaneado no console
                setScannedCode(data);
                setBarcode(data);
                handleUpdateStock(data); // chama atualização direto
                setIsScannerActive(false);
                setIsCameraOpen(false);
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
          <>
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
          </>
        )}
      </View>
    </View>
  );
}
export default QuickStockScreen;
