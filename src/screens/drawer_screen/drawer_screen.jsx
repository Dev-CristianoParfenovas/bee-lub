import { Image, View, TouchableOpacity } from "react-native";
import icons from "../../constants/icons.js";
import { styles } from "./drawer_screen.js";

function DrawerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerlogo}
        onPress={() => navigation.toggleDrawer()} // Isso permite interagir com o drawer se necessário
      >
        <Image source={icons.logobee} style={styles.beelogin} />
      </TouchableOpacity>
    </View>
  );
}

export default DrawerScreen;
