import { useDarkMode } from '@/context/DarkModeContext';
import { useEffect, useState } from 'react';
const axios = require('axios');

const ProveedorForm = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    actividadesEconomicas: [],
    regimenes: [],
  });

  const [fiscalData, setfiscalData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/python/Constanza_v15/ConsF.json'); // Ruta relativa al archivo JSON en la carpeta public
        const data = await response.json();

        setfiscalData(data.answer);
        console.log('Índice "answer":', data.answer);
      } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
      }
    };

    fetchData();
  }, []);
  console.log('fiscalData:', fiscalData);
  const [fiscaldata, setfiscaldata] = useState({
    actividadEconomica: [
      {
        actividad: 'Instalaciones eléctricas en construcciones',
        fechaFinal: 'N/A',
        fechaInicio: '02/03/2020',
        numeroOrden: '1',
        porcentaje: '70',
      },
      {
        actividad:
          'Comercio al por menor de lámparas ornamentales y pantallas para lámparas y candiles',
        fechaFinal: 'N/A',
        fechaInicio: '01/07/2003',
        numeroOrden: '3',
        porcentaje: '30',
      },
    ],
    datosContribuyente: {
      calle1: 'AVENIDA ROSENDO MARQUEZ',
      calle2: 'CALLE 45 SUR',
      colonia: 'BELISARIO DOMINGUEZ',
      cp: ':72180',
      entidad: 'PUEBLA',
      localidad: 'HEROICA PUEBLA DE ZARAGOZA',
      municipio: 'PUEBLA',
      numeroExterior: '4307',
      numeroInterior: 'LETRA A',
      tipoVialidad: 'AVENIDA (AV.)',
      vialidad: '25 PONIENTE',
    },
    domicilioRegistrado: {
      denominacion: 'TERMOMAGNETICOS Y CONTROL DE RADIACIONES',
      estatusPadron: 'ACTIVO',
      fechaInicioOperacion: '01 DE JULIO DE 2003',
      fechaUltimoCambioEstado: '01 DE JULIO DE 2003',
      nombreComercial: '',
      regimenCapital: 'SOCIEDAD ANONIMA DE CAPITAL VARIABLE',
      rfc: 'TCR030701IN7',
    },
    regimen: [
      {
        descripcion: 'Régimen General de Ley Personas Morales',
        fechaFin: 'N/A',
        fechaInicio: '01/07/2003',
      },
    ],
  });
  const cpAux = fiscalData?.datosContribuyente?.cp || '';
  const denominacionAux = fiscalData?.domicilioRegistrado?.denominacion || '';
  const rfcAux = fiscalData?.domicilioRegistrado?.rfc || '';
  const regimenAux = fiscalData?.domicilioRegistrado?.regimenCapital || '';
  const vialidadAux = fiscalData?.datosContribuyente?.vialidad || '';
  const exteriorAux = fiscalData?.datosContribuyente?.numeroExterior || '';
  const interiorAux = fiscalData?.datosContribuyente?.numeroInterior || '';
  const coloniaAux = fiscalData?.datosContribuyente?.colonia || '';
  const localidadAux = fiscalData?.datosContribuyente?.localidad || '';
  const municipioAux = fiscalData?.datosContribuyente?.municipio || '';
  const entidadAux = fiscalData?.datosContribuyente?.entidad || '';

  const handleTipoProveedorChange = (event) => {
    setFormData({
      ...formData,
      tipoProveedor: event.target.value,
    });
  };

  const handleCPChange = (e) => {
    setCpAux(e.target.value);
  };

  const handleDenoChange = (e) => {
    setDenominacionAux(e.target.value);
  };

  const handleRfcChange = (e) => {
    setRfcAux(e.target.value);
  };

  const handleRegChange = (e) => {
    setRegimenAux(e.target.value);
  };

  const handleExteriorChange = (e) => {
    setExteriorAux(e.target.value);
  };

  const handleInteriorChange = (e) => {
    setInteriorAux(e.target.value);
  };

  const handleColoniaChange = (e) => {
    setColiniaAux(e.target.value);
  };

  const handleLocalidadChange = (e) => {
    setLocalidadAux(e.target.value);
  };

  const handleVialidadChange = (e) => {
    setVialidadAux(e.target.value);
  };

  const handleMunicipioChange = (e) => {
    setMunicipioAux(e.target.value);
  };

  const handleEntidadChange = (e) => {
    setEntidadAux(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleActividadChange = (index, field, value) => {
    const newActividades = [...formData.actividadesEconomicas];
    newActividades[index][field] = value;
    setFormData({
      ...formData,
      actividadesEconomicas: newActividades,
    });
  };

  const handleRegimenChange = (index, field, value) => {
    const newRegimenes = [...formData.regimenes];
    newRegimenes[index][field] = value;
    setFormData({
      ...formData,
      regimenes: newRegimenes,
    });
  };

  const addActividad = () => {
    setFormData({
      ...formData,
      actividadesEconomicas: [...formData.actividadesEconomicas, {}],
    });
  };

  const removeActividad = (index) => {
    const newActividades = [...formData.actividadesEconomicas];
    newActividades.splice(index, 1);
    setFormData({
      ...formData,
      actividadesEconomicas: newActividades,
    });
  };

  const addRegimen = () => {
    setFormData({
      ...formData,
      regimenes: [...formData.regimenes, {}],
    });
  };

  const removeRegimen = (index) => {
    const newRegimenes = [...formData.regimenes];
    newRegimenes.splice(index, 1);
    setFormData({
      ...formData,
      regimenes: newRegimenes,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const constanciaFile = document.getElementById('constancia').files[0];
    const caratulaFile = document.getElementById('caratula').files[0];
    const opinionFile = document.getElementById('opinion').files[0];
    const formData2 = new FormData();
    formData2.append('constanciaFile', constanciaFile);
    formData2.append('caratulaFile', caratulaFile);
    formData2.append('opinionFile', opinionFile);
    const newFormData = {
      tipoProveedor: formData.tipoProveedor,
      denominacion: e.target.denominacion.value,
      rfc: e.target.rfc.value,
      regimenCapital: e.target.regimenCapital.value,
      cp: e.target.cp.value,
      vialidad: e.target.vialidad.value,
      exterior: e.target.exterior.value,
      interior: e.target.interior.value,
      colonia: e.target.colonia.value,
      localidad: e.target.localidad.value,
      municipio: e.target.municipio.value,
      entidad: e.target.entidad.value,
      actividadesEconomicas: formData.actividadesEconomicas,
      regimenes: formData.regimenes,
      correo: e.target.correo.value,
      nombre: e.target.nombre.value,
      telefono: e.target.telefono.value,
    };

    const apiUrl = 'http://192.168.100.10:3070/addProveedor/';
    const apiUrl2 = 'http://192.168.100.10:3070/addDocumentoProveedor/';
    axios
      .post(apiUrl, newFormData)
      .then((response) => {
        console.log('Respuesta de la primera API:', response.data);
        return axios.post(apiUrl2, formData2);
      })
      .then((response2) => {
        console.log('Respuesta de la segunda API:', response2.data);
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
    alert(
      'Se ha guardado exitosamente! \nPor favor, revise su correo para realizar los siguientes pasos.'
    );
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="font-bold text-lg">Tipo de proveedor</h2>
      <div className="modal-cel mt-2">
        <div className="modal-item w-1/3"></div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">Tipo de Proveedor:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <select
              name="tipoProveedor"
              value={formData.tipoProveedor}
              onChange={handleTipoProveedorChange}
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
            >
              <option value="">Selecciona un tipo</option>
              <option value="Alimento">Alimento</option>
              {/*<option value="MateriasPrimas">Materias Primas</option>
                            <option value="Medicamento">Medicamento</option>
                            <option value="Vacunas">Vacunas</option>*/}
              <option value="Vientres">Vientre</option>
              <option value="Otro1">Otro 1</option>
              <option value="Otro2">Otro 2</option>
            </select>
          </div>
        </div>
        <div className="modal-item w-1/3"></div>
      </div>
      <h2 className="font-bold text-lg">
        Datos de identificación del contribuyente
      </h2>
      <div className="modal-cel mt-2">
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">
            Denominación / Razon social:
          </label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="denominacion"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={denominacionAux}
              onChange={handleDenoChange}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">RFC:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="rfc"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={rfcAux}
              onChange={handleRfcChange}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">Régimen Capital:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="regimenCapital"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={regimenAux}
              onChange={handleRegChange}
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-lg">Datos del domicilio registrado</h2>
      <div className="modal-cel mt-2">
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">Código postal:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="cp"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={cpAux}
              onChange={handleCPChange}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">
            Nombre de vialidad (calle):
          </label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="vialidad"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={vialidadAux}
              onChange={handleVialidadChange}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">Número exterior:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="exterior"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={exteriorAux}
              onChange={handleExteriorChange}
            />
          </div>
        </div>
      </div>
      <div className="modal-cel">
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">Número Interior:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="interior"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={interiorAux}
              onChange={handleInteriorChange}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">
            Nombre de la colonia:
          </label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="colonia"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={coloniaAux}
              onChange={handleColoniaChange}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">
            Nombre de la localidad:
          </label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="localidad"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={localidadAux}
              onChange={handleLocalidadChange}
            />
          </div>
        </div>
      </div>
      <div className="modal-cel">
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">
            Nombre del municipio:
          </label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="municipio"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={municipioAux}
              onChange={handleMunicipioChange}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">
            Nombre de la entidad federativa:
          </label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="entidad"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              value={entidadAux}
              onChange={handleEntidadChange}
            />
          </div>
        </div>
        <div className="modal-item w-1/3"></div>
      </div>
      <h2 className="font-bold text-lg">Actividades económicas</h2>
      <div>
        {fiscaldata?.actividadEconomica.map((act, index) => (
          <div>
            <div className="modal-cel">
              <div key={index} className="modal-item w-1/3">
                <label className="font-bold text-cyan-800">Orden:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    value={act.numeroOrden || ''}
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
              <div key={index} className="modal-item w-1/3">
                <label className="font-bold text-cyan-800">
                  Actividad Económica:
                </label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    value={act.actividad || ''}
                    onChange={(e) =>
                      handleActividadChange(index, 'actividad', e.target.value)
                    }
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
              <div key={index} className="modal-item w-1/3">
                <label className="font-bold text-cyan-800">Porcentaje:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    value={act.porcentaje || ''}
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
            </div>
            <div className="modal-cel">
              <div key={index} className="modal-item w-1/3">
                <label className="font-bold text-cyan-800">Fecha Inicio:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    value={act.fechaInicio || ''}
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
              <div key={index} className="modal-item w-1/3">
                <label className="font-bold text-cyan-800">Fecha Fin:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    value={act.fechaFinal || ''}
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
              <div key={index} className="modal-item w-1/3"></div>
            </div>
          </div>
        ))}
        {formData.actividadesEconomicas.length > 0 &&
          formData.actividadesEconomicas.map((actividad, index) => (
            <div>
              <div className="modal-cel">
                <div key={index} className="modal-item w-1/3">
                  <label className="font-bold text-cyan-800">Orden:</label>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                  >
                    <input
                      type="text"
                      value={actividad.orden || ''}
                      onChange={(e) =>
                        handleActividadChange(index, 'orden', e.target.value)
                      }
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </div>
                <div key={index} className="modal-item w-1/3">
                  <label className="font-bold text-cyan-800">
                    Actividad Económica:
                  </label>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                  >
                    <input
                      type="text"
                      value={actividad.actividad || ''}
                      onChange={(e) =>
                        handleActividadChange(
                          index,
                          'actividad',
                          e.target.value
                        )
                      }
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </div>
                <div key={index} className="modal-item w-1/3">
                  <label className="font-bold text-cyan-800">Porcentaje:</label>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                  >
                    <input
                      type="text"
                      value={actividad.porcentaje || ''}
                      onChange={(e) =>
                        handleActividadChange(
                          index,
                          'porcentaje',
                          e.target.value
                        )
                      }
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-cel">
                <div key={index} className="modal-item w-1/3">
                  <label className="font-bold text-cyan-800">
                    Fecha Inicio:
                  </label>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                  >
                    <input
                      type="text"
                      value={actividad.fechaInicio || ''}
                      onChange={(e) =>
                        handleActividadChange(
                          index,
                          'fechaInicio',
                          e.target.value
                        )
                      }
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </div>
                <div key={index} className="modal-item w-1/3">
                  <label className="font-bold text-cyan-800">Fecha Fin:</label>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                  >
                    <input
                      type="text"
                      value={actividad.fechaFin || ''}
                      onChange={(e) =>
                        handleActividadChange(index, 'fechaFin', e.target.value)
                      }
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </div>
                <div key={index} className="modal-item w-1/3"></div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => removeActividad(index)}
                  className="button-del"
                >
                  Eliminar actividad
                </button>
              </div>
            </div>
          ))}
        <div className="flex justify-center mt-2">
          <button type="button" onClick={addActividad} className="button">
            Agregar otra actividad
          </button>
        </div>
      </div>
      <h2 className="font-bold text-lg">Regímenes</h2>
      <div>
        {fiscaldata?.regimen.map((regimen, index) => (
          <div className="modal-cel">
            <div key={index} className="modal-item w-1/3">
              <label className="font-bold text-cyan-800">Descripción:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  value={regimen.fechaInicio}
                  disabled
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div key={index} className="modal-item w-1/3">
              <label className="font-bold text-cyan-800">Fecha Inicio:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  value={regimen.fechaInicio}
                  disabled
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div key={index} className="modal-item w-1/3">
              <label className="font-bold text-cyan-800">Fecha Fin:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  value={regimen.fechaFin}
                  disabled
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
          </div>
        ))}
        {formData.regimenes.length > 0 &&
          formData.regimenes.map((regimen, index) => (
            <div>
              <div className="modal-cel">
                <div key={index} className="modal-item w-1/3">
                  <label className="font-bold text-cyan-800">
                    Descripción:
                  </label>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                  >
                    <input
                      type="text"
                      value={regimen.descripcion || ''}
                      onChange={(e) =>
                        handleRegimenChange(
                          index,
                          'descripcion',
                          e.target.value
                        )
                      }
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </div>
                <div key={index} className="modal-item w-1/3">
                  <label className="font-bold text-cyan-800">
                    Fecha Inicio:
                  </label>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                  >
                    <input
                      type="text"
                      value={regimen.fechaInicio || ''}
                      onChange={(e) =>
                        handleRegimenChange(
                          index,
                          'fechaInicio',
                          e.target.value
                        )
                      }
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </div>
                <div key={index} className="modal-item w-1/3">
                  <label className="font-bold text-cyan-800">Fecha Fin:</label>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                  >
                    <input
                      type="text"
                      value={regimen.fechaFin || ''}
                      onChange={(e) =>
                        handleRegimenChange(index, 'fechaFin', e.target.value)
                      }
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => removeRegimen(index)}
                  className="button-del"
                >
                  Eliminar Regimen
                </button>
              </div>
            </div>
          ))}
        <div className="flex justify-center mt-2">
          <button type="button" onClick={addRegimen} className="button">
            Agregar otro régimen
          </button>
        </div>
      </div>
      <h2 className="font-bold text-lg">Datos de contacto</h2>
      <div className="modal-cel mt-2">
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">Correo:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="correo"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">Nombre:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="text"
              name="nombre"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
            />
          </div>
        </div>
        <div className="modal-item w-1/3">
          <label className="font-bold text-cyan-800">Número de teléfono:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="number"
              name="telefono"
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
            />
          </div>
        </div>
      </div>
      <div className="modal-cel mt-2">
        <div className="modal-item w-1/2">
          <h2 className="font-bold text-lg">Constancia de situación fiscal</h2>
          <label className="font-bold text-cyan-800">Subir archivo:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="file"
              id="constancia"
              name="constancia"
              onChange={handleFileChange}
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
            />
          </div>
        </div>
        <div className="modal-item w-1/2">
          <h2 className="font-bold text-lg">Carátula de estado de cuenta</h2>
          <label className="font-bold text-cyan-800">Subir archivo:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="file"
              id="caratula"
              name="caratula"
              onChange={handleFileChange}
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
            />
          </div>
        </div>
      </div>
      <div className="modal-cel">
        <div className="modal-item w-1/3">
          <h2 className="font-bold text-lg">Opinión de cumplimiento del SAT</h2>
          <label className="font-bold text-cyan-800">Subir archivo:</label>
          <div
            className={
              isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
            }
          >
            <input
              type="file"
              id="opinion"
              name="opinion"
              onChange={handleFileChange}
              className={isDarkMode ? 'modal-input-d' : 'modal-input'}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="button">
          Guardar
        </button>
      </div>
    </form>
  );
};
export default ProveedorForm;
