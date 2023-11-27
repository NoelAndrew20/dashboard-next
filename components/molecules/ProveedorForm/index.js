import { useDarkMode } from '@/context/DarkModeContext';
import { useEffect, useState } from 'react';

const axios = require('axios');

const ProveedorForm = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        actividadesEconomicas: [
          { orden: '', actividad: '', porcentaje: '', fechaInicio: '', fechaFin: '' },
        ],
        regimenes: [
          { descripcion: '', fechaInicio: '', fechaFin: '' },
        ],
      });

    const handleTipoProveedorChange = (event) => {
        setFormData({
            ...formData,
            tipoProveedor: event.target.value,
        });
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
        //const constanciaFile = e.target.constancia.files[0];
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
            //calle1: e.target.calle1.value,
            //calle2: e.target.calle2.value,
            actividadesEconomicas: formData.actividadesEconomicas,
            regimenes: formData.regimenes,
            correo: e.target.correo.value,
            nombre: e.target.nombre.value,
            telefono: e.target.telefono.value,
        };

        console.log(newFormData);

    //const apiUrl = 'http://localhost:3070/addProveedor/';
    //const apiUrl2 = 'http://localhost:3070/addDocumentoProveedor/';
    
    const apiUrl = 'http://192.168.100.10:3070/addProveedor/';
    const apiUrl2 = 'http://192.168.100.10:3070/addDocumentoProveedor/';
    axios.post(apiUrl, newFormData)
    .then(response => {
        console.log("Respuesta de la primera API:", response.data);
        // Realiza la segunda solicitud después de que la primera haya terminado
        return axios.post(apiUrl2, formData2);
    })
    .then(response2 => {
        console.log("Respuesta de la segunda API:", response2.data);
    })
    .catch(error => {
        console.error("Error al enviar la solicitud:", error);
    });

    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 className="font-bold">Tipo de proveedor</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/3"></div>
                <div className="modal-item w-1/3">
                    <label>Tipo de Proveedor:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select
                        name="tipoProveedor"
                        value={formData.tipoProveedor}
                        onChange={handleTipoProveedorChange}
                        className={isDarkMode ? "modal-input-d" : "modal-input"}
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value="Alimento">Alimento</option>
                            <option value="Vacunas">Vacunas</option>
                            <option value="Medicamento">Medicamento</option>
                            <option value="MateriasPrimas">Materias Primas</option>
                            <option value="Otro1">Otro 1</option>
                            <option value="Otro2">Otro 2</option>
                        </select>
                    </div>
                </div>
                <div className="modal-item w-1/3"></div>
            </div>
            <h2 className="font-bold">Datos de identificación del contribuyente</h2>
            <div className="modal-cel mt-2">

                <div className="modal-item w-1/3">
                    <label>Denominación / Razon social:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="denominacion" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>RFC:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="rfc" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Régimen Capital:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="regimenCapital" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <h2 className="font-bold">Datos del domicilio registrado</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/3">
                    <label>Código postal:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="cp" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre de vialidad (calle):</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="vialidad" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Número exterior:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="exterior" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <label>Número Interior:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="interior" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre de la colonia:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="colonia" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre de la localidad:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="localidad" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <label>Nombre del municipio:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="municipio" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre de la entidad federativa:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="entidad" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3"></div>
            </div>
            <h2 className="font-bold">Actividades económicas</h2>
            <div>
                {formData.actividadesEconomicas.map((actividad, index) => (
                <>
                <div className="modal-cel">
                    <div key={index} className="modal-item w-1/3">
                        <label>Orden:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input
                                type="text"
                                value={actividad.orden || ''}
                                onChange={(e) => handleActividadChange(index, 'orden', e.target.value)}
                                className={isDarkMode ? "modal-input-d" : "modal-input"} />
                        </div>
                    </div>
                    <div key={index} className="modal-item w-1/3">
                        <label>Actividad Económica:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input
                                type="text"
                                value={actividad.actividad || ''}
                                onChange={(e) => handleActividadChange(index, 'actividad', e.target.value)}
                                className={isDarkMode ? "modal-input-d" : "modal-input"} />
                        </div>
                    </div>
                    <div key={index} className="modal-item w-1/3">
                        <label>Porcentaje:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input
                                type="text"
                                value={actividad.porcentaje || ''}
                                onChange={(e) => handleActividadChange(index, 'porcentaje', e.target.value)}
                                className={isDarkMode ? "modal-input-d" : "modal-input"} />
                        </div>
                    </div>
                </div>
                <div className="modal-cel">
                    <div key={index} className="modal-item w-1/3">
                        <label>Fecha Inicio:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input
                                type="text"
                                value={actividad.fechaInicio || ''}
                                onChange={(e) => handleActividadChange(index, 'fechaInicio', e.target.value)}
                                className={isDarkMode ? "modal-input-d" : "modal-input"} />
                        </div>
                    </div>
                    <div key={index} className="modal-item w-1/3">
                        <label>Fecha Fin:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input
                                type="text"
                                value={actividad.fechaFin || ''}
                                onChange={(e) => handleActividadChange(index, 'fechaFin', e.target.value)}
                                className={isDarkMode ? "modal-input-d" : "modal-input"} />
                        </div>
                    </div>
                    <div key={index} className="modal-item w-1/3"></div>
                </div>
                <div className="flex justify-center">
                    <button type="button" onClick={() => removeActividad(index)} className="button-del">
                            Eliminar Actividad
                    </button>
                </div>
                </>
                ))}
                <div className="flex justify-center mt-2">
                    <button type="button" onClick={addActividad} className="button">
                        Agregar Actividad
                    </button>
                </div>    
            </div>
            <h2 className="font-bold">Regímenes</h2>
            <div>
                {formData.regimenes.map((regimen, index) => ( 
                    <>
                    <div className="modal-cel">
                        <div key={index} className="modal-item w-1/3">
                            <label>Descripción:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input
                                    type="text"
                                    value={regimen.descripcion || ''}
                                    onChange={(e) => handleRegimenChange(index, 'descripcion', e.target.value)}
                                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                                />
                            </div>
                        </div>
                        <div key={index} className="modal-item w-1/3">
                            <label>Fecha Inicio:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input
                                    type="text"
                                    value={regimen.fechaInicio || ''}
                                    onChange={(e) => handleRegimenChange(index, 'fechaInicio', e.target.value)}
                                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                                />
                            </div>
                        </div>
                        <div key={index} className="modal-item w-1/3">
                            <label>Fecha Fin:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input
                                    type="text"
                                    value={regimen.fechaFin || ''}
                                    onChange={(e) => handleRegimenChange(index, 'fechaFin', e.target.value)}
                                    className={isDarkMode ? "modal-input-d" : "modal-input"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button type="button" onClick={() => removeRegimen(index)} className="button-del">
                                Eliminar Regimen
                        </button>
                    </div>
                    </>
                ))}
                 <div className="flex justify-center mt-2">
                    <button type="button" onClick={addRegimen} className="button">
                        Agregar Régimen
                    </button>
                </div>
            </div>
            <h2 className="font-bold">Datos de contacto</h2>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/3">
                    <label>Correo:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="correo" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Nombre:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" name="nombre" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <label>Número de teléfono:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="number" name="telefono" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                    </div>
                </div>
            </div>
            <div className="modal-cel mt-2">
                <div className="modal-item w-1/2">
                    <h2 className="font-bold">Constancia de situación fiscal</h2>
                    <label>Subir archivo:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="file" id="constancia" name="constancia" onChange={handleFileChange} className={isDarkMode ? "modal-input-d" : "modal-input"} />
                    </div>
                </div>
                <div className="modal-item w-1/2">
                    <h2 className="font-bold">Carátula de estado de cuenta</h2>
                    <label>Subir archivo:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="file" id="caratula" name="caratula" onChange={handleFileChange} className={isDarkMode ? "modal-input-d" : "modal-input"} />
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <h2 className="font-bold">Opinión de cumplimiento del SAT</h2>
                    <label>Subir archivo:</label>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="file" id="opinion" name="opinion" onChange={handleFileChange} className={isDarkMode ? "modal-input-d" : "modal-input"} />
                    </div>
                </div>
            </div>
                <div className="flex justify-center">
                    <button type="submit" className="button">
                        Guardar
                    </button>
                </div>

        </form>
    )
}
export default ProveedorForm;