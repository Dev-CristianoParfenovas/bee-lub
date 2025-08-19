import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  // Container Principal
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },

  // Banner
  banner: {
    height: 120,
    backgroundColor: COLORS.bluebtn,
    justifyContent: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  containerbanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: "28%",
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.llg,
    fontWeight: "bold",
  },
  subtitle: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    textAlign: "center",
    marginTop: 32,
  },
  cartContainer: {
    position: "relative",
  },
  cartButton: {
    padding: 5,
  },
  cartBadge: {
    position: "absolute",
    top: -6, // Ajuste para alinhar melhor
    right: -5, // Posicionado no canto do botão
    backgroundColor: COLORS.red, // Cor de fundo visível
    borderRadius: 10, // Torna o badge circular
    minWidth: 20, // Largura mínima para acomodar o texto
    minHeight: 20, // Altura mínima
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4, // Margem interna para texto
  },
  cartBadgeText: {
    color: COLORS.white, // Texto branco para contraste
    fontSize: FONT_SIZE.sm, // Tamanho do texto
    fontWeight: "bold", // Negrito para destaque
  },

  // Produtos
  containerproducts: {
    flex: 1,
    padding: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5, // Use marginVertical para espaçamento vertical entre os cards
    marginHorizontal: 10, // Adicione marginHorizontal para ter um espaçamento nas laterais
    alignItems: "center",
    // Remova flex: 1 e maxWidth, ou ajuste para ocupar a largura total
    // flex: 1,
    // maxWidth: "48%",
    width: "auto", // Ocupa a largura necessária (geralmente 100% da área disponível com as margens)
    alignSelf: "stretch", // Garante que o item se estique na largura do container FlatList
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  details: {
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  addToCartButton: {
    flexDirection: "row",
    backgroundColor: COLORS.bluebtnsmall,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "bold",
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
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 35,
    fontSize: FONT_SIZE.md,
    color: "#333",
  },
  customerBanner: {
    backgroundColor: COLORS.gray6, // Fundo leve para destaque
    padding: 10, // Espaçamento interno
    marginHorizontal: 16,
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
});
