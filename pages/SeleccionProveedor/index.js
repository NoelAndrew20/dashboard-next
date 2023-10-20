import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Table from '@/components/molecules/Table';
import Modal from '@/components/atoms/Modal';
import UserForm from '@/components/atoms/UserForm';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableSeleccion from '@/components/molecules/TableSeleccion';

const axios = require('axios');

const SeleccionProveedor = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([
        {solicitud: 'lorem', nombreAlimento: 'lorem', precio: 'lorem', metodoDeEntrega: 'lorem'},
  ])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:3020/getAllUsuario')
        .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setData(jsonData.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [])
    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Selección de proveedor"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Proveedores existentes</h2>
                <div className="mt-10">
                    <TableSeleccion data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default SeleccionProveedor;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de seleccion proveedor";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };