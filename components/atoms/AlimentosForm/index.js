import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const AlimentosForm = ({ data, setData, closeModal }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [a1Cantidad, setInputA1Cantidad] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [unidad, setUnidad] = useState("");
    const [nombreAlimento, setNombreAlimento] = useState("");
    const [nombreSolicitante, setNombreSolicitante] = useState("")

    const [lotes, setLotes] = useState([]);

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

    const agregarLote = () => { //crea los lotes que aparecen
        if (nombreAlimento && cantidad && unidad) {
          const nuevoLote = {
            nombreAlimento,
            cantidad,
            unidad
          };
          setLotes([...lotes, nuevoLote]);
          console.log(lotes)
          setNombreAlimento("");
          setUnidad("");
          setCantidad("");
        }
      };

    const eliminarUltimoLote = () => { //Elimina el ultimo lote
    if (lotes.length > 0) {
        const nuevosLotes = [...lotes];
        nuevosLotes.pop();
        setLotes(nuevosLotes);
    }
    };

    const addOrder = async () => { //Crea el arrelo general
        try {
          if (
            nivelEntrega !== "" && fechaEntrega !== "" && nombreZona != "" //verifica que lo required no este vacio
          ) {
            const newPerson = { //crea el nuevo arreglo
                nivelEntrega: nivelEntrega,
                fechaEntrega: fechaEntrega,
                nombreZona: nombreZona,
                nombreSolicitante: nombreSolicitante,
            };


            const newData = [...data, newPerson]; //arregla el nuevo arreglo al arreglo que viene del back
            newPerson.lotes = lotes //anida el arreglo creado en la tabla
            setData(newData);
            setNivelEntrega("");
            setFechaEntrega("");
            setNombreZona("")
            setNombreSolicitante("")
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
                        <label>Nombre del alimento</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={nombreAlimento} onChange={(e) => setNombreAlimento(e.target.value)}  className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>Cantidad</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className={isDarkMode ? "modal-input-d" : "modal-input"} />
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>Unidad de medida</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="a3Unidad" name="a3Unidad" value={unidad} 
                        onChange={(e) => setUnidad(e.target.value)} 
                        >
                            <option value=""></option>
                            <option value="kg">Kg</option>
                            <option value="lt">Lt</option>
                        </select> 
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                        <button className="pronostico-btn" onClick={agregarLote}>Agregar lote</button>
                        <button className="pronostico-btn" onClick={eliminarUltimoLote}>Eliminar último lote</button>
                    </div>
                <div className="flex justify-center pt-2">
                        {lotes.length === 0 ? (
                            ""
                            ) : (
                            <div>
                                <table >
                                    <thead>
                                        <tr>
                                        <th className='mr-2'>Nombre</th>
                                        <th className='mr-2'>Cantidad</th>
                                        <th>Unidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lotes.map((lote, index) => (
                                        <tr key={index} className="table-row">
                                            <td>{lote.nombreAlimento}</td>
                                            <td>{lote.cantidad}</td>
                                            <td>{lote.unidad}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
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
            <div className="modal-cel">
                <div>
                    <label htmlFor="nombreZona" className="modal-label">Nombre del solicitante:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                    <input type="text" id="nombreSolicitante" name="nombreSolicitante" className={isDarkMode ? "modal-input-d" : "modal-input"} value={nombreSolicitante} onChange={(event) => setNombreSolicitante(event.target.value)} required/>
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
export default AlimentosForm;