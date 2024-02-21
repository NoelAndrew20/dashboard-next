import ProfileCard2 from '@/components/atoms/ProfileCard2';
import StaticMeta from '@/components/atoms/StaticMeta';
import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import foto from '@/public/images/imagenes/user.png';
import ProfileMenu from '@/components/molecules/ProfileMenu';
import jwt from 'jsonwebtoken';
import PerfilProveedor from '@/components/molecules/ProfileProveedor';
const axios = require('axios');
const PerfilUsuario = ({ title, description, image }) => {
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
    axios
      .get('http://192.168.100.10:3020/getUsuario', {
        params: {
          email: email,
        },
      })
      .then((response) => {
        const jsonData = response.data;
        setData(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation />
      <div
        className="profile-nav w-full"
        style={{ justifyContent: 'center !important' }}
      >
        <h1>Perfil de usuario</h1>
      </div>
      <div className="wrapper">
        <div className="mt-5">
          <ProfileCard2 data={data} />
        </div>
        <div className="mt-10">
          <PerfilProveedor data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};
export default PerfilUsuario;

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
