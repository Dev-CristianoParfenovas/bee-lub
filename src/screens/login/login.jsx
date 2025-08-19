import React, { useState } from "react";
import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import icons from "../../constants/icons.js";
import { styles } from "./login.style.js";
import Button from "../../components/button/button.jsx";
import { validateForm } from "../../utils/validators.js";
import { COLORS } from "../../constants/theme.js";
import TextBox from "../../components/textbox/textbox.jsx";
import images from "../../constants/icons.js";
import api from "../../constants/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

function Login(props) {
  const { login } = useAuth(); // Contexto do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  /* 190825 const handleLogin = async () => {
    const formErrors = validateForm({ email, password });
    setErrors(formErrors);

    setLoading(true);

    // Validação de campos
    if (formErrors.email || formErrors.password) {
      Alert.alert("Erro", "Por favor, corrija os erros antes de continuar.");
      setLoading(false);
      return;
    }

    try {
      console.log("Dados enviados para login:", { email, password });

      // Envia a requisição para login
      const response = await api.post("/employees/login", { email, password });

      console.log("Resposta da API:", response.data);

      // Extrai o token e dados do funcionário
      const { token, employee } = response.data;

      // Verifica se a resposta contém os dados necessários
      if (
        token &&
        employee?.id_employee &&
        employee?.is_admin !== undefined &&
        employee?.name &&
        employee?.companyId !== undefined
      ) {
        // Limpa dados antigos do AsyncStorage antes de salvar os novos
        await AsyncStorage.clear();
        console.log(
          "Tipo e valor de employee.companyId:",
          typeof employee.companyId,
          employee.companyId
        );

        // Salva os dados no AsyncStorage
        await AsyncStorage.multiSet([
          ["authToken", token],
          ["companyId", employee.companyId.toString()],
          ["userName", employee.name],
          ["isAdmin", employee.is_admin.toString()],
          ["employeeId", employee.id_employee.toString()],
        ]);

        // Teste para garantir que os dados foram armazenados corretamente
        const [storedToken, storedCompanyId, storedEmployeeId] =
          await AsyncStorage.multiGet(["authToken", "companyId", "employeeId"]);
        console.log("Token armazenado:", storedToken[1]);
        console.log("CompanyId armazenado:", storedCompanyId[1]);
        console.log("EmployeeId armazenado:", storedEmployeeId[1]);

        // Garante que o AsyncStorage tem os valores esperados
        if (!storedToken[1] || !storedCompanyId[1] || !storedEmployeeId[1]) {
          throw new Error("Falha ao armazenar os dados de login");
        }

        // Realiza o login
        await login(
          token,
          employee.name,
          employee.companyId,
          employee.is_admin,
          employee.id_employee
        );
        console.log(
          `CompanyID: ${employee.companyId}, ADM: ${employee.is_admin}`
        );

        // Exibe uma mensagem de sucesso
        Alert.alert("Login bem-sucedido!", `Bem-vindo, ${employee.name}`);
      } else {
        throw new Error("Dados de login incompletos na resposta da API");
      }
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );

      // Exibe mensagem de erro
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Ocorreu um erro desconhecido.";

      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false); // ⚡ Desliga o spinner em qualquer situação
    }
  };*/

  const handleLogin = async () => {
    setLoading(true);

    // Validação de campos
    const formErrors = validateForm({ email, password });
    setErrors(formErrors);

    if (formErrors.email || formErrors.password) {
      Alert.alert("Erro", "Por favor, corrija os erros antes de continuar.");
      setLoading(false);
      return;
    }

    try {
      console.log("Dados enviados para login:", { email, password });

      // Requisição à API
      const { data } = await api.post("/employees/login", { email, password });
      const { token, employee } = data;

      if (
        !token ||
        !employee?.id_employee ||
        employee?.is_admin === undefined ||
        !employee?.name ||
        employee?.companyId === undefined
      ) {
        throw new Error("Dados de login incompletos na resposta da API");
      }

      // Limpa e salva dados no AsyncStorage
      await AsyncStorage.clear();
      await AsyncStorage.multiSet([
        ["authToken", token],
        ["companyId", employee.companyId.toString()],
        ["userName", employee.name],
        ["isAdmin", employee.is_admin.toString()],
        ["employeeId", employee.id_employee.toString()],
      ]);

      // Validação rápida dos dados armazenados
      const [[, storedToken], [, storedCompanyId], [, storedEmployeeId]] =
        await AsyncStorage.multiGet(["authToken", "companyId", "employeeId"]);
      if (!storedToken || !storedCompanyId || !storedEmployeeId) {
        throw new Error("Falha ao armazenar os dados de login");
      }

      // Atualiza contexto/global state
      await login(
        token,
        employee.name,
        employee.companyId,
        employee.is_admin,
        employee.id_employee
      );

      console.log(
        `CompanyID: ${employee.companyId}, ADM: ${employee.is_admin}`
      );
      Alert.alert("Login bem-sucedido!", `Bem-vindo, ${employee.name}`);
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Ocorreu um erro desconhecido.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false); // 🔹 garante que o botão volte ao normal em qualquer situação
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Quando a tela de login é exibida, resetamos o loading
      setLoading(false);
    }, [])
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
      <View style={styles.containerlogo}>
        <Image source={icons.beetransp} style={styles.beelogin} />
      </View>
      <View>
        {/* Campo Email */}
        <View style={styles.containerInput}>
          <View style={styles.inputWithIcon}>
            <MaterialIcons name="email" size={24} color={COLORS.gray3} />
            <TextBox
              placeholder="E-mail"
              isPassword={false}
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              style={[styles.input, errors.email ? styles.inputError : null]}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>

        {/* Campo Senha */}
        <View style={styles.containerInput}>
          <View style={styles.inputWithIcon}>
            <FontAwesome name="lock" size={24} color={COLORS.gray3} />
            <TextBox
              placeholder="Senha"
              isPassword={true}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              style={[styles.input, errors.password ? styles.inputError : null]}
              autoCapitalize="none"
            />
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        {/* Botão de Login */}

        <Button
          text="Acessar"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.textfooter}>Não tem conta? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("account")}>
          <Text style={styles.footerLink}>Criar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
