// SalesDashboard.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./sales_dashboard.style.js";
import images from "../../constants/icons.js";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../../constants/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

const SalesDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedClient, setSelectedClient] = useState("all");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("all");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [allSales, setAllSales] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientsError, setClientsError] = useState(false);
  const [sales, setSales] = useState([]);
  const [idsales, setIdSales] = useState();
  const { userName, companyId, authToken, employeeId } = useAuth();
  const navigation = useNavigation();

  const fetchEmployees = async () => {
    try {
      const response = await api.get(`/employees/${companyId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários: ", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await api.get(`/clients/${companyId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data && Array.isArray(response.data.data)) {
        setClients(response.data.data);
        setClientsError(false);
      } else {
        setClientsError(true);
        console.error(
          "Clientes não encontrados, formato inesperado:",
          response.data
        );
      }
    } catch (error) {
      setClientsError(true);
      console.error("Erro ao buscar clientes: ", error);
    }
  };

  // Buscar veículos do cliente selecionado
  // Atualize a função fetchVehicles para usar o authToken do contexto
  const fetchVehicles = async (clientId) => {
    if (!clientId || clientId === "all") {
      setVehicles([]);
      // setVehiclePlate("");
      return;
    }

    try {
      const response = await api.get(`/vehicles/${companyId}/${clientId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.data && Array.isArray(response.data.data)) {
        setVehicles(response.data.data);
        setVehiclePlate(""); // Reseta filtro de placa ao buscar novos veículos
      } else {
        setVehicles([]);
        // setVehiclePlate("");
        console.error(
          "Veículos não encontrados ou formato inesperado:",
          response.data
        );
      }
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      setVehicles([]);
      // setVehiclePlate("");
    }
  };

  const fetchSales = async () => {
    try {
      const startOfDay = new Date(startDate);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(endDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // Monta a URL base com datas
      let url = `/sales/${companyId}/date-range?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`;

      const idsales = sales.id;
      console.log("ID DA VENDA: " + idsales);

      // Verifica se veículo foi selecionado e adiciona filtro
      if (
        selectedVehicle &&
        selectedVehicle !== "all" &&
        selectedVehicle !== "none"
      ) {
        // Opcional: garantir que o veículo exista no array local
        const vehicle = vehicles.find(
          (v) => v.id_vehicle === Number(selectedVehicle)
        );
        if (!vehicle) {
          console.warn("Veículo não encontrado.");
          setFilteredData([]);
          return;
        }
        url += `&vehicle_id=${vehicle.id_vehicle}`;
      }

      // Outros filtros opcionais
      if (selectedEmployee && selectedEmployee !== "all") {
        url += `&employee_id=${selectedEmployee}`;
      }

      if (selectedClient && selectedClient !== "all") {
        url += `&client_id=${selectedClient}`;
      }

      console.log("URL para fetchSales:", url);

      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      console.log("Dados retornados:", response.data);

      if (response.data && Array.isArray(response.data)) {
        setAllSales(response.data); // guarda todas as vendas planas
        const salesData = response.data.reduce((acc, sale) => {
          const { employee_id, employee_name, total_price } = sale;

          console.log("Resposta completa das vendas:", response.data);

          if (!acc[employee_id]) {
            acc[employee_id] = {
              employeeId: employee_id,
              name: employee_name || "Nome não informado",
              totalSales: 0,
            };
          }

          acc[employee_id].totalSales += parseFloat(total_price) || 0;
          return acc;
        }, {});

        setFilteredData(Object.values(salesData));
      } else {
        console.warn("Formato inesperado nos dados de vendas:", response.data);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      setFilteredData([]);
    }
  };

  // Carregar funcionários e clientes uma vez ao montar
  useEffect(() => {
    fetchEmployees();
    fetchClients();
  }, []);

  // Atualizar veículos quando o cliente selecionado mudar
  useEffect(() => {
    if (selectedClient && selectedClient !== "all") {
      fetchVehicles(selectedClient);
    } else {
      setVehicles([]);
      setSelectedVehicle("none"); // Resetar seleção ao limpar veículos
    }
  }, [selectedClient]);

  // Atualizar vendas quando filtros mudam
  useEffect(() => {
    fetchSales();
  }, [
    selectedEmployee,
    selectedClient,
    startDate,
    endDate,
    //vehiclePlate,
    selectedVehicle,
  ]);

  // Ajustar seleção de veículo quando a lista de veículos muda
  useEffect(() => {
    if (vehicles.length > 0) {
      setSelectedVehicle("all");
    } else {
      setSelectedVehicle("none");
    }
  }, [vehicles]);

  // Derivar nome do cliente selecionado
  const selectedClientName =
    clients.find((c) => c.id_client === selectedClient)?.name || "";

  // Derivar placa do veículo selecionado
  const selectedVehiclePlate =
    vehicles.find((v) => String(v.id_vehicle) === selectedVehicle)
      ?.license_plate || "";

  //Função para UUID
  function isValidUUID(uuid) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  return (
    <View style={styles.container}>
      <Image
        source={images.beelogin}
        style={styles.watermark}
        resizeMode="contain"
        opacity={0.1}
      />
      <View style={styles.containerbanner}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Icon style={styles.icone} name="chart-bar" size={24} color="#FFF" />
        <Text style={styles.text}> Painel de Vendas</Text>
      </View>

      <Text style={styles.sectionTitle}>Filtrar por Funcionário</Text>
      <View style={styles.containerfunc}>
        <Picker
          selectedValue={selectedEmployee}
          onValueChange={(value) => {
            setSelectedEmployee(value);
          }}
        >
          <Picker.Item key="all" label="Todos" value="all" />
          {employees.map((employee) => (
            <Picker.Item
              key={`employee-${employee.id_employee}`}
              label={employee.name}
              value={employee.id_employee}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>Filtrar por Cliente</Text>
      <View style={styles.containerfunc}>
        <Picker
          style={styles.picker}
          selectedValue={selectedClient}
          onValueChange={(itemValue) => setSelectedClient(itemValue)}
        >
          <Picker.Item label="Todos" value="" />
          {clientsError ? (
            <Picker.Item
              key="error"
              label="Erro ao carregar clientes"
              value=""
            />
          ) : (
            clients.map((client) => (
              <Picker.Item
                key={`client-${client.id_client}`}
                label={client.name}
                value={client.id_client}
              />
            ))
          )}
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>Filtrar por Placa do Veículo</Text>
      <View style={styles.containerfunc}>
        <Picker
          selectedValue={selectedVehicle}
          onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
        >
          <Picker.Item key="all" label="Todos" value="all" />
          {vehicles.length === 0 ? (
            <Picker.Item
              key="empty"
              label="Nenhum veículo disponível"
              value="none"
            />
          ) : (
            vehicles.map((vehicle) => (
              <Picker.Item
                key={vehicle.id_vehicle}
                label={`${vehicle.license_plate} - ${vehicle.model}`}
                value={String(vehicle.id_vehicle)}
              />
            ))
          )}
        </Picker>
      </View>

      <View style={styles.employeeText}>
        {selectedClient !== "all" && (
          <Text style={styles.selectedEmployeeText}>
            Cliente Selecionado:{" "}
            {clients.find((c) => c.id_client === selectedClient)?.name ||
              "Desconhecido"}
          </Text>
        )}
      </View>

      <View style={styles.dateFilters}>
        <View style={styles.datePicker}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text
              style={styles.customButtonText}
            >{`Data Inicial: ${startDate.toLocaleDateString()}`}</Text>
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
            <Text
              style={styles.customButtonText}
            >{`Data Final: ${endDate.toLocaleDateString()}`}</Text>
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

        <View style={styles.filterButtonContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={fetchSales}>
            <Text style={styles.filterButtonText}>Aplicar Filtro</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.orderSummary}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => String(item.employeeId)}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.name || "Nome não disponível"}
              </Text>
              <Text style={styles.itemPrice}>
                R$ {item.totalSales.toFixed(2)}
              </Text>

              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => {
                  const firstSale = allSales.find(
                    (sale) => sale.employee_id === item.employeeId
                  );

                  if (firstSale) {
                    console.log("firstSale completo:", firstSale);

                    console.log(
                      "sale_group_id encontrado:",
                      firstSale.sale_group_id
                    );

                    if (!isValidUUID(firstSale.sale_group_id)) {
                      alert("ID da venda inválido.");
                      return;
                    }

                    navigation.navigate("SaleDetail", {
                      saleGroupId: firstSale.sale_group_id,
                      companyId,
                      startDate: startDate.toISOString(),
                      endDate: endDate.toISOString(),
                      employeeName: item.name,
                      clientName: selectedClientName,
                      vehiclePlate: selectedVehiclePlate,
                      vehicleModel:
                        firstSale.vehicle_model &&
                        firstSale.vehicle_model.trim() !== ""
                          ? firstSale.vehicle_model
                          : "Modelo não informado",
                    });
                  } else {
                    alert("Nenhuma venda encontrada para este funcionário.");
                  }
                }}
              >
                <Text style={styles.detailButtonText}>Ver Detalhes</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyMessage}>
              Nenhum funcionário ou cliente encontrado para o período
              selecionado.
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default SalesDashboard;
