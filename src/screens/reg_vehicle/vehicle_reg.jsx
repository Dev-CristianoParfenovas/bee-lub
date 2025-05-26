import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./vehicle_reg.style";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme.js";
import images from "../../constants/icons.js";
import icons from "../../constants/icons.js";
import { useNavigation } from "@react-navigation/native";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";

function Vehicle() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [placa, setPlaca] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    placa: "",
  });

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      {/* Cabeçalho com título */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cadastro de Veículos</Text>
      </View>
      {/* Marca d'água */}
      <Image
        source={images.beelogin}
        style={styles.watermark}
        resizeMode="contain"
        opacity={0.1} // Ajuste para o efeito de marca d'água
      />

      <View style={styles.containerlogo}>
        <Image source={icons.logobee} style={styles.beelogin} />
      </View>

      <View>
        {/* Campo Nome */}
        <View style={styles.containerInput}>
          <View style={styles.inputWithIcon}>
            <MaterialIcons
              name="directions-car"
              size={24}
              color={COLORS.gray3}
            />
            <TextBox
              placeholder="Descriçao do Veículo"
              placeholderTextColor={COLORS.gray3} // Cor do texto placeholder
              style={[styles.input, errors.name ? styles.inputError : null]}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          {/* Campo Placa */}
          <View style={styles.inputWithIcon}>
            <MaterialIcons name="sort" size={24} color={COLORS.gray3} />
            <TextBox
              placeholder="Placa do Veículo"
              placeholderTextColor={COLORS.gray3} // Cor do texto placeholder
              style={[styles.input, errors.name ? styles.inputError : null]}
              value={placa}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <Button text="Cadastrar" />
        </View>
      </View>
    </View>
  );
}
export default Vehicle;
