import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientsError, setClientsError] = useState(false);
  const [sales, setSales] = useState([]);
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

  const fetchSales = async () => {
    try {
      const startOfDay = new Date(startDate);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(endDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      let url = `/sales/${companyId}/date-range?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`;

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

      // Log para inspecionar os dados retornados
      console.log("Dados filtrados retornados:", response.data);

      if (response.data && Array.isArray(response.data)) {
        const salesData = response.data.reduce((acc, sale) => {
          const { employee_id, employee_name, total_price } = sale;

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

  useEffect(() => {
    console.log("Selected Employee Changed:", selectedEmployee);
    console.log("Employees List Loaded:", employees);
    console.log("Selected Client Changed:", selectedClient);
    fetchEmployees();
    fetchClients();
    fetchSales();
  }, [selectedEmployee, selectedClient, startDate, endDate]);

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
            console.log("Picker Employee Value:", value); // Verificar valor selecionado
            setSelectedEmployee(value);
          }}
        >
          <Picker.Item key="all" label="Todos" value="all" />
          {employees.map((employee) => {
            console.log("Employee Item:", employee); // Log de cada funcionário
            return (
              <Picker.Item
                key={`employee-${employee.id_employee}`}
                label={employee.name}
                value={employee.id_employee}
              />
            );
          })}
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>Filtrar por Cliente</Text>
      <View style={styles.containerfunc}>
        <Picker
          selectedValue={selectedClient}
          onValueChange={(itemValue) => {
            setSelectedClient(itemValue); // Atualiza o estado do cliente
          }}
        >
          <Picker.Item key="all" label="Todos" value="all" />
          {clientsError ? (
            <Picker.Item
              key="error"
              label="Erro ao carregar clientes"
              value="all"
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
