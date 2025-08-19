import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerbtn: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
  },
  vehicleCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: COLORS.bluecardcli,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 2,
  },
  selectedCard: {
    borderColor: COLORS.gray5,
    borderWidth: 2,
    backgroundColor: COLORS.bluebtnsmall, // destaque quando selecionado
  },
  vehicleText: {
    fontSize: 16,
  },
  noVehiclesText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  banner: {
    width: "100%", // ocupa toda a largura
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
    width: "100%", // ocupa toda a largura dentro do banner
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10, // substitui top: "10%"
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: 5,
    padding: 10,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
