import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import foto from '@/public/images/imagenes/user.png';
import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import ProfileCard2 from '@/components/atoms/ProfileCard2';
import { useRouter } from 'next/router';
import TablePProducts from '@/components/molecules/TablePProducts';
import TableLicitacion from '@/components/molecules/TableLicitacion';
import jwt from 'jsonwebtoken';
const axios = require('axios');

const LicitacionPro = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [dataLic, setDataLic] = useState([]);
  const [data, setData] = useState([]);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let email = '';
  let usuario = '';
  let primerosDosCaracteres;
  if (token) {
    const decodedToken = jwt.decode(token);
    email = decodedToken.email;
    usuario = decodedToken.usuario;
    primerosDosCaracteres = usuario.substring(0, 2);
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

  useEffect(() => {
    let tipoDeLicitacion;

    if (primerosDosCaracteres === 'Al') {
      tipoDeLicitacion = 'Alimento';
    } else if (primerosDosCaracteres === 'Vi') {
      tipoDeLicitacion = 'Vientres';
    } else {
      console.error('Usuario no reconocido');
      return;
    }
    const apiUrl = `http://192.168.100.10:3086/getAllSolicitudCompra`;
    axios
      .get(apiUrl, {
        params: {
          tipoDeLicitacion: tipoDeLicitacion,
        },
      })
      .then((response) => {
        const jsonData = response.data;
        setDataLic(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [primerosDosCaracteres]);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation />
      <div
        className="profile-nav w-full"
        style={{ justifyContent: 'center !important' }}
      >
        <h1>Perfil de Proveedor</h1>
      </div>
      <div className="wrapper">
        <div
          className="back-link mt-2 text-blue-500 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <span className="back-arrow">&#8592;</span> volver
        </div>
        <div className="mt-5">
          <ProfileCard2 data={data} />
        </div>
        <div className="w-full flex justify-center mt-5">
          <TableLicitacion data={dataLic} />
        </div>
        <div className="mt-5">{/*<TablePProducts/>*/}</div>
      </div>
    </div>
  );
};
export default LicitacionPro;

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
