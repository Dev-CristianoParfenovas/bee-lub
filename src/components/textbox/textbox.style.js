import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.black, // Cor do texto digitado
    fontSize: FONT_SIZE.md,
    padding: 1,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 40, // Deixa o container arredondado
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    height: 50,
    width: 350,
  },
  // Estilo para erros
  inputError: {
    borderColor: "red", // Borda vermelha para inputs com erro
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5, // Espaço para o ícone
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 40,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    height: 50,
    width: 350,
  },
  inputWithLeftIcon: {
    marginLeft: 5, // Reduz espaço se houver ícone
  },
  leftIcon: {
    marginRight: -10, // Espaçamento entre o ícone e o texto
    marginLeft: -15, // Move o ícone mais para a esquerda
    alignSelf: "center", // Centraliza o ícone verticalmente
  },
});
