import React, { useState, useEffect } from 'react';
import '../styles/Miscitas.css';
import axios from 'axios';
import { FaPhone, FaCalendar, FaUser, FaCut, FaArrowRight } from 'react-icons/fa';

const Miscitas = ({ clienteId }) => {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      const authToken = localStorage.getItem('authToken');
      console.log(authToken); // Verifica si esto muestra el token JWT


      if (!authToken) {
        console.log("No hay un token de autenticación.");
        setError("Por favor, inicie sesión para ver sus citas.");
        return;
      }

      if (!clienteId) { // Verifica que clienteId esté definido y tenga un valor válido
        console.log("clienteId no está definido o no válido.");
        setError("No se puede obtener las citas sin un cliente válido.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/appointments/${clienteId}`, { // Utiliza clienteId en la URL
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        console.log('Response Data:', response.data); // Log para verificar los datos recibidos

        const formattedCitas = response.data.map(cita => {
          const date = new Date(cita.fecha);
          const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

          const formattedDate = localDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          console.log('Formatted Date:', formattedDate); // Log para verificar la fecha formateada

          return {
            ...cita,
            fecha: formattedDate,
            fechaOriginal: localDate, // Añadiendo la fecha original aquí
          };
        });

        setCitas(formattedCitas);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem('authToken');
          setError("Token inválido o ha expirado. Por favor inicie sesión nuevamente.");
        } else {
          console.error("Error fetching user's appointments", error);
          setError("Hubo un error al obtener las citas. Por favor intente nuevamente.");
        }
      }
    };

    fetchCitas();
  }, [clienteId]); // Añade clienteId como una dependencia

  const today = new Date();
  const citasPasadas = citas.filter(cita => new Date(cita.fechaOriginal) < today);
  const citasFuturas = citas.filter(cita => new Date(cita.fechaOriginal) >= today);

  return (
    <div className="miscitas-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="header-section">
            <h2><FaPhone color="purple" size={24} /> Mis citas</h2>
            <hr />
          </div>

          {citasFuturas.map(cita => (
            <div className="appointment-row" key={cita.fecha + cita.hora}>
              <div className="column"><FaUser color="purple" size={16} /></div>
              <div className="column">{cita.nombre} {cita.apellido}<br/>{cita.telefono}</div>
              <div className="column">
                <FaCalendar color="grey" size={24} /> {cita.fecha}<br/>
                <FaCut color="grey" size={16}/> {cita.servicio}<br/> con {cita.peluquero}
              </div>
              <div className="column">{cita.hora}</div>
              <div className="column"><button>Anular</button></div>
            </div>
          ))}

          <div className="header-section">
            <h3>Historial de citas</h3>
            <hr />
          </div>

          {citasPasadas.map(cita => (
            <div className="history-row" key={cita.fecha}>
              <div><FaUser color="purple" size={16} /><span>{cita.nombre} {cita.apellido}</span></div>
              <div><FaCalendar color="grey" size={16} /><span>{cita.fecha}</span></div>
              <div><FaCut color="grey" size={16}/><span>{cita.servicio} con {cita.peluquero}</span></div>
            </div>
          ))}

          <div className="show-more">
            <p className='lastLine'> Mostrar más <FaArrowRight /></p>
          </div>
        </>
      )}
    </div>
  );
};

export default Miscitas;
