import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeContext'
import axios from 'axios';
import carga from '@/components/molecules/Carga';
import { useRouter } from 'next/router';

const Imagen = () =>{
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showModal, setShowModal] = useState(false);
    const [imagenPath, setImagenPath] = useState(null);
    useEffect(() => {
        // Aquí puedes realizar la lógica para obtener el JSON y extraer la dirección de la imagen
        // Por ejemplo, si tienes el JSON en un estado llamado jsonData
        // Puedes hacer algo como setImagenPath(jsonData.path);

        // Ejemplo:
        const jsonData = { path: '/ruta/a/la/imagen.jpg' };
        setImagenPath(jsonData.path);
    }, []);
    return (
        <div>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/2">
                    <h2 className="font-bold">Traslado de lotes</h2>
                </div>
            </div>
            {showModal && imagenPath && (
                <div>
                    <img src={imagenPath} alt="Tu Imagen" />
                    <carga onClose={() => setShowModal(false)} />
                </div>
            )}
        </div>
    );
};

export default Imagen;