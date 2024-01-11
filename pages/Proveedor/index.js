import ProfileCard2 from '@/components/atoms/ProfileCard2';
import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import foto from '@/public/images/imagenes/user.png';
import PerfilProveedor from '@/components/molecules/ProfileProveedor';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
const axios = require('axios');
const Proveedor = ({ title, description, image }) => {
  const router = useRouter();
  const [tokenVerified, setTokenVerified] = useState(false);
  const [username, setUsername] = useState('');
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([]);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let email = '';
  if (token) {
    const decodedToken = jwt.decode(token);
    email = decodedToken.email;
  } else {
    console.error('No se encontró el token en localStorage.');
  }
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
        const email = decodedToken.email;
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
          'http://192.168.100.10:3020/getUsuario',
          {
            params: {
              email: email,
            },
          }
        );
        const jsonData = response.data;
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    if (tokenVerified) {
      fetchData();
    }
  }, [tokenVerified, setUsername]);

  if (!tokenVerified) {
    return null;
  }

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation />
      <div className="profile-nav w-full flex-col">
        <h1>Perfil de Proveedor</h1>
        <div className="mt-5">
          <ProfileCard2 data={data} />
        </div>
      </div>

      <div className="wrapper">
        <div className="mt-10">
          <PerfilProveedor data={data} />
        </div>
      </div>
    </div>
  );
};
export default Proveedor;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Perfil de usuarios';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
