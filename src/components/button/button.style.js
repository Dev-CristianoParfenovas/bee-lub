import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.bluebtn,
    borderRadius: 15,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    // width: "100%", // Tamanho maior para o botão principal
  },
  btnpayment: {
    backgroundColor: COLORS.bluebtn,
    borderRadius: 40,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 80, // Tamanho maior para o botão principal
  },

  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
  },
  btnDisabled: {
    backgroundColor: "#A0A0A0", // Cor mais clara/cinza para o botão desabilitado
    opacity: 0.7, // <<-- Isso cria o efeito de "desfoque" ou esmaecimento
  },
});
