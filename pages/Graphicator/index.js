import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Table from '@/components/molecules/Table';
import Modal from '@/components/atoms/Modal';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableSolicitud from '@/components/molecules/TableSolicitud';
import SolicitudForm from '@/components/atoms/SolicitudForm';
import TableGraph from '@/components/molecules/TableGraph';

const axios = require('axios');

const SolicitudCompra = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([
        {nombreAlimento: 'Maíz amarillo', algo: '2'},
        {nombreAlimento: 'Sorgo', algo: '2'},
        {nombreAlimento: 'Trigo', algo: '2'},
        {nombreAlimento: 'Otro Alimento', algo: '2'},
    ]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Solicitud de compra"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Entradas existentes</h2>
                <div className="mt-10">
                    <TableGraph data={data} setData={setData}/>
                </div>
                <div className="mt-10 flex justify-end">
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <SolicitudForm 
                        data={data} 
                        setData={setData} 
                        closeModal={closeModal}/>
                    </Modal>
                    <button className="button" onClick={openModal}>Agregar solicitud</button>
            </div>
            </div>
        </div>
    )
}
export default SolicitudCompra;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Graficador";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };