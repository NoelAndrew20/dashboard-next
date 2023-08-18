import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import { useState } from 'react';
const Pronostico = ({ title, description, image }) => {
    const [lotes, setLotes] = useState([]);
    const [lotesSe, setLotesSe] = useState([]);
    const [lotesGe, setLotesGe] = useState([]);
    const [fecha, setFecha] = useState("");
    const [fechaSe, setFechaSe] = useState("");
    const [fechaGe, setFechaGe] = useState("");
    const [cantidadVientres, setCantidadVientres] = useState("");
    const [cantidadSe, setCantidadSe] = useState("");
    const [cantidadGe, setCantidadGe] = useState("");

    const agregarLote = () => {
      if (fecha && cantidadVientres) {
        const nuevoLote = {
          fecha: fecha,
          cantidadVientres: cantidadVientres
        };
        setLotes([...lotes, nuevoLote]);
        setFecha("");
        setCantidadVientres("");
      }
    };
    const agregarLoteSe = () => {
        if (fechaSe && cantidadSe) {
          const nuevoLote = {
            fechaSe: fechaSe,
            cantidadSe: cantidadSe
          };
          setLotesSe([...lotesSe, nuevoLote]);
          setFechaSe("");
          setCantidadSe("");
        }
    };
    const agregarLoteGe = () => {
        if (fechaGe && cantidadGe) {
          const nuevoLote = {
            fechaGe: fechaGe,
            cantidadGe: cantidadGe
          };
          setLotesGe([...lotesGe, nuevoLote]);
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

    return(
        <>
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
                    <div className="pronostico-input">
                        <input type="date"/>
                    </div>
                </div>
                <div className="pronostico-container">
                    <label>Fecha final</label>
                    <div className="pronostico-input">
                        <input type="date" />
                    </div>
                </div>
                <div className="pronostico-container">
                    <label>Descendencia por vientre</label>
                    <div className="pronostico-input">
                        <input type="text" />
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
                            <div className="pronostico-input">
                                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Vientres en lotes</label>
                            <div className="pronostico-input">
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
                        <div className="table">
                            <table className="table-container">
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
                    <h2>Lotes de sementales CIA</h2>
                </div>
                <div className="flex justify-between mt-5">
                    <div className="w-1/2">
                        <div>
                            <label>Ingreso a cuarentena</label>
                            <div className="pronostico-input">
                                <input type="date" value={fechaSe} onChange={(e) => setFechaSe(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Sementales en lotes</label>
                            <div className="pronostico-input">
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
                        <div className="table">
                            <table className="table-container">
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
                    <h2>Lotes de sementales gestión</h2>
                </div>
                <div className="flex justify-between mt-5">
                    <div className="w-1/2">
                        <div>
                            <label>Ingreso a cuarentena</label>
                            <div className="pronostico-input">
                                <input type="date" value={fechaGe} onChange={(e) => setFechaGe(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Sementales en lotes</label>
                            <div className="pronostico-input">
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
                            <div className="table">
                                <table className="table-container">
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
                <button className="button mt-5">Aplicar cambios</button>
            </div> 
        </div>
    </>
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