import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import Modal from '@/components/atoms/Modal';
import CerdosForm from '@/components/atoms/CerdosForm';
import TableCerdos from '@/components/molecules/TableCerdos';
const axios = require('axios');

const RegistroCerdos = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Cerdos"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Cerdos existentes</h2>
                <div className="mt-10">
                    <TableCerdos data={data} setData={setData} />
                </div>
                <div className="mt-10 flex justify-end">
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <CerdosForm 
                        data={data} 
                        setData={setData} 
                        closeModal={closeModal}/>
                    </Modal>
                    <button className="button" onClick={openModal}>Agregar usuario</button>
                </div>
            </div>
        </div>
    )
}
export default RegistroCerdos;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Cerdos";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };