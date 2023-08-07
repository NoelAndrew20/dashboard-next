import NavDashboard from "@/components/molecules/NavDashboard";
import Navigation from "@/components/molecules/Navigation";
import Table from "@/components/molecules/Table";
import Modal from "@/components/atoms/Modal";
import { useState } from "react";
const RegistroTransporte = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([
        {usuario: 'lorem', nombre: 'lorem', apellido: 'lorem', puesto:'lorem', grupo: 'lorem'},
        {usuario: 'lorem2', nombre: 'lorem2', apellido: 'lorem2', puesto:'lorem2', grupo: 'lorem2'},
        {usuario: 'lorem3', nombre: 'lorem3', apellido: 'lorem3', puesto:'lorem3', grupo: 'lorem3'},
        {usuario: 'lorem4', nombre: 'lorem4', apellido: 'lorem4', puesto:'lorem4', grupo: 'lorem4'}
    ])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div>
                <Navigation/>
                <NavDashboard section="Transporte" id="transporte"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Transportes existentes</h2>
                <div className="flex justify-between">
                    <div className="flex inner-search">
                        <div className="p-1">
                            <input type="text" placeholder="Buscar"/>
                        </div>
                        <div className="inner-search-icon">
                            <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 15.5L19 19" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <label>Show entries:</label>
                        <select className="entries-container">
                            <option value="volvo">10</option>
                            <option value="saab">Opcion 1</option>
                            <option value="mercedes">Opcion 2</option>
                            <option value="audi">Opcion 3</option>
                        </select>
                    </div>
                </div>
                <div className="mt-10">
                    <Table data={data}/>
                </div>
                <div className="mt-10 flex justify-end">
                    <button className="button" onClick={openModal}>Agregar usuario</button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <div className="flex justify-between modal-header">
                            <div>
                                <h1 className="modal-title">Agregar Datos</h1>
                            </div>
                            <div>
                                <button onClick={closeModal}>Cerrar Modal</button>
                            </div>
                        </div>
                        <form className="form-container pt-10">
                            <div className="modal-cel pt-10">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="fecha" className="modal-label">Fecha:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="date" id="fecha" name="fecha" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="granja" className="modal-label">Granja:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="granja" name="granja" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div >
                                        <label htmlFor="camion" className="modal-label">Camión:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="camion" name="camion" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="jaula" className="modal-label">Jaula:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="jaula" name="jaula" className="modal-input "required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="operador" className="modal-label">Operador:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="operador" name="operador" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="cliente" className="modal-label">Cliente:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="cliente" name="cliente" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="destino" className="modal-label">Destino:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="destino" name="destino" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="hora-salida" className="modal-label">Hora salida de granja:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="time" id="hora-salida" name="hora-salida" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="hora-llegada" className="modal-label">Hora de llegada:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="time" id="hora-llegada" name="hora-llegada" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="tiempo-recorrido" className="modal-label">Tiempo recorrido granja destino:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="tiempo-recorrido" name="tiempo-recorrido" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="hora-inicio-desembarque" className="modal-label">Hora inicio desembarque:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="time" id="hora-inicio-desembarque" name="hora-inicio-desembarque" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="hora-final-desembarque" className="modal-label">Hora final desembarque:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="hora-final-desembarque" name="hora-final-desembarque" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="kg-salida" className="modal-label">KG a salida de granja:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="kg-salida" name="kg-salida" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="kg-desembarque" className="modal-label">KG al desembarque:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="kg-desembarque" name="kg-desembarque" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="merma" className="modal-label">Merma:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="merma" name="merma" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="cantidad-cerdos" className="modal-label">Cantidad de cerdos:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="cantidad-cerdos" name="cantidad-cerdos" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="rango" className="modal-label">Rango programado:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="rango" name="rango" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="muertos" className="modal-label">Muertos en viaje:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="muertos" name="muertos" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="paradas" className="modal-label">Paradas en viaje:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="paradas" name="paradas" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="revision" className="modal-label">Revisión de cerdo:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="revision" name="revision" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="auditor" className="modal-label">Auditor:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="auditor" name="auditor" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="incidencias" className="modal-label">Incidencias de viaje:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="incidencias" name="incidencias" className="modal-input" required/>
                                    </div>
                                </div>
            
                            </div>
                            <div className="flex justify-center">
                                <div>
                                    <button id="ButtonG" className="button primary" onClick="">Guardar</button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default RegistroTransporte;