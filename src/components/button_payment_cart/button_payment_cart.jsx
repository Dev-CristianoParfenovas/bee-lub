import { Text, TouchableOpacity } from "react-native";
import { styles } from "./button_payment_cart.style.js";

function ButtonPaymentCart(props) {
  console.log(props.text); // Verifique o texto
  return (
    <TouchableOpacity style={styles.btnpayment} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default ButtonPaymentCart;
