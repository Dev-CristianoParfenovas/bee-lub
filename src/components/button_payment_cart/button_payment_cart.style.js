import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  btnpayment: {
    backgroundColor: COLORS.gray4,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 140, // Tamanho maior para o botão principal
  },

  text: {
    color: COLORS.black,
    fontSize: FONT_SIZE.lg,
  },
});
