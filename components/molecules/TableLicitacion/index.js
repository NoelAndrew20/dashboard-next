import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import expand from '@/public/images/svg/expand.svg';
import expanded from '@/public/images/svg/expanded.svg';
import send from '@/public/images/svg/send.svg';

const axios = require('axios');

const TableLicitacion = ({ data, setData }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValues, setEditedValues] = useState({
    nombre: '',
    cantidad: '',
  });
  const [dataArray, setDataArray] = useState();
  const [indexGuide, setIndexGuide] = useState();
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
    setEditingIndex(solicitudIndex);
    const editingSolicitudIndex = solicitudIndex;
    const editedSolicitud = data[indexGuide].solicitud[solicitudIndex];
    setEditedValues(editedSolicitud);
    setEditingSolicitudIndex(editingSolicitudIndex);
    setShowEditModal(true);
  };

  const handleSave = () => {
    const nombre = document.querySelector('input[name="nombre"]').value;
    const cantidad = document.querySelector('input[name="cantidad"]').value;
    const fecha = document.querySelector('input[name="fecha"]').value;
    const metodo = document.querySelector('select[name="metodo"]').value;
    const lugar = document.querySelector('input[name="lugar"]').value;
    const periodo = document.querySelector('input[name="periodo"]').value;
    const pago = document.querySelector('select[name="pago"]').value;
    const precio = document.querySelector('input[name="precio"]').value;
    const newData = [...data];
    const elementToModify = newData[indexGuide];
    const fechaSolicitud = elementToModify.fecha;
    const nombreSolicitante = elementToModify.nombreSolicitante;
    const numeroSolicitud = elementToModify.numeroSolicitud;
    const estatus = 0;
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    let usuario = '';
    if (token) {
      const decodedToken = jwt.decode(token);
      usuario = decodedToken.usuario;
    } else {
      console.error('No se encontró el token en localStorage.');
    }
    const primerCaracter = usuario[0];

    newData[indexGuide].solicitud[editingSolicitudIndex] = {
      fechaSolicitud,
      nombreSolicitante,
      numeroSolicitud,
      nombre,
      cantidad,
      fecha,
      metodo,
      lugar,
      periodo,
      pago,
      precio,
      estatus,
      usuario,
      primerCaracter,
    };
    setDataArray(newData);

    //const apiUrl = 'http://localhost:3083/addSolicitudLicitacion';
    const apiUrl = 'http://192.168.100.10:3083/addSolicitudLicitacion';
    axios
      .post(apiUrl, newData[indexGuide].solicitud[editingSolicitudIndex])
      .then((response) => {
        console.log('Respuesta de la API:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });

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
                <tr className="table-row">
                  <td>{item.fecha}</td>
                  <td>{item.numeroSolicitud}</td>
                  <td className="p-1 flex justify-center">
                    <button
                      className="flex align-center"
                      onClick={() => {
                        handleExpand(index), setIndexGuide(index);
                      }}
                    >
                      {expandedRow === index ? (
                        <Image
                          src={expand}
                          width={25}
                          height={25}
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={expanded}
                          width={25}
                          height={25}
                          loading="lazy"
                        />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <>
                    <tr>
                      <th>
                        <div>Nombre</div>
                      </th>
                      <th>
                        <div>Cantidad</div>
                      </th>
                    </tr>
                    {item.solicitud.map((solicitud, solicitudIndex) => (
                      <tr key={solicitudIndex}>
                        <td>{solicitud.nombre}</td>
                        <td>{solicitud.cantidad}</td>
                        <td>
                          {solicitud.estatus === 0 ? (
                            <>
                              <p>Postularme</p>
                              <button
                                onClick={() => handleEdit(solicitudIndex)}
                                className="edit-btn"
                              >
                                <Image src={send} width={15} height={15} />
                              </button>
                            </>
                          ) : (
                            ''
                          )}
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
            className={`${
              isDarkMode ? 'edit-modal-d' : 'edit-modal'
            } bg-white p-4 rounded shadow-md absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-4/4`}
          >
            <h2>Editar Datos</h2>
            <div>
              <div className="flex">
                <div className="modal-item w-1/3">
                  <p>Fecha:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    type="text"
                    id="text"
                    name="nombre"
                    value={editedValues.nombre || ''}
                    disabled
                  />
                </div>
                <div className="modal-item w-1/3">
                  <p>Cantidad:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="cantidad"
                    value={editedValues.cantidad || ''}
                    disabled
                  />
                </div>
                <div className="modal-item w-1/3">
                  <p>Fecha:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
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
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="metodo"
                    onChange={(e) => e.target.value}
                  >
                    <option value="" defaultValue>
                      Selecciona...
                    </option>
                    <option value="CIF">CIF</option>
                    <option value="LAB">LAB</option>
                    <option value="FOB">FOB</option>
                  </select>
                </div>
                <div className="modal-item w-1/3">
                  <p>Lugar:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    type="text"
                    name="lugar"
                    onChange={(e) => e.target.value}
                  />
                </div>
                <div className="modal-item w-1/3">
                  <p>Periodo de suministro:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
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
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="pago"
                    onChange={(e) => e.target.value}
                  >
                    <option value="" defaultValue>
                      Selecciona...
                    </option>
                    <option value="Credito">Crédito</option>
                    <option value="Diferido">Diferido</option>
                  </select>
                </div>
                <div className="modal-item w-1/3">
                  <p>Precio:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
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
              <button
                className="cancel-btn"
                onClick={() => setShowEditModal(false)}
              >
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
