import { useEffect } from "react";
import Routes from "./src/routes";
import RoutesAuth from "./src/routesAuth";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { UserProvider } from "./src/context/UserContext"; // Importe o UserProvider
import { CartProvider } from "./src/context/CartContext";
import { CameraPermissionProvider } from "./src/context/CameraPermissionContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

function AppContent() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setIsAuthenticated(!!token); // Define como autenticado se o token existir
    };

    checkAuthStatus();
  }, [setIsAuthenticated]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <RoutesAuth /> : <Routes />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <CameraPermissionProvider>
            <AppContent />
          </CameraPermissionProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
