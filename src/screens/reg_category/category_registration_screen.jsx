import { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  Switch,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Biblioteca de ícones
import icons from "../../constants/icons.js";
import { styles } from "./category_registration_screen.js";
import Button from "../../components/button/button.jsx";
import { validateName } from "../../utils/validators.js";
import { COLORS } from "../../constants/theme.js";
import TextBox from "../../components/textbox/textbox.jsx";
import images from "../../constants/icons.js";
import api from "../../constants/api.js";
import { useNavigation } from "@react-navigation/native";
import { useAuth, AuthProvider } from "../../context/AuthContext.jsx"; // Importa o AuthContext
import AsyncStorage from "@react-native-async-storage/async-storage"; // ou outra abordagem para obter o token

function CategoryRegistrationScreen(props) {
  const { companyId } = useAuth(); // Acessando o companyId do contexto
  const [name, setName] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [errors, setErrors] = useState({ name: "" });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const token = await AsyncStorage.getItem("authToken");
        console.log("Token recuperado:", token);

        if (!token) {
          Alert.alert("Erro", "Usuário não autenticado.");
          setLoadingCategories(false);
          return;
        }

        const url = `/categories`;
        console.log("Company ID dentro de fetchCategories:", companyId);
        console.log("URL da API:", url);

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API:", response.data);
        setCategories(response.data.data); // Acessa as categorias corretamente
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
        console.error(
          "Erro ao buscar categorias:",
          error.response?.data || error.message
        );
      } finally {
        setLoadingCategories(false); // ✅ garante que o loading pare sempre
      }
    };

    if (companyId) {
      console.log("Categorias no estado antes da chamada:", categories);
      fetchCategories(); // Chamada da função dentro do useEffect
    } else {
      console.log("Company ID não carregado:", companyId);
    }
  }, [companyId]); // Garante que o efeito só será executado quando companyId mudar

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        return;
      }

      // Adicione o company_id na URL
      const url = `/categories/${categoryId}`; //?company_id=${Number(companyId)}
      console.log("URL para deletar:", url);

      const response = await api.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert("Sucesso", "Categoria excluída com sucesso!");

      // Atualize o estado local
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message ||
          error.message ||
          "Não foi possível excluir a categoria."
      );
    } finally {
      setLoadingCategories(false); // finaliza sempre
    }
  };

  // Alterna o status de notificação
  const handleSwitchChange = (value) => {
    if (value) {
      Alert.alert(
        "Confirmação",
        "Você está ativando para notificar próxima troca de óleo. Deseja continuar?",
        [
          {
            text: "Cancelar",
            onPress: () => setIsNotification(false),
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: () => setIsNotification(true),
          },
        ]
      );
    } else {
      setIsNotification(false);
    }
  };

  const handleCreateCategory = async () => {
    const nameError = validateName(name);

    setErrors({
      name: nameError,
    });

    if (!nameError) {
      if (!companyId) {
        Alert.alert("Erro", "ID da empresa não está definido.");
        return;
      }

      setLoading(true);

      try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
          return;
        }

        const response = await api.post(
          "/categories",
          { name, notification: isNotification },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const category = response.data;

        if (category) {
          Alert.alert(
            "Sucesso",
            `Categoria "${category.name}" registrada com sucesso!`
          );
          setName("");
          setErrors({
            name: "",
          });

          setIsNotification(false); // reseta o switch para false
          setLoading(false);

          // Adiciona a nova categoria ao estado atual
          setCategories((prevCategories) => [...prevCategories, category]);
        } else {
          Alert.alert(
            "Erro",
            "A resposta da API não contém os dados esperados da Categoria."
          );
        }
      } catch (error) {
        Alert.alert("Erro", error.message);
      }
    } else {
      Alert.alert("Erro", "Por favor, corrija os erros antes de continuar.");
    }
  };

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
        <Text style={styles.headerTitle}>Cadastro de Categoria</Text>
      </View>

      <View style={styles.containerInput}>
        {/* Administrador Switch */}
        <View style={styles.containerSwitch}>
          <Text style={styles.switchLabel}>Ativar Notificação:</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleSwitchChange(!isNotification)}
            style={styles.touchableArea}
          >
            <Switch
              value={isNotification}
              onValueChange={handleSwitchChange}
              trackColor={{ false: COLORS.gray3, true: COLORS.primary }}
              thumbColor={isNotification ? COLORS.secondary : COLORS.lightGray}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWithIcon}>
          <MaterialIcons name="category" size={24} color={COLORS.gray3} />
          <TextBox
            placeholder="Descrição da Categoria"
            placeholderTextColor={COLORS.gray3} // Cor do texto placeholder
            style={[styles.input, errors.name ? styles.inputError : null]}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <Button
        text="Criar Categoria"
        onPress={handleCreateCategory}
        loading={loading}
      />
      {loadingCategories ? (
        <View style={styles.carregandoTela}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.textCarregando}>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : `key-${index}`
          } // Garantir chave única
          // scrollEnabled={true} // Desativa a rolagem
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <TouchableOpacity onPress={() => setName(item.name)}>
                <Text
                  style={[
                    styles.categoryName,
                    item.notification && { color: COLORS.yellowbee }, // ou use '#FFD700'
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteCategory(item.id)}>
                <FontAwesome name="trash" size={24} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default CategoryRegistrationScreen;
