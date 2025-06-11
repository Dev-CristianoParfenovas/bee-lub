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
    color: COLORS.black, // Mudando para a cor visível
    fontSize: FONT_SIZE.md,
    height: 50, // Garantir que a altura seja suficiente
  },
  searchInput: {
    flex: 1,
    height: 30,
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
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
  closeButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
    marginLeft: 38,
    width: 100,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray5,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 10,
  },
  cameraIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 10,
    // flexDirection: "row",
    //  justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    height: 100,
  },
});
