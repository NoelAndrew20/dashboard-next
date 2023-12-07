import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeContext'

const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const constanciaFile = document.getElementById('constancia').files[0];

        const formData2 = new FormData();
        formData2.append('constanciaFile', constanciaFile);
        axios.post('http://192.168.100.10:3070/addDocumentoProveedor/', formData2)
          .then(response => {
            const proveedorSat = response.data;
            console.log(proveedorSat);
          })
          .catch(error => {
            console.error(error);
          });
      
    }

    return (
        <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/2">
                    <h2 className="font-bold">Constancia de situación fiscal</h2>
                    <label>Subir archivo:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="file" id="constancia" name="constancia" onChange={handleFileChange} className={isDarkMode ? "modal-input-d" : "modal-input"} />
                    </div>
                </div>
            </div>
    
                <div className="flex justify-center">
                    <button type="submit" className="button">
                        Guardar
                    </button>
                </div>

        </form>
        </div>
    );

export default Formulario;