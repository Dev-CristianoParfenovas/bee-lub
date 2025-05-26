import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { styles } from "./textbox.style";
import { COLORS } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons"; // Biblioteca de ícones
import { TextInputMask } from "react-native-masked-text"; // Máscara para inputs

function TextBox(props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(props.isPassword);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const renderInput = () => {
    const inputStyle = [
      styles.input,
      { fontSize: props.fontSize || 16 }, // Define o tamanho da fonte dinamicamente
    ];

    if (props.maskType === "phone") {
      return (
        <TextInputMask
          type="cel-phone"
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          style={inputStyle}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor || COLORS.gray3}
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType="phone-pad"
        />
      );
    } else if (props.maskType === "money") {
      return (
        <TextInputMask
          type="money"
          options={{
            precision: 2,
            separator: ".",
            delimiter: ".",
            unit: "",
            suffixUnit: "",
          }}
          style={inputStyle}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor || COLORS.gray3}
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType="numeric"
        />
      );
    }
    return (
      <TextInput
        style={inputStyle}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor || COLORS.gray3}
        secureTextEntry={props.isPassword && isPasswordVisible}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCapitalize={props.autoCapitalize || "none"}
        keyboardType={props.keyboardType || "default"}
      />
    );
  };

  return (
    <View style={[styles.container, props.style]}>
      {props.label && (
        <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      )}
      {props.leftIcon && (
        <MaterialIcons
          name={props.leftIcon}
          size={20}
          color={COLORS.gray3}
          style={styles.leftIcon}
        />
      )}
      {renderInput()}
      {props.isPassword && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}
        >
          <MaterialIcons
            name={isPasswordVisible ? "visibility-off" : "visibility"}
            size={24}
            color={COLORS.gray3}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default TextBox;
