import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableSeleccion from '@/components/molecules/TableSeleccion';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import svg from '@/public/images/svg/selection.svg';
const axios = require('axios');

const SeleccionProveedor = ({ title, description, image }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([
    {
      numeroSolicitud: 'lorem',
      nombreAlimento: 'lorem',
      precio: 'lorem',
      metodoDeEntrega: 'lorem',
    },
  ]);
  const [usuario, setUsuario] = useState('');
  const [tokenVerified, setTokenVerified] = useState(false);

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
        const usuario = decodedToken.usuario;
        const nombre = decodedToken.nombre;
        const proveedor = decodedToken.proveedor;

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
          'http://192.168.100.10:3083/getAllSolicitudLicitacion'
        );
        const jsonData = response.data;
        const newData = jsonData.map((item) => ({ ...item, usuario }));
        setData(newData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    if (tokenVerified) {
      fetchData();
    }
  }, [tokenVerified, setUsuario]);

  if (!tokenVerified) {
    return null;
  }

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Selección de proveedor" svg={svg} />
      </div>
      <div className="wrapper">
        <h2 className="text-xl mt-5 mb-5">Proveedores existentes</h2>
        <div className="mt-10">
          <TableSeleccion data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};
export default SeleccionProveedor;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de seleccion proveedor';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
