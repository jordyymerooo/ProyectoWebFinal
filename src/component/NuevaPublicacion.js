import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa Link
import "./Nuevapublicacion.css";
import Logo from "../assets/Logotipo/Logo.png";
import userLogo from "../assets/Logotipo/user_logo.png";

const NuevaPublicacion = () => {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState("");
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [pdf, setPdf] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tipo || !titulo || !autor || !fecha || !descripcion || !pdf) {
            alert("Por favor, complete todos los campos antes de enviar.");
            return;
        }

        const nuevaPublicacion = {
            tipo,
            titulo,
            autor,
            fecha,
            descripcion,
            pdf: URL.createObjectURL(pdf),
        };

        const storedPublicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
        storedPublicaciones.push(nuevaPublicacion);
        localStorage.setItem("publicaciones", JSON.stringify(storedPublicaciones));

        navigate("/inicio");
    };

    return (
        <div>
            <header>
                <div className="logo">
                    {/* Cambiar <a> por <Link> para evitar recarga completa */}
                    <Link to="/inicio">
                        <img src={Logo} alt="logo" />
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
                        <Link to="/mis-publicaciones">Mis publicaciones</Link>
                        <Link to="/">Cerrar Sesión</Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="nueva-publicacion">
                    <h2>Crear Nueva Publicación</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="tipo">Tipo de Publicación:</label>
                            <select
                                id="tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                required
                            >
                                <option value="">Seleccione el tipo</option>
                                <option value="tesis">Tesis</option>
                                <option value="articulo">Artículo Científico</option>
                                <option value="revista">Revista</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="titulo">Título:</label>
                            <input
                                type="text"
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="autor">Autor:</label>
                            <input
                                type="text"
                                id="autor"
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha:</label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pdf">Archivo PDF:</label>
                            <input
                                type="file"
                                id="pdf"
                                accept="application/pdf"
                                onChange={(e) => setPdf(e.target.files[0])}
                                required
                            />
                        </div>
                        <button type="submit">Publicar</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default NuevaPublicacion;
