import React, { useState } from 'react';
import { Link } from "react-router-dom"; // Importar Link de React Router
import "./styles/Perfil.css";
import Logo from "../assets/Logotipo/Logo.png";
import userLogo from "../assets/Logotipo/user_logo.png";

const Perfil = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  // Función de validación de cambios
  const validarcambios = () => {
    if (!nombre || !cedula || !correo || !contrasena || !confirmarContrasena) {
      alert("Por favor, complete todos los campos.");
      return false;
    }

    if (!/^[A-Za-z\s]+$/.test(nombre)) {
      alert("El nombre solo puede contener letras y espacios.");
      return false;
    }

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return false;
    }

    if (!/^\d{10}$/.test(cedula)) {
      alert("La cédula debe contener exactamente 10 dígitos numéricos.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      alert("El correo electrónico no tiene un formato válido.");
      return false;
    }

    alert("Registro exitoso.");
    return true;
  };

  return (
    <div>
      <header>
        <div className="logo">
          {/* Usar Link para redirigir a la página de inicio */}
          <Link to="/inicio">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <section className="banner">
          <h1>Editar Perfil</h1>
        </section>
        <div className="user-dropdown">
          <button className="dropbtn">
            <img className="user_logo" src={userLogo} alt="Usuario" />
          </button>
          <div className="dropdown-content">
            {/* Usar Link para navegación sin recarga */}
            <Link to="/perfil">Editar Perfil</Link>
            <Link to="/mispublicaciones">Mis Publicaciones</Link>
            <Link to="/">Cerrar Sesión</Link>
          </div>
        </div>
      </header>
      <section className="cuadro-blanco">
        <div className="contenido-cuadro">
          <section className="registro">
            <form onSubmit={(e) => { e.preventDefault(); validarcambios(); }}>
              <div className="columna">
                <label htmlFor="nombre">Nombres Completos:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />

                <label htmlFor="cedula">Cédula:</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                  onKeyPress={(e) => {
                    if (!/\d/.test(e.key)) e.preventDefault();
                  }}
                />

                <label htmlFor="correo">Correo electrónico:</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />

                <label htmlFor="contrasena">Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />

                <label htmlFor="confirmar-contrasena">Confirmar contraseña:</label>
                <input
                  type="password"
                  id="confirmar-contrasena"
                  name="confirmar-contrasena"
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  required
                />

                <button type="submit" className="boton_g">Guardar Cambios</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Perfil;
