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
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: "#007bff",
    backgroundColor: "#e6f0ff",
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
