import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import ReactModal from 'react-modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import LineChart from '@/components/atoms/LineChart';

const Graphicator = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [lotes, setLotes] = useState([]);
    const [dia, setDia] = useState("");
    const [kg, setKg] = useState("");
    const [showGrpah, setShowGrpah] = useState(false);

    
    const agregarLote = () => {
      if (dia && kg) {
        const nuevoLote = {
          dia,
          kg
        };
        setLotes([...lotes, nuevoLote]);
        setDia("");
        setKg("");
      }
    };
    
    const eliminarUltimoLote = () => {
      if (lotes.length > 0) {
        const nuevosLotes = [...lotes];
        nuevosLotes.pop();
        setLotes(nuevosLotes);
      }
    };
    const generateGrpah = () => {
        setShowGrpah(true)
    }
          
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
                <h1 className="modal-header">Herramienta de graficación</h1>
            </div>
            <div className="mt-5">
                <div>
                    <h2>Ingresa los datos</h2>
                </div>
                <div className="flex justify-between">
                    <div className="w-1/2 mt-5">
                        <div>
                            <label>Día número:</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                <input type="number" value={dia} onChange={(e) => setDia(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Cantidad en kg</label>
                            <div className={isDarkMode ? "pronostico-input-d" : "pronostico-input"}>
                                <input type="number" value={kg} onChange={(e) => setKg(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <button className="pronostico-btn" onClick={agregarLote}>Agregar lote</button>
                            <button className="pronostico-btn" onClick={eliminarUltimoLote}>Eliminar último lote</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        {lotes.length === 0 ? (
                            <h2>No hay Datos para mostrar</h2>
                        ) : (
                        <div className={isDarkMode ? "table-d" : "table"}>
                            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                                <thead>
                                    <tr>
                                    <th>Día #</th>
                                    <th>Kg al día</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lotes.map((lote, index) => (
                                    <tr key={index} className="table-row">
                                        <td>{lote.dia}</td>
                                        <td>{lote.kg}</td>
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
                <button className="button mt-5 mr-2" onClick={generateGrpah}>Generar gráfica</button>
            </div>
            {!showGrpah ? (
            ""
            ) : (
            <div className="mt-10 flex justify-center">
                <LineChart dataArray={lotes}  /> 
            </div>
            )
            } 
        </div>
    </div>
    )
}
export default Graphicator;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Herramienta de graficacion";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };