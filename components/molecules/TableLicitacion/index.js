import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';

const axios = require('axios');

const TableLicitacion = ({ data, setData }) => {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedValues, setEditedValues] = useState({ nombredealimento: '', cantidad: '' });
    const [dataArray, setDataArray] = useState();
    const [indexGuide, setIndexGuide] = useState()
    const [editedData, setEditedData] = useState([]);
    const [editingSolicitudIndex, setEditingSolicitudIndex] = useState();
    const handleExpand = (index) => {
        setExpandedRow(index === expandedRow ? null : index);
    };

    const entriesPerPage = 10;
    const totalPages = data ? Math.ceil(data.length / entriesPerPage) : 0;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (solicitudIndex) => {
        console.log(solicitudIndex)
        setEditingIndex(solicitudIndex);
        const editingSolicitudIndex = solicitudIndex;
        const editedSolicitud = data[indexGuide].solicitud[solicitudIndex];
        setEditedValues(editedSolicitud);
        setEditingSolicitudIndex(editingSolicitudIndex);
        setShowEditModal(true);
    };

    const handleSave = () => {
        const nombredealimento = document.querySelector('input[name="nombreAlimento"]').value;
        const cantidad = document.querySelector('input[name="cantidad"]').value;
        const fecha = document.querySelector('input[name="fecha"]').value;
        const metodo = document.querySelector('select[name="metodo"]').value;
        const lugar = document.querySelector('input[name="lugar"]').value;
        const periodo = document.querySelector('input[name="periodo"]').value;
        const pago = document.querySelector('select[name="pago"]').value;
        const precio = document.querySelector('input[name="precio"]').value;

        const newData = [...data];
        newData[indexGuide].solicitud[editingSolicitudIndex] = {
            nombredealimento,
            cantidad,
            fecha,
            metodo,
            lugar,
            periodo,
            pago,
            precio
        };
        setDataArray(newData);
        alert('Se ha guardado exitosamente.');
        setShowEditModal(false);
    };

    return (
        <>
            <div className={isDarkMode ? 'table-d' : 'table'}>
                <table className={isDarkMode ? 'table-container-d' : 'table-container'}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>No. de Solicitud</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={`table-row ${
                                        isDarkMode
                                            ? index % 2 === 0
                                                ? 'bg-black'
                                                : 'bg-gray-500'
                                            : index % 2 === 0
                                            ? 'bg-white'
                                            : 'bg-[#F1CD96]'
                                    }`}
                                >
                                    <td>{item.fecha}</td>
                                    <td>{item.solicitud.nombredealimento}</td>
                                    <td className="p-1 flex justify-center">
                                        <button
                                            className="flex align-center"
                                            onClick={() => {handleExpand(index), setIndexGuide(index)}}
                                        >
                                            {expandedRow === index ? (
                                                <Image src="images/svg/expanded.svg" width={25} height={25} />
                                            ) : (
                                                <Image src="images/svg/expand.svg" width={25} height={25} />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === index && (
                                    <>
                                        <tr>
                                            <th>
                                                <div>Nombre de alimento</div>
                                            </th>
                                            <th>
                                                <div>Cantidad</div>
                                            </th>
                                        </tr>
                                        {item.solicitud.map((solicitud, solicitudIndex) => (
                                            <tr key={solicitudIndex}>
                                                <td>{solicitud.nombredealimento}</td>
                                                <td>{solicitud.cantidad}</td>
                                                <td>
                                                    <p>Postularme</p>
                                                    <button onClick={() => handleEdit(solicitudIndex)} className="edit-btn">
                                                        <img src="images/svg/send.svg" width={15} height={15} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                {showEditModal && (
                    <div
                        className={`${isDarkMode ? 'edit-modal-d' : 'edit-modal'} bg-white p-4 rounded shadow-md absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-4/4`}
                    >
                        <h2>Editar Datos</h2>
                        <div>
                            <div className="flex">
                                <div className="modal-item w-1/3">
                                    <p>Fecha:</p>
                                    <input
                                        className={isDarkMode ? 'edit-input-container-d' : 'edit-input-container'}
                                        type="text"
                                        id="text"
                                        name="nombreAlimento"
                                        value={editedValues.nombredealimento || ''}
                                        disabled
                                    />
                                </div>
                                <div className="modal-item w-1/3">
                                    <p>Cantidad:</p>
                                    <input
                                        className={isDarkMode ? 'edit-input-container-d' : 'edit-input-container'}
                                        name="cantidad"
                                        value={editedValues.cantidad || ''}
                                        disabled
                                    />
                                </div>
                                <div className="modal-item w-1/3">
                                    <p>Fecha:</p>
                                    <input
                                        className={isDarkMode ? 'edit-input-container-d' : 'edit-input-container'}
                                        type="date"
                                        name="fecha"
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="modal-item w-1/3">
                                    <p>Método de entrega:</p>
                                    <select
                                        className={isDarkMode ? 'edit-input-container-d' : 'edit-input-container'}
                                        name="metodo"
                                        onChange={(e) => e.target.value}
                                    >
                                        <option value="" selected>
                                            Selecciona...
                                        </option>
                                        <option value="CIF">CIF</option>
                                        <option value="JAB">JAB</option>
                                        <option value="FOB">FON</option>
                                    </select>
                                </div>
                                <div className="modal-item w-1/3">
                                    <p>Lugar:</p>
                                    <input
                                        className={isDarkMode ? 'edit-input-container-d' : 'edit-input-container'}
                                        type="text"
                                        name="lugar"
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="modal-item w-1/3">
                                    <p>Periodo de suministro:</p>
                                    <input
                                        className={isDarkMode ? 'edit-input-container-d' : 'edit-input-container'}
                                        type="date"
                                        name="periodo"
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="modal-item w-1/3">
                                    <p>Forma de pago:</p>
                                    <select
                                        className={isDarkMode ? 'edit-input-container-d' : 'edit-input-container'}
                                        name="pago"
                                        onChange={(e) => e.target.value}
                                    >
                                        <option value="" selected>
                                            Selecciona...
                                        </option>
                                        <option value="CIF">Contrato</option>
                                        <option value="JAB">Crédito</option>
                                        <option value="FOB">Diferido</option>
                                    </select>
                                </div>
                                <div className="modal-item w-1/3">
                                    <p>Precio:</p>
                                    <input
                                        className={isDarkMode ? 'edit-input-container-d' : 'edit-input-container'}
                                        type="number"
                                        name="precio"
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-between">
                            <button className="button" onClick={handleSave}>
                                Guardar
                            </button>
                            <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TableLicitacion;