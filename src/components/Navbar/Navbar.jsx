import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; 
import '../../index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo1 from '../../assets/l1.png'; // Update the path if necessary
import logo from '../../assets/logo.webp'; // Update the path if

function Navbar() {
  const { currentUser, logout } = useAuth(); 

  return (
    <nav 
      className="navbar navbar-expand-lg custom-navbar p-3" 
      style={{ 
        backgroundImage: `url(${logo})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo1} alt="Logo Icon" className="logo-image me-2" style={{ width: '200px', height: '200px' }} />
        </a>

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 custom-navbar-links">
          <li className="nav-item">
            <NavLink 
              className="nav-link text-white" 
              to="/destinos" 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', padding: '8px 12px' }}
            >
              <i className="fas fa-plane"></i> Destinos
            </NavLink>
          </li>
          {currentUser && (
            <>
              <li className="nav-item">
                <NavLink 
                  className="nav-link text-white" 
                  to="/paquetes" 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', padding: '8px 12px' }}
                >
                  <i className="fas fa-suitcase"></i> Paquetes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className="nav-link text-white" 
                  to="/reservas" 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', padding: '8px 12px' }}
                >
                  <i className="fas fa-ticket-alt"></i> Reservar
                </NavLink>
              </li>
              {currentUser.role === 'admin' && (
                <>
                  <li className="nav-item">
                    <NavLink 
                      className="nav-link text-white" 
                      to="/usuarios" 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', padding: '8px 12px' }}
                    >
                      <i className="fas fa-users"></i> Usuarios
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      className="nav-link text-white" 
                      to="/admin-requests" 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', padding: '8px 12px' }}
                    >
                      <i className="fas fa-clipboard-list"></i> Solicitudes
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 custom-navbar-user">
          {currentUser ? (
            <>
              <span className="navbar-text text-white me-3">Hola, {currentUser.name}</span>
              <button 
                className="btn btn-outline-light btn-sm" 
                onClick={logout} 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid white', borderRadius: '5px' }}
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink 
                  className="nav-link text-white" 
                  to="/login" 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', padding: '8px 12px' }}
                >
                  <i className="fas fa-user"></i> Entrar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className="nav-link text-white" 
                  to="/register" 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', padding: '8px 12px' }}
                >
                  <i className="fas fa-user-plus"></i> Registrarse
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
