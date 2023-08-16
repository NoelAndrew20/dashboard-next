import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Table from '@/components/molecules/Table';
import Modal from '@/components/atoms/Modal';
import { useState } from 'react';
import TranspForm from '@/components/atoms/TranspForm';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
const RegistroTransporte = ({ title, description, image }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState([
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "hola", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "hola", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},

    ])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Transporte" id="transporte"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Transportes existentes</h2>
                <Search data={data} setData={setData} />
                <div className="mt-10">
                    <Table data={data} setData={setData}/>
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

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Transporte";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };