import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableGraph from '@/components/molecules/TableGraph';
import TableAlimentos from '@/components/molecules/TableAlimentos';
import MenuTable from '@/components/atoms/MenuTable';
import svg from '@/public/images/svg/graph.svg';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
const axios = require('axios');

const Graphicator = ({ title, description, image }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [username, setUsername] = useState();
  const [tokenVerified, setTokenVerified] = useState(false);
  const [dataGraph, setDataGraph] = useState([
    {
      _id: '651c2f33be9c9264651f04f9',
      fecha: '2023-09-29T19:56:57.031Z',
      nombreAlimento: 'Maíz amarillo',
      tipo: 0,
      proteina: 7.5,
      precio: 7.5,
      precioVariable: 8.25,
    },
    {
      _id: '651c2f33be9c9264651f04fa',
      fecha: '2023-09-29T19:56:57.031Z',
      nombreAlimento: 'Sorgo',
      tipo: 0,
      proteina: 8,
      precio: 6,
      precioVariable: 6.6,
    },
    {
      _id: '651c2f33be9c9264651f04fb',
      fecha: '2023-09-29T19:56:57.031Z',
      nombreAlimento: 'Trigo',
      tipo: 0,
      proteina: 9,
      precio: 19.5,
      precioVariable: 21.45,
    },
    {
      _id: '651d7d5478524b5ca0cd6892',
      fecha: '2023-10-04T14:57:24.628Z',
      nombreAlimento: 'Maíz blanco',
      tipo: 0,
      proteina: 8.5,
      precio: 10,
      precioVariable: 11,
    },
  ]);
  const [dataProveedor, seDataProveedor] = useState([
    {
      nombreProveedor: 'Nombre del Proveedor',
      Contacto: {
        nombrePersona: 'Nombre de la Persona de Contacto',
        correo: 'correo@ejemplo.com',
        numeroTelefono: '+1234567890',
      },
      direccion: {
        calle: 'Calle Principal',
        numero: '123',
        colonia: 'Colonia Ejemplo',
        municipio: 'Municipio Ejemplo',
        estado: 'Estado Ejemplo',
        codigoPostal: '12345',
      },
      productos: [
        {
          nombre: 'PIC Camborough',
          precio: 50000.0,
        },
        {
          nombre: 'PIC 337',
          precio: 60000.0,
        },
        {
          nombre: 'PIC 800',
          precio: 40000.0,
        },
        {
          nombre: 'PIC 410',
          precio: 40000.0,
        },
      ],
    },
    {
      nombreProveedor: 'Nombre del Proveedor 2',
      Contacto: {
        nombrePersona: 'Nombre de la Persona de Contacto',
        correo: 'correo@ejemplo.com',
        numeroTelefono: '+1234567890',
      },
      direccion: {
        calle: 'Calle Principal',
        numero: '123',
        colonia: 'Colonia Ejemplo',
        municipio: 'Municipio Ejemplo',
        estado: 'Estado Ejemplo',
        codigoPostal: '12345',
      },
      productos: [
        {
          nombre: 'PIC Camborough',
          precio: 50000.0,
        },
        {
          nombre: 'PIC 337',
          precio: 60000.0,
        },
        {
          nombre: 'PIC 800',
          precio: 40000.0,
        },
        {
          nombre: 'PIC 410',
          precio: 40000.0,
        },
      ],
    },
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/Login');
          return;
        }
        const decodedToken = jwt.decode(token);
        let usuario = decodedToken.usuario;
        setUsername(usuario);
        setTokenVerified(true);
      } catch (error) {
        console.error('Error al verificar el token:', error);
        setTokenVerified(true);
      }
    };
    checkToken();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://192.168.100.10:3080/getAllSolicitudAlimento'
        );
        const jsonData = response.data;
        setData([jsonData]);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    if (tokenVerified) {
      fetchData();
    }
  }, [tokenVerified, setUsername]);

  useEffect(() => {
    const tipoDeLicitacion = 'Alimento';
    axios
      .get('http://192.168.100.10:3086/getAllSolicitudCompra', {
        params: {
          tipoDeLicitacion: tipoDeLicitacion,
        },
      })
      .then((response) => {
        const jsonData = response.data;
        setDataList(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!tokenVerified) {
    return null;
  }

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Solicitud de alimento" id={"menu-bg"} svg={svg} />
      </div>
      <div className="wrapper">
        <div className="mt-10"></div>
        <div className="mt-10">
          <h2 className="text-xl mt-5 mb-5">Solicitud de alimento</h2>
          <TableGraph
            dataList={dataList}
            setDataList={setDataList}
            data={dataGraph}
            setData={setDataGraph}
            dataOrder={dataOrder}
            setDataOrder={setDataOrder}
          />
        </div>
        <div className="mt-10">
          <h2 className="text-xl mt-5 mb-5">Solicitudes existentes</h2>
          <MenuTable data={dataList} setData={setDataList} />
        </div>
      </div>
    </div>
  );
};
export default Graphicator;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Menú';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
