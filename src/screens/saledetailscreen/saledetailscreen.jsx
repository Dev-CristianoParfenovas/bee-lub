import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import api from "../../constants/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { styles } from "./saledetailscreen.js";

//FUNÇÃO PARA FORMATAR DATAS
function formatDate(dateString) {
  if (!dateString) return "N/A";
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function SalesDetailScreen({ route }) {
  console.log("route.params:", route.params);
  const {
    saleGroupId,
    employeeName,
    clientName,
    vehicleModel,
    vehiclePlate,
    startDate,
    endDate,
  } = route.params;

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/sales/products-by-sale/${saleGroupId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("API response:", response.data);
      // Verifica se tem `.data` dentro de `.data`, senão usa direto
      const items = response.data?.data ?? response.data ?? [];
      console.log("Log do frontend: " + response.data);
      setProducts(items);
    } catch (error) {
      console.error("Erro ao buscar produtos da venda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (saleGroupId) {
      fetchProducts();
    }
  }, [saleGroupId]);

  const totalGeral = products.reduce(
    (acc, item) => acc + Number(item.total_price ?? 0),
    0
  );

  const handleGeneratePDF = async () => {
    const html = `
      <html>
        <body>
          <h1>Produtos da Venda</h1>
          <p><strong>Funcionário:</strong> ${employeeName || "N/A"}</p>
          <p><strong>Cliente:</strong> ${clientName || "N/A"}</p>
          <p><strong>Veículo:</strong> ${vehiclePlate || "N/A"} - ${
      vehicleModel || "N/A"
    }</p>
          <p><strong>Período:</strong> ${formattedStartDate} até ${formattedEndDate}</p>
          <hr />
          ${products
            .map(
              (p) => `
              <p>
                <strong>${p.product_name}</strong><br/>
                Quantidade: ${p.quantity}<br/>
                Preço: R$ ${Number(p.unit_price).toFixed(2)}<br/>
                Total: R$ ${Number(p.total_price).toFixed(2)}
              </p>
            `
            )
            .join("")}
          <hr />
          <h2>Total da Venda: R$ ${totalGeral.toFixed(2)}</h2>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  const renderItem = ({ item }) => (
    <View style={{ borderBottomWidth: 1, paddingVertical: 8 }}>
      <Text style={{ fontWeight: "bold" }}>{item.product_name}</Text>
      <Text>Quantidade: {item.quantity}</Text>
      <Text>Preço: R$ {Number(item.unit_price).toFixed(2)}</Text>
      <Text>Total: R$ {Number(item.total_price).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerbanner}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Icon style={styles.icone} name="chart-bar" size={24} color="#FFF" />
        <Text style={styles.text}> Detalhe de Vendas</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.containerdados}>
            <Text style={{ fontWeight: "bold" }}>
              Funcionário: {employeeName || "N/A"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Cliente: {clientName || "N/A"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Veículo: {vehiclePlate || "N/A"} - {vehicleModel || "N/A"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Período: {new Date(startDate).toLocaleDateString("pt-BR")} até{" "}
              {new Date(endDate).toLocaleDateString("pt-BR")}
            </Text>
          </View>

          <View style={styles.containerproducts}>
            <FlatList
              data={products}
              keyExtractor={(item, index) => String(index)}
              renderItem={renderItem}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.totalVenda}>
              Total da Venda: R$ {totalGeral.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.buttonPDF}
              onPress={handleGeneratePDF}
            >
              <Text style={styles.buttonPDFText}>Gerar PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
