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
    height: 56,
    width: "95%",
    paddingHorizontal: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.gray3, // Para melhor visualização do campo
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: COLORS.gray5,
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
    fontSize: FONT_SIZE.lg,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10, // 👈 afastar dos cantos
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3, // Separador entre itens
  },
  itemName: {
    flex: 1, // 👈 ocupa espaço restante
    fontSize: FONT_SIZE.xsm,
    color: COLORS.black,
  },
  itemQuantity: {
    width: 50, // 👈 largura fixa para alinhar bem
    textAlign: "center",
    fontSize: FONT_SIZE.sm,
    color: COLORS.black,
  },
  itemPrice: {
    width: 90, // 👈 largura fixa para alinhar valores
    textAlign: "right",
    fontSize: FONT_SIZE.sm,
    color: COLORS.black,
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
  totalContainer: {
    marginTop: 15,
    paddingVertical: 10,
    // borderTopWidth: 1,
    // borderTopColor: COLORS.gray3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.black,
  },
  totalValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.bluebtn,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.lightGray,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray3,
  },
  footerText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.black,
  },
  footerValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.blueprincipal,
  },
  emptyMessage: {
    textAlign: "center",
  },
});
