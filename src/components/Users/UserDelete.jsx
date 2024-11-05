import React from 'react';

function UserDelete({ username, onDelete }) {
  return (
    <button onClick={() => onDelete(username)}>Eliminar</button>
  );
}

export default UserDelete;
