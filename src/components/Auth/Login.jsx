import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import '../../index.css'; 



const Login = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const success = await login(email, password);
    if (success) {
      alert('Sesión iniciada');
      // Redirigir al usuario a otra página si es necesario
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Iniciar Sesión</h2>
        <form className='formControl' onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="button-style btn btn-outline-secondary w-100 mt-2" >Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
