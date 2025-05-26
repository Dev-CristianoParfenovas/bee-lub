import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Button from "../../components/button/button.jsx";
import { styles } from "./employee_customer.style.js";
import { Ionicons } from "@expo/vector-icons";
import images from "../../constants/icons.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigation } from "@react-navigation/native";
import api from "../../constants/api.js";
import { useFocusEffect } from "@react-navigation/native";
import ButtonPaymentCart from "../../components/button_payment_cart/button_payment_cart.jsx";

function EmployeeCustomer(props) {
  const { userName } = useAuth();
  const { companyId, employeeId } = useAuth();
  const [employee, setEmployee] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]); // Estado para os clientes
  const [loading, setLoading] = useState(false); // Estado para o carregamento

  const navigation = useNavigation(); // Hook para acessar a navegação

  const fetchCustomers = async () => {
    setLoading(true);

    try {
      console.log("URL da API:", `/clients/${companyId}`);
      const response = await api.get(`/clients/${companyId}`);

      if (response.data.data.length === 0) {
        // Nenhum cliente encontrado
        console.log("Mensagem recebida:", response.data.message);
        alert(response.data.message); // Mostra a mensagem amigável ao usuário
      } else {
        // Clientes encontrados
        console.log("Clientes retornados:", response.data.data);
        setCustomers(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro na resposta da API:", error.response.data);
        console.error("Código de status:", error.response.status);
        alert(
          "Ocorreu um erro ao buscar clientes. Tente novamente mais tarde."
        );
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
        alert(
          "Não foi possível conectar com o servidor. Verifique sua conexão de rede."
        );
      } else {
        console.error("Erro ao configurar a requisição:", error.message);
        alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect para carregar os clientes ao montar o componente
  useFocusEffect(
    React.useCallback(() => {
      fetchCustomers();
    }, [])
  );

  /* useEffect(() => {
    fetchCustomers();
  }, []);*/

  // Filtra clientes com base na busca
  const filteredCustomers = customers.filter((customer) =>
    (customer.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Marca d'água */}
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
        {/* Campo de busca */}
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
            placeholder="Nome / Telefone / Placa"
            style={styles.input}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>

        {/* Exibe indicador de carregamento enquanto busca clientes */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {/* Verifica se há clientes e exibe uma mensagem se não houver */}
            {filteredCustomers.length === 0 ? (
              <Text style={styles.noCustomersText}>
                Não há clientes cadastrados.
              </Text>
            ) : (
              <FlatList
                data={filteredCustomers}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                } // Usando id ou índice
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.customerCard,
                      selectedCustomer?.id === item.id &&
                        styles.selectedCustomerCard,
                    ]}
                    onPress={() => {
                      setSelectedCustomer(item); // Define o cliente selecionado
                      setSearch(item.name); // Atualiza o campo de busca com o nome do cliente
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

      {/* Botão */}
      <View style={styles.containerbtn}>
        <Button
          text="Acessar vendas"
          style={{ width: "50%" }}
          onPress={() =>
            props.navigation.navigate("Lista de Produtos", {
              employee,
              employee: employeeId, // Passa o ID do funcionário
              customer: selectedCustomer,
            })
          }
          disabled={!selectedCustomer || !employee} // Desabilita o botão se não houver seleção
          // style={{ marginRight: 8, flex: 1 }}
        />
        <Button
          text="Cadastrar placa"
          onPress={() => {
            // Aqui você define o que o botão deve fazer
            alert("Cadastrar placa clicado!");
          }}
          style={{ width: "50%", marginLeft: 8 }}
        />
      </View>
    </View>
  );
}

export default EmployeeCustomer;
