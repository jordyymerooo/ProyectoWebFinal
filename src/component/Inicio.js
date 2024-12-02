import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar Link de React Router
import "./Inicio.css";
import Logo from "../assets/Logotipo/Logo.png";
import userLogo from "../assets/Logotipo/user_logo.png";

const Inicio = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedPublicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
        setPublicaciones(storedPublicaciones);
        setResultados(storedPublicaciones);
    }, []);

    const handleBuscar = () => {
        const terminosBusqueda = busqueda.toLowerCase().trim();
        const resultadosFiltrados = publicaciones.filter((publicacion) =>
            publicacion.titulo.toLowerCase().includes(terminosBusqueda) ||
            publicacion.descripcion.toLowerCase().includes(terminosBusqueda) ||
            publicacion.autor.toLowerCase().includes(terminosBusqueda)
        );
        setResultados(resultadosFiltrados);
    };

    const handleDescartarCambios = () => {
        setResultados(publicaciones);
        setBusqueda("");
    };

    const handleAgregarPublicacion = () => {
        navigate("/nuevapublicacion");
    };

    return (
        <div>
            <header>
                <div className="logo">
                    {/* Cambiar <a> por <Link> */}
                    <Link to="/inicio">
                        <img src={Logo} alt="Logotipo de Publicaciones Académicas" />
                    </Link>
                </div>
                <section className="banner">
                    <h1>Publicaciones Académicas</h1>
                </section>
                <div className="user-dropdown">
                    <button className="dropbtn">
                        <img className="user_logo" src={userLogo} alt="Usuario" />
                    </button>
                    <div className="dropdown-content">
                        <Link to="/perfil">Editar Perfil</Link>
                        <Link to="/mispublicaciones">Mis Publicaciones</Link>
                        <Link to="/">Cerrar Sesión</Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="buscador">
                    <h2>Buscar Publicaciones</h2>
                    <input
                        type="text"
                        placeholder="Buscar por título, descripción o autor..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </section>
                <section className="buscar">
                    <button onClick={handleBuscar}>Buscar</button>
                </section>
                <section className="descartar-cambios">
                    <button onClick={handleDescartarCambios}>Deshacer Filtros</button>
                </section>

                <section className="agregarpublicacion">
                    <button onClick={handleAgregarPublicacion}>Agregar Publicación</button>
                </section>

                <section className="publicaciones">
                    <h2>Publicaciones Disponibles</h2>
                    {resultados.length > 0 ? (
                        <ul>
                            {resultados.map((publicacion, index) => (
                                <li key={index}>
                                    <h3>{publicacion.titulo}</h3>
                                    <p>{publicacion.descripcion}</p>
                                    <p><strong>Autor:</strong> {publicacion.autor}</p>
                                    <button
                                        className="open-pdf-btn"
                                        onClick={() => {
                                            if (publicacion.pdf) {
                                                window.open(publicacion.pdf, '_blank');
                                            } else {
                                                alert("El PDF no está disponible.");
                                            }
                                        }}
                                    >
                                        Abrir PDF
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-resultados">
                            <p>No hay publicaciones que coincidan con tu búsqueda.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Inicio;
