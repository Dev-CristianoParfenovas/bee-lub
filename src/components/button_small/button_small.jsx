import { Text, TouchableOpacity } from "react-native";
import { styles } from "./button_small.style.js";

function ButtonSmall(props) {
  return (
    <TouchableOpacity style={styles.btnSmall} onPress={props.onPress}>
      <Text style={styles.textSmall}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default ButtonSmall;
