import NavDashboard from "@/components/molecules/NavDashboard";
import Navigation from "@/components/molecules/Navigation";
import Table from "@/components/molecules/Table";
import Modal from "@/components/atoms/Modal";
import { useState } from "react";
import TranspForm from "@/components/atoms/TranspForm";
const RegistroTransporte = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState([
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
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
                    <button className="button" onClick={openModal}>Agregar transporte</button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <TranspForm
                        data={data} 
                        setData={setData} 
                        closeModal={closeModal}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default RegistroTransporte;