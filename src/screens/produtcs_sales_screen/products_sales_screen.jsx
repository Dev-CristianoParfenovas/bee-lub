import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./products_sales_screen";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../constants/api";
import images from "../../constants/icons.js"; // Se você tiver um logo

const ProductsSalesScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { companyId, authToken } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMostSoldProducts = async () => {
      setLoading(true);
      try {
        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setUTCDate(end.getUTCDate() + 1); // Avança um dia
        end.setUTCHours(0, 0, 0, 0);

        const response = await api.get(`/sales/most-sold`, {
          headers: { Authorization: `Bearer ${authToken}` },
          params: {
            startDate: start.toISOString(),
            endDate: end.toISOString(),
          },
        });

        console.log("Resposta da API:", response.data);

        setProductData(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar produtos mais vendidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostSoldProducts();
  }, [startDate, endDate, authToken]);

  /*useEffect(() => {
    fetchMostSoldProducts();
  }, [fetchMostSoldProducts]);*/

  return (
    <View style={styles.container}>
      <Image
        source={images.beelogin}
        style={styles.watermark}
        resizeMode="contain"
        opacity={0.1}
      />

      {/* Banner Superior */}
      <View style={styles.containerbanner}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Icon style={styles.icone} name="box" size={24} color="#FFF" />
        <Text style={styles.text}>Produtos Mais Vendidos</Text>
      </View>

      {/* Filtro de Datas */}
      <View style={styles.dateFilters}>
        <View style={styles.datePicker}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={styles.customButtonText}>
              Data Inicial: {startDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}
        </View>

        <View style={styles.datePicker}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={styles.customButtonText}>
              Data Final: {endDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
            />
          )}
        </View>
      </View>

      {/* Lista de Produtos */}
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={productData}
            keyExtractor={(item) => String(item.product_id)}
            renderItem={({ item }) => {
              const unitPrice =
                parseFloat(item.total_revenue) /
                parseInt(item.total_quantity, 10);

              return (
                <View style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.product_name}</Text>
                  <Text style={styles.itemPrice}>
                    R$ {unitPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.itemQuantity}>
                    x{item.total_quantity}
                  </Text>
                  <Text style={styles.itemPrice}>
                    R$ {parseFloat(item.total_revenue).toFixed(2)}
                  </Text>
                </View>
              );
            }}
            ListEmptyComponent={() => (
              <Text style={styles.emptyMessage}>
                Nenhum produto vendido no período.
              </Text>
            )}
          />
        )}
      </View>

      {/* Rodapé fixo */}
      {productData.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Qtde Total:{" "}
            {productData.reduce(
              (sum, item) => sum + parseInt(item.total_quantity, 10),
              0
            )}
          </Text>
          <Text style={styles.footerValue}>
            Total Geral: R${" "}
            {productData
              .reduce((sum, item) => sum + parseFloat(item.total_revenue), 0)
              .toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductsSalesScreen;
