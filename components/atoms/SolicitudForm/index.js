import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const SolicitudForm = ({ data, setData, closeModal }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [a1Cantidad, setInputA1Cantidad] = useState("");
    const [a1Unidad, setInputA1Unidad] = useState("");
    const [a2Unidad, setInputA2Unidad] = useState("");
    const [a2Cantidad, setInputA2Cantidad] = useState("");
    const [a3Unidad, setInputA3Unidad] = useState("");
    const [a3Cantidad, setInputA3Cantidad] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [nivelEntrega, setNivelEntrega] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [nombreZona, setNombreZona] = useState("");

    const addOrder = async () => {
        try {
          if (
            a1Cantidad !== ""
          ) {
            const newPerson = {
                a1Cantidad: a1Cantidad,
        
            };


            const axios = require("axios");
            //axios.get('http://localhost:3010/getAllTransporte')
            //const apiUrl = "../api/transporte/registroTransporte";
            const apiUrl = 'http://localhost:3020/addUsuario';
            axios.post(apiUrl, newPerson)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });



            const newData = [...data, newPerson];
            setData(newData);
            setInputA1Cantidad("");
            setInputA1Unidad("");
            setInputA2Unidad("");
            setInputA2Cantidad("");
            setInputA3Unidad("");
            setInputA3Cantidad("");
            setNivelEntrega("");
            setFechaEntrega("");
            setNombreZona("")
            setIsChecked(false);
            setIsChecked2(false);
            setIsChecked3(false);

            setSuccessMessage('Orden guardada exitosamente');
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
      const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
      const handleCheckboxChange2 = () => {
        setIsChecked2(!isChecked2);
      };
      const handleCheckboxChange3 = () => {
        setIsChecked3(!isChecked3);
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
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <p>
                        <label>Alimento 1&nbsp;</label>
                        <input type="checkbox"  onChange={handleCheckboxChange} checked={isChecked} />
                    </p>
                    <label htmlFor="a1Cantidad" className="modal-label">Cantidad:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="a1Cantidad" name="a1Cantidad" className={isDarkMode ? "modal-input-d" : "modal-input"} value={a1Cantidad} onChange={(event) => setInputA1Cantidad(event.target.value)} disabled={!isChecked}/>
                    </div>
                        <label htmlFor="a1Unidad" className="modal-label">Unidad de medida:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="a1Unidad" name="a1Unidad" value={a1Unidad} onChange={(event) => setInputA1Unidad(event.target.value)} disabled={!isChecked}>
                                <option value=""></option>
                                <option value="kg">Kg</option>
                                <option value="lt">Lt</option>
                            </select>   
                        </div>
                </div>
                <div className="modal-item w-1/3">
                    <p>
                        <label>Alimento 2&nbsp;</label>
                        <input type="checkbox" onChange={handleCheckboxChange2} checked={isChecked2}/>
                    </p>
                    <label htmlFor="a2Cantidad" className="modal-label">Cantidad:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="a2Cantidad" name="a1Cantidad" className={isDarkMode ? "modal-input-d" : "modal-input"} value={a2Cantidad} onChange={(event) => setInputA2Cantidad(event.target.value)} disabled={!isChecked2}/>
                    </div>
                    <label htmlFor="a2Unidad" className="modal-label">Unidad de medida:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="a2Unidad" name="a2Unidad" value={a2Unidad} onChange={(event) => setInputA2Unidad(event.target.value)} disabled={!isChecked2}>
                            <option value=""></option>
                            <option value="kg">Kg</option>
                            <option value="lt">Lt</option>
                        </select>   
                    </div>

                </div>
                <div className="modal-item w-1/3">
                    <p>
                        <label>Alimento 3&nbsp;</label>
                        <input type="checkbox" onChange={handleCheckboxChange3} checked={isChecked3}/>
                    </p>
                    <label htmlFor="a3Cantidad"  className="modal-label">Cantidad:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="a3Cantidad" name="a3Cantidad" className={isDarkMode ? "modal-input-d" : "modal-input"} value={a3Cantidad} onChange={(event) => setInputA3Cantidad(event.target.value)} disabled={!isChecked3}/>
                    </div>
                    <label htmlFor="a3Unidad" className="modal-label">Unidad de medida:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="a3Unidad" name="a3Unidad" value={a3Unidad} onChange={(event) => setInputA3Unidad(event.target.value)} disabled={!isChecked3}>
                            <option value=""></option>
                            <option value="kg">Kg</option>
                            <option value="lt">Lt</option>
                        </select>   
                    </div>
                </div>
                </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="nivelEntrega" className="modal-label">Nivel de entrega:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="nivelEntrega" name="nivelEntrega" value={nivelEntrega} onChange={(event) => setNivelEntrega(event.target.value)} required>
                            <option value=""></option>
                            <option value="leve">Leve</option>
                            <option value="normal">Normal</option>
                            <option value="urgente">Urgente</option>
                        </select>                    
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="fechaEntrega" className="modal-label">Fecha aproximada de entrega:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="date" id="fechaEntrega" name="fechaEntrega" className={isDarkMode ? "modal-input-d" : "modal-input"} value={fechaEntrega} onChange={(event) => setFechaEntrega(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="nombreZona" className="modal-label">Nombre de zona:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="nombreZona" name="nombreZona" className={isDarkMode ? "modal-input-d" : "modal-input"} value={nombreZona} onChange={(event) => setNombreZona(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div>
                    <button id="ButtonG" className="button primary" onClick={()=> addOrder()}>Guardar</button>
                </div>
            </div>
        </form>
        </>
    )
}
export default SolicitudForm;