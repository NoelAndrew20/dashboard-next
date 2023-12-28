import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import svg from '@/public/images/svg/solicitud.svg';
import TableSC from '@/components/molecules/TableSC';
import RazaTable from '@/components/atoms/RazaTable';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const axios = require('axios');

const SolicitudCerdo = ({ title, description, image }) => {
  const router = useRouter();
  const [tokenVerified, setTokenVerified] = useState(false);
  const [usuario, setUsuario] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [dataOrder, setDataOrder] = useState([])
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [dataGraph, setDataGraph] = useState([
    {
        _id: "651c2f33be9c9264651f04fb",
        fecha: "Nombre del Proveedor",
        raza: "Landra",
        precio: 3500,
        precioVariable: 4000,
        pesoMinimo: 100,
        responsable: "Ivan",
        lote: "MX0000001",
        historialMedico: [
          {
            vacuna: "Vacuna 1"
          },
          {
            vacuna: "Vacuna 2"
          },
          {
            vacuna: "Vacuna 3",
          },
          {
            vacuna: "Vacuna 4",
          }
        ]
      },
      {
        _id: "651d7d5478524b5ca0cd6892",
        fecha: "Nombre del Proveedor",
        raza: "puerco",
        precio: 3500,
        precioVariable: 4000,
        pesoMinimo: 100,
        responsable: "Ivan",
        lote: "MX0000001",
        historialMedico: [
          {
            vacuna: "Vacuna 1"
          },
          {
            vacuna: "Vacuna 2"
          },
          {
            vacuna: "Vacuna 3",
          },
          {
            vacuna: "Vacuna 4",
          }
        ]
      },
      {
        _id: "651c2f33be9c9264651f04fa",
        fecha: "Nombre del Proveedor",
        raza: "cerdo",
        precio: 3500,
        precioVariable: 4000,
        pesoMinimo: 100,
        responsable: "Ivan",
        lote: "MX0000001",
        historialMedico: [
          {
            vacuna: "Vacuna 1"
          },
          {
            vacuna: "Vacuna 2"
          },
          {
            vacuna: "Vacuna 3",
          },
          {
            vacuna: "Vacuna 4",
          }
        ]
    }
  ]);

  useEffect(() => {
    axios.get('http://localhost:3086/getAllSolicitudCompra')
      .then(response => {
        const jsonData = response.data; // Datos de respuesta en formato JSON
        setDataList(jsonData); 
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  
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
          //console.log("Usuario:", usuario);
          //console.log("Nombre:", nombre);
          //console.log("Proveedor:", proveedor);
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
          const response = await axios.get('http://localhost:3085/getAllsolicitudCerdo');
          const jsonData = response.data;
          setDataGraph(jsonData);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
    
      if (tokenVerified) {
        fetchData();
      }
    }, [tokenVerified, setUsuario]);  
    
  
  if (!tokenVerified) {
    // Puedes mostrar un indicador de carga aquí si lo deseas
    return null;
  }

  

    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Solicitud de Cerdo" svg={svg}/>
            </div>
            <div className="wrapper">
                <div className="mt-10">
                    <h2 className="text-xl mt-5 mb-5">Solicitud de Cerdo</h2>
                    <TableSC 
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
                    <RazaTable data={dataList} setData={setDataList}/>
                </div>
            </div>
        </div>
    )
}
export default SolicitudCerdo;

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