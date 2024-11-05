import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import '../../index.css';

const Destinos = () => {
  const { currentUser } = useAuth();
  const [destinos, setDestinos] = useState([]);
  const [nuevoDestino, setNuevoDestino] = useState({ name: '', description: '', category: '', imageUrl: '' });
  const [editando, setEditando] = useState(false);
  const [destinoEditado, setDestinoEditado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8082/api/destinations')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener destinos');
        return response.json();
      })
      .then((data) => {
        const destinosConImagen = data.map((destino, index) => ({
          ...destino,
          imageUrl: index % 2 === 0 ? img2 : img3,
        }));
        setDestinos(destinosConImagen);
      })
      .catch((error) => console.error('Error al cargar destinos:', error));
  }, []);

  const handleInputChange = (e) => {
    setNuevoDestino({
      ...nuevoDestino,
      [e.target.name]: e.target.value,
    });
  };

  const agregarDestino = (e) => {
    e.preventDefault();
    const method = editando ? 'PUT' : 'POST';
    const url = editando
      ? `http://localhost:8082/api/destinations/${destinoEditado.id}`
      : 'http://localhost:8082/api/destinations';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoDestino),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al agregar/editar destino');
        return response.json();
      })
      .then((data) => {
        const destinoConImagen = {
          ...data,
          imageUrl: img2,
        };

        if (editando) {
          setDestinos(destinos.map((dest) => (dest.id === data.id ? destinoConImagen : dest)));
          setEditando(false);
          setDestinoEditado(null);
        } else {
          setDestinos([...destinos, destinoConImagen]);
        }
        setNuevoDestino({ name: '', description: '', category: '', imageUrl: '' });
      })
      .catch((error) => console.error('Error al agregar/editar destino:', error));
  };

  const eliminarDestino = (id) => {
    fetch(`http://localhost:8082/api/destinations/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar destino');
        setDestinos(destinos.filter((destino) => destino.id !== id));
      })
      .catch((error) => console.error('Error al eliminar destino:', error));
  };

  const prepararEdicion = (destino) => {
    setEditando(true);
    setNuevoDestino({
      name: destino.name || '',
      description: destino.description || '',
      category: destino.category || '',
      imageUrl: destino.imageUrl || '',
    });
    setDestinoEditado(destino);
  };

  const irAPaquetes = () => {
    navigate('/paquetes');
  };

  return (
    <div className="container mt-5">
      <h2 className="titulosH2 text-center text-white mb-4">Destinos Disponibles</h2>
      <div className="destinos-container">
        {destinos.map((destino) => (
          <div key={destino.id} className="destino-card mx-auto shadow-sm bg-white p-4 mb-5 rounded">
            <div className="card-image-container">
              <img src={destino.imageUrl} alt={destino.name} className="card-image" />
            </div>
            <div className="card-info-description text-center">
              <span className="card-info-title" style={{ color: '#FF6B6B' }}>{destino.name}</span>
              <p className="card-info-subtitle">IDA Y VUELTA</p>
              <p className="card-info-category">Categoría: {destino.category}</p>
              {currentUser && currentUser.role === 'admin' ? (
                <>
                  <button onClick={() => eliminarDestino(destino.id)} className="button-style btn btn-danger m-2">Eliminar</button>
                  <button onClick={() => prepararEdicion(destino)} className="button-style btn btn-warning m-2">Editar</button>
                </>
              ) : (
                <button onClick={irAPaquetes} className="button-style btn btn-outline-secondary w-100 mt-2">Ver Paquetes Disponibles</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {currentUser && currentUser.role === 'admin' && (
        <form onSubmit={agregarDestino} className="paquete-form mx-auto bg-light p-4 rounded shadow-sm" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label>Nombre del Destino:</label>
            <input
              type="text"
              name="name"
              value={nuevoDestino.name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Descripción:</label>
            <input
              type="text"
              name="description"
              value={nuevoDestino.description}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Categoría:</label>
            <input
              type="text"
              name="category"
              value={nuevoDestino.category}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>URL de la Imagen:</label>
            <input
              type="text"
              name="imageUrl"
              value={nuevoDestino.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/imagen.jpg"
              className="form-control"
            />
          </div>
          <button type="submit" className="button-style btn btn-success w-100 mt-3">{editando ? 'Guardar Cambios' : 'Agregar Destino'}</button>
        </form>
      )}
    </div>
  );
};

export default Destinos;
