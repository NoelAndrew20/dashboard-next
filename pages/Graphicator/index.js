import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableGraph from '@/components/molecules/TableGraph';
import TableAlimentos from '@/components/molecules/TableAlimentos';
import MenuTable from '@/components/atoms/MenuTable';

const axios = require('axios');

const Graphicator = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataOrder, setDataOrder] = useState([])
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [dataGraph, setDataGraph] = useState([
      {
        _id: "651c2f33be9c9264651f04f9",
        fecha: "2023-09-29T19:56:57.031Z",
        nombreAlimento: "Maíz amarillo",
        tipo: 0,
        proteina: 7.5,
        precio: 7.5,
        precioVariable: 8.25
      },
      {
        _id: "651c2f33be9c9264651f04fa",
        fecha: "2023-09-29T19:56:57.031Z",
        nombreAlimento: "Sorgo",
        tipo: 0,
        proteina: 8,
        precio: 6,
        precioVariable: 6.6
      },
      {
        _id: "651c2f33be9c9264651f04fb",
        fecha: "2023-09-29T19:56:57.031Z",
        nombreAlimento: "Trigo",
        tipo: 0,
        proteina: 9,
        precio: 19.5,
        precioVariable: 21.45
      },
      {
        _id: "651d7d5478524b5ca0cd6892",
        fecha: "2023-10-04T14:57:24.628Z",
        nombreAlimento: "Maíz blanco",
        tipo: 0,
        proteina: 8.5,
        precio: 10,
        precioVariable: 11
      }
    ]);
    const [dataProveedor, seDataProveedor] = useState([
      {
          nombreProveedor: "Nombre del Proveedor",
          Contacto: {
            nombrePersona: "Nombre de la Persona de Contacto",
            correo: "correo@ejemplo.com",
            numeroTelefono: "+1234567890"
          },
          direccion: {
            calle: "Calle Principal",
            numero: "123",
            colonia: "Colonia Ejemplo",
            municipio: "Municipio Ejemplo",
            estado: "Estado Ejemplo",
            codigoPostal: "12345"
          },
          productos: [
            {
              nombre: "PIC Camborough",
              precio: 50000.00
            },
            {
              nombre: "PIC 337",
              precio: 60000.00
            },
            {
              nombre: "PIC 800",
              precio: 40000.00
            },
            {
              nombre: "PIC 410",
              precio: 40000.00
            }
          ]
        },
        {
          nombreProveedor: "Nombre del Proveedor 2",
          Contacto: {
            nombrePersona: "Nombre de la Persona de Contacto",
            correo: "correo@ejemplo.com",
            numeroTelefono: "+1234567890"
          },
          direccion: {
            calle: "Calle Principal",
            numero: "123",
            colonia: "Colonia Ejemplo",
            municipio: "Municipio Ejemplo",
            estado: "Estado Ejemplo",
            codigoPostal: "12345"
          },
          productos: [
            {
              nombre: "PIC Camborough",
              precio: 50000.00
            },
            {
              nombre: "PIC 337",
              precio: 60000.00
            },
            {
              nombre: "PIC 800",
              precio: 40000.00
            },
            {
              nombre: "PIC 410",
              precio: 40000.00
            }
          ]
        }
      ]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

 

      useEffect(() => {
        axios.get('http://localhost:3080/getAllSolicitudAlimento')
        //axios.get('http://192.168.100.10:3080/getAllSolicitudAlimento')
          .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setData([jsonData]);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

      useEffect(() => {
        axios.get('http://localhost:3082/getAllSolicitudCompraAlimento')
        //axios.get('http://192.168.100.10:3082/getAllSolicitudCompraAlimento')
          .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setDataList(jsonData); 
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
                <NavDashboard section="Menú"/>
            </div>
            <div className="wrapper">
                <div className="mt-10">
                    <h2 className="text-xl mt-5 mb-5">Pronóstico de compra de alimentos</h2>
                    <TableAlimentos data={data} setData={setData}/>
    </div>
                <div className="mt-10">
                    <h2 className="text-xl mt-5 mb-5">Crea tu menú</h2>
                    <TableGraph 
                    dataList={dataList} //arreglo con el menú que se crea
                    setDataList={setDataList}
                    data={dataGraph} 
                    setData={setDataGraph} 
                    dataOrder={dataOrder} 
                    setDataOrder={setDataOrder}
                    />
                    {/*
                    <div className="mt-10 flex justify-end">
                        <div className={`modal ${isModalOpen ? 'block' : 'hidden'}`}>
                            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={closeModal}></div>
                            <div className={`${isDarkMode ? "modal-content-d" : "modal-content " } bg-white p-4 rounded shadow-md absolute top-[50vh] left-1/2 transform -translate-x-1/2 overflow-y-auto z-50`}>
                                <SolicitudForm 
                                  data={data} 
                                  dataProveedor={dataProveedor}
                                  setData={setData} 
                                  closeModal={closeModal}
                                />
                            </div>
                        </div>                      
                        <button className="button" onClick={openModal}>Agregar compra</button>
                    </div>
    */}
                </div>
                <div className="mt-10">
                    <h2 className="text-xl mt-5 mb-5">Solicitudes existentes</h2>
                    {/*si llegas a usar una base de datos diferente para la tabla de solicitud
                    solo crea un const [dataSolicitud, setDataSolicitud] = useState([])
                    para manejar la data y cambias data={data} por data={dataSolicitud}
                    en <TableSolicitud/>*/}
                    <MenuTable data={dataList} setData={setDataList}/>
                </div>
            </div>
        </div>
    )
}
export default Graphicator;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Menú";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };