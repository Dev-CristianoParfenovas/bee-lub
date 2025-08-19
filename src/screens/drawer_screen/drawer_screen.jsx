import React, { useEffect, useRef } from "react";
import { Image, View, TouchableOpacity, Animated } from "react-native";
import icons from "../../constants/icons.js";
import { styles } from "./drawer_screen.js";

function DrawerScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // começa invisível
  const scaleAnim = useRef(new Animated.Value(0.9)).current; // começa menor

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5, // controla o "balanço"
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerlogo}
        onPress={() => navigation.toggleDrawer()}
        activeOpacity={0.8} // dá um efeito mais suave no toque
      >
        <Animated.Image
          source={icons.beetransp}
          style={[
            styles.beelogin,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

export default DrawerScreen;
