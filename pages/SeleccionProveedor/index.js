import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableSeleccion from '@/components/molecules/TableSeleccion';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import svg from '@/public/images/svg/selection.png';
import TableGandores from '@/components/atoms/TableGanadores';
const axios = require('axios');

const SeleccionProveedor = ({ title, description, image }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState();
  const [data, setData] = useState([]);
  const [winnerData, setWinnerData] = useState([{
    _id: "6570eaa38553fff25b20ea27",
    fechaSolicitud: "2024-02-06T20:24:41.586Z",
    nombreSolicitante: "Proveedor Base",
    numeroSolicitud: 1,
    username: "A612202327",
    tipoProveedor: "Alimento",
    solicitud: [
      {
        cantidad: 90,
        fecha: "2023-12-06T00:00:00.000Z",
        lugar: "",
        metodo: "LAB",
        nombreAlimento: "Trigo",
        pago: "Credito",
        periodo: "2023-12-08T00:00:00.000Z",
        precio: 87,
        estatus: 1,
        _id: "6570eaa38553fff25b20ea28"
      }
    ]
  },
  {
    _id: "6570eaa38553fff25b20ea27",
    fechaSolicitud: "2024-02-06T20:24:41.586Z",
    nombreSolicitante: "Proveedor Base",
    numeroSolicitud: 1,
    username: "A612202327",
    tipoProveedor: "Alimento",
    solicitud: [
      {
        cantidad: 90,
        fecha: "2023-12-06T00:00:00.000Z",
        lugar: "",
        metodo: "LAB",
        nombreAlimento: "Trigo",
        pago: "Credito",
        periodo: "2023-12-08T00:00:00.000Z",
        precio: 87,
        estatus: 1,
        _id: "6570eaa38553fff25b20ea28"
      }
    ]
  }
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
        const response = await axios.get('http://192.168.100.10:3083/getAllSolicitudLicitacion');
        const solicitudes = response.data;
        setData(solicitudes);
        
        const uniqueAlimentos = Array.from(new Set(solicitudes.map(item => item.solicitud[0].nombre)));
        const filteredSolicitudes = uniqueAlimentos.map(alimento => {
          const matchingSolicitudes = solicitudes.filter(item => item.solicitud[0].nombre === alimento);
          const lowestPriceSolicitud = matchingSolicitudes.reduce((min, current) => 
            current.solicitud[0].precio < min.solicitud[0].precio ? current : min,
            matchingSolicitudes[0]
          );
          return lowestPriceSolicitud;
        });

        setWinnerData(filteredSolicitudes);
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
      <StaticMeta title={title} description={description} id={"box-bg"} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Selección de proveedor" svg={svg} />
      </div>
      <div className="wrapper">
        <div className="mt-10">
          <h2 className="text-xl mt-5 mb-5">Proveedores ganadores</h2>
          <TableGandores data={winnerData} setData={setWinnerData} />
        </div>
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
