import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook para navegación

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.email === email && u.contraseña === password
        );

        if (!user) {
            setError("Credenciales incorrectas. Intente nuevamente.");
        } else {
            // Redirigir al componente Inicio
            navigate("/inicio");
        }
    };

    return (
        <div className="container">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Iniciar Sesión</button>
                <p>
                    ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
                </p>
                {error && <div className="error">{error} </div>}
            </form>
        </div>
    );
};

export default Login;
