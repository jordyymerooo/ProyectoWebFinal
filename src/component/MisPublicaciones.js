import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importar Link para navegación sin recargas
import "./Inicio.css";
import Logo from "../assets/Logotipo/Logo.png";
import userLogo from "../assets/Logotipo/user_logo.png";

const MisPublicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const storedPublicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
        setPublicaciones(storedPublicaciones);
    }, []);

    const eliminarPublicacion = (index) => {
        const nuevasPublicaciones = [...publicaciones];
        nuevasPublicaciones.splice(index, 1);
        setPublicaciones(nuevasPublicaciones);
        localStorage.setItem("publicaciones", JSON.stringify(nuevasPublicaciones));
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
                    <h1>Mis Publicaciones</h1>
                </section>
                <div className="user-dropdown">
                    <button className="dropbtn">
                        <img className="user_logo" src={userLogo} alt="Usuario" />
                    </button>
                    <div className="dropdown-content">
                        {/* Usar Link para navegación fluida */}
                        <Link to="/perfil">Editar Perfil</Link>
                        <Link to="/">Cerrar Sesión</Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="publicaciones">
                    <h2>Mis Publicaciones</h2>
                    {publicaciones.length > 0 ? (
                        <ul>
                            {publicaciones.map((publicacion, index) => (
                                <li key={index}>
                                    <h3>{publicacion.titulo}</h3>
                                    <p>{publicacion.descripcion}</p>
                                    <p>
                                        <strong>Autor:</strong> {publicacion.autor}
                                    </p>
                                    {/* Enlace para abrir el PDF */}
                                    <a href={publicacion.pdf} target="_blank" rel="noopener noreferrer">
                                        Ver PDF
                                    </a>
                                    {/* Botón para eliminar publicación */}
                                    <button onClick={() => eliminarPublicacion(index)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tienes publicaciones registradas.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default MisPublicaciones;
