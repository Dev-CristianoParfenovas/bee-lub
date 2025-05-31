// AppStack.jsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerScreen from "./src/screens/drawer_screen/drawer_screen.jsx";
import Payment from "./src/screens/payment/payment.jsx";
import Cart from "./src/screens/cart/cart.jsx";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

export default AppStack;
