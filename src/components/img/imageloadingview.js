// src/components/ImageLoadingView.js
import React, { useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet, Text } from "react-native";

// Você pode passar COLORS como prop ou importar se for um arquivo global
// const COLORS = { primary: '#007bff', text: '#333', /* ... */ };

const ImageLoadingView = ({ imageUrl, imageSize = 100 }) => {
  // Adicionado imageSize como prop
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Reinicia o estado de loading e erro quando a URL da imagem muda
  // Isso é importante se a mesma instância do componente for reutilizada (como em FlatList)
  React.useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [imageUrl]);

  return (
    <View
      style={[
        styles.imageContainer,
        { width: imageSize, height: imageSize }, // Usa a prop imageSize
      ]}
    >
      {imageUrl && !imageError ? (
        <>
          {imageLoading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="small" color="#FFF" />
            </View>
          )}
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        </>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sem Imagem</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  placeholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  placeholderText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

export default ImageLoadingView;
