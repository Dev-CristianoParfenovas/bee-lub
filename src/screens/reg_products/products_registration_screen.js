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
  scrollContent: {
    flexGrow: 1, // Garante que o conteúdo se adapte à altura da tela
    paddingHorizontal: 20, // Espaçamento lateral do conteúdo
    paddingBottom: 75, // Espaço extra para evitar sobreposição do botão fixo
    marginBottom: 45,
  },
  container: {
    flex: 1,
    paddingTop: 55,
    justifyContent: "flex-start", // Alinha os elementos no topo
    paddingHorizontal: 20,
    backgroundColor: COLORS.blueprincipal,
  },
  containerproducts: {
    flex: 1,
  },

  containerInput: {
    marginBottom: 20,
    justifyContent: "center",
    padding: 2,
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
    color: COLORS.black,
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
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerRowTrib: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  containerAliqTrib: {
    color: COLORS.white,
    marginHorizontal: 10,
  },
  containerNcmTrib: {
    marginHorizontal: 40,
    color: COLORS.white,
  },
  containerCfopTrib: {
    marginHorizontal: 28,
    color: COLORS.white,
  },
  containerCstTrib: {
    marginHorizontal: 10,
    color: COLORS.white,
  },
  containerCsosnTrib: {
    marginHorizontal: 128,
    color: COLORS.white,
  },

  inputHalf: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputHalfTrib: {
    flex: 1,
    marginHorizontal: 3,
  },
  iconTrib: {
    marginRight: 5,
  },
  fontTrib: {
    flexDirection: "row",
  },
  pickerContainer: {
    marginBottom: 20,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    overflow: "hidden", // Garante que o conteúdo respeite o arredondamento
  },

  picker: {
    height: 56,
    color: COLORS.black,
  },
  textpicker: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.white,
    paddingLeft: 3,
  },

  productCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: "100%", // Garante que o TouchableOpacity ocupe toda a largura disponível
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  productDetails: {
    fontSize: 14,
    color: COLORS.gray3,
    marginVertical: 4,
  },
  productDetailsContainer: {
    flexDirection: "row", // Alinha ícone e texto horizontalmente
    alignItems: "center", // Alinha verticalmente o ícone e o texto
    width: "100%", // Garante que o container ocupe toda a largura disponível
  },
  selecionarButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 5,
    // backgroundColor: COLORS.blueprincipal, // Exemplo de cor de fundo
    borderRadius: 5,
  },
  selecionarButtonText: {
    flexDirection: "row",
    color: COLORS.black,
    marginLeft: 8,
  },

  removeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Garante que o botão de remover fique à direita
    alignItems: "center",
    marginRight: 12, // Ajuste o valor conforme necessário para o espaçamento à direita
  },

  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8, // Espaço entre os botões
    paddingVertical: 8,
    paddingHorizontal: 1,
    //  backgroundColor: COLORS.red, // Exemplo de cor de fundo
    borderRadius: 5,
  },

  removeButtonText: {
    color: COLORS.red,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  containerbtnSearch: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribui os botões com o máximo de espaço entre eles
    width: "100%", // Garante que o container ocupe toda a largura disponível
    marginTop: 0, // Remover margem superior, caso haja
    paddingTop: 0, // Garantir que não haja padding no topo
  },

  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: COLORS.bluebtn,
    padding: 10,
    borderRadius: 5,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  bottomButtonContainer: {
    marginTop: 50, // Adiciona espaçamento extra entre o conteúdo e o botão "Cadastrar Produto"
    paddingBottom: 2, // Garantir que o botão tenha um espaçamento adequado na parte inferior
  },

  bottomContainer: {
    marginTop: 10, // Aumenta o espaçamento entre o ScrollView e o FlatList
    paddingBottom: 20, // Adiciona padding no fundo para o FlatList
  },
  loadingContainer: {
    flexDirection: "row", // Para alinhar o spinner e o texto horizontalmente
    alignItems: "center",
    justifyContent: "center", // Centraliza o conteúdo (spinner + texto)
    padding: 10,
    backgroundColor: "#f0f0f0", // Um fundo claro para a mensagem
    borderRadius: 8,
    marginTop: 10, // Espaçamento entre o botão e a mensagem de loading
    borderWidth: 1,
    borderColor: "#ddd",
  },
  loadingText: {
    marginLeft: 10, // Espaçamento entre o spinner e o texto
    fontSize: 16,
    color: COLORS.text || "#333", // Use sua cor de texto principal ou um padrão
    fontWeight: "bold",
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
  buttonContainer: {
    position: "absolute",
    bottom: 20, // Coloca os botões na parte inferior
    width: "100%", // Garante que o container ocupe toda a largura
    alignItems: "center", // Centraliza horizontalmente
  },
  openButton: {
    backgroundColor: COLORS.bluebtn, // Mantém a cor do botão
    paddingVertical: 12, // Um pouco mais de altura no botão
    paddingHorizontal: 20, // Um pouco mais de largura no botão
    borderRadius: 10, // Bordas levemente mais arredondadas
    marginVertical: 10, // Maior espaçamento entre os botões
    width: "70%", // Largura menor para harmonizar no centro
    flexDirection: "row", // Para alinhar ícone e texto
    justifyContent: "center", // Centraliza o conteúdo
    alignItems: "center", // Centraliza verticalmente ícone e texto
  },
  openButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg, // Aumenta o tamanho do texto
    fontWeight: "600", // Um peso de fonte médio para diferenciar
    marginLeft: 10, // Espaçamento entre o ícone e o texto
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

  cameraIcon: {
    fontSize: 18,
    marginRight: 10,
  },
});
