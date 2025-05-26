import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes";
import RoutesAuth from "./routesAuth";
import { useAuth } from "./context/AuthContext";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <RoutesAuth /> : <Routes />}
    </NavigationContainer>
  );
}
