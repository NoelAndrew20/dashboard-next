import { useEffect, useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const CerdosForm = ({ data, setData, closeModal, dataProveedor }) => {
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
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const handleProveedorChange = (event) => {
    const selectedNombreProveedor2 = event.target.value;
    const selectedProveedorData = dataProveedor.find((proveedor) => proveedor.nombreProveedor === selectedNombreProveedor2);

    setSelectedProveedor(selectedProveedorData); 
    setInputProveedor(selectedProveedorData);
  };

  const agregarLote = () => {
    if (cerdos && cantidad) {
      const nuevoLote = {
        cerdos,
        cantidad,
      };
      setLotes([nuevoLote]);
      setCantidad("");
      setCerdos("");
    }
  };

  const eliminarUltimoLote = () => {
    if (lotes.length > 0) {
      const nuevosLotes = [...lotes];
      nuevosLotes.pop();
      setLotes(nuevosLotes);
    }
  };

  const addPerson = async () => {
    try {
      if (inputGranja !== "" && inputGastos !== "") {
        const newPerson = {
          granja: inputGranja,
          gastos: inputGastos,
          proveedores: selectedProveedor,
        };

        const newData = [...data, newPerson];
        newPerson.lotes = lotes;
        setData(newData);

        setInputProveedor("");
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

  return (
    <>
      <div className="flex justify-between modal-header">
        <div>
          <h1 className="modal-title">Agregar Datos</h1>
        </div>
        <div>
          <button onClick={() => { closeModal(); setErrorMessage(""); setSuccessMessage(""); }}>
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
              <select id="proveedor" name="proveedor" className={isDarkMode ? "modal-input-d" : "modal-input"} onChange={handleProveedorChange}>
                <option value="">Selecciona un proveedor</option>
                {dataProveedor?.map((proveedor) => (
                  <option key={proveedor.nombreProveedor} value={proveedor.nombreProveedor}>
                    {proveedor.nombreProveedor}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-item w-1/3">
          </div>
        </div>
        {selectedProveedor && (
          <div>
            <div className="modal-cel">
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`nombreContacto`} className="modal-label">Nombre del contacto:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`nombreContacto`}
                    name={`nombreContacto`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.Contacto.nombrePersona}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`correoContacto`} className="modal-label">Correo del contacto:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`correoContacto`}
                    name={`correoContacto`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.Contacto.correo}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`telContacto`} className="modal-label">Tel. del contacto:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`telContacto`}
                    name={`telContacto`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.Contacto.numeroTelefono}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="modal-cel">
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`calle`} className="modal-label">Calle:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`calle`}
                    name={`calle`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.direccion.calle}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`numero`} className="modal-label">Número:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`numero`}
                    name={`numero`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.direccion.numero}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`colonia`} className="modal-label">Colonia:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`colonia`}
                    name={`colonia`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.direccion.colonia}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="modal-cel">
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`municipio`} className="modal-label">Municipio:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`municipio`}
                    name={`municipio`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.direccion.municipio}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`estado`} className="modal-label">Estado:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`estado`}
                    name={`estado`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.direccion.estado}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`codigoPostal`} className="modal-label">Codigo postal:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`codigoPostal`}
                    name={`codigoPostal`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.direccion.codigoPostal}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="modal-cel">
              <div className="modal-item w-1/3">
                <div>
                  <label htmlFor={`sede`} className="modal-label">Sede:</label>
                </div>
                <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                  <input
                    type="text"
                    id={`sede`}
                    name={`sede`}
                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                    value={selectedProveedor.sede}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-item w-1/3"></div>
              <div className="modal-item w-1/3"></div>
            </div>
          </div>
        )}

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
              <input type="number" id="cantidad" name="cantidad" className={isDarkMode ? "modal-input-d" : "modal-input"} value={cantidad} onChange={(event) => setCantidad(event.target.value)} />
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
                    <th className='p-3'>Tipo de cerdo</th>
                    <th className='p-3'>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {lotes.map((lote, index) => (
                    <tr key={index} className="table-row">
                      <td className='p-3'>{lote.cerdos}</td>
                      <td className='p-3 text-center'>{lote.cantidad}</td>
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
              <input type="number" id="gastos" name="gastos" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputGastos} onChange={(event) => setInputGastos(event.target.value)} required />
            </div>
          </div>
          <div className="modal-item w-1/3"></div>
          <div className="modal-item w-1/3"></div>
        </div>
        <div className="flex justify-center">
          <div>
            <button id="ButtonG" className="button primary" onClick={() => addPerson()}>Guardar</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CerdosForm;
