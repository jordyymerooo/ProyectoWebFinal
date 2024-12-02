import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Inicio from "./component/Inicio";
import Perfil from "./component/Perfil";
import NuevaPublicacion from "./component/NuevaPublicacion";
import { PublicacionesProvider } from "./context/PublicacionesContext";
import MisPublicaciones from "./component/MisPublicaciones";



    
const App = () => {
    const [publicaciones, setPublicaciones] = useState([]);


    const deletePublicacion = (index) => {
        setPublicaciones((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <PublicacionesProvider>  {/* Envolvemos la aplicación */}
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/nuevapublicacion" element={<NuevaPublicacion />} />
                <Route
                    path="/mispublicaciones"
                    element={
                        <MisPublicaciones publicaciones={publicaciones} onDelete ={deletePublicacion}/>}/>
            </Routes>
        </Router>
        </PublicacionesProvider>
    );
};


export default App;
