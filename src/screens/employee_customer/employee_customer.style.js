import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  containerbanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: "10%",
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: "bold",
    marginTop: 55,
  },
  watermark: {
    position: "absolute",
    width: 350,
    height: 350,
    alignSelf: "center",
    top: "40%",
  },
  backButton: {
    marginTop: 55,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  containerfunc: {
    flex: 1,
    marginTop: 35,
    justifyContent: "flex-start",
    padding: 15,
    color: COLORS.gray5,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginStart: 5,
    marginBottom: 8,
  },
  containerInput: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.gray5,
    padding: 12,
    borderRadius: 10,
    height: 56,
    width: "100%",
  },
  containerbtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 25,
    gap: 10,
  },
  customerCard: {
    padding: 15,
    backgroundColor: COLORS.bluecardcli,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  selectedCustomerCard: {
    borderColor: COLORS.gray5,
    borderWidth: 2,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customerPhone: {
    fontSize: 14,
    color: COLORS.gray2,
  },
  separator: {
    height: 1,
    marginBottom: 8,
    backgroundColor: "#ccc",
  },
  limparClientes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 8,
  },
  noCustomersText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: COLORS.gray2,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 5,
  },
});
