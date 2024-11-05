import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';

function Users() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  // Obtener lista de usuarios desde la API
  useEffect(() => {
    fetch('http://localhost:8082/api/users')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener usuarios');
        return response.json();
      })
      .then((data) => {
        console.log("Usuarios obtenidos desde la API:", data);
        setUsers(data);
      })
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>

      <h3>Todos los Usuarios</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              Nombre: {user.name} - Rol: {user.role || 'Sin rol'}
            </li>
          ))
        ) : (
          <p>No se encontraron usuarios</p>
        )}
      </ul>
    </div>
  );
}

export default Users;
