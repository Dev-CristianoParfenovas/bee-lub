import { useState } from "react";
import { Image, View, Text, Alert, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Biblioteca de ícones
import icons from "../../constants/icons.js";
import { styles } from "./client_registration_screen.js";
import Button from "../../components/button/button.jsx";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
} from "../../utils/validators.js";
import { COLORS } from "../../constants/theme.js";
import TextBox from "../../components/textbox/textbox.jsx";
import images from "../../constants/icons.js";
import api from "../../constants/api.js";
import { useNavigation } from "@react-navigation/native";
import { useAuth, AuthProvider } from "../../context/AuthContext.jsx"; // Importa o AuthContext

function ClientRegistrationScreen(props) {
  const { companyId } = useAuth(); // Acessa o company_id do AuthContext
  console.log("Company ID do Emplooyee registration:", companyId); // Deve exibir o ID no console
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigation = useNavigation(); // Hook para acessar a navegação

  const handleCreateClient = async () => {
    // Valida os campos de entrada
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
    });

    if (!nameError && !emailError && !passwordError) {
      if (!companyId) {
        Alert.alert("Erro", "ID da empresa não está definido.");
        return;
      }

      try {
        console.log("Enviando dados para API:", {
          name,
          email,
          phone,
          password,
          company_id: companyId,
        });

        const response = await api.post("/clients", {
          name,
          email,
          phone,
          password,
          company_id: companyId,
        });

        console.log("Status da resposta:", response.status);
        console.log("Dados da resposta:", response.data);

        const { data } = response;

        if (data?.client) {
          console.log("Cliente criado:", data.client);
          Alert.alert(
            "Sucesso",
            `Cliente registrado com sucesso!` // ${data.employee.name}
          );

          // Limpa os campos do formulário após o cadastro com sucesso
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setErrors({
            name: "",
            email: "",
            phone: "",
            password: "",
          });
        } else {
          console.error("Estrutura inesperada na resposta:", data);
          Alert.alert(
            "Erro",
            "A resposta da API não contém os dados esperados do funcionário."
          );
        }
      } catch (error) {
        console.error(
          "Erro ao criar cliente:",
          error.response?.data || error.message
        );

        const errorMessage =
          error.response?.data?.message || "Erro desconhecido.";
        Alert.alert("Erro", errorMessage);
      }
    } else {
      Alert.alert("Erro", "Por favor, corrija os erros antes de continuar.");
    }
  };

  return (
    <AuthProvider>
      <View style={styles.container}>
        {/* Botão Voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        {/* Cabeçalho com título */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cadastro de Cliente</Text>
        </View>
        {/* Marca d'água */}
        <Image
          source={images.beelogin}
          style={styles.watermark}
          resizeMode="contain"
          opacity={0.1} // Ajuste para o efeito de marca d'água
        />

        <View style={styles.containerlogo}>
          <Image source={icons.logobee} style={styles.beelogin} />
        </View>

        <View>
          {/* Campo Nome */}
          <View style={styles.containerInput}>
            <View style={styles.inputWithIcon}>
              <MaterialIcons name="person" size={24} color={COLORS.gray3} />
              <TextBox
                placeholder="Nome/Razão Social"
                placeholderTextColor={COLORS.gray3} // Cor do texto placeholder
                style={[styles.input, errors.name ? styles.inputError : null]}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          {/*Campo Email*/}
          <View style={styles.containerInput}>
            <View style={styles.inputWithIcon}>
              <MaterialIcons name="email" size={24} color={COLORS.gray3} />
              <TextBox
                placeholder="E-mail"
                isPassword={false}
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={[styles.input, errors.email ? styles.inputError : null]}
                autoCapitalize="none" // Começa com letra minúscula
                keyboardType="email-address" // Teclado específico para e-mail
              />
            </View>
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
          {/*Campo Telefone*/}
          <View style={styles.containerInput}>
            <View style={styles.inputWithIcon}>
              <MaterialIcons name="phone" size={24} color={COLORS.gray3} />
              <TextBox
                placeholder="Telefone"
                placeholderTextColor={COLORS.gray3} // Cor do texto placeholder
                style={[styles.input, errors.phone ? styles.inputError : null]}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                maskType="phone"
              />
            </View>
            {errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}
          </View>
          {/*Campo Senha*/}
          <View style={styles.containerInput}>
            <View style={styles.inputWithIcon}>
              <FontAwesome name="lock" size={24} color={COLORS.gray3} />
              <TextBox
                placeholder="Senha"
                isPassword={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={[
                  styles.input,
                  errors.password ? styles.inputError : null,
                ]}
              />
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <Button text="Criar Cliente" onPress={handleCreateClient} />
        </View>
      </View>
    </AuthProvider>
  );
}

export default ClientRegistrationScreen;
