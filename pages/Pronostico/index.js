import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import ReactModal from 'react-modal';
import axios from 'axios';
import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const Pronostico = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [fechainicial, setfechainicial] = useState([]);
    const [fechafinal, setfechafinal] = useState([]);
    const [descendenciavientre, setdescendenciavientre] = useState([]);
    const [lotes, setLotes] = useState([]);
    const [loteback, setLoteback] = useState([]);
    const [lotesSe, setLotesSe] = useState([]);
    const [lotesSeback, setLotesSeback] = useState([]);
    const [lotesGe, setLotesGe] = useState([]);
    const [lotesGeback, setLotesGeback] = useState([]);
    const [fecha, setFecha] = useState("");
    const [fechaSe, setFechaSe] = useState("");
    const [fechaGe, setFechaGe] = useState("");
    const [cantidadVientres, setCantidadVientres] = useState("");
    const [cantidadSe, setCantidadSe] = useState("");
    const [cantidadGe, setCantidadGe] = useState("");
    const [message, setMessage] = useState('');
    const [showModificarModal, setShowModificarModal] = useState(false);
    const [showEjecutarModal, setShowEjecutarModal] = useState(false);
    
    const agregarLote = () => {
      if (fecha && cantidadVientres) {
        const nuevoLote = {
          fecha,
          cantidadVientres
        };
        const nuevoLoteback = [
            fecha, 
            parseInt(cantidadVientres)
        ];
        setLotes([...lotes, nuevoLote]);
        setLoteback([...loteback, nuevoLoteback]);
        setFecha("");
        setCantidadVientres("");
      }
    };
    const agregarLoteSe = () => {
        if (fechaSe && cantidadSe) {
          const nuevoLote = {
            fechaSe,
            cantidadSe
          };
          const nuevoLotebackSe = [
            fechaSe,
            parseInt(cantidadSe)
          ];
          setLotesSe([...lotesSe, nuevoLote]);
          setLotesSeback([...lotesSeback,nuevoLotebackSe]);
          setFechaSe("");
          setCantidadSe("");
        }
    };
    const agregarLoteGe = () => {
        if (fechaGe && cantidadGe) {
          const nuevoLote = {
            fechaGe,
            cantidadGe
          };
          const nuevoLotebackGe = [
            fechaGe,
            parseInt(cantidadGe)
          ];
          setLotesGe([...lotesGe, nuevoLote]);
          setLotesGeback([...lotesGeback, nuevoLotebackGe]);
          setFechaGe("");
          setCantidadGe("");
        }
    };
  
    const eliminarUltimoLote = () => {
      if (lotes.length > 0) {
        const nuevosLotes = [...lotes];
        nuevosLotes.pop();
        setLotes(nuevosLotes);
      }
    };
    const eliminarUltimoLoteSe = () => {
        if (lotesSe.length > 0) {
            const nuevosLotes = [...lotesSe];
            nuevosLotes.pop();
            setLotesSe(nuevosLotes);
        }
    };
    const eliminarUltimoLoteGe = () => {
        if (lotesGe.length > 0) {
            const nuevosLotes = [...lotesGe];
            nuevosLotes.pop();
            setLotesGe(nuevosLotes);
        }
    };

    const guardardatosjson = () => {
        const jsondata = {
        
            fecha_inicial: fechainicial,
            fecha_final: fechafinal,
            n_lechones: parseInt(descendenciavientre),
            lotes:{
                    //ingresocuarentenavientres: fecha,
                    //cantidadvientres: cantidadVientres,
                vientre: loteback,
                    //ingresosecuarentenacia: fechaSe,
                    //cantidadse: cantidadSe,
                sementalCIA: lotesSeback,
                    //ingresogecuarentenagestionsementales: fechaGe,
                    //cantidadge: cantidadGe,
                sementalG: lotesGeback
                }
                    
            
        }
        console.log(jsondata);

        //console.log(fechainicial,fechafinal,descendenciavientre);
        fetch('http://localhost:5000/api/pronostico/python/config.json', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsondata),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error al obtener los datos:', error));
   
        };
    
        const runcalculadora = async () => {
            /*const requestBody = {
                script_name: 'modo_calculadora.py',  // Cambiar al nombre de tu script
                environment_name: 'protv1'  // Cambiar al nombre de tu entorno conda
              };
          
              try {
                const response = await fetch('http://localhost:5000/run-calculadora', {
                  mode: 'cors',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(requestBody)
                });
          
                const data = await response.json();
                setOutput(data.output);
                setError(data.error);
              } catch (error) {
                console.error('Error al ejecutar el script:', error);
              }
            */
              const requestBody = {
                // Cambiar al nombre de tu script y entorno
                script_name: 'modo_calculadora.py',
                environment_name: 'protv1'
              };
  try {
    const response = await axios.post('http://localhost:5000/api/pronostico/python/run-calculadora', requestBody);

    // Aquí puedes manejar la respuesta como desees
    console.log('Mensaje del servidor:', response.data.message);
    console.log('Salida del script:', response.data.output);
    console.log('Error del script:', response.data.error);
  } catch (error) {
    console.error('Error al ejecutar el script:', error);
  }
          };
          const openModificarModal = () => {
            setShowModificarModal(true);
          };
          
          const closeModificarModal = () => {
            setShowModificarModal(false);
          };
          
          const openEjecutarModal = () => {
            setShowEjecutarModal(true);
          };
          
          const closeEjecutarModal = () => {
            setShowEjecutarModal(false);
          };

    return(
    <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
        <StaticMeta
                title={title}
                description={description}
                image={image}
        />     
        <Navigation />
        <div className="wrapper pronostico mt-10">
            <div>
                <h1 className="modal-header">Herramienta de pronóstico</h1>
            </div>
            <div className="flex justify-between mt-5">
                <div className="pronostico-container">
                    <label>Fecha inicial</label>
                    <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                        <input type="date"  value={fechainicial} onChange={(e) => setfechainicial(e.target.value)}/>
                    </div>
                </div>
                <div className="pronostico-container">
                    <label>Fecha final</label>
                    <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                        <input type="date" value={fechafinal} onChange={(e) => setfechafinal(e.target.value)}/>
                    </div>
                </div>
                <div className="pronostico-container">
                    <label>Descendencia por vientre</label>
                    <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                        <input type="number" value={descendenciavientre} onChange={(e) => setdescendenciavientre(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div>
                    <h2>Lotes de vientres</h2>
                </div>
                <div className="flex justify-between">
                    <div className="w-1/2 mt-5">
                        <div>
                            <label>Ingreso a cuarentena</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Vientres en lotes</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                <input type="number" value={cantidadVientres} onChange={(e) => setCantidadVientres(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <button className="pronostico-btn" onClick={agregarLote}>Agregar lote</button>
                            <button className="pronostico-btn" onClick={eliminarUltimoLote}>Eliminar último lote</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        {lotes.length === 0 ? (
                            <h2>No hay lotes para mostrar</h2>
                        ) : (
                        <div className={isDarkMode ? "table-d" : "table"}>
                            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                                <thead>
                                    <tr>
                                    <th>Ingreso</th>
                                    <th>Vientres</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lotes.map((lote, index) => (
                                    <tr key={index} className="table-row">
                                        <td>{lote.fecha}</td>
                                        <td>{lote.cantidadVientres}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        )}
                    </div>
                </div> 
            </div>   
            <div className="mt-5">
                <div>
                    <h2>Lotes de sementales CDI</h2>
                </div>
                <div className="flex justify-between mt-5">
                    <div className="w-1/2">
                        <div>
                            <label>Ingreso a cuarentena</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                <input type="date" value={fechaSe} onChange={(e) => setFechaSe(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Sementales en lotes</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                <input type="number" value={cantidadSe} onChange={(e) => setCantidadSe(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <button className="pronostico-btn" onClick={agregarLoteSe}>Agregar lote</button>
                            <button className="pronostico-btn" onClick={eliminarUltimoLoteSe}>Eliminar último lote</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        {lotesSe.length === 0 ? (
                            <h2>No hay lotes para mostrar</h2>
                        ) : (
                        <div className={isDarkMode ? "table-d" : "table"}>
                            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                                <thead>
                                    <tr>
                                    <th>Ingreso</th>
                                    <th>Sementales</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lotesSe.map((lote, index) => (
                                    <tr key={index} className="table-row">
                                        <td>{lote.fechaSe}</td>
                                        <td>{lote.cantidadSe}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        )}
                    </div>
                </div> 
            </div>   
            <div className="mt-5">
                <div>
                    <h2>Lotes de sementales Celadores</h2>
                </div>
                <div className="flex justify-between mt-5">
                    <div className="w-1/2">
                        <div>
                            <label>Ingreso a cuarentena</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                <input type="date" value={fechaGe} onChange={(e) => setFechaGe(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Sementales en lotes</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                <input type="number" value={cantidadGe} onChange={(e) => setCantidadGe(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <button className="pronostico-btn" onClick={agregarLoteGe}>Agregar lote</button>
                            <button className="pronostico-btn" onClick={eliminarUltimoLoteGe}>Eliminar último lote</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        {lotesGe.length === 0 ? (
                            <h2>No hay lotes para mostrar</h2>
                            ) : (
                            <div className={isDarkMode ? "table-d" : "table"}>
                                <table className={isDarkMode ? "table-container-d" : "table-container"}>
                                    <thead>
                                        <tr>
                                        <th>Ingreso</th>
                                        <th>Sementales</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lotesGe.map((lote, index) => (
                                        <tr key={index} className="table-row">
                                            <td>{lote.fechaGe}</td>
                                            <td>{lote.cantidadGe}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div> 
            </div>   
            <div>
                <button className="button mt-5" onClick={() => { guardardatosjson(); openModificarModal();}}>Modificar</button>
                <button className="button mt-5" onClick={() => { runcalculadora(); openEjecutarModal();}}>Ejecutar</button>
            </div> 
        </div>
        <ReactModal className="fixed flex justify-center ml-80 mt-80 top-4/8 left-4/8 right-4/8 bottom-4/8 bg-white border rounded-lg shadow-md p-4" isOpen={showModificarModal} onRequestClose={closeModificarModal} contentLabel="Modificar Modal">
  <div>
    <h2 className="flex items-center justify-center m-5">JSON Modificado</h2>
    {/* Agrega aquí el contenido que deseas mostrar en el modal de Modificar */}
    <img className="flex items-center justify-center w-24 h-24 ml-10" src='../images/icon/logo-400.png'></img>
    <button className="flex items-center justify-center button ml-14 mt-5" onClick={closeModificarModal}>Cerrar</button>
  </div>
</ReactModal>

<ReactModal className="fixed flex justify-center ml-80 mt-80 top-4/8 left-4/8 right-4/8 bottom-4/8 bg-white border rounded-lg shadow-md p-4" isOpen={showEjecutarModal}  onRequestClose={closeEjecutarModal}  contentLabel="Ejecutar Modal">
  <div>
    <h2 className="flex items-center justify-center m-5">Si desea visualizar</h2>
    <h2 className="m-5">los datos regresar a Home</h2>
    {/* Agrega aquí el contenido que deseas mostrar en el modal de Ejecutar */}
    <img className="flex items-center justify-center w-24 h-24 ml-14" src='../images/icon/logo-400.png'></img>
    <button className="flex items-center justify-center button ml-16 mt-5" onClick={closeEjecutarModal}>Cerrar</button>
  </div>
</ReactModal>

    </div>
    )
}
export default Pronostico;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Herramienta de pronóstico";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };