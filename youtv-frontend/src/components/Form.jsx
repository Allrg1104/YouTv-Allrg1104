import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Form.css';

function Form({ callback, setiduser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const res = await fetch('https://youtv-allrg1104-frontend.vercel.app/v1/signos/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.usuario === 'user') {
        setiduser(data.id);
        callback('user');
        navigate('/userHome');
      } else if (data.usuario === 'admin') {
        callback('admin');
        navigate('/adminHome');
      } else {
        setError('Usuario o contraseña inválidos');
      }
    } catch (error) {
      console.error('Error al validar el usuario:', error);
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          <div className="login-header">
          <img src="/publi/youtv.png" alt="Logo YouTv" className="logo" />
            <h2 className="login-title">YouTv</h2>
            <p className="login-subtitle">Inicia sesión en tu cuenta</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="sr-only">
                Nombre de usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="form-input"
                placeholder="Nombre de usuario"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form-input"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn btn-primary">
              Iniciar sesión
            </button>
          </form>

          <div className="additional-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate('/registro')}
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              <span>Registrarse</span>
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate('/restablecer')}
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Restablecer contraseña</span>
            </button>
          </div>
        </div>
        <div className="login-image-container">
          <img src="/placeholder.svg?height=600&width=400" alt="YouTv" className="login-image" />
        </div>
      </div>
    </div>
  );
}

export default Form;



