import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userData = {
      name,
      email,
      username,
      password,
      role,
    };

    try {
      const response = await fetch("http://localhost:8082/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al registrar: ${errorMessage}`);
      }

      alert('Usuario registrado con éxito!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Registrar Usuario</h2>
        <form className='formControl' onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Rol:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
