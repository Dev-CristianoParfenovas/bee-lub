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

export default function SaleDetailScreen({ route }) {
  const { employeeId } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get(
        `/sales/products-by-employee/${employeeId}`
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

  const handleGeneratePDF = async () => {
    const html = `
      <html>
        <body>
          <h1>Produtos da Venda</h1>
          ${products
            .map(
              (p) => `
              <p>
                <strong>${p.name}</strong><br/>
                Quantidade: ${p.quantity}<br/>
                Preço: R$ ${p.price.toFixed(2)}<br/>
                Total: R$ ${(p.quantity * p.price).toFixed(2)}
              </p>
            `
            )
            .join("")}
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
          <FlatList
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={{ borderBottomWidth: 1, paddingVertical: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                <Text>Quantidade: {item.quantity}</Text>
                <Text>Preço: R$ {item.price.toFixed(2)}</Text>
              </View>
            )}
          />

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
