import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';

const TableSolicitud = ({ data, setData }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const entriesPerPage = 10;
    const totalPages = Math.ceil(data.length / entriesPerPage);
    const [editedLotes, setEditedLotes] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    
    const [searchTerm, setSearchTerm] = useState('');

    const displayData = searchTerm ? data.filter(item => item.fechaSolicitud && item.fechaSolicitud.toLowerCase().includes(searchTerm)) : data;
    const displayDataFinal = displayData.slice(startIndex, endIndex);

    useEffect(() => {
      setCurrentPage(1); 
    }, [searchTerm]);


    const handleEdit = (index) => { // Recibimos el índice como argumento
        const item = data[index]; // Obtenemos el elemento correspondiente al índice
        setEditingIndex(index);
        setEditedValues({ ...item }); // Usamos el elemento correspondiente
        setEditedLotes(item.lotes); // Configura editedLotes con los valores de lotes del elemento seleccionado
        setShowEditModal(true);
    };
 
    const handleSaveEdit = () => {
        const updatedUsuario = { 
            fechaSolicitud: editedValues.fechaSolicitud,
            organizacion: editedValues.organizacion,
            ubicacion: editedValues.ubicacion,
            nivelEntrega: editedValues.nivelEntrega,
            fechaEntrega: editedValues.fechaEntrega,
            nombreZona: editedValues.nombreZona,
            nombreSolicitante: editedValues.nombreSolicitante,
        };
    
        const axios = require("axios");
        console.log(updatedUsuario.usuario, updatedUsuario);

        const apiUrl = 'http://192.168.100.10:3020/editUsuario/' + updatedUsuario.fechaContratacion;
        axios.put(apiUrl, updatedUsuario)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });

            setShowEditModal(false);
            setEditedValues({});
    };



   const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("editedLotes[")) {
        const updatedIndex = parseInt(name.match(/\d+/)[0], 10);
        const updatedField = name.split(".").pop();
        const updatedLotesCopy = [...editedLotes];
        updatedLotesCopy[updatedIndex] = {
            ...updatedLotesCopy[updatedIndex],
            [updatedField]: value,
        };
        setEditedLotes(updatedLotesCopy);
    } else {
        setEditedValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }
};


    return (
        <>
        <div className="search-container mb-5">
            <div className={isDarkMode ? "flex inner-search-d" : "flex inner-search"}>
                <div>
                    <input
                        type="text"
                        className={isDarkMode ? "bg-black" : "bg-white"}
                        placeholder="Buscar por Nombre"
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
                        <th>Fecha de solicitud</th>
                        <th>Organización</th>
                        <th>Ubicación</th>
                        <th>Nivel de entrega</th>
                        <th>Solicitante</th>
                        <th>Alimentos</th>
                        <th>Editar</th>
                        <th>Enviar</th>
                    </tr>
                </thead>
                <tbody>
                    {displayDataFinal.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                        isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-white' : 'bg-[#F1CD96]')
                        }`}
                    >       
                        <td>{item.fechaSolicitud}</td>
                        <td>{item.organizacion}</td>
                        <td>{item.ubicacion}</td>
                        <td>{item.nivelEntrega}</td>
                        <td>{item.nombreSolicitante}</td>
                        <td>
                            <ul>
                                {item.lotes?.map((lote, subIndex) => (
                                <li key={subIndex}>
                                    {lote.nombreAlimento}: {lote.cantidad} {lote.unidad}
                                </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <button onClick={() => handleEdit(index)} className="edit-btn">
                                <img src="images/svg/edit.svg" width={15} height={15}/>
                            </button>
                        </td>
                        <td>
                            <button className="edit-btn">
                                <Link href="../Graphicator">
                                    <img src="images/svg/send.svg" width={10} height={10}/>
                                </Link>
                            </button>
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
            <span>{currentPage} de {totalPages}</span>
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
                            <p>Fecha de solicitud:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="date" name="fechaSolicitud" value={editedValues.fechaSolicitud || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Organización:</p> <input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  name="organizacion" value={editedValues.organizacion || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Ubicacion:</p> <input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  name="ubicacion" value={editedValues.ubicacion || ''} onChange={handleEditInputChange} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="modal-item w-1/3">
                            <p>Nivel de entrega:</p>
                            <select className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="nivelEntrega" value={editedValues.nivelEntrega || ''} onChange={handleEditInputChange} >
                                <option value="leve">Leve</option>
                                <option value="normal">Normal</option>
                                <option value="urgente">Urgente</option>
                            </select>
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Nombre de la zona:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  name="nombreZona" value={editedValues.nombreZona || ''} onChange={handleEditInputChange} />
                        </div>
                        <div className="modal-item w-1/3">
                            <p>Fecha de entrega:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  type="date" name="fechaEntrega" value={editedValues.fechaEntrega || ''} onChange={handleEditInputChange} />
                        </div>
                    </div>
                    <div className="flex">

                        <div className="modal-item w-1/3">
                            <p>Nombre del solicitante:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  id="nombreSolicitante" name="nombreSolicitante" value={editedValues.nombreSolicitante || ''} onChange={handleEditInputChange} />
                        </div>


                    </div>
                    <div className="flex">
                        <div>
                            <p>Alimentos:</p>
                            <ul>
                                {editedLotes?.map((lote, subIndex) => (
                                    <div className="flex" key={subIndex}>
                                        <div className="modal-item w-1/3">
                                            <p>Nombre del alimento:</p>

                                            <input
                                                type="text"
                                                name={`editedLotes[${subIndex}].nombreAlimento`}
                                                value={lote.nombreAlimento}
                                                onChange={handleEditInputChange}
                                                className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
                                            />
                                        </div>
                                        <div className="modal-item w-1/3">
                                            <p>Cantidad:</p>
                                            <input
                                                type="text"
                                                name={`editedLotes[${subIndex}].cantidad`}
                                                value={lote.cantidad}
                                                onChange={handleEditInputChange}
                                                className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
                                            />
                                        </div>
                                        <div className="modal-item w-1/3">
                                            <p>Unidad:</p>
                                             <select 
                                                name={`editedLotes[${subIndex}].unidad`}
                                                value={lote.unidad}
                                                onChange={handleEditInputChange}
                                                className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} 
                                            >
                                                <option value="leve">Leve</option>
                                                <option value="normal">Normal</option>
                                                <option value="urgente">Urgente</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex justify-between">
                    <button className="button" onClick={handleSaveEdit}>Guardar</button>
                    <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancelar</button>
                </div>
            </div>
        )}
        </>
    )
}
export default TableSolicitud;