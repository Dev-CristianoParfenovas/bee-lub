import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1, // Isso garante que o conteúdo ocupe todo o espaço restante
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  containerbanner: {
    height: 110,
    width: "100%",
    backgroundColor: COLORS.bluebtn,
    justifyContent: "space-evenly",
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  backButton: {
    marginTop: 55,
  },
  icone: {
    marginTop: 55,
    paddingLeft: 35,
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 55,
    paddingRight: 65,
  },
  containerdados: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
  },
  containerproducts: {
    marginVertical: 20,
    paddingLeft: 5,
  },
  footer: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderTopWidth: 1,
    // borderTopColor: "#ccc",
  },
  totalVenda: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 10,
    marginRight: 10,
  },
  buttonPDF: {
    backgroundColor: COLORS.bluebtn,
    padding: 14,
    borderRadius: 8,
    alignSelf: "center",
    width: "100%",
  },
  buttonPDFText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
