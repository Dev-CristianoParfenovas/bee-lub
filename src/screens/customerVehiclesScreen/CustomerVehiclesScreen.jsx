import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Button from "../../components/button/button";
import api from "../../constants/api";
import { styles } from "./customer_vehicles.style"; // você pode criar ou adaptar estilos
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";
import { useAuth } from "../../context/AuthContext.jsx";

const CustomerVehiclesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { authToken } = useAuth(); // ✅ Obtendo o token do contexto
  const { customer, employee } = route.params;
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setSelectedVehicle(null);
      return () => setSelectedVehicle(null);
    }, [])
  );

  const fetchVehicles = async () => {
    setLoading(true);

    console.log("Buscando veículos para:", {
      company_id: customer.company_id,
      client_id: customer.id_client, // ✅ Corrigido
    });

    try {
      const response = await api.get(`/vehicles/${customer.id_client}`, {
        headers: { Authorization: `Bearer ${authToken}` }, // ✅ Corrigido
      });
      console.log("Resposta da API:", response.data);

      setVehicles(response.data.data || []);
    } catch (error) {
      console.log("Erro ao buscar veículos:", error);
      alert("Erro ao buscar veículos do cliente.");
    } finally {
      setLoading(false);
    }
  };

  console.log("🚗 Dados recebidos via route.params:", { customer, employee });

  useEffect(() => {
    if (customer?.id_client && authToken) {
      fetchVehicles();
    }
  }, [customer, authToken]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bluebtn }}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={styles.containerbanner}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={30} color="white" />
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>Veículos de {customer.name}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : vehicles.length === 0 ? (
          <Text style={styles.noVehiclesText}>Nenhum veículo cadastrado.</Text>
        ) : (
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id_vehicle.toString()}
            renderItem={({ item }) => {
              const isSelected =
                selectedVehicle?.id_vehicle === item.id_vehicle;
              return (
                <TouchableOpacity
                  style={[
                    styles.vehicleCard,
                    isSelected && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedVehicle(item)}
                >
                  <Text style={styles.vehicleText}>
                    Placa: {item.license_plate}
                  </Text>
                  <Text style={styles.vehicleText}>Modelo: {item.model}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        <View style={styles.containerbtn}>
          <Button
            text="Acessar Vendas"
            onPress={() =>
              navigation.navigate("Lista de Produtos", {
                employee,
                customer,
                vehicle: selectedVehicle,
              })
            }
            disabled={!selectedVehicle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomerVehiclesScreen;
