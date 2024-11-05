import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider'; // Verifica que esta ruta sea correcta
import { BrowserRouter as Router } from 'react-router-dom'; // Importa el Router
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Asegúrate de tener esto para la funcionalidad del carrusel

createRoot(document.getElementById('root')).render(
  <Router> {/* Asegúrate de que el Router envuelva el AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
