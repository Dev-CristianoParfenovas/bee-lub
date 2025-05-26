import AsyncStorage from "@react-native-async-storage/async-storage";

const getStoredData = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const companyId = await AsyncStorage.getItem("companyId");

    console.log("Token recuperado no getStoredData:", token);
    console.log("Company ID recuperado no getStoredData:", companyId);

    return { token, companyId };
  } catch (error) {
    console.error("Erro ao buscar dados no AsyncStorage:", error.message);
    return { token: null, companyId: null };
  }
};

export default getStoredData;
