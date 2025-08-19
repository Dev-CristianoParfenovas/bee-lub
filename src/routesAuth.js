import React from "react";
import { Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import EmployeeCustomer from "./screens/employee_customer/employee_customer.jsx";
import EmployeeRegistrationScreen from "./screens/reg_employee/employee_registration_screen.jsx";
import ClientRegistrationScreen from "./screens/reg_clients/client_registration_screen.jsx";
import ProductsRegistrationScreen from "./screens/reg_products/products_registration_screen.jsx";
import CategoryRegistrationScreen from "./screens/reg_category/category_registration_screen.jsx";
import DrawerScreen from "./screens/drawer_screen/drawer_screen.jsx";
import Products from "./screens/products/products.jsx";
import Cart from "./screens/cart/cart.jsx";
import Payment from "./screens/payment/payment.jsx";
import QuickStockScreen from "./screens/quick_stock/quick_stock_screen.jsx";
import { COLORS } from "./constants/theme.js";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Certifique-se de instalar o react-native-vector-icons
import { useAuth } from "./context/AuthContext.jsx"; // Caminho correto
import SalesDashboard from "./screens/sales_dashboard/sales_dashboard.jsx";
import LogoutScreen from "./components/logout_screen/logoutscreen.jsx";
import Vehicle from "./screens/reg_vehicle/vehicle_reg_screen.jsx";
import VehiclesScreen from "./screens/customerVehiclesScreen/CustomerVehiclesScreen.jsx";
import ProductsSalesScreen from "./screens/produtcs_sales_screen/products_sales_screen.jsx";
import SalesDetailScreen from "./screens/saledetailscreen/saledetailscreen.jsx";
import EmployeeList from "./screens/employee_list/employee_list.jsx";
import AppStack from "../appstack.js";

const Drawer = createDrawerNavigator();

// Componente personalizado para o conteúdo do menu Drawer
function CustomDrawerContent(props) {
  const { userName } = props;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho personalizado */}
        <View style={{ padding: 20, backgroundColor: "#f4f4f4" }}>
          <Text style={{ fontSize: 16 }}>Olá</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            {userName}
          </Text>
        </View>
        {/* Renderiza os itens padrão do menu Drawer */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

function RoutesAuth() {
  const { isAdmin, isAuthenticated, userName, idEmployee } = useAuth();
  console.log("Adm: ", isAdmin);

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="DrawerScreen"
        drawerContent={(props) => (
          <CustomDrawerContent {...props} userName={userName} />
        )}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: COLORS.blueprincipal,
          },
          headerTintColor: "#fff",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          drawerStyle: {
            backgroundColor: COLORS.bluedrawer,
            width: 250,
          },
          drawerItemStyle: {
            paddingVertical: 10,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          drawerActiveTintColor: COLORS.bluebtn,
          drawerInactiveTintColor: COLORS.blueprincipal,
        })}
      >
        <Drawer.Screen
          name="DrawerScreen"
          component={DrawerScreen}
          options={{
            title: "Home",
            drawerLabel: () => null, // Remove o rótulo
            drawerItemStyle: { height: 0 }, // Remove o espaço ocupado
            headerShadowVisible: false,
          }}
        />
        {/*Rota do adm*/}
        {isAuthenticated && isAdmin && (
          <>
            <Drawer.Screen
              name="Cadastrar Funcionários"
              component={EmployeeRegistrationScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="person-add"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Cadastrar Clientes"
              component={ClientRegistrationScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="person"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Cadastrar Categorias"
              component={CategoryRegistrationScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="category"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Cadastrar Produtos"
              component={ProductsRegistrationScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="inventory"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />

            <Drawer.Screen
              name="Cadastrar Veículos"
              component={Vehicle}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="directions-car"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Acessar Clientes"
              component={EmployeeCustomer}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="people"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Lista de Produtos"
              component={Products}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="store"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Acessar Funcionários"
              component={EmployeeList}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="badge"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Carrinho"
              component={Cart}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="shopping-cart"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />

            <Drawer.Screen
              name="Painel de Vendas"
              component={SalesDashboard}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="bar-chart"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Produtos Vendidos"
              component={ProductsSalesScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="shopping-bag"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Estoque Rápido"
              component={QuickStockScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="check-box"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Sair"
              component={LogoutScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="logout"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Pagto"
              component={Payment}
              options={{
                headerShown: false,
                drawerLabel: () => null, // Oculta o nome do item
                drawerItemStyle: { height: 0 }, // Oculta o espaço do item
              }}
            />
            <Drawer.Screen
              name="Veículos"
              component={VehiclesScreen}
              options={{
                headerShown: false, // ou false, dependendo se você quer ou não o header
                drawerLabel: () => null,
                drawerItemStyle: { height: 0 },
              }}
            />
            <Drawer.Screen
              name="SaleDetail"
              component={SalesDetailScreen}
              options={{
                headerShown: false, // ou false, dependendo se você quer ou não o header
                drawerLabel: () => null,
                drawerItemStyle: { height: 0 },
              }}
            />
          </>
        )}

        {/*Rota para funcionários*/}
        {isAuthenticated && !isAdmin && (
          <>
            <Drawer.Screen
              name="Acessar Clientes"
              component={EmployeeCustomer}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="person-add"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Lista de Produtos"
              component={Products}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="store"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Carrinho"
              component={Cart}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="shopping-cart"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Pagto"
              component={Payment}
              options={{
                headerShown: false,
                drawerLabel: () => null, // Oculta o nome do item
                drawerItemStyle: { height: 0 }, // Oculta o espaço do item
              }}
            />
            <Drawer.Screen
              name="Veículos"
              component={VehiclesScreen}
              options={{
                headerShown: false, // ou false, dependendo se você quer ou não o header
                drawerLabel: () => null,
                drawerItemStyle: { height: 0 },
              }}
            />
            <Drawer.Screen
              name="Sair"
              component={LogoutScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Icon
                    name="logout"
                    color={color}
                    size={size}
                    style={{ marginLeft: -15 }}
                  />
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </View>
  );
}

export default RoutesAuth;
