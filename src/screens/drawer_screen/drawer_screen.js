import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  beelogin: {
    width: 350,
    height: 350,
  },
  containerlogo: {
    alignItems: "center",
    paddingTop: 135,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", // Ajuste conforme necessário
    padding: 0, // Remova o padding se não for necessário
    backgroundColor: COLORS.blueprincipal,
  },
});
