import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    justifyContent: "flex-start", // Alinha os elementos no topo
    paddingHorizontal: 20,
    backgroundColor: COLORS.blueprincipal,
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
    marginTop: 36,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white, // Altere para a cor desejada
  },
  watermark: {
    position: "absolute",
    width: 350, // Largura desejada para o logo
    height: 350, // Altura desejada para o logo
    alignSelf: "center", // Centraliza horizontalmente
    top: "44%", // Ajusta a posição vertical
  },
  containerlogo: {
    alignItems: "center",
    paddingTop: 1,
    paddingBottom: 20,
  },
  beelogin: {
    width: 200,
    height: 200,
  },
  containerInput: {
    marginTop: 70,
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
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    gap: 8, // se estiver usando React Native 0.71+ ou Expo SDK 49+
    marginBottom: 10,
    // borderColor: "#ccc",
    borderRadius: 15,
    height: 50,
    width: "100%",
  },
  input: {
    flex: 1,
    marginLeft: 10,
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

  halfInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 50,
  },
  inputText: {
    flex: 1,
    color: COLORS.black,
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
  containerfunc: {
    height: 56,
    width: "100%",
    paddingHorizontal: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.gray3, // Para melhor visualização do campo
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: COLORS.gray5,
  },
  picker: {
    color: COLORS.gray3,
    width: "100%",
    height: "100%", // importante para o picker preencher container verticalmente
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    overflow: "hidden", // para aplicar o borderRadius visualmente
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  carregandoTela: {
    marginTop: 20,
    alignItems: "center",
  },
  textCarregando: {
    marginTop: 10,
    color: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // fundo escurecido
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    maxHeight: "50%",
    width: "85%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    // Remova 'maxHeight' daqui
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: "column",
  },
  modalList: {
    flexGrow: 1, // Permite que a FlatList ocupe o espaço disponível e role
    marginBottom: 10, // Adiciona uma pequena margem para separar do botão "Fechar"
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
  },
  pickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
});
