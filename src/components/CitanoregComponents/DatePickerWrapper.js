import React from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendar } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/DatePickerWrapper.css';
import woman1 from '../../images/woman1.jpg';

function DatePickerWrapper({ 
    selectedDate, handleDateChange, 
    selectedService, handleServiceChange,  
    peluqueroSeleccionado, handleStylistChange, 
    selectedTime, handleTimeChange
}) {

    return (
        <div className="datepicker-wrapper">

            {/* Componente para seleccionar una fecha */}
            <label className="date-label">Seleccione una fecha:</label>
            <DatePicker 
                selected={selectedDate} 
                onChange={(date) => handleDateChange(date)} 
                className="date-picker" 
                placeholderText="Calendario"
                calendarIcon={<FaCalendar />}
            />

            {/* Selector desplegable para el servicio */}
            <label className="service-label">Seleccione un servicio:</label>
            <div className="service-dropdown">
                <select 
                    className="service-select" 
                    value={selectedService} 
                    onChange={(e) => handleServiceChange(e.target.value)}
                >
                    {/* Opciones del servicio */}
                    <option value="" disabled>Servicio</option>
                    <option value="Lavar">Lavar</option>
                    <option value="Acondicionamiento">Acondicionamiento</option>
                    <option value="Tinte natural">Tinte natural</option>
                    <option value="Peinar y lavar">Peinar y lavar</option>
                    <option value="Cortar y tinte natural">Cortar y tinte natural</option>
                    <option value="Cortar y peinar">Cortar y peinar</option>
                </select>
            </div>

            {/* Sección para seleccionar un peluquero con imágenes */}
            <label className="stylist-label">Selecciona un peluquero:</label>
            <div className="stylist-section">
                <div className="stylist" onClick={() => handleStylistChange("Marta")}>
                    <img src={woman1} alt="Marta" className={`stylist-img ${peluqueroSeleccionado === "Marta" ? "selected-stylist" : ""}`} />
                    <span className='namePhoto'>Marta</span>
                </div>
                <div className="stylist" onClick={() => handleStylistChange("Paula")}>
                <img src={woman1} alt="Paula" className={`stylist-img ${peluqueroSeleccionado === "Paula" ? "selected-stylist" : ""}`} />
                    <span className='namePhoto'>Paula</span>
                </div>
                <div className="stylist" onClick={() => handleStylistChange("Carmen")}>
                <img src={woman1} alt="Carmen" className={`stylist-img ${peluqueroSeleccionado === "Carmen" ? "selected-stylist" : ""}`} />
                    <span className='namePhoto'>Carmen</span>
                </div>
            </div>

            <label className="time-label">Seleccione una hora:</label>
            <div className="time-dropdown">
                <select 
                    className="time-select" 
                    value={selectedTime} 
                    onChange={(e) => handleTimeChange(e.target.value)}
                >
                    <option value="" disabled>Horario</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                </select>
            </div>
        </div>
    );
}

export default DatePickerWrapper;
