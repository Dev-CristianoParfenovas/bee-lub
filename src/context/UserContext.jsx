import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Armazena os dados completos do usuário
  const [userRole, setUserRole] = useState(true); // Armazena o papel do usuário (admin, employee)

  const login = (userData) => {
    setUser(userData);
    setUserRole(userData.is_admin); // Define o papel do usuário no contexto
  };

  const logout = () => {
    setUser(null);
    setUserRole(null); // Limpa o papel ao sair
  };

  return (
    <UserContext.Provider value={{ user, userRole, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => useContext(UserContext);
