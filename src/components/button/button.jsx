import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./button.style";

function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.btn, props.style]} // Permite sobrescrever estilos
      onPress={props.onPress}
      disabled={props.disabled} // <<-- ESSENCIAL: passa 'disabled' para o TouchableOpacity
      activeOpacity={props.disabled ? 1 : 0.7} // Impede o feedback de toque se desabilitado
    >
      {props.loading ? (
        // Se props.disabled for true, mostra o spinner no centro
        <ActivityIndicator size="small" color="#FFF" /> // Cor do spinner (geralmente branca para contraste)
      ) : (
        // Caso contrário, mostra o texto normal do botão
        <Text style={styles.text}>{props.text}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
