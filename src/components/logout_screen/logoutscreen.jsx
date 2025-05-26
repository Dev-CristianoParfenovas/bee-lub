import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function LogoutScreen() {
  const { logout } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    logout(); // limpa o contexto

    // Volta para a pilha de login
    /*  navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });*/
  }, []);

  return null; // ou algum spinner ou tela de loading
}
