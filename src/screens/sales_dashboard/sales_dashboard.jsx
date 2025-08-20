// SalesDashboard.js

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./sales_dashboard.style.js";
import images from "../../constants/icons.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
  const [loadingSales, setLoadingSales] = useState(false);
  const [sales, setSales] = useState([]);
  const [idsales, setIdSales] = useState();
  const { userName, companyId, authToken, employeeId } = useAuth();
  const navigation = useNavigation();

  // Função chamada quando o Picker de cliente muda
  const handleClientChange = (value) => {
    setSelectedClient(value);
    // Ao selecionar um cliente, também resete o filtro de funcionário, se necessário
    if (value === "all") {
      setSelectedEmployee("all");
    }
  };

  // Função chamada quando o Picker de funcionário muda
  const handleEmployeeChange = (value) => {
    setSelectedEmployee(value);
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários: ", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await api.get("/clients", {
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
      const response = await api.get(`/vehicles/${clientId}`, {
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

  /* 160825 const fetchSales = async ({clientId, employeeId, vehicleId}) => {
    try {
      const startOfDay = new Date(startDate);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(endDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // Monta a URL base com datas
      let url = `/sales/date-range?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`;

      if (employeeId) url += `&employee_id=${employeeId}`;
      if (clientId) url += `&client_id=${clientId}`;
      if (vehicleId) url += `&vehicle_id=${vehicleId}`;

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
  };*/

  const fetchSales = async ({ clientId, employeeId, vehicleId }) => {
    // 1. Ativa o estado de carregamento no início da função
    setLoadingSales(true);
    try {
      const startOfDay = new Date(startDate);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(endDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      let url = `/sales/date-range?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`;

      if (employeeId) url += `&employee_id=${employeeId}`;
      if (clientId) url += `&client_id=${clientId}`;
      if (vehicleId) url += `&vehicle_id=${vehicleId}`;

      console.log("URL para fetchSales:", url);

      // Limpe o estado antes de cada nova requisição para evitar que dados antigos
      // sejam exibidos caso a nova requisição falhe ou retorne dados incompletos.
      setAllSales([]);
      setFilteredData([]);

      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (Array.isArray(response.data)) {
        setAllSales(response.data);

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
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      setFilteredData([]);
    } finally {
      // 2. Desativa o estado de carregamento no final,
      // garantindo que ele seja desativado em qualquer cenário (sucesso ou erro)
      setLoadingSales(false);
    }
  };

  // Este useEffect está correto. Ele é responsável por carregar os dados
  // iniciais (funcionários e clientes) quando a tela é montada.
  useEffect(() => {
    fetchEmployees();
    fetchClients();
  }, []);

  // Este useEffect usa useFocusEffect para garantir que os filtros sejam
  // resetados toda vez que a tela é acessada. Também está correto.
  useFocusEffect(
    useCallback(() => {
      setSelectedClient("all");
      setSelectedEmployee("all");
      setSelectedVehicle("all");
      setStartDate(new Date());
      setEndDate(new Date());
      setVehicles([]);
    }, [])
  );

  // ----------------------------------------------------

  // NOVO: Este é o bloco que resolve o problema do loop.
  // Ele é acionado quando selectedClient ou selectedEmployee mudam.
  // A lógica é separada para evitar um loop infinito.
  // Quando o cliente é "all", o funcionário é resetado para "all".
  useEffect(() => {
    if (selectedClient === "all") {
      setSelectedEmployee("all");
    }
  }, [selectedClient]);

  // Quando o funcionário é "all", o cliente é resetado para "all".
  // Isso garante que os filtros não sejam aplicados isoladamente.
  useEffect(() => {
    if (selectedEmployee === "all") {
      setSelectedClient("all");
    }
  }, [selectedEmployee]);

  // ----------------------------------------------------

  // Este useEffect está correto. Ele é acionado quando o selectedClient muda
  // e busca os veículos para o cliente selecionado. Se for "all", limpa a lista.
  useEffect(() => {
    if (selectedClient && selectedClient !== "all") {
      fetchVehicles(selectedClient);
    } else {
      setVehicles([]);
      setSelectedVehicle("all");
    }
  }, [selectedClient]);

  // ----------------------------------------------------

  // Este é o useEffect principal. Ele está correto e é o único responsável
  // por chamar a API de vendas com os parâmetros de filtro.
  // Ele reage a qualquer mudança em qualquer um dos estados de filtro.
  useEffect(() => {
    // Converte 'all' para undefined para que a URL de busca não inclua o filtro.
    const client = selectedClient === "all" ? undefined : selectedClient;
    const employee = selectedEmployee === "all" ? undefined : selectedEmployee;
    const vehicle = selectedVehicle === "all" ? undefined : selectedVehicle;

    // Aciona a busca com os parâmetros atualizados.
    fetchSales({
      clientId: client,
      employeeId: employee,
      vehicleId: vehicle,
    });
  }, [selectedClient, selectedEmployee, selectedVehicle, startDate, endDate]);

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
          {/* Corrija o valor de "Todos" para "all" */}
          <Picker.Item label="Todos" value="all" />
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

      <View style={styles.containervendas}>
        <View style={styles.orderSummary}>
          {loadingSales ? (
            <View style={styles.carregandoTela}>
              <ActivityIndicator size="large" color="#2e3192" />
              <Text style={styles.textCarregando}>Carregando...</Text>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => String(item.employeeId)}
              showsVerticalScrollIndicator={false} // remove a barra de rolagem
              contentContainerStyle={{
                paddingBottom: 20,
              }}
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
                        alert(
                          "Nenhuma venda encontrada para este funcionário."
                        );
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
          )}
        </View>
      </View>
    </View>
  );
};

export default SalesDashboard;
