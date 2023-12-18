import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import ReactModal from 'react-modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';



const Simulador = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [fechainicial, setfechainicial] = useState([]);
    const [fechafinal, setfechafinal] = useState([]);
    const [descendenciavientre, setdescendenciavientre] = useState([]);
    const [lotes, setLotes] = useState([]);
    const [loteback, setLoteback] = useState([]);
    const [RFIDF1, setRFIDF1] = useState("");
    const [TipoF1, setTipoF1] = useState("");
    const [DiasF1, setDiasF1] = useState("");
    const [UbicacionF1, setUbicacionF1] = useState("");
    const [message, setMessage] = useState('');
    const [showModificarModal, setShowModificarModal] = useState(false);
    const [showEjecutarModal, setShowEjecutarModal] = useState(false);
    const tiposDeCerdos = ["F1ANR", "", ""];
    const diasEnArea = parseInt(DiasF1,10);
    
    const agregarLote = () => {
      if (RFIDF1 !=="" && TipoF1 !=="" && DiasF1 !=="" && UbicacionF1 !=="") {
        const nuevoLote = {
            FechaRegistro: new Date().toLocaleString(),
            Estado: "Vivo", // Valor por defecto
            Granja: "LaPurisima", // Valor por defecto
            AlimentoDia1: {}, // Valor por defecto (objeto vacío)
            PadecimientosDia1: {}, // Valor por defecto (objeto vacío)
            MedicamentoDia1: {},
            RFID: RFIDF1,
            Ruta: "F1ANR.yaml",
            Tipo: TipoF1,
            DiasEnArea: diasEnArea,
            Ubicacion: UbicacionF1
        };
        const nuevoLoteback =
          {
          "FechaRegistro": nuevoLote.FechaRegistro,
          "RFID": RFIDF1,
          "Ruta": nuevoLote.Ruta,
          "Tipo": TipoF1,
          "Estado": nuevoLote.Estado,
          "Granja": nuevoLote.Granja,
          "Ubicacion": UbicacionF1,
          "DiasEnArea": diasEnArea,
          "AlimentoDia1": nuevoLote.AlimentoDia1,
          "PadecimientosDia1": nuevoLote.PadecimientosDia1,
          "MedicamentoDia1": nuevoLote.MedicamentoDia1
          }
        ;
        setLotes([...lotes, nuevoLote]);
        setLoteback([...loteback, nuevoLote]);
        setRFIDF1("");
        setTipoF1("");
        setDiasF1("");
        setUbicacionF1("");
      }
    };
  
    const eliminarUltimoLote = () => {
      if (lotes.length > 0) {
        const nuevosLotes = [...lotes];
        nuevosLotes.pop();
        setLotes(nuevosLotes);
      }
    };
    const guardardatosjson = () => {
        const jsondata = loteback;
        fetch('http://localhost:5000/api/pronostico/python/sim.json', {
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
                    <h2>F1</h2>
                </div>
                <div className="flex justify-between">
                    <div className="w-1/2 mt-5">
                        <div>
                                <label>RFID</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                    <input type="text" value={RFIDF1} name="RFIDF1" onChange={(e) => setRFIDF1(e.target.value)} />
                                </div>
                                </div>
                                <label>Tipo</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                    <select value={TipoF1} onChange={(e) => setTipoF1(e.target.value)}>
                                    <option value="">Seleccionar Tipo</option>
                                    {tiposDeCerdos.map((tipo, index) => (
                                        <option key={index} value={tipo}>
                                        {tipo}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                <label>Dias</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                    <input type="number" value={DiasF1} onChange={(e) => setDiasF1(e.target.value)} />
                                </div>
                                <label>Ubicacion</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                    <input type="text" value={UbicacionF1} onChange={(e) => setUbicacionF1(e.target.value)} />
                                </div>
                            <div>
                                <button className="pronostico-btn" onClick={agregarLote}>Agregar Cerdo</button>
                                <button className="pronostico-btn" onClick={eliminarUltimoLote}>Eliminar último Cerdo</button>
                            </div>
                    </div>
                    <div className="w-1/2">
                        {lotes.length === 0 ? (
                            <h2>No hay Cerdos para mostrar</h2>
                        ) : (
                        <div className={isDarkMode ? "table-d" : "table"}>
                            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                                <thead>
                                    <tr>
                                    <th>RFID</th>
                                    <th>Tipo</th>
                                    <th>Dias</th>
                                    <th>Ubicacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lotes.map((lote, index) => (
                                    <tr key={index} className="table-row">
                                        <td>{lote.RFIDF1}</td>
                                        <td>{lote.TipoF1}</td>
                                        <td>{lote.DiasF1}</td>
                                        <td>{lote.UbicacionF1}</td>
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
                <button className="button mt-5 mr-2" onClick={() => { guardardatosjson(); openModificarModal();}}>Modificar</button>
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
export default Simulador;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Simulador";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };