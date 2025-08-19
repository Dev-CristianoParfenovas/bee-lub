import { useEffect, useRef } from "react";
import { Image, Text, View, Animated } from "react-native";
import icons from "../../constants/icons.js";
import { styles } from "./splash_screen.js";

function SplashScreen() {
  // Criar valor animado
  const fadeAnim = useRef(new Animated.Value(0)).current; // começa transparente

  useEffect(() => {
    // Animação de opacidade de 0 para 1 em 1.5s
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.containerlogo, { opacity: fadeAnim }]}>
        <Image source={icons.logobee} style={styles.beelogin} />
      </Animated.View>
      <Text style={styles.txtcarregando}>Aguarde Carregando...</Text>
    </View>
  );
}

export default SplashScreen;
