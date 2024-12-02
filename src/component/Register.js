import React, { useState } from "react";
import "./styles.css";
import logo from "../assets/Logotipo/Logo.png";

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        email: "",
        contraseña: "",
        confirmarContraseña: "",
        facultad: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Manejar los cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validar contraseñas coincidentes
        if (formData.contraseña !== formData.confirmarContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // Validar campos vacíos
        for (const field in formData) {
            if (formData[field] === "") {
                setError("Todos los campos son obligatorios.");
                return;
            }
        }

        // Guardar datos en localStorage como base de datos simulada
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUsers.find(
            (user) => user.email === formData.email
        );

        if (userExists) {
            setError("El correo electrónico ya está registrado.");
            return;
        }

        // Guardar nuevo usuario
        existingUsers.push({
            nombre: formData.nombre,
            cedula: formData.cedula,
            email: formData.email,
            contraseña: formData.contraseña,
            facultad: formData.facultad,
        });

        localStorage.setItem("users", JSON.stringify(existingUsers));
        setSuccess("Registro exitoso.");

        // Redirigir al inicio después de un registro exitoso
        setTimeout(() => {
            window.location.href = "/"; // Cambia "/inicio" por la ruta de tu página de inicio
        }, 2000); // Retraso de 2 segundos para mostrar el mensaje de éxito
    };

    return (
        <div className="container">
            <img src={logo} alt="Logo de la plataforma" className="login-logo" />
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre Completo:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="cedula">Cédula:</label>
                <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="email">Correo Electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="contraseña">Contraseña:</label>
                <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
                <input
                    type="password"
                    id="confirmarContraseña"
                    name="confirmarContraseña"
                    value={formData.confirmarContraseña}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="facultad">Facultad:</label>
                <select
                    id="facultad"
                    name="facultad"
                    value={formData.facultad}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Facultad de Ciencias Médicas">
                        Facultad de Ciencias Médicas
                    </option>
                    <option value="Facultad de Ingeniería, Industria y Construcción">
                        Facultad de Ingeniería, Industria y Construcción
                    </option>
                    <option value="Facultad de Ciencias de la Vida y Tecnologías">
                        Facultad de Ciencias de la Vida y Tecnologías
                    </option>
                    <option value="Facultad de Educación, Servicios, Artes y Humanidades">
                        Facultad de Educación, Servicios, Artes y Humanidades
                    </option>
                    <option value="Facultad de Ciencias Administrativas, Contables y Comercio">
                        Facultad de Ciencias Administrativas, Contables y Comercio
                    </option>
                    <option value="Facultad de Ciencias Sociales, Derecho y Bienestar">
                        Facultad de Ciencias Sociales, Derecho y Bienestar
                    </option>
                </select>

                <button type="submit">Registrarse</button>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
            </form>
        </div>
    );
};

export default Register;
