import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  banner: {
    height: 110, // Proporção do banner na tela
    backgroundColor: COLORS.bluebtn,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  containerbanner: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    textAlign: "center",
    marginTop: 35,
  },

  productImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 16,
  },
  productName: {
    fontSize: 16,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  productTotalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },

  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },

  containerbtn: {
    marginTop: 16,
    alignItems: "center",
  },
  containertotalprice: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
});
