import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  containerbanner: {
    height: 110,
    backgroundColor: COLORS.bluebtn,
    justifyContent: "space-evenly",
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  containerfunc: {
    height: 60,
    width: "95%",
    paddingHorizontal: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.gray3, // Para melhor visualização do campo
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: COLORS.gray5,
  },
  containervendas: {
    flex: 1,
  },
  watermark: {
    position: "absolute",
    width: 350,
    height: 350,
    alignSelf: "center",
    top: "40%",
    opacity: 0.1, // Garantir baixa opacidade
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 55,
    paddingRight: 65,
  },
  backButton: {
    marginTop: 55,
  },
  icone: {
    marginTop: 55,
    paddingLeft: 35,
  },
  orderSummary: {
    padding: 15,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.gray2, // Adicionando borda sutil
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop: 15,
    marginLeft: 5,
    padding: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Altere de "space-between" para "flex-start"
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
    paddingHorizontal: 10, // Separador entre itens
  },
  itemName: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.black,
    flex: 1, // Permite que o nome do funcionário ocupe o espaço restante
    flexWrap: "wrap", // Garante que o texto quebre a linha se for muito longo
    marginRight: 5,
  },
  itemPrice: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.black,
    marginRight: 10,
  },
  dateFilters: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  datePicker: {
    flex: 1,
    height: "100%",
    marginHorizontal: 3, // Reduziu a margem horizontal
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: 8,
    paddingHorizontal: 5, // Mantém um pequeno espaço interno
    backgroundColor: COLORS.white, // Contraste garantido
  },

  customButton: {
    backgroundColor: COLORS.bluebtn, // Cor de fundo do botão
    borderRadius: 12, // Bordas arredondadas
    paddingVertical: 5, // Altura do botão
    paddingHorizontal: 10, // Largura do botão (espaço ao redor do texto)
    alignItems: "center", // Centraliza o texto horizontalmente
    justifyContent: "center", // Centraliza o texto verticalmente
    marginVertical: 10, // Espaçamento vertical entre os botões
    marginHorizontal: 3, // Reduziu a margem horizontal para aproximar os componentes
  },

  customButtonText: {
    color: "white", // Cor do texto
    fontSize: FONT_SIZE.md, // Tamanho da fonte (faça referência ao seu arquivo de fontes)
    fontWeight: "bold", // Peso da fonte (opcional)
  },
  selectedEmployeeText: {
    //  alignItems: "center",
    //justifyContent: "center",
    fontWeight: "bold",
  },
  employeeText: {
    marginLeft: 15,
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff", // importante se o fundo da tela for branco também
    marginVertical: 10,
  },
  detailButton: {
    backgroundColor: COLORS.bluebtn,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80, // Defina uma largura mínima para o botão
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  carregandoTela: {
    marginTop: 70,
    alignItems: "center",
  },
});
