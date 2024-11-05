import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Solo importa Routes y Route
import Navbar from './components/Navbar/Navbar';
import Paquetes from './components/Paquetes/Paquetes';
import Reservas from './components/Reservas/Reservas';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminRequests from './components/Admin/AdminRequests';
import Home from './components/Home/Home';
import Users from './components/Users/UsersList';
import Destinos from './components/Destinos/Destinos';
import Pagos from './components/Pagos/Pagos';
import './index.css';

function App() {
  const [paquetes, setPaquetes] = useState([
    { id: 1, nombre: 'Paquete Familiar', descripcion: 'Viaje para toda la familia', destino: 'Buenos Aires', precio: 5000 },
    { id: 2, nombre: 'Aventura en la Montaña', descripcion: 'Para los amantes de la aventura', destino: 'Córdoba', precio: 3000 }
  ]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paquetes" element={<Paquetes paquetes={paquetes} setPaquetes={setPaquetes} />} />
        <Route path="/reservas" element={<Reservas paquetes={paquetes} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-requests" element={<AdminRequests />} />
        <Route path="/usuarios" element={<Users />} /> 
        <Route path="/destinos" element={<Destinos />} /> 
        <Route path="/pagos/:id" element={<Pagos />} />    
      </Routes> 
    </>
  );
}

export default App;
