import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import ProveedorForm from '@/components/molecules/ProveedorForm';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import ComprasForm from '@/components/atoms/ComprasForm';
import svg from '@/public/images/svg/shopping.svg';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const Compras = ({ title, description, image }) => {
  const router = useRouter();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [username, setUsername] = useState('');
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
      /*const fetchData = async () => {
        try {
          const response = await axios.get(
            'http://192.168.100.10:3082/getAllSolicitudCompraAlimento'
          );
          const jsonData = response.data;
          const newData = jsonData.map((item) => ({ ...item, username }));
          setData(newData);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };*/
  
      if (tokenVerified) {
        //fetchData(); la logica va aqui

      }
    }, [tokenVerified, setUsername]);
  
    if (!tokenVerified) {
      return null;
    }
  
  

    return(
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
        <StaticMeta
            title={title}
            description={description}
            image={image}
        />     
        <div>
            <Navigation/>
            <NavDashboard section="Formulario de compras" svg={svg}/>
        </div>
        <div className="wrapper">
          <div className="mt-3">
            <ComprasForm/>
          </div>
        </div>
    </div>
    )
}
export default Compras;

export const getServerSideProps = async () => {
const title = "Constanza";
const description =
  "Dashboard de Compras";
const image = "images/icon/logo-400.png";
return {
  props: {
    title,
    description,
    image,
  },
};
};