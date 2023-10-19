import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TablePre from '@/components/molecules/TablePre';

const axios = require('axios');

const PreRegistro = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([
        { fecha: '', solicitud: '', detalles: '', 
            solicitudes: [
                {no: 1, rfid: "" },
                {no: 2, rfid: "" },
                {no: 3, rfid: "" },
                {no: 4, rfid: "" },
            ]
        },
        { fecha: '', solicitud: 'Citlalic', detalles: '', 
            solicitudes: [
                {no: 1, rfid: "" },
                {no: 2, rfid: "" },
                {no: 3, rfid: "" },
                {no: 4, rfid: "" },
            ]
        },
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
                <NavDashboard section="Pre registro"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Pre registros existentes</h2>
                <div className="mt-10">
                    <TablePre data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default PreRegistro;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de pre registro";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };