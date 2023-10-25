import { useDarkMode } from '@/context/DarkModeContext';
import { useEffect, useState } from 'react';
const axios = require('axios');
const ProveedorForm = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        setSelectedFile(file);
    };
   
    const handleSubmit = (e) => {
        e.preventDefault();

        const newFormData = {
            denominacion: e.target.denominacion.value,
            rfc: e.target.rfc.value,
            regimenCapital: e.target.regimenCapital.value,
            cp: e.target.cp.value,
            vialidad: e.target.vialidad.value,
            exterior: e.target.exterior.value,
            interior: e.target.interior.value,
            colonia: e.target.colonia.value,
            localidad: e.target.localidad.value,
            municipio: e.target.municipio.value,
            entidad: e.target.entidad.value,
            calle1: e.target.calle1.value,
            calle2: e.target.calle2.value,
            actividad: e.target.actividad.value,
            regimen: e.target.regimen.value,
            correo: e.target.correo.value,
            nombre: e.target.nombre.value,
            telefono: e.target.telefono.value,
            file: selectedFile,
        };
        
        //console.log(newFormData);
        //setFormData([...formData, newFormData]);
        //e.target.reset();
    //};

    //const apiUrl = 'http://localhost:3070/addProveedor/';
    const apiUrl = 'http://192.168.100.10:3070/addProveedor/';
        axios.post(apiUrl, newFormData)
        .then(response => {
            console.log("Respuesta de la API:", response.data);
        })
        .catch(error => {
            console.error("Error al enviar la solicitud:", error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="font-bold">Datos de identificación del contribuyente</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/3">
                    <label>Denominación / Razon social:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="denominacion" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>RFC:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="rfc" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Régimen Capital:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="regimenCapital" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <h2 className="font-bold">Datos del domicilio registrado</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/3">
                    <label>Código postal:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="cp" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre de vialidad (calle):</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="vialidad" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Número exterior:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="exterior" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <label>Número Interior:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="interior" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre de la colonia:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="colonia" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre de la localidad:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="localidad" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <label>Nombre del municipio:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="municipio" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre de la entidad federativa:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="entidad" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Entre calle:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="calle1" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                    <label>y calle:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="calle2" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <h2 className="font-bold">Actividades económicas</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/3">
                    <label>Actividad económica:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="actividad" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3"></div>
                <div className="modal-item w-1/3"></div>
            </div>
            <h2 className="font-bold">Regímenes</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/3">
                    <label>Régimen:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="regimen" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    
                </div>
                <div className="modal-item w-1/3">
        
                </div>
            </div>
            <h2 className="font-bold">Datos de contacto</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/3">
                    <label>Correo:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="correo" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="nombre" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Número de teléfono:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="number" name="telefono" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <h2 className="font-bold">Constancia de situación fiscal</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/2">
                    <label>Subir archivo:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="file" name="file" onChange={handleFileChange} className={isDarkMode ? "modal-input-d" : "modal-input"} />
                    </div>
                </div>
                <div className="modal-item w-1/2"></div>
            </div>
            <div className="modal-item w-1/2">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Guardar
                    </button>
                </div>
        </form>
    )
}
export default ProveedorForm;