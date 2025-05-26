import { Image, Text, View } from "react-native";
import icons from "../../constants/icons.js";
import { styles } from "./splash_screen.js";

function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerlogo}>
        <Image source={icons.logobee} style={styles.beelogin} />
      </View>
      <Text style={styles.txtcarregando}>Aguarde Carregando...</Text>
    </View>
  );
}

export default SplashScreen;
