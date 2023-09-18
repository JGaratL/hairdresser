import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Servicios from './components/Servicios';
import Home from './components/Home';
import Contacto from './components/Contacto';
import Empleo from './components/Empleo';
import Equipo from './components/Equipo';
import Footer from './components/Footer';
import Citanoreg from './components/Citanoreg';
import InicioSesion from './components/InicioSesion';
import Miscitas from './components/Miscitas';

function MainContent() {
    const [clienteId, setClienteId] = useState(2); // Establece el valor inicial de clienteId

    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path="/" element={
                    <div className="background-image" >
                        <div id="home"><Home /></div>
                        <div id="servicios"><Servicios /></div>
                        <div id="equipo"><Equipo /></div>
                        <div id="empleo"><Empleo /></div>
                        <div id="contacto"><Contacto /></div>
                        <div id="footer"><Footer /></div>
                    </div>
                } />
                <Route path="/citanoreg" element={<Citanoreg />} />
                <Route path="/InicioSesion" element={<InicioSesion setClienteId={setClienteId} />} />
                <Route path="/miscitas" element={<Miscitas clienteId={clienteId} />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <MainContent />
        </Router>
    );
}

export default App;
