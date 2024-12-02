// src/context/PublicacionesContext.js
import React, { createContext, useState, useContext } from "react";

// Crear un contexto para las publicaciones
const PublicacionesContext = createContext();

// Crear un proveedor para las publicaciones
export const PublicacionesProvider = ({ children }) => {
    const [publicaciones, setPublicaciones] = useState([]);

    // Función para agregar una nueva publicación
    const addPublicacion = (nuevaPublicacion) => {
        setPublicaciones((prevPublicaciones) => [nuevaPublicacion, ...prevPublicaciones]);
    };

    return (
        <PublicacionesContext.Provider value={{ publicaciones, addPublicacion }}>
            {children}
        </PublicacionesContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const usePublicaciones = () => {
    return useContext(PublicacionesContext);
};
