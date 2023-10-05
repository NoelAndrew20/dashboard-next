import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const SolicitudForm = ({ data, dataProveedor, setData, closeModal }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [a1Cantidad, setInputA1Cantidad] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [unidad, setUnidad] = useState("");
    const [nombreAlimento, setNombreAlimento] = useState("");
    const [nombreSolicitante, setNombreSolicitante] = useState("");
    const [fechaSolicitud, setFechaSolicitud] = useState("");
    const [organizacion, setOrganizacion] = useState("");
    const [ubicacion, setUbicacion] = useState("");

    const [lotes, setLotes] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [nivelEntrega, setNivelEntrega] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [nombreZona, setNombreZona] = useState("");
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const handleProveedorChange = (event) => {
      const selectedProveedor = dataProveedor.find(proveedor => proveedor.nombreProveedor === event.target.value);
      setProveedorSeleccionado(selectedProveedor);
    };
    const handleProductoChange = (event) => {
        const selectedProducto = proveedorSeleccionado.productos.find(producto => producto.nombre === event.target.value);
        setProductoSeleccionado(selectedProducto);
    };
    const agregarLote = () => { //crea los lotes que aparecen
        if (nombreAlimento && cantidad && unidad ) {
          const nuevoLote = {
            nombreAlimento,
            cantidad,
            unidad,
          };
          setLotes([...lotes, nuevoLote]);
          setNombreAlimento("");
          setUnidad("");
          setCantidad("");
        }
      };
      useEffect(() => {
        // Update the document title using the browser API
        console.log(data)
      });
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
            nivelEntrega !== "" && fechaEntrega !== "" && nombreZona != ""
            && ubicacion  !== "" && organizacion  !== "" && fechaSolicitud !== ""
            //verifica que lo required no este vacio
          ) {
            const newPerson = { //crea el nuevo arreglo
                nivelEntrega: nivelEntrega,
                fechaEntrega: fechaEntrega,
                nombreZona: nombreZona,
                nombreSolicitante: nombreSolicitante,
                ubicacion: ubicacion,
                organizacion: organizacion,
                fechaSolicitud: fechaSolicitud
            };


            const newData = [...data, newPerson]; //arregla el nuevo arreglo al arreglo que viene del back
            newPerson.lotes = lotes //anida el arreglo creado en la tabla
            setData(newData);
            setNivelEntrega("");
            setFechaEntrega("");
            setNombreZona("");
            setNombreSolicitante("");
            setFechaSolicitud("");
            setOrganizacion("");
            setUbicacion("");
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
                    <label>Nombre del proveedor</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="proveedor" name="proveedor" onChange={handleProveedorChange} >
                        <option value="">Selecciona un proveedor</option>
                        {dataProveedor.map((proveedor, index) => (
                            <option key={index} value={proveedor.nombreProveedor}>
                                {proveedor.nombreProveedor}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>
            </div>
            {proveedorSeleccionado && (
            <div>
            <h2>Detalles del proveedor seleccionado</h2>
                <div className="modal-cel">
                    <div className="modal-item w-1/3">
                        <label>Nombre del Contacto:</label> 
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.Contacto.nombrePersona} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div> 
                    <div className="modal-item w-1/3">
                        <label>Correo del contacto:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.Contacto.correo} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>No. de teléfono del contacto:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.Contacto.numeroTelefono} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                </div>
                <h2>Detalles del proveedor seleccionado</h2>
                <div className="modal-cel">
                    <div className="modal-item w-1/3">
                        <label>Calle:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.calle} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>Número:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.numero} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>Colonia:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.colonia} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                </div>
                <div className="modal-cel">
                    <div className="modal-item w-1/3">
                        <label>Calle:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.calle} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>Número:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.numero} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>Colonia:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.colonia} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                </div>
                <div className="modal-cel">
                    <div className="modal-item w-1/3">
                        <label>Municipio:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.municipio} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>Estado:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.estado} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                    <div className="modal-item w-1/3">
                        <label>Código Postal:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" value={proveedorSeleccionado.direccion.codigoPostal} className={isDarkMode ? "modal-input-d" : "modal-input"} disabled/>
                        </div>
                    </div>
                </div>
                <label htmlFor="productos">Selecciona un producto:</label>
                <div className="modal-cel">
                    <div className="modal-item w-1/3">
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="productos" name="productos" onChange={(e)=>{handleProductoChange, setNombreAlimento(e.target.value)}} >
                                <option value="">Selecciona un producto</option>
                                {proveedorSeleccionado.productos.map((producto, index) => (
                                <option key={index} value={producto.nombre}>
                                    {producto.nombre}
                                </option>
                                ))}
                            </select>
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
            </div>
            )}
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
            <div className="modal-cel pt-3">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="fechaSolicitud" className="modal-label">Fecha de la solicitud:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="date" id="fechaSolicitud" name="fechaSolicitud" className={isDarkMode ? "modal-input-d" : "modal-input"} value={fechaSolicitud} onChange={(event) => setFechaSolicitud(event.target.value)} required/>
                    </div>
                </div>
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
                        <label htmlFor="nombreSolicitante" className="modal-label">Nombre del solicitante:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="nombreSolicitante" name="nombreSolicitante" className={isDarkMode ? "modal-input-d" : "modal-input"} value={nombreSolicitante} onChange={(event) => setNombreSolicitante(event.target.value)} required/>
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