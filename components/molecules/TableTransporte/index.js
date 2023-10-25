import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';

const TableTransporte = ({ data, setData }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const entriesPerPage = 10;
    const totalPages = Math.ceil(data.length / entriesPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [searchTerm, setSearchTerm] = useState('');

    const displayData = searchTerm ? data.filter(item => item.fecha && item.fecha.toLowerCase().includes(searchTerm)) : data;
    const displayDataFinal = displayData.slice(startIndex, endIndex);

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedValues(data[index]);
        setShowEditModal(true);
    };

    //############################################
    //aqui wa hacer mi funcion 
    const handleSaveEdit = () => {
        const updatedTransporte = {
            fecha: editedValues.fecha,
            granja: editedValues.granja,
            camion: editedValues.camion,
            jaula: editedValues.jaula,
            operador: editedValues.operador,
            cliente: editedValues.cliente,
            destino: editedValues.destino,
            salida: editedValues.salida,
            hrLlegada: editedValues.hrLlegada,
            tmpRecorrido: editedValues.tmpRecorrido,
            hrInicio: editedValues.hrInicio,
            kgSalida: editedValues.kgSalida,
            kgDesembarque: editedValues.kgDesembarque,
            rango: editedValues.rango,
            muertos: editedValues.muertos,
            parada: editedValues.parada,
            auditor: editedValues.auditor,
            incidencias: editedValues.incidencias,
            revision: editedValues.revision,
            hrFinal: editedValues.hrFinal,
            merma: editedValues.merma,
            ctCerdos: editedValues.ctCerdos
        };
    
        const axios = require("axios");
        console.log(updatedTransporte.fecha, updatedTransporte);
    
        //const apiUrl = 'http://localhost:3010/editTransporte/' + updatedTransporte.fecha;
        const apiUrl = 'http://192.168.100.10:3010/editTransporte/' + updatedUsuario.fechaContratacion;
        axios.put(apiUrl, updatedTransporte)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });

            setShowEditModal(false);
            setEditedValues({});
    };
    
              
        /*const newData = [...data];
        newData[editingIndex] = { ...editedValues };
        setData(newData);
        
        setShowEditModal(false);
        setEditedValues({});
    };*/

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditedValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };
      
      
    /*const handleDelete = (index) => {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 1000); 
    };*/

    return (
        <>
        <div className="search-container mb-5">
            <div className={isDarkMode ? "flex inner-search-d" : "flex inner-search"}>
                <div>
                    <input
                        type="text"
                        className={isDarkMode ? "bg-black" : "bg-white"}
                        placeholder="Buscar por fecha"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value.toLocaleLowerCase())}
                    />
                </div>
                <div className="inner-search-icon">
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 15.5L19 19" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div className={isDarkMode ? "table-d" : "table"}>
            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Camion</th>
                        <th>Destino</th>
                        <th>Hora salida granja</th>
                        <th>Hora llegada destino</th>
                        <th>Cantidad de cerdos</th>
                        <th>Auditor</th>
                        <th>Editar</th>
                        {/*<th>Eliminar</th>*/}
                    </tr>
                </thead>
                <tbody>
                {displayDataFinal.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                        isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-[#F7F9FB]' : 'bg-[#a5b4fc]')
                        }`}
                    > 
                        <td>{item.fecha}</td>
                        <td>{item.camion}</td>
                        <td>{item.destino}</td>
                        <td>{item.salida}</td>
                        <td>{item.hrLlegada}</td>
                        <td>{item.ctCerdos}</td>
                        <td>{item.auditor}</td>
                        <td>
                            <button onClick={() => handleEdit(index)} className="edit-btn">
                                <img src="images/svg/edit.svg" width={15} height={15}/>
                            </button>
                        </td>
                        <td>
                            {/*<button className="delete-btn" onClick={() => handleDelete(index)}>
                                <img src="images/svg/trash.svg" width={10} height={10}/>
                            </button>*/}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="button"
            >
                Anterior
            </button>
            <span className="text-center">{currentPage} de {totalPages}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="button"
            >
                Siguiente
            </button>
        </div>
        {showEditModal && (
            <div className={`${isDarkMode ? "edit-modal-d" : "edit-modal" } bg-white p-4 rounded shadow-md absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-4/4`}>
                <h2>Editar Datos</h2>
                <div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>Fecha:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="date" id="fecha" name="fecha" value={editedValues.fecha || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Granja:</p> <input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="granja" value={editedValues.granja || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Camión:</p> <input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="camion" value={editedValues.camion || ''} onChange={handleEditInputChange} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>Jaula:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="jaula" value={editedValues.jaula || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Operador:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="operador" value={editedValues.operador || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Cliente:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="cliente" value={editedValues.cliente || ''} onChange={handleEditInputChange} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>Destino:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="destino" value={editedValues.destino || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Hora salida de granja:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  type="time" id="salida" name="salida" value={editedValues.salida || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Hora llegada a destino:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  type="time" id="hrLlegada" name="hrLlegada" value={editedValues.hrLlegada || ''} onChange={handleEditInputChange} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>Tiempo recorrido granja - destino:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="tmpRecorrido" value={editedValues.tmpRecorrido || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Hora Inicio de desembarque:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  type="time" id="hrInicio" name="hrInicio" value={editedValues.hrInicio || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Hora final de desembarque:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  type="time" id="hrFinal" name="hrFinal" value={editedValues.hrFinal || ''} onChange={handleEditInputChange} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>KG a salida de granja:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="kgSalida" value={editedValues.kgSalida || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>KG al desembarque:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="kgDesembarque" value={editedValues.kgDesembarque || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Merma:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="merma" value={editedValues.merma || ''} onChange={handleEditInputChange}/>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>Cantidad de cerdos:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="ctCerdos" value={editedValues.ctCerdos || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Rango programado:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="rango" value={editedValues.rango || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Muertos en viaje:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="muertos" value={editedValues.muertos || ''} onChange={handleEditInputChange}/>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>Paradas en viaje:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="parada" value={editedValues.parada || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Revision de cerdo:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="revision" value={editedValues.revision || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Auditor:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="auditor" value={editedValues.auditor || ''} onChange={handleEditInputChange}/>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>Incidencias de viaje:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="incidencias" value={editedValues.incidencias || ''} onChange={handleEditInputChange} />
                        </div>
                    
                    </div>
                </div>
                <div className="mt-5 flex justify-between">
                    <button className="button" onClick={handleSaveEdit}>Guardar</button>
                    <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancelar</button>
                </div>
            </div>
        )}
         {showConfirmation && (
            <div className="confirmation bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4/4 overflow-y-auto">
                Elemento eliminado
            </div>
        )}
        </>
    )
}
export default TableTransporte;