import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./button_search.style.js";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importando o Ionicons

function ButtonSearch(props) {
  return (
    <TouchableOpacity style={styles.btnSearch} onPress={props.onPress}>
      <View
        style={{
          flexDirection: props.iconPosition === "right" ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        {props.icon && (
          <Ionicons
            name={props.icon} // Nome do ícone
            size={20} // Tamanho do ícone
            color={props.iconColor || "#fff"} // Cor do ícone
            style={styles.icon}
          />
        )}
        <Text style={styles.textSearch}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonSearch;
