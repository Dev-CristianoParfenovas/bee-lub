import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  beelogin: {
    width: 200,
    height: 200,
  },
  containerlogo: {
    alignItems: "center",
    paddingTop: 1,
    paddingBottom: 35,
  },
  container: {
    flex: 1,
    paddingTop: 55,
    justifyContent: "flex-start", // Alinha os elementos no topo
    paddingHorizontal: 20,
    backgroundColor: COLORS.blueprincipal,
  },
  watermark: {
    position: "absolute",
    width: 350, // Largura desejada para o logo
    height: 350, // Altura desejada para o logo
    alignSelf: "center", // Centraliza horizontalmente
    top: "46%", // Ajusta a posição vertical
  },

  containerInput: {
    marginTop: 100,
    marginBottom: 20,
    justifyContent: "center",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.white, // Mudando para a cor visível
    fontSize: FONT_SIZE.md,
    height: 50, // Garantir que a altura seja suficiente
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 5,
  },
  header: {
    alignItems: "center",
    marginTop: 45,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white, // Altere para a cor desejada
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  categoryName: {
    fontSize: 16,
    color: COLORS.white,
  },
  containerSwitch: {
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 1, // Expande a área clicável verticalmente
    paddingHorizontal: 10, // Expande horizontalmente
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.yellowbee,
    marginRight: 25, // Espaço entre o texto e o switch
  },
  touchableArea: {
    padding: 5, // Expande a área clicável ao redor do Switch
    borderRadius: 10, // Suaviza os cantos (opcional)
  },
  carregandoTela: {
    marginTop: 70,
    alignItems: "center",
  },
  textCarregando: {
    marginTop: 10,
    color: COLORS.white,
  },
});
