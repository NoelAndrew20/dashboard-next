import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeContext'
import axios from 'axios';
import carga from '@/components/molecules/Carga';
import { useRouter } from 'next/router';

const FormularioArchivo = () =>{
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const subirDocumentoProveedor = async (formData) => {
      try {
        const response = await axios.post('http://localhost:3070/addDocumentoProveedor/', formData);
        return response.data;
      } catch (error) {
        console.error('Error al subir el documento del proveedor:', error);
        throw error; // Puedes manejar el error aquí o propagarlo para que sea manejado en el nivel superior
      }
    };
    
    const enviarDatosAlMicroservicio = async (datosParaMicroservicio) => {
      try {
        const response = await axios.post('http://localhost:5003/api/enviar-datos', {
          datos: datosParaMicroservicio,
        });
        return response.data;
      } catch (error) {
        console.error('Error al enviar datos al microservicio:', error);
        throw error; // Puedes manejar el error aquí o propagarlo para que sea manejado en el nivel superior
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const constanciaFile = document.getElementById('constancia').files[0];
      const formData = new FormData();
      formData.append('constanciaFile', constanciaFile);
    
      try {
        const proveedorSat = await subirDocumentoProveedor(formData);
        const rutaArchivo = proveedorSat.constancia;
        const match = rutaArchivo.match(/\\(.+)/);
        const nombreArchivo = match ? match[1] : rutaArchivo;
        console.log('Nombre del archivo:', nombreArchivo);
        console.log('Respuesta del servidor', proveedorSat);
    
        const datosParaMicroservicio = {
          answer: '',
          function: 'AltaProveedores',
          parameters: {
            path: "/home/JocdDev/Documents/A/dashboard-next/pages/api/proveedor/files/"+nombreArchivo
          },
        };
    
        console.log('json microservicio', datosParaMicroservicio);
    
        const respuestaDeLaApi = await enviarDatosAlMicroservicio(datosParaMicroservicio);

        console.log('Enviado correctamente');
        console.log('Respuesta de la API:', respuestaDeLaApi);
        console.log(`Mensaje del usuario: ${datosParaMicroservicio}`);
        if (respuestaDeLaApi === "Datos enviados correctamente al microservicio.") {
          setShowModal(true);
          setTimeout(() => {
            router.push('/RegistroProveedores'); // Reemplaza '/otra-pagina' con la ruta a la que deseas redirigir
          }, 2000);
        }
      } catch (error) {
        console.error('Error general:', error);
        // Puedes manejar el error aquí o propagarlo para que sea manejado en el nivel superior
      }
    };
    

    return (
        <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/2">
                    <h2 className="font-bold">Constancia de situación fiscal</h2>
                    <label>Subir archivo:</label>
                    <div>
                        <input type="file" id="constancia" name="constancia" onChange={handleFileChange} className={isDarkMode ? "modal-input-d" : "modal-input"} />
                    </div>
                </div>
            </div>
            {showModal && <carga onClose={() => setShowModal(false)} />}
                <div className="flex justify-center">
                    <button type="button" onClick={handleSubmit} className="button">
                        Guardar
                    </button>
                </div>

        </form>
        </div>
    );
};

export default FormularioArchivo;