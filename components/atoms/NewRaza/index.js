import { useDarkMode } from "@/context/DarkModeContext";
import { useEffect, useState } from "react";
const NewRaza = ({ alimento }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const entriesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [razaV, setRazaV] = useState("");
    const [tipoV, setTipoV] = useState("");
    const [proteinaV, setProteinaV] = useState("");
    const [precioV, setPrecioV] = useState("");
    const [precioVariableV, setPrecioVariableV] = useState("");
    const [precioMinV, setPrecioMinV] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [data, setData] = useState("");
    const addOrder = async () => {
        try {
          if (
            razaV !== ""
            && precioV  !== "" 
            && precioVariableV  !== ""
            && precioMinV  !== ""
          ) {
            const newOrder = {
                razaV: razaV,
                precioV: precioV,
                precioVariableV: precioVariableV,
                precioMinV: precioMinV
            };

            const newData = [...data, newOrder];
            setData(newData);
            setRazaV("");
            setPrecioV("");
            setPrecioVariableV("");
            setPrecioMinV("");
            setSuccessMessage('Orden guardada exitosamente');

            const axios = require("axios");
                //const apiUrl = 'http://localhost:3081/addAlimento';
                const apiUrl = 'http://192.168.100.10:3081/addAlimento';
                axios.post(apiUrl, newData)
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
    <form>
        <h2 className="text-lg">Agregar raza:</h2>
        <div>
            <div className="flex mt-5">
                <div className="modal-item w-1/3">
                    <p>Raza:</p>
                    <input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="text" name="raza" value={razaV} onChange={(e) => setRazaV(e.target.value)} required/>
                </div>
                <div className="modal-item w-1/3">
                    <p>Precio:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="number" name="precio" value={precioV} onChange={(e) => setPrecioV(e.target.value)} required/>
                </div>
                <div className="modal-item w-1/3">
                    <p>Precio variable:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  type="number" name="precioVariable" value={precioVariableV} onChange={(e) => setPrecioVariableV(e.target.value)} required/>
                </div>        
            </div>
            <div className="flex">
                <div className="modal-item w-1/3">
                    <p>Precio mínimo:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  type="number" name="precioVariable" value={precioMinV} onChange={(e) => setPrecioMinV(e.target.value)} required/>
                </div>
            </div>
        </div>
        <div className="flex justify-center pt-5">
            <div>
                <button id="ButtonG" className="button primary" onClick={()=> addOrder()}>Guardar</button>
            </div>
        </div>
    </form>
    )
}
export default NewRaza;