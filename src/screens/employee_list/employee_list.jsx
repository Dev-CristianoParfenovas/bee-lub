import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { styles } from "./employee_list.js";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme.js";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../constants/api.js";

function EmployeeList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companyId } = useAuth(); // Ou ajuste conforme o seu contexto
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    if (!companyId) {
      Alert.alert("Erro", "ID da empresa não definido.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/employees/${companyId}`);
      const filtered = response.data.filter((emp) => emp.is_admin === false); // ✅ filtro
      setEmployees(filtered);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      Alert.alert("Erro", "Erro ao buscar funcionários.");
    } finally {
      setLoading(false);
    }
  };

  /* useEffect(() => {
    fetchEmployees();
  }, []);*/

  useFocusEffect(
    useCallback(() => {
      fetchEmployees(); // Recarrega a lista sempre que a tela ganhar foco
    }, [])
  );

  const renderEmployee = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text style={styles.employeeName}>{item.name}</Text>
      <Text style={styles.employeeEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Funcionários</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={{ marginTop: 20, flex: 1 }}>
          <FlatList
            data={employees}
            keyExtractor={(item) => item.id_employee.toString()}
            renderItem={renderEmployee}
            ListEmptyComponent={
              <Text style={{ color: COLORS.text, marginTop: 20 }}>
                Nenhum funcionário encontrado.
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
}
export default EmployeeList;
