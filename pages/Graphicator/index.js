import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableGraph from '@/components/molecules/TableGraph';
import TableAlimentos from '@/components/molecules/TableAlimentos';
import AlimentosForm from '@/components/atoms/AlimentosForm';
import TableSolicitud from '@/components/molecules/TableSolicitud';

const axios = require('axios');

const Graphicator = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataOrder, setDataOrder] = useState([])
    const [data, setData] = useState([]);
    const [dataGraph, setDataGraph] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        axios.get('http://localhost:3080/getAllSolicitudCompraAlimento')
          .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setData(jsonData);
            
            // Recorre los objetos en la respuesta y sus lotes para imprimir los nombres de alimentos
            jsonData.forEach(solicitud => {
              solicitud.lotes.forEach(lote => {
                console.log(lote.nombreAlimento);
              });
            });
          })
          .catch(error => {
            console.error(error);
          });
      }, []);


    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Graficador"/>
            </div>
            <div className="wrapper">
                <div className="mt-10">
                    <h2 className="text-xl mt-5 mb-5">Solicitudes existentes</h2>
                    <TableAlimentos data={data} setData={setData}/>
                </div>
                <div className="mt-10">
                    <h2 className="text-xl mt-5 mb-5">Entradas existentes</h2>
                    <TableGraph data={dataGraph} setData={setDataGraph} dataOrder={dataOrder} setDataOrder={setDataOrder}/>
                    <div className="mt-10 flex justify-end">
                        <div className={`modal ${isModalOpen ? 'block' : 'hidden'}`}>
                            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={closeModal}></div>
                            <div className={`${isDarkMode ? "modal-content-d" : "modal-content " } bg-white p-4 rounded shadow-md absolute top-[90vh] left-1/2 transform -translate-x-1/2 overflow-y-auto z-50`}>
                                <AlimentosForm 
                                    data={data} 
                                    setData={setData} 
                                    closeModal={closeModal}
                                />
                            </div>
                        </div>                      
                        <button className="button" onClick={openModal}>Agregar compra</button>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-xl mt-5 mb-5">Solicitudes existentes</h2>
                    {/*si llegas a usar una base de datos diferente para la tabla de solicitud
                    solo crea un const [dataSolicitud, setDataSolicitud] = useState([])
                    para manejar la data y cambias data={data} por data={dataSolicitud}
                    en <TableSolicitud/>*/}
                    <TableSolicitud data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Graphicator;

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