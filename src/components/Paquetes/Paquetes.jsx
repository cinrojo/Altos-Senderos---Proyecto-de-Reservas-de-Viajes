import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import img2 from '../../assets/img2.jpg'; // Importa las imágenes
import img3 from '../../assets/img3.jpg';
import "../../index.css";

const Paquetes = () => {
  const { currentUser } = useAuth();
  const [destinos, setDestinos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [nuevoPaquete, setNuevoPaquete] = useState({
    name: "",
    description: "",
    id_destino: "",
    price: "",
    start_date: "",
    end_date: "",
    availability: true,
  });
  const [editando, setEditando] = useState(false);
  const [paqueteEditado, setPaqueteEditado] = useState(null);
  const navigate = useNavigate();

  const agregarReserva = (paquete) => {
    navigate('/reservas', { state: { paqueteSeleccionado: paquete } });
  };

  useEffect(() => {
    fetch("http://localhost:8082/api/destinations")
      .then((response) => response.json())
      .then((data) => setDestinos(data))
      .catch((error) => console.error("Error al obtener destinos:", error));

    obtenerPaquetes();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.name === "availability" ? e.target.checked : e.target.value;
    setNuevoPaquete({
      ...nuevoPaquete,
      [e.target.name]: value,
    });
  };

  const obtenerPaquetes = () => {
    fetch("http://localhost:8082/api/packages")
      .then((response) => response.json())
      .then((data) => {
        const paquetesConImagen = data.map((paquete, index) => ({
          ...paquete,
          imageUrl: index % 2 === 0 ? img2 : img3,
        }));
        setPaquetes(paquetesConImagen);
      })
      .catch((error) =>
        console.error("Error al obtener paquetes desde la API:", error)
      );
  };

  const agregarPaquete = (e) => {
    e.preventDefault();
    const url = editando
      ? `http://localhost:8082/api/packages/${paqueteEditado.id}`
      : "http://localhost:8082/api/packages";
    const method = editando ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPaquete),
    })
      .then((response) => response.json())
      .then((data) => {
        const paqueteConImagen = {
          ...data,
          imageUrl: img2,
        };

        if (editando) {
          setPaquetes(paquetes.map((paquete) => (paquete.id === data.id ? paqueteConImagen : paquete)));
          setEditando(false);
          setPaqueteEditado(null);
        } else {
          setPaquetes([...paquetes, paqueteConImagen]);
        }
        setNuevoPaquete({
          name: "",
          description: "",
          id_destino: "",
          price: "",
          start_date: "",
          end_date: "",
          availability: true,
        });
      })
      .catch((error) =>
        console.error("Error al agregar/editar paquete en la API:", error)
      );
  };

  const eliminarPaquete = (id) => {
    fetch(`http://localhost:8082/api/packages/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el paquete');
        }
        setPaquetes(paquetes.filter((paquete) => paquete.id !== id));
      })
      .catch((error) =>
        console.error("Error al eliminar paquete desde la API:", error)
      );
  };

  const prepararEdicion = (paquete) => {
    setEditando(true);
    setNuevoPaquete({
      name: paquete.name,
      description: paquete.description,
      id_destino: paquete.id_destino,
      price: paquete.price,
      start_date: paquete.start_date,
      end_date: paquete.end_date,
      availability: paquete.availability,
    });
    setPaqueteEditado(paquete);
  };

  return (
    <div className="container mt-5">
      <h2 className="titulosH2 text-center text-white mb-4">Paquetes Disponibles</h2>
      <div className="paquetes-container">
        {paquetes.map((paquete) => (
          <div key={paquete.id} className="paquete-card mx-auto shadow-sm bg-white p-4 mb-5 rounded">
            <div className="card-image-container">
              <img src={paquete.imageUrl} alt={paquete.name} className="card-image" />
            </div>
            <div className="card-info-description text-center">
              <h3 className="card-info-title" style={{ color: '#FF6B6B' }}>{paquete.name}</h3>
              <p className="card-info-subtitle">{paquete.description}</p>
              <p className="card-info-destination">Destino: {paquete.Destination?.name}</p>
              <p className="card-info-price">Precio: ${paquete.price}</p>
              <p className="card-info-dates">Fecha de inicio: {new Date(paquete.start_date).toLocaleDateString()}</p>
              <p className="card-info-dates">Fecha de fin: {new Date(paquete.end_date).toLocaleDateString()}</p>
              <p className="card-info-availability">
                Disponibilidad: {paquete.availability ? "Disponible" : "No disponible"}
              </p>
              {currentUser && currentUser.role === "admin" && (
                <>
                  <button onClick={() => eliminarPaquete(paquete.id)} className="button-style btn btn-danger m-2">Eliminar</button>
                  <button onClick={() => prepararEdicion(paquete)} className="button-style btn btn-warning m-2">Editar</button>
                </>
              )}
              <button onClick={() => agregarReserva(paquete)}  className="button-style btn btn-outline-secondary w-100 mt-2">Agregar a Reserva</button>
            </div>
          </div>
        ))}
      </div>
      
      {currentUser && currentUser.role === "admin" && (
        <form onSubmit={agregarPaquete} className="paquete-form mx-auto bg-light p-4 rounded shadow-sm" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label>Nombre del Paquete:</label>
            <input type="text" name="name" value={nuevoPaquete.name} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Descripción:</label>
            <input type="text" name="description" value={nuevoPaquete.description} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Destino:</label>
            <select name="id_destino" value={nuevoPaquete.id_destino} onChange={handleInputChange} className="form-control" required>
              <option value="">Selecciona un destino</option>
              {destinos.map((destino) => (
                <option key={destino.id} value={destino.id}>{destino.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Precio:</label>
            <input type="number" name="price" value={nuevoPaquete.price} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Fecha de inicio:</label>
            <input type="date" name="start_date" value={nuevoPaquete.start_date} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Fecha de fin:</label>
            <input type="date" name="end_date" value={nuevoPaquete.end_date} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" name="availability" checked={nuevoPaquete.availability} onChange={handleInputChange} className="form-check-input" />
            <label className="form-check-label">Disponibilidad</label>
          </div>
          <button type="submit" className="button-style btn btn-success w-100 mt-3">{editando ? "Guardar Cambios" : "Agregar Paquete"}</button>
        </form>
      )}
    </div>
  );
};

export default Paquetes;
