import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  banner: {
    height: 110,
    backgroundColor: COLORS.bluebtn,
    justifyContent: "space-evenly",
    padding: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  watermark: {
    position: "absolute",
    width: 350, // Largura desejada para o logo
    height: 350, // Altura desejada para o logo
    alignSelf: "center", // Centraliza horizontalmente
    top: "40%", // Ajusta a posição vertical
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 35,
    paddingRight: 65,
  },
  backButton: {
    marginTop: 40,
  },
  icone: {
    marginTop: 40,
    paddingLeft: 35,
  },
  orderSummary: {
    padding: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row", // Exibe os itens em linha
    justifyContent: "space-between", // Distribui o nome e o preço
    paddingVertical: 10, // Ajuste do espaçamento
  },
  itemInfoContainer: {
    flex: 1, // O nome vai ocupar o espaço disponível
    marginRight: 10, // Margem para o preço não colar no nome
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap", // Permite que o nome quebre a linha se for muito grande
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right", // Alinha o preço à direita
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },
  value: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },
  totalLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.black,
  },
  totalValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.black,
  },
  containerbtn: {
    marginTop: 30,
    alignItems: "center",
  },
  paymentButton: {
    backgroundColor: COLORS.bluebtn,
    borderRadius: 8,
  },

  customerBanner: {
    backgroundColor: COLORS.gray6, // Fundo leve para destaque
    padding: 10, // Espaçamento interno
    marginHorizontal: 3,
    marginVertical: 10, // Espaçamento acima e abaixo
    borderRadius: 8, // Cantos arredondados
    alignItems: "center", // Alinhamento central do texto
    justifyContent: "center", // Centraliza o conteúdo
    borderWidth: 1, // Bordas
    borderColor: "#dcdcdc", // Cor da borda
  },
  customerText: {
    fontSize: 16, // Tamanho do texto
    color: "#333", // Cor do texto
    fontWeight: "bold", // Peso do texto
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
  },
  pixCode: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  copyButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
