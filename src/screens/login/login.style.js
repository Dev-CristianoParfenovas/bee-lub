import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  // Logo
  beelogin: {
    width: 200,
    height: 200,
  },
  containerlogo: {
    alignItems: "center",
    paddingTop: 55,
  },

  // Container principal
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: COLORS.blueprincipal, // Certifique-se de que blueprincipal está definido em COLORS
  },

  // Estilo para os inputs
  containerInput: {
    marginBottom: 20,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15, // Deixa o container arredondado
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  watermark: {
    position: "absolute",
    width: 350, // Largura desejada para o logo
    height: 350, // Altura desejada para o logo
    alignSelf: "center", // Centraliza horizontalmente
    top: "40%", // Ajusta a posição vertical
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.black, // Cor do texto digitado
    fontSize: FONT_SIZE.md,
  },
  // Estilo para erros
  inputError: {
    borderColor: "red", // Borda vermelha para inputs com erro
  },
  errorText: {
    color: COLORS.yellowbee, // Texto vermelho para mensagens de erro
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 8,
  },

  // Texto geral
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
  },

  // Rodapé
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    bottom: 0,
  },
  textfooter: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
  },
  footerLink: {
    color: COLORS.yellowbee, // Amarelo para o link
    fontSize: FONT_SIZE.md,
    paddingLeft: 2,
    textDecorationLine: "underline", // Adiciona sublinhado
  },

  btn: {
    backgroundColor: COLORS.bluebtn,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
