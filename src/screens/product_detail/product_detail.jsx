import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./product_detail.style.js";
import { products } from "../../constants/dados.js";
import Button from "../../components/button/button.jsx";
import ButtonSmall from "../../components/button_small/button_small.jsx";

function ProductDetail() {
  const product = products[0]; // Supondo que você queira mostrar detalhes do primeiro produto

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const price = parseFloat(product.price || "0");
  const total = price * quantity;

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.containerbanner}>
          <Text style={styles.text}>Detalhe do Produto</Text>
        </View>
      </View>

      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>R$ {price.toFixed(2)}</Text>

      {/* Botões de incremento e decremento */}
      <View style={styles.quantityControls}>
        <ButtonSmall
          text="-"
          style={styles.btnSmall} // Certifique-se de passar styles.btnSmall
          onPress={decrementQuantity}
        />
        <Text style={styles.quantityText}>{quantity}</Text>
        <ButtonSmall
          text="+"
          style={styles.btnSmall} // Botão pequeno
          onPress={incrementQuantity}
        />
      </View>

      <View style={styles.containertotalprice}>
        <Text style={styles.productTotalPrice}>
          Total: R$ {total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.containerbtn}>
        <Button
          text="Adicionar no carrinho"
          onPress={() => console.log("Produto adicionado ao carrinho")}
        />
      </View>
    </View>
  );
}

export default ProductDetail;
