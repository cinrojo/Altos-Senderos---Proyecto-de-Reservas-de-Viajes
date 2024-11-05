import React, { useState } from 'react';

function UserEdit({ user, onSave, onCancel }) {
  const [newName, setNewName] = useState(user.name); // Cambié a 'name' en lugar de 'username'
  const [newPassword, setNewPassword] = useState(''); // Iniciar con una contraseña en blanco para seguridad

  const handleSave = () => {
    onSave(newName, newPassword); // Llamar a la función onSave con los nuevos datos
  };

  return (
    <div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Nuevo nombre"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Nueva contraseña"
      />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}

export default UserEdit;
