import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../index.css";

const Pagos = () => {
    const { id } = useParams();
    const [reserva, setReserva] = useState(null);
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState(0);
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/bookings/${id}`);

                if (!response.ok) {
                    throw new Error('No se pudo cargar la reserva');
                }

                const data = await response.json();
                setReserva(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching reserva:', error);
            }
        };

        fetchReserva();
    }, [id]);

    const handlePaymentRedirect = () => {
        if (!reserva) {
            alert('No hay reserva cargada para procesar el pago');
            return;
        }

        const paymentUrl = "https://www.mercadopago.com.ar/paid?CODE=V1C70X&utm_source=google&utm_medium=cpc&utm_campaign=MLA_MP_G_AO_ALL_BRD_SEARCH_MP_EXACT&matt_tool=28766038&matt_word=MLA_MP_Sellers_AO_X_G_Search_X_BrandKW_X&gad_source=1&gclid=Cj0KCQjwvpy5BhDTARIsAHSilykVMHIobHSILNzf_LJVdgDCFBJbaYNWETs7iUbB_KXo5PSpDzpQ828aAkTpEALw_wcB";
        window.location.href = paymentUrl;
    };

    if (error) return <div>Error: {error}</div>;
    if (!reserva) return <div>Cargando reserva...</div>;

    return (
        <div className="container mt-5">
            <h2 className="titulosH2 text-center text-white mb-4">Detalle de Pago : {reserva.id}</h2>
            <div className="paquete-card mx-auto shadow-sm bg-white p-4 mb-5 rounded" style={{ maxWidth: '600px' }}>
                <div className="card-info-description text-center">
                    <h3 className="card-info-title" style={{ color: '#FF6B6B' }}>Paquete: {reserva.Package.name}</h3>
                    <p className="card-info-subtitle">Usuario: {reserva.User.name} (Email: {reserva.User.email})</p>
                    <p className="card-info-price">Precio del Paquete: ${reserva.Package.price}</p>
                    <p className="card-info-dates">Fecha de Reserva: {new Date(reserva.booking_date).toLocaleDateString()}</p>
                    <p className="card-info-availability">
                        Este es el paso final para realizar el pago de la reserva. Recuerde que el pago se realiza en la plataforma de Mercado Pago y la reserva se cancelará si no se realiza el pago antes de la fecha de inicio.
                    </p>
                </div>
                <form className="paquete-form mt-4">
                    <div className="mb-3">
                        <label className="form-label">Monto:</label>
                        <input
                            type="number"
                            value={reserva.Package.price}
                            onChange={(e) => setAmount(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de Pago:</label>
                        <input
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="button" onClick={handlePaymentRedirect} className="button-style btn btn-primary w-100 mt-3">Pagar</button>
                </form>
            </div>
        </div>
    );
};

export default Pagos;
