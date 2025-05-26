import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  beelogin: {
    width: 350,
    height: 350,
  },
  containerlogo: {
    alignItems: "center",
    paddingTop: 155,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Ajuste conforme necessário
    padding: 0, // Remova o padding se não for necessário
    backgroundColor: COLORS.blueprincipal,
  },
  txtcarregando: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
