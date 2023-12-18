import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import jwt from 'jsonwebtoken';

const ProvForm = ({ data, setData, closeModal }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [inputSku, setInputSku] = useState("");
    const [inputNombre, setInputNombre] = useState("");
    const [inputUnidad, setInputUnidad] = useState("");
    const [inputPrecio, setInputPrecio] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    

    const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        const usuario = decodedToken.usuario;
    const addPerson = async () => {
        try {
          if (
             inputSku !== "", 
             inputNombre !== "",
             inputUnidad !== "", 
             inputPrecio !== ""
        
          ) {
            const newProduct = {
                SKU: inputSku,
                nombre: inputNombre,
                unidad: inputUnidad,
                precio: inputPrecio,
            };

            const newData = [...data, newProduct];
            setData(newData);
            setInputSku("");
            setInputNombre("");
            setInputUnidad("");
            setInputPrecio("");
            setSuccessMessage("Producto guardado exitosamente");

            const axios = require("axios");
            const apiUrl = 'http://192.168.100.10:3070/editProducto/' + usuario;
            axios.put(apiUrl, newProduct)
                .then(response => {
                    console.log("Respuesta de la API:", response.data);
                })
                .catch(error => {
                    console.error("Error al enviar la solicitud:", error);
                });
    
            setErrorMessage("");
          } else {
            setErrorMessage('Por favor completa los cambios');
            setSuccessMessage("");
          }
        } catch (error) {
          setErrorMessage('Hubo un error al guardar el usuario');
          setSuccessMessage("");
        }
      };

    return(
        <>
        <div className="flex justify-between modal-header">
            <div>
                <h1 className="modal-title">Agregar Datos</h1>
            </div>
            <div>
                <button onClick={()=>{closeModal(), setErrorMessage(""), setSuccessMessage("")}}>
                    <img src="images/svg/x.svg" height={15} width={15} />
                </button>
            </div>
        </div>
        {successMessage && <div className="alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert-error">{errorMessage}</div>}
        <form className="form-container pt-10">
            <div className="modal-cel pt-10">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="sku" className="modal-label">SKU:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="sku" name="sku" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputSku} onChange={(event) => setInputSku(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div >
                        <label htmlFor="nombre" className="modal-label">Nombre:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="nombre" name="nombre" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputUnidad} onChange={(event) => setInputUnidad(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="unidad" className="modal-label">Unidad:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="unidad" name="unidad" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputNombre} onChange={(event) => setInputNombre(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="precio" className="modal-label">Precio:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="precio" name="precio" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputPrecio} onChange={(event) => setInputPrecio(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3"></div>
                <div className="modal-item w-1/3"></div>         
            </div>
            <div className="flex justify-center">
                <div>
                    <button id="ButtonG" className="button primary" onClick={()=> addPerson()}>Guardar</button>
                </div>
            </div>
        </form>
        </>
    )
}
export default ProvForm;