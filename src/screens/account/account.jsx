import { useState } from "react";
import {
  Image,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Biblioteca de ícones
import icons from "../../constants/icons.js";
import { styles } from "./account.style.js";
import Button from "../../components/button/button.jsx";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validators.js";
import { COLORS } from "../../constants/theme.js";
import TextBox from "../../components/textbox/textbox.jsx";
import images from "../../constants/icons.js";
import { useNavigation } from "@react-navigation/native";
import api from "../../constants/api.js";
import { useAuth } from "../../context/AuthContext";

function Account(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [isAdmin, setIsAdmin] = useState(true); // Estado para administrador
  const navigation = useNavigation(); // Hook para acessar a navegação
  const { login } = useAuth(); // Obtendo a função login do contexto

  const handleCreateAccount = async () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ name: nameError, email: emailError, password: passwordError });

    if (!nameError && !emailError && !passwordError) {
      try {
        console.log("Enviando dados para API:", {
          name,
          email,
          password,
          is_admin: true,
          is_active: true,
        });

        const response = await api.post("/company/companyemployee", {
          name,
          email,
          password,
          is_admin: true,
          is_active: true,
        });

        console.log("Status da resposta:", response.status);
        console.log("Dados da resposta:", response.data);

        if (response.status === 200 || response.status === 201) {
          const { token, message, company_id, employee } = response.data;

          console.log("Token:", token);

          if (!token || !employee?.id_employee || !company_id) {
            console.error(
              "Dados incompletos na resposta da API:",
              response.data
            );
            Alert.alert(
              "Erro",
              "Conta criada, mas ocorreu um problema ao autenticar automaticamente."
            );
            return;
          }

          Alert.alert(
            "Conta criada com sucesso!",
            message || "Você foi registrado com sucesso."
          );

          // ✅ Autentica o usuário com os dados corretos
          await login(token, name, company_id, true, employee.id_employee);
        } else {
          console.error("Resposta inesperada da API:", response);
          Alert.alert(
            "Erro",
            "A API retornou um status inesperado. Por favor, tente novamente."
          );
        }
      } catch (error) {
        console.error(
          "Erro ao criar conta:",
          error.response?.data || error.message
        );

        if (error.response) {
          Alert.alert(
            "Erro",
            error.response.data.message || "Erro desconhecido."
          );
        } else {
          Alert.alert(
            "Erro",
            "Não foi possível criar a conta. Por favor, tente novamente."
          );
        }
      }
    } else {
      Alert.alert("Erro", "Por favor, corrija os erros antes de continuar.");
    }
  };

  // Alterna o status de administrador
  const handleSwitchChange = (value) => {
    if (value) {
      Alert.alert(
        "Confirmação",
        "Você está se cadastrando como Administrador. Deseja continuar?",
        [
          {
            text: "Cancelar",
            onPress: () => setIsAdmin(false),
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: () => setIsAdmin(true),
          },
        ]
      );
    } else {
      setIsAdmin(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Marca d'água */}
      <Image
        source={images.beetransp}
        style={styles.watermark}
        resizeMode="contain"
        opacity={0.1} // Ajuste para o efeito de marca d'água
      />
      <View style={styles.containerlogo}>
        <Image source={icons.logobee} style={styles.beelogin} />
      </View>

      <View>
        {/* Administrador Switch */}
        <View style={styles.containerSwitch}>
          <Text style={styles.switchLabel}>Administrador:</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleSwitchChange(!isAdmin)}
            style={styles.touchableArea}
          >
            <Switch
              value={isAdmin}
              onValueChange={handleSwitchChange}
              trackColor={{ false: COLORS.gray3, true: COLORS.primary }}
              thumbColor={isAdmin ? COLORS.secondary : COLORS.lightGray}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </TouchableOpacity>
        </View>

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
        {/*Campo Senha*/}
        <View style={styles.containerInput}>
          <View style={styles.inputWithIcon}>
            <FontAwesome name="lock" size={24} color={COLORS.gray3} />
            <TextBox
              placeholder="Senha"
              isPassword={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={[styles.input, errors.password ? styles.inputError : null]}
            />
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        <Button text="Criar Conta" onPress={handleCreateAccount} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.textfooter}>Já tenho conta. </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.footerLink}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Account;
