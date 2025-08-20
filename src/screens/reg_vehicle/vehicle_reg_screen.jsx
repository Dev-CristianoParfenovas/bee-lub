import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import { styles } from "./vehicle_reg.style.js";
import { COLORS } from "../../constants/theme.js";
import icons from "../../constants/icons.js";
import api from "../../constants/api.js";

import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Picker } from "@react-native-picker/picker";

function Vehicle(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { companyId } = useAuth();
  const { customerId } = route.params || {};

  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(
    String(customerId || "")
  );
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [clientsError, setClientsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    placa: "",
    ano: "",
    cor: "",
  });
  const [vehicles, setVehicles] = useState([]);

  // Buscar clientes
  const fetchClients = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Erro", "Token não encontrado.");
        return;
      }

      const response = await api.get("/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data.data)) {
        setClients(response.data.data);
        setClientsError(false);
      } else {
        setClientsError(true);
        console.error(
          "Clientes não encontrados ou formato inesperado:",
          response.data
        );
      }
    } catch (error) {
      setClientsError(true);
      console.error("Erro ao buscar clientes:", error);
      Alert.alert("Erro", "Não foi possível carregar os clientes.");
    }
  };

  // Buscar veículos do cliente selecionado
  const fetchVehicles = async (clientId) => {
    setLoadingVehicles(true);
    if (!clientId) {
      setVehicles([]);
      // Adiciona um pequeno delay antes de desligar o carregamento
      setTimeout(() => {
        setLoadingVehicles(false);
      }, 500); // 500ms de delay
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Erro", "Token não encontrado.");
        setTimeout(() => {
          setLoadingVehicles(false);
        }, 500);
        return;
      }

      const response = await api.get(`/vehicles/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data.data)) {
        setVehicles(response.data.data);
      } else {
        setVehicles([]);
        console.error(
          "Veículos não encontrados ou formato inesperado:",
          response.data
        );
      }
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      Alert.alert("Erro", "Não foi possível carregar os veículos.");
    } finally {
      // Adiciona o delay aqui também para garantir a visualização
      setTimeout(() => {
        setLoadingVehicles(false);
      }, 500); // 500ms de delay
    }
  };

  // Limpar picker ao entrar e sair da tela
  /*useFocusEffect(
    React.useCallback(() => {
      // Se veio customerId por parâmetro, já setar como selecionado
      if (!customerId) {
        setSelectedClientId("");
      }

      return () => {
        setSelectedClientId("");
      };
    }, [customerId])
  );*/

  useFocusEffect(
    React.useCallback(() => {
      // Ao entrar na tela, sempre limpe o estado. Isso força o `useEffect`
      // a ser ativado e limpar a lista.
      setSelectedClientId("");
    }, [])
  );

  // Buscar clientes na montagem do componente e quando companyId mudar
  useEffect(() => {
    if (companyId) {
      fetchClients();
    }
  }, [companyId]);

  // Buscar veículos quando selectedClientId mudar
  useEffect(() => {
    if (selectedClientId) {
      fetchVehicles(selectedClientId);
    } else {
      setVehicles([]);
    }
  }, [selectedClientId]);

  // Validar campos antes de criar veículo
  const validateFields = () => {
    let valid = true;
    const newErrors = { name: "", placa: "", ano: "", cor: "" };

    if (!name.trim()) {
      newErrors.name = "Descrição é obrigatória.";
      valid = false;
    }
    if (!placa.trim()) {
      newErrors.placa = "Placa é obrigatória.";
      valid = false;
    }
    if (!ano.trim()) {
      newErrors.ano = "Ano é obrigatório.";
      valid = false;
    }
    if (!cor.trim()) {
      newErrors.cor = "Cor é obrigatória.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Criar veículo
  const handleCreateVehicle = async () => {
    if (!selectedClientId) {
      return Alert.alert(
        "Erro",
        "Selecione um cliente para cadastrar veículo."
      );
    }

    if (!validateFields()) return;

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Erro", "Token não encontrado.");
        return;
      }

      const response = await api.post(
        "/vehicles",
        {
          model: name,
          license_plate: placa,
          year: ano,
          color: cor,
          company_id: companyId,
          client_id: selectedClientId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLoading(false);

      Alert.alert("Sucesso", "Veículo cadastrado com sucesso.");
      // Atualiza lista de veículos com o novo
      //   setVehicles((prev) => [...prev, response.data.data || response.data]);
      await fetchVehicles(selectedClientId);
      // Limpar campos
      setName("");
      setPlaca("");
      setAno("");
      setCor("");
      setErrors({ name: "", placa: "", ano: "", cor: "" });
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      Alert.alert("Erro", "Erro ao cadastrar veículo.");
    }
  };

  // Excluir veículo
  const handleDeleteVehicle = async (vehicleId) => {
    if (!vehicleId) return;

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Erro", "Token não encontrado.");
        return;
      }

      await api.delete(`/vehicles/${vehicleId}?company_id=${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Sucesso", "Veículo excluído com sucesso.");
      setVehicles((prev) =>
        prev.filter((v) => v.id_vehicle !== vehicleId && v.id !== vehicleId)
      );
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      Alert.alert("Erro", "Erro ao excluir veículo.");
    }
  };

  console.log("--- Debug de Estado ---");
  console.log("loading:", loading);
  console.log("name:", name);
  console.log("placa:", placa);
  console.log("ano:", ano);
  console.log("cor:", cor);
  console.log("selectedClientId:", selectedClientId);
  console.log(
    "Botão Desabilitado:",
    loading || !name || !placa || !ano || !cor || !selectedClientId
  );
  console.log("------------------------");

  return (
    <View style={styles.container}>
      {/* Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cadastro de Veículos</Text>
      </View>

      {/* Marca d'água */}
      <Image
        source={icons.beelogin}
        style={styles.watermark}
        resizeMode="contain"
        opacity={0.1}
      />

      {/* Aviso para selecionar cliente */}
      {!selectedClientId && (
        <Text
          style={{
            color: COLORS.yellowbee,
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Por favor, selecione um cliente para cadastrar veículos.
        </Text>
      )}

      {/* Picker de Clientes */}
      <View style={styles.containerInput}>
        <View style={styles.containerfunc}>
          <Picker
            style={styles.picker}
            selectedValue={selectedClientId}
            onValueChange={(itemValue) => {
              // Primeiro, atualize o estado para que o Picker mostre a opção correta.
              setSelectedClientId(itemValue);

              // Agora, verifique o itemValue recebido para limpar a lista,
              // garantindo que a ação seja executada imediatamente.
              if (itemValue === "") {
                setVehicles([]);
              }
            }}
          >
            <Picker.Item label="Selecione um cliente..." value="" />
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
                  value={client.id_client.toString()}
                />
              ))
            )}
          </Picker>
        </View>

        {/* Inputs do formulário */}
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="directions-car" size={24} color={COLORS.gray3} />
          <TextBox
            placeholder="Descrição do Veículo"
            placeholderTextColor={COLORS.gray3}
            style={[styles.input, errors.name && styles.inputError]}
            value={name}
            onChangeText={setName}
            editable={!!selectedClientId}
          />
        </View>

        <View style={styles.inputWithIcon}>
          <MaterialIcons name="sort" size={24} color={COLORS.gray3} />
          <TextBox
            placeholder="Placa do Veículo"
            placeholderTextColor={COLORS.gray3}
            style={[styles.input, errors.placa && styles.inputError]}
            value={placa}
            onChangeText={setPlaca}
            editable={!!selectedClientId}
          />
        </View>

        <View style={styles.rowInputs}>
          <TextBox
            placeholder="Ano"
            placeholderTextColor={COLORS.gray3}
            keyboardType="numeric"
            style={[styles.halfInput, errors.ano && styles.inputError]}
            value={ano}
            onChangeText={setAno}
            editable={!!selectedClientId}
          />
          <TextBox
            placeholder="Cor"
            placeholderTextColor={COLORS.gray3}
            style={[styles.halfInput, errors.cor && styles.inputError]}
            value={cor}
            onChangeText={setCor}
            editable={!!selectedClientId}
          />
        </View>

        <Button
          text="Cadastrar"
          onPress={handleCreateVehicle}
          loading={loading}
          disabled={
            !name.trim() ||
            !placa.trim() ||
            !ano.trim() ||
            !cor.trim() ||
            !selectedClientId
          }
        />
      </View>

      {/* Lista de veículos */}

      <View style={{ flex: 1 }}>
        {loadingVehicles ? (
          <View style={styles.carregandoTela}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.textCarregando}>Carregando...</Text>
          </View>
        ) : (
          <FlatList
            data={vehicles}
            keyExtractor={(item) =>
              (item.id_vehicle || item.id || Math.random()).toString()
            }
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  color: COLORS.gray3,
                }}
              >
                Nenhum veículo cadastrado.
              </Text>
            )}
            renderItem={({ item }) => (
              <View style={styles.categoryItem}>
                <Text style={styles.categoryName}>
                  {item.model} - {item.license_plate}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    handleDeleteVehicle(item.id_vehicle || item.id)
                  }
                >
                  <FontAwesome name="trash" size={24} color={COLORS.red} />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

export default Vehicle;
