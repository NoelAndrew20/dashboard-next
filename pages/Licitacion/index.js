import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableMaterias from '@/components/molecules/TableMaterias';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import TableLicitacion from '@/components/molecules/TableLicitacion';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
const axios = require('axios');

const Licitacion = ({ title, description, image }) => {
  const router = useRouter();
    
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  
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
        console.log("Usuario:", usuario);
        console.log("Nombre:", nombre);
        console.log("Proveedor:", proveedor);
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
        const response = await axios.get('http://192.168.100.10:3082/getAllSolicitudCompraAlimento');
        const jsonData = response.data;
        const newData = jsonData.map(item => ({ ...item, username }));
        setData(newData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
    if (tokenVerified) {
      fetchData();
    }
  }, [tokenVerified, setUsername]);  
  

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
                <NavDashboard section="Licitación"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Entradas existentes</h2>
                {/*<Search data={data} setData={setData} word={"item"}/>*/}
                {console.log("datataatata",data)}
                <div className="mt-10">
                    <TableLicitacion data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Licitacion;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Licitacion";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };