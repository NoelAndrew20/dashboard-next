import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const CerdosForm = ({ data, setData, closeModal }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [inputProveedor, setInputProveedor] = useState("");
    const [inputSede, setInputSede] = useState("");
    const [inputSolicitante, setInputSolicitante] = useState("");
    const [inputGranja, setInputGranja] = useState("");
    const [cerdos, setCerdos] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [inputGastos, setInputGastos] = useState("");
    const [lotes, setLotes] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const agregarLote = () => { //crea los lotes que aparecen
        if (cerdos && cantidad) {
          const nuevoLote = {
            cerdos,
            cantidad,
          };
          setLotes([...lotes, nuevoLote]);
          setCantidad("");
          setCerdos("");
        }
    };
    const eliminarUltimoLote = () => { //Elimina el ultimo lote
        if (lotes.length > 0) {
            const nuevosLotes = [...lotes];
            nuevosLotes.pop();
            setLotes(nuevosLotes);
        }
    };
    const addPerson = async () => {
        try {
            if (
              inputProveedor !== "" && inputSede !== "" && inputSolicitante != ""
              && inputGranja  !== "" && inputGastos
              //verifica que lo required no este vacio
            ) {
              const newPerson = { //crea el nuevo arreglo
                  proveedor: inputProveedor,
                  sede: inputSede,
                  granja: inputGranja,
                  gastos: inputGastos,
              };
              const newData = [...data, newPerson]; //arregla el nuevo arreglo al arreglo que viene del back
              newPerson.lotes = lotes //anida el arreglo creado en la tabla
              setData(newData);
              console.log(data)
              setInputProveedor("");
              setInputSede("");
              setInputSolicitante("");
              setInputGranja("");
              setInputGastos("");
              setSuccessMessage('Orden guardada exitosamente');
              setErrorMessage("");
            } else {
              setErrorMessage('Por favor completa los cambios');
              setSuccessMessage("");
            }
          } catch (error) {
            setErrorMessage('Hubo un error al guardar el cerdo');
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
                        <label htmlFor="username" className="modal-label">Proveedor:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select id="proveedor" name="proveedor" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputProveedor} onChange={(event) => setInputProveedor(event.target.value)} required>
                            <option value=""></option>
                            <option value="p1">P1</option>
                            <option value="p2">P2</option>
                            <option value="p3">P3</option>
                            <option value="p4">P4</option>
                        </select>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="password" className="modal-label">Sede:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select id="sede" name="sede" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputSede} onChange={(event) => setInputSede(event.target.value)} required>
                            <option value=""></option>
                            <option value="sede 1">Sede 1</option>
                            <option value="sede 2">Sede 2</option>
                            <option value="sede 3">Sede 3</option>
                            <option value="sede 4">Sede 4</option>
                        </select>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div >
                        <label htmlFor="nombreSolicitante" className="modal-label">Nombre del solicitante:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="nombreSolicitante" name="nombreSolicitante" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputSolicitante} onChange={(event) => setInputSolicitante(event.target.value)} />
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="granja" className="modal-label">Granja:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select id="granja" name="granja" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputGranja} onChange={(event) => setInputGranja(event.target.value)} required>
                            <option value=""></option>
                            <option value="granja 1">Granja 1</option>
                            <option value="granja 2">Granja 2</option>
                            <option value="granja 3">Granja 3</option>
                            <option value="granja 4">Granja 4</option>
                        </select>                    
                    </div>
                </div>
                <div className="modal-item w-1/3"></div>
                <div className="modal-item w-1/3"></div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/2">
                    <div>
                        <label htmlFor="tipoCerdos" className="modal-label">Tipo de cerdos:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select id="tipoCerdos" name="tipoCerdos" className={isDarkMode ? "modal-input-d" : "modal-input"} value={cerdos} onChange={(event) => setCerdos(event.target.value)}>
                            <option value=""></option>
                            <option value="camborougn">Pic Camborougn</option>
                            <option value="337">Pic 337</option>
                            <option value="800">Pic 800</option>
                            <option value="410">Pic 410</option>
                        </select>                     
                    </div>
                </div>
                <div className="modal-item w-1/2">
                    <div>
                        <label htmlFor="cantidad" className="modal-label">Cantidad:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="number" id="cantidad" name="cantidad" className={isDarkMode ? "modal-input-d" : "modal-input"} value={cantidad} onChange={(event) => setCantidad(event.target.value)}/>
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
                                <th className='mr-2'>Tipo de cerdo</th>
                                <th className='mr-2'>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lotes.map((lote, index) => (
                                <tr key={index} className="table-row">
                                    <td>{lote.cerdos}</td>
                                    <td>{lote.cantidad}</td>
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
                        <label htmlFor="gastos" className="modal-label">Gastos de viaje:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="number" id="gastos" name="gastos" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputGastos} onChange={(event) => setInputGastos(event.target.value)} required/>
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
export default CerdosForm;