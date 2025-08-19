import React, { useState, useEffect } from "react";
import Login from "./screens/login/login.jsx";
import Account from "./screens/account/account.jsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/splash_screen/splash_screen.jsx";

const Stack = createNativeStackNavigator();

function Routes() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Exibe a splash por 3 segundos
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Routes;
