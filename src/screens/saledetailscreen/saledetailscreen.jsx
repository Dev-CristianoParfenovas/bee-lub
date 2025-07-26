import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import api from "../../constants/api.js"; // ajuste o caminho se necessário
import { useAuth } from "../../context/AuthContext.jsx";

export default function SalesDetailScreen({ route }) {
  const {
    companyId,
    saleId,
    employeeName,
    clientName,
    vehiclePlate,
    startDate,
    endDate,
  } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  const fetchProducts = async () => {
    console.log("companyId:", companyId);
    console.log("saleId:", saleId);

    try {
      const response = await api.get(
        `/sales/${companyId}/products-by-sale/${saleId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // <- tem que ter o token correto aqui
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos da venda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalGeral = products.reduce(
    (acc, item) => acc + Number(item.total_price),
    0
  );

  const handleGeneratePDF = async () => {
    const html = `
      <html>
        <body>
          <h1>Produtos da Venda</h1>
          <p><strong>Funcionário:</strong> ${employeeName || "N/A"}</p>
          <p><strong>Cliente:</strong> ${clientName || "N/A"}</p>
          <p><strong>Placa:</strong> ${vehiclePlate || "N/A"}</p>
          <p><strong>Período:</strong> ${startDate || "N/A"} até ${
      endDate || "N/A"
    }</p>
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

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {/* Cabeçalho com informações extras */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: "bold" }}>
              Funcionário: {employeeName || "N/A"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Cliente: {clientName || "N/A"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Placa: {vehiclePlate || "N/A"}
            </Text>
          </View>

          {/* Lista de produtos */}
          <FlatList
            data={products}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={{ borderBottomWidth: 1, paddingVertical: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{item.product_name}</Text>
                <Text>Quantidade: {item.quantity}</Text>
                <Text>Preço: R$ {Number(item.unit_price).toFixed(2)}</Text>
                <Text>Total: R$ {Number(item.total_price).toFixed(2)}</Text>
              </View>
            )}
          />

          <Text
            style={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            Total da Venda: R$ {totalGeral.toFixed(2)}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#1e90ff",
              padding: 12,
              marginTop: 20,
              borderRadius: 8,
            }}
            onPress={handleGeneratePDF}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Gerar PDF
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
