import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import "../../index.css";

const Reservas = () => {
  const { currentUser } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);
  const [nuevaReserva, setNuevaReserva] = useState({
    id_usuario: '',
    id_paquete: '',
    booking_date: '',
    status: 'confirmed',
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al login si no hay usuario logueado
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setNuevaReserva((prev) => ({ ...prev, id_usuario: currentUser.id }));

    if (location.state && location.state.paqueteSeleccionado) {
      setPaqueteSeleccionado(location.state.paqueteSeleccionado);
      setNuevaReserva((prev) => ({
        ...prev,
        id_paquete: location.state.paqueteSeleccionado.id,
      }));
    }

    obtenerReservas();
  }, [currentUser, location.state]);

  const obtenerReservas = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/bookings');
      const data = await response.json();

      const userReservations = currentUser.role === 'admin'
        ? data
        : data.filter((reserva) => reserva.id_usuario === currentUser.id);

      const reservasConDetalles = await Promise.all(
        userReservations.map(async (reserva) => {
          const paqueteResponse = await fetch(`http://localhost:8082/api/packages/${reserva.id_paquete}`);
          const paqueteData = await paqueteResponse.json();
          return {
            ...reserva,
            nombre_paquete: paqueteData.name,
            description: paqueteData.description,
            price: paqueteData.price,
            start_date: paqueteData.start_date,
            end_date: paqueteData.end_date,
            availability: paqueteData.availability,
            imageUrl: paqueteData.id % 2 === 0 ? img2 : img3,
          };
        })
      );

      setReservas(reservasConDetalles);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  const hacerReserva = async (e) => {
    e.preventDefault();
    const reservaData = {
      id_usuario: currentUser.id,
      id_paquete: nuevaReserva.id_paquete,
      booking_date: nuevaReserva.booking_date,
      status: nuevaReserva.status,
    };

    try {
      const response = await fetch("http://localhost:8082/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaData),
      });
      if (!response.ok) throw new Error("Error creando la reserva");
      const data = await response.json();
      setReservas((prev) => [...prev, data]);
      alert("Reserva realizada con éxito");
      setNuevaReserva({ id_usuario: currentUser.id, id_paquete: '', booking_date: '', status: 'confirmed' });
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      alert(error.message);
    }
  };

  const eliminarReserva = async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error eliminando la reserva");
      setReservas(reservas.filter((reserva) => reserva.id !== id));
      alert("Reserva eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2 className="titulosH2 text-center text-white mt-5 mb-4">PAQUETE ELEGIDO</h2>
      {paqueteSeleccionado ? (
        <div className="paquete-card mx-auto shadow-sm bg-white p-4 mb-5 rounded" style={{ maxWidth: '600px' }}>
          <div className="card-image-container">
            <img src={paqueteSeleccionado.imageUrl || img2} alt={paqueteSeleccionado.name} className="card-image" />
          </div>
          <div className="card-info-description text-center">
            <h3 className="card-info-title" style={{ color: '#FF6B6B' }}>{paqueteSeleccionado.name}</h3>
            <p className="card-info-subtitle">{paqueteSeleccionado.description}</p>
            <p className="card-info-destination">Destino: {paqueteSeleccionado.Destination?.name}</p>
            <p className="card-info-price-txt">Precio:</p>
            <p className="card-info-price">${paqueteSeleccionado.price}</p>
            <p className="card-info-dates">Fecha de inicio: {new Date(paqueteSeleccionado.start_date).toLocaleDateString()}</p>
            <p className="card-info-dates">Fecha de fin: {new Date(paqueteSeleccionado.end_date).toLocaleDateString()}</p>
            <p className="card-info-availability">
              Disponibilidad: {paqueteSeleccionado.availability ? "Disponible" : "No disponible"}
            </p>
            <form onSubmit={hacerReserva} className="paquete-form mt-4">
              <div className="mb-3">
                <label className="form-label">Fecha de Reserva:</label>
                <input
                  type="date"
                  name="booking_date"
                  value={nuevaReserva.booking_date}
                  onChange={(e) => setNuevaReserva({ ...nuevaReserva, booking_date: e.target.value })}
                  required
                  className="form-control"
                />
              </div>
              <button type="submit" className="button-style-w btn btn-outline-secondary w-100 mt-2">Agregar a Reserva</button>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-center text-white">No se ha seleccionado ningún paquete.</p>
      )}

      <h2 className="titulosH2 text-center text-white mt-5 mb-4">MIS RESERVAS</h2>
      <div className="paquetes-container">
        {reservas.map((reserva) => (
          <div key={reserva.id} className="paquete-card mx-auto shadow-sm bg-white p-4 mb-4 rounded" style={{ maxWidth: '600px' }}>
            <div className="card-image-container">
              <img src={reserva.imageUrl} alt={reserva.nombre_paquete} className="card-image" />
            </div>
            <div className="card-info-description text-center">
              <h3 className="card-info-title" style={{ color: '#FF6B6B' }}>Paquete: {reserva.nombre_paquete}</h3>
              <p className="card-info-subtitle">{reserva.description}</p>
              <p className="card-info-price">${reserva.price}</p>
              <p className="card-info-dates">Fecha de Reserva: {new Date(reserva.booking_date).toLocaleDateString()}</p>
              <p className="card-info-availability">Estado: {reserva.status}</p>
              <button onClick={() => eliminarReserva(reserva.id)} className="button-style btn btn-outline-danger w-100 mt-2">Eliminar</button>
              <button onClick={() => navigate(`/pagos/${reserva.id}`)} className="button-style btn btn-outline-secondary w-100 mt-2">Ir a Pagos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservas;
