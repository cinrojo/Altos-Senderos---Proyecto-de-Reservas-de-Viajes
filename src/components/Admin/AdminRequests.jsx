import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const AdminRequests = () => {
  const { adminRequests, approveAdminRequest, rejectAdminRequest } = useAuth();

  if (adminRequests.length === 0) {
    return <p>No hay solicitudes pendientes</p>;
  }

  return (
    <div>
      <h2>Solicitudes de Admin</h2>
      <ul>
        {adminRequests.map((request) => (
          <li key={request.username}>
            {request.username} ha solicitado ser administrador.
            <button onClick={() => approveAdminRequest(request.username)}>
              Aprobar
            </button>
            <button onClick={() => rejectAdminRequest(request.username)}>
              Rechazar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminRequests;
