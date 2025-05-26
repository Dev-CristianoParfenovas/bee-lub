import React, { createContext, useState, useEffect, useContext } from "react";
import { Camera, useCameraPermissions } from "expo-camera";

// Criando o contexto
const CameraPermissionContext = createContext();

export const CameraPermissionProvider = ({ children }) => {
  const [hasPermission, setHasPermission] = useCameraPermissions(); //useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento da permissão

  // Função para solicitar a permissão da câmera
  const requestPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    } catch (error) {
      console.error("Erro ao solicitar permissão para a câmera:", error);
      setHasPermission(false);
    } finally {
      setIsLoading(false); // Finaliza o carregamento da permissão
    }
  };

  // Solicita a permissão automaticamente ao montar o componente
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <CameraPermissionContext.Provider
      value={{ hasPermission, requestPermission, isLoading }}
    >
      {children}
    </CameraPermissionContext.Provider>
  );
};

// Hook para consumir o contexto
export const useCameraPermission = () => {
  const context = useContext(CameraPermissionContext);
  if (!context) {
    throw new Error(
      "useCameraPermission deve ser usado dentro de um CameraPermissionProvider"
    );
  }
  return context;
};
