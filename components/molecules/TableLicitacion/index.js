import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import expand from '@/public/images/svg/expand.png';
import expanded from '@/public/images/svg/expanded.png';
import send from '@/public/images/svg/send.png';
const axios = require('axios');

const TableLicitacion = ({ data, setData }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [fechaActual, setFechaActual] = useState(getFechaActual());
  const [tipoMoneda, setTipoMoneda] = useState('');
  const [tipoImpuesto, setTipoImpuesto] = useState('');
  const [editedValues, setEditedValues] = useState({
    nombre: '',
    cantidad: '',
    fechaEntrega: '',
    unidad: '',
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
    const fechaEntrega = document.querySelector(
      'input[name="fechaEntrega"]'
    ).value;
    const unidad = document.querySelector('input[name="unidad"]').value;
    const fecha = document.querySelector('input[name="fecha"]').value;
    const metodo = document.querySelector('select[name="metodo"]').value;
    const lugar = document.querySelector('select[name="lugar"]').value;
    const pago = document.querySelector('select[name="pago"]').value;
    const costoUnitario = document.querySelector(
      'input[name="costoUnitario"]'
    ).value;
    const tipoM = tipoMoneda;
    const newData = [...data];
    const elementToModify = newData[indexGuide];
    const fechaSolicitud = elementToModify.fecha;
    //const fechaEntrega = elementToModify.fechaEntrega;
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

    newData[indexGuide].solicitud[editingSolicitudIndex] = {
      fechaSolicitud,
      nombreSolicitante,
      numeroSolicitud,
      nombre,
      cantidad,
      unidad,
      fechaEntrega,
      fecha,
      metodo,
      lugar,
      pago,
      precio,
      costoUnitario,
      tipoM,
      impuesto,
      estatus,
      usuario,
      plazo,
      plazoTipo,
    };
    setDataArray(newData);
    const apiUrl = 'http://192.168.100.10:3083/addSolicitudLicitacion';
    axios
      .post(apiUrl, newData[indexGuide].solicitud[editingSolicitudIndex])
      .then((response) => {
        console.log('Respuesta de la API:', response.data);
        alert('Se ha guardado exitosamente.');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
    setShowEditModal(false);
  };

  function getFechaActual() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [metodoEntrega, setMetodoEntrega] = useState('');
  const [direccion, setDireccion] = useState('');
  const [costoUnitario, setCostoUnitario] = useState(0);
  const [impuesto, setImpuesto] = useState('');
  const [precio, setPrecio] = useState(0);
  const [metodo, setMetodo] = useState('');
  const [lugarOptions, setLugarOptions] = useState([
    <option key="default" value="" defaultValue>
      Selecciona...
    </option>,
    <option key="1" value="D">
      25 PONIENTE NÚMERO: 4307 BELISARIO DOMINGUEZ, PUEBLA, PUEBLA
    </option>,
  ]);

  const handleMetodoChange = (e) => {
    const selectedMetodo = e.target.value;
    setMetodo(selectedMetodo);
    if (selectedMetodo === 'CIF' || selectedMetodo === 'CIP') {
      setLugarOptions([
        <option key="default" value="" defaultValue>
          Selecciona...
        </option>,
        <option key="1" value="Direccion1">
          25 PONIENTE NÚMERO: 4307 BELISARIO DOMINGUEZ, PUEBLA, PUEBLA
        </option>,
      ]);
    } else {
      setLugarOptions([
        <option key="default" value="" defaultValue>
          Selecciona...
        </option>,
        <option key="2" value="Ad1">
          Aduana 1
        </option>,
        <option key="3" value="Ad2">
          Aduana 2
        </option>,
        <option key="4" value="Ad3">
          Aduana 3
        </option>,
      ]);
    }
  };

  const handleCostoUnitarioChange = (e) => {
    const newCostoUnitario = e.target.value;
    setCostoUnitario(newCostoUnitario);

    let newPrecio;
    if (impuesto === 'IVA') {
      newPrecio = editedValues.cantidad * newCostoUnitario * 1.16;
    } else {
      newPrecio = editedValues.cantidad * newCostoUnitario;
    }

    setEditedValues((prevState) => ({
      ...prevState,
      precio: newPrecio,
    }));
  };

  const handleImpuestoChange = (e) => {
    const newImpuesto = e.target.value;
    setImpuesto(newImpuesto);

    let newPrecio;
    if (newImpuesto === 'IVA') {
      newPrecio = editedValues.cantidad * costoUnitario * 1.16;
    } else {
      newPrecio = editedValues.cantidad * costoUnitario;
    }

    setEditedValues((prevState) => ({
      ...prevState,
      precio: newPrecio,
    }));
  };

  const [formaPago, setFormaPago] = useState('');
  const [plazo, setPlazo] = useState('');
  const [plazoTipo, setPlazoTipo] = useState('dias');
  const handleChangeFormaPago = (e) => {
    setFormaPago(e.target.value);
    if (e.target.value === 'PPD') {
      setPlazo('');
    }
  };

  const handleChangePlazo = (e) => {
    setPlazo(e.target.value);
  };

  const handleChangePlazoTipo = (e) => {
    setPlazoTipo(e.target.value);
  };

  const [data2, setData2] = useState([]);
  const [tipoDeLicitacion, setTipoDeLicitacion] = useState(null);
  useEffect(() => {
    if (data.length > 0 && data[0].hasOwnProperty('tipoDeLicitacion')) {
      setTipoDeLicitacion(data[0].tipoDeLicitacion);
    }
  }, [data]);

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        let usuario = '';
        if (token) {
          const decodedToken = jwt.decode(token);
          usuario = decodedToken.usuario;
        } else {
          console.error('No se encontró el token en localStorage.');
        }
        const responseCompra = await axios.get(
          'http://192.168.100.10:3086/getAllSolicitudCompra',
          {
            params: {
              tipoDeLicitacion: tipoDeLicitacion,
            },
          }
        );
        console.log(responseCompra.data);
        const responseEstatus1 = await axios.get(
          'http://192.168.100.10:3083/getSolicitudEstatus1',
          {
            params: {
              usuario: usuario,
            },
          }
        );
        console.log(responseEstatus1.data);
        const solicitudesEstatus1 = responseEstatus1.data.map(item => item.solicitud);
      const resultadosActualizados = responseCompra.data.map(item => {
        const solicitudIndex = solicitudesEstatus1.findIndex(solicitud => solicitud.nombre === item.solicitud.nombre);
        if (solicitudIndex !== -1) {
          item.solicitud.estatus = 1;
        }
        return item;
      });
      setData2(resultadosActualizados);
      console.log(resultadosActualizados);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, [tipoDeLicitacion]);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        let usuario = '';
        if (token) {
          const decodedToken = jwt.decode(token);
          usuario = decodedToken.usuario;
        } else {
          console.error('No se encontró el token en localStorage.');
        }

        // Obtener todas las solicitudes de compra
        const responseCompra = await axios.get(
          'http://192.168.100.10:3086/getAllSolicitudCompra',
          {
            params: {
              tipoDeLicitacion: tipoDeLicitacion,
            },
          }
        );
        console.log(responseCompra.data);
        const responseEstatus1 = await axios.get(
          'http://192.168.100.10:3083/getSolicitudEstatus1',
          {
            params: {
              usuario: usuario,
            },
          }
        );

        const comprasActualizadas = responseCompra.data.map((compra) => {
          const solicitudActualizada = compra.solicitud.map((item) => {
            const solicitudEstatus1 = responseEstatus1.data.find(
              (solicitud) => solicitud.solicitud.nombre === item.nombre
            );
            if (solicitudEstatus1) {
              return { ...item, estatus: 1 };
            } else {
              return item;
            }
          });
          return { ...compra, solicitud: solicitudActualizada };
        });

        console.log(comprasActualizadas);
        setData2(comprasActualizadas);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [tipoDeLicitacion]);

  return (
    <>
      <div className={isDarkMode ? 'table-d' : 'table'}>
        <table className={isDarkMode ? 'table-container-d' : 'table-container'}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Solicitud</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {data2.map(
              (
                item,
                index //cambiar a data 2
              ) => (
                <React.Fragment key={index}>
                  <tr className="table-row">
                    <td>{item.fecha}</td>
                    <td>{item.nombreSolicitud}</td>
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
                            alt="expanded"
                          />
                        ) : (
                          <Image
                            src={expanded}
                            width={25}
                            height={25}
                            loading="lazy"
                            alt="expanded"
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
                        <th>
                          <div>Unidad</div>
                        </th>
                        <th>
                          <div>Postularme</div>
                        </th>
                      </tr>
                      {item.solicitud.map((solicitud, solicitudIndex) => (
                        <tr key={solicitudIndex} className="mb-5">
                          <td>{solicitud.nombre}</td>
                          <td>{solicitud.cantidad}</td>
                          <td>{solicitud.unidad}</td>
                          <td>
                            {solicitud.estatus === 0 ? (
                              <>
                                <button
                                  onClick={() => handleEdit(solicitudIndex)}
                                  className="edit-btn"
                                >
                                  <Image
                                    src={send}
                                    width={15}
                                    height={15}
                                    alt="edit"
                                  />
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
              )
            )}
          </tbody>
        </table>
        {showEditModal && (
          <div
            className={`${
              isDarkMode ? 'modal-content-d' : 'modal-content '
            } bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto z-50`}
          >
            <h2>Editar Datos</h2>
            <div>
              <div className="flex">
                <div className="modal-item w-1/3">
                  <p>Nombre:</p>
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
                  <p>Unidad:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="unidad"
                    value={editedValues.unidad || ''}
                    disabled
                  />
                </div>
              </div>
              <div className="flex">
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
                    value={fechaActual}
                    disabled
                  />
                </div>
                <div className="modal-item w-1/3"></div>
                <div className="modal-item w-1/3"></div>
              </div>
              <div className="flex mt-2">
                <div className="modal-item w-1/3">
                  <p>Método de entrega:</p>
                  <select
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="metodo"
                    onChange={handleMetodoChange}
                  >
                    <option value="" defaultValue>
                      Selecciona...
                    </option>
                    <option value="CIF">CIF</option>
                    <option value="FOB">FOB</option>
                    <option value="CIP">CIP</option>
                  </select>
                </div>

                <div className="modal-item w-1/3">
                  <p>Lugar:</p>
                  <select
                    className={'edit-input-container'}
                    name="lugar"
                    onChange={(e) => e.target.value}
                  >
                    {lugarOptions}
                  </select>
                </div>

                <div className="modal-item w-1/3">
                  <p>Fecha de entrega:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    type="date"
                    name="fechaEntrega"
                    value={editedValues.fechaEntrega || ''}
                    disabled
                  />
                </div>
              </div>

              <div className="flex">
                <div className="modal-item w-1/3">
                  <p>Costo unitario:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    type="number"
                    name="costoUnitario"
                    value={editedValues.costoUnitario}
                    onChange={handleCostoUnitarioChange}
                  />
                </div>

                <div className="modal-item w-1/3">
                  <p>Tipo de moneda:</p>
                  <select
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="tipoM"
                    onChange={(e) => {
                      e.target.value;
                      setTipoMoneda(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Selecciona...
                    </option>
                    <option value="PesoM">Peso Mexicano</option>
                    <option value="Dolar">Dolar</option>
                    <option value="Euro">Euro</option>
                  </select>
                </div>

                <div className="modal-item w-1/3">
                  {tipoMoneda === 'Dolar' || tipoMoneda === 'Euro' ? (
                    ''
                  ) : (
                    <>
                      <p>Impuestos:</p>
                      <select
                        className={
                          isDarkMode
                            ? 'edit-input-container-d'
                            : 'edit-input-container'
                        }
                        name="impuesto"
                        value={impuesto}
                        onChange={handleImpuestoChange}
                      >
                        <option value="" defaultValue>
                          Selecciona...
                        </option>
                        <option value="IVA">Con IVA</option>
                        <option value="NIVA">Sin IVA</option>
                      </select>
                    </>
                  )}
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
                    onChange={handleChangeFormaPago}
                    value={formaPago}
                  >
                    <option value="" defaultValue>
                      Selecciona...
                    </option>
                    <option value="PUE">PUE</option>
                    <option value="PPD">PPD</option>
                  </select>
                </div>
                {formaPago === 'PUE' && (
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
                      value={editedValues.precio}
                      onChange={(e) =>
                        setEditedValues((prevState) => ({
                          ...prevState,
                          precio: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                {formaPago === 'PPD' && (
                  <>
                    <div className="modal-item w-1/3">
                      <p>Plazo:</p>
                      <input
                        type="number"
                        value={plazo}
                        onChange={handleChangePlazo}
                        className={
                          isDarkMode
                            ? 'edit-input-container-d'
                            : 'edit-input-container'
                        }
                      />
                    </div>
                    <div className="modal-item w-1/3 self-end">
                      <input
                        type="text"
                        value={'Meses'}
                        className={
                          isDarkMode
                            ? 'edit-input-container-d'
                            : 'edit-input-container'
                        }
                        disabled
                      />
                    </div>
                  </>
                )}
              </div>
              {formaPago === 'PPD' && (
                <div className="flex">
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
                      value={editedValues.precio}
                      onChange={(e) =>
                        setEditedValues((prevState) => ({
                          ...prevState,
                          precio: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs mt-5">
              *Método de entrega: CIF(cost insurance and freight), CIP(Carriage
              and Insurance Paid to) y FOB(Free On Board){' '}
            </p>

            <p className="text-xs">
              *Forma de pago: PUE(Pago En Una Sola Exhibición), PPD(Pago en
              Parcialidades o Diferido)
            </p>

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
