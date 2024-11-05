import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext)
  
  


export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Manejo de usuarios
  const [currentUser, setCurrentUser] = useState(null);
  const [adminRequests, setAdminRequests] = useState([]);
  const navigate = useNavigate(); 

  

  // Función para registrar un nuevo usuario
  const register = (username, password, isAdminRequested) => {
    const newUser = { username, email: username, password, role: 'user' }; // Asignar un rol por defecto

    if (isAdminRequested) {
      setAdminRequests((prevRequests) => [...prevRequests, newUser]);
    }

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8082/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Envía el correo electrónico
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error); // Extraer el mensaje de error del servidor
      }

      const data = await response.json();
    console.log("Usuario logueado:", data.user); // Verifica que los datos del usuario contengan el campo username
    setCurrentUser(data.user);
    
    navigate('/');
    return true;
  } catch (error) {
    console.error("Error en el login:", error);
    return false;
  }
};

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        currentUser,
        users,
        adminRequests,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};