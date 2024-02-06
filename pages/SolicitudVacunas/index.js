import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import svg from '@/public/images/svg/vaccine.svg';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import TableSV from '@/components/molecules/TableSV';
import MenuVacuna from '@/components/atoms/MenuVacuna';
const axios = require('axios');

const SolicitudVacunas = ({ title, description, image }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [data2, setData2] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [username, setUsername] = useState();
  const [tokenVerified, setTokenVerified] = useState(false);
  const [data, setData] = useState([
    {
      tipo: 0,
      precio: 7.5,
      nomenclatura: 'P-EPL-F1',
      componenteActivo: 8.25,
      tipoDeCerdo: 'F1R',
      dosis: '2ml/ animal IM',
      aguja: '2 pulgadas',
      nombre: 'Ery+parvo+lepto',
    },
    {
      tipo: 0,
      precio: 6.5,
      nomenclatura: 'Otra vacuna',
      componenteActivo: 7.25,
      tipoDeCerdo: 'F2R',
      dosis: '1ml/ animal IM',
      aguja: '1 pulgada',
      nombre: 'Otra vacuna',
    },
    {
      tipo: 1,
      precio: 8.5,
      nomenclatura: 'Vacuna X',
      componenteActivo: 9.25,
      tipoDeCerdo: 'F1R',
      dosis: '2ml/ animal IM',
      aguja: '2 pulgadas',
      nombre: 'Vacuna X',
    },
    {
      tipo: 1,
      precio: 9.5,
      nomenclatura: 'Vacuna Y',
      componenteActivo: 10.25,
      tipoDeCerdo: 'F2R',
      dosis: '1ml/ animal IM',
      aguja: '1 pulgada',
      nombre: 'Vacuna Y',
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
  
  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Solicitud de Vacunas" svg={svg} />
      </div>
      <div className="wrapper">
        <div className="mt-10"></div>
        <div className="mt-10">
          <h2 className="text-xl mt-5 mb-5">Solicitud de Vacunas</h2>
          <TableSV
            data={data}
            setData={setData}
            dataOrder={dataOrder}
            setDataOrder={setDataOrder}
            dataList={dataList}
            setDataList={setDataList}
          />
        </div>
        <div className="mt-10">
          <h2 className="text-xl mt-5 mb-5">Solicitudes existentes</h2>
          {dataList && <MenuVacuna data={dataList} setData={setDataList} />}
        </div>
      </div>
    </div>
  );
};
export default SolicitudVacunas;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Solicitud de vacunas';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
