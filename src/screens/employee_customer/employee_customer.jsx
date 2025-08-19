import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/button/button.jsx";
import { styles } from "./employee_customer.style.js";
import images from "../../constants/icons.js";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../constants/api.js";

function EmployeeCustomer(props) {
  const { userName, companyId, employeeId } = useAuth(); // dados do contexto de autenticação
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigation = useNavigation();

  const fetchCustomers = async () => {
    if (!companyId) {
      alert("ID da empresa não definido.");
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Token recuperado:", token);

      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      const response = await api.get("/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data?.data?.length > 0) {
        setCustomers(response.data.data);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      alert("Erro ao buscar clientes.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setSearch("");

      setSelectedCustomer(null);
      if (companyId) fetchCustomers();
    }, [companyId])
  );

  // Filtra clientes baseado na busca por nome
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const isButtonDisabled = !selectedCustomer;

  return (
    <View style={styles.container}>
      <Image
        source={images.beelogin}
        style={styles.watermark}
        resizeMode="contain"
        opacity={0.1}
      />
      <View style={styles.banner}>
        <View style={styles.containerbanner}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>

          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {userName}
          </Text>
        </View>
      </View>

      <View style={styles.containerfunc}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            marginBottom: 8,
          }}
        >
          <Text style={styles.title}>Buscar por:</Text>
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearch("");
                setSelectedCustomer(null);
              }}
              style={{ marginLeft: 8 }}
            >
              <Ionicons name="close-circle" size={24} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[
            styles.containerInput,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {filteredCustomers.length === 0 ? (
              <Text style={styles.noCustomersText}>
                Não há clientes cadastrados.
              </Text>
            ) : (
              <FlatList
                data={filteredCustomers}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.customerCard,
                      // Proteja a comparação.
                      // Verifique se selectedCustomer existe antes de tentar acessar 'id'
                      selectedCustomer &&
                        selectedCustomer.id === item.id &&
                        styles.selectedCustomerCard,
                    ]}
                    onPress={() => {
                      setSelectedCustomer(item);
                      setSearch(item.name);
                    }}
                  >
                    <Text style={styles.customerName}>{item.name}</Text>
                    <Text style={styles.customerPhone}>{item.phone}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
          </>
        )}
      </View>

      <View style={styles.containerbtn}>
        <Button
          text="Acessar vendas"
          style={{ width: "48%" }}
          onPress={() =>
            navigation.navigate("Lista de Produtos", {
              employee: employeeId,
              customer: selectedCustomer ?? null,
            })
          }
          disabled={!employeeId}
        />
        <Button
          text="Acessar veículos"
          style={{ width: "48%" }}
          onPress={() => {
            navigation.navigate("Veículos", {
              employee: selectedEmployee,
              customer: selectedCustomer,
            });
          }}
          disabled={isButtonDisabled}
        />
      </View>
    </View>
  );
}

export default EmployeeCustomer;
