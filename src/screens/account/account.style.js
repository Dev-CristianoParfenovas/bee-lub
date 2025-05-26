import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  beelogin: {
    width: 200,
    height: 200,
  },
  containerlogo: {
    alignItems: "center",
    paddingTop: 55,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: COLORS.blueprincipal,
  },
  watermark: {
    position: "absolute",
    width: 350, // Largura desejada para o logo
    height: 350, // Altura desejada para o logo
    alignSelf: "center", // Centraliza horizontalmente
    top: "40%", // Ajusta a posição vertical
  },

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
  input: {
    flex: 1, // Faz o TextInput ocupar o restante do espaço
    marginLeft: 10, // Espaço entre o ícone e o campo
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
  },
  inputError: {
    borderColor: "red", // Borda vermelha para campos com erro
  },
  errorText: {
    color: COLORS.yellowbee, // Texto vermelho
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 8,
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    bottom: 0,
  },
  textfooter: {
    color: COLORS.white,
  },
  footerLink: {
    color: COLORS.yellowbee,
    paddingLeft: 2,
  },
  containerSwitch: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10, // Expande a área clicável verticalmente
    paddingHorizontal: 5, // Expande horizontalmente
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.white,
    marginRight: 25, // Espaço entre o texto e o switch
  },
  touchableArea: {
    padding: 5, // Expande a área clicável ao redor do Switch
    borderRadius: 10, // Suaviza os cantos (opcional)
  },
});
