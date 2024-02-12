import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import foto from '@/public/images/imagenes/user.png';
import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import ProfileCard2 from '@/components/atoms/ProfileCard2';
import { useRouter } from 'next/router';
import TablePProducts from '@/components/molecules/TablePProducts';
import ProductCarrousell from '@/components/atoms/ProductCarrousell';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
const axios = require('axios');

const Productos = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [futureData, setFutureData] = useState([
    { SKU: '1', unidad: '2', nombre: 'hola', precio: '4' },
    { SKU: '3', unidad: '4', nombre: 'hola', precio: '6' },
    { SKU: '3', unidad: '44', nombre: 'hola5', precio: '6' },
    { SKU: '33', unidad: '43', nombre: 'hola89', precio: '6' },
  ]);
  const [licData, setLicData] = useState([
    {
      fecha: '24-12-2024',
      numeroSolicitud: '1',
      solicitud: { nombre: 'hola' },
    },
    {
      fecha: '24-12-2024',
      numeroSolicitud: '1',
      solicitud: { nombre: 'hola' },
    },
    {
      fecha: '24-12-2024',
      numeroSolicitud: '1',
      solicitud: { nombre: 'hola' },
    },
    {
      fecha: '24-12-2024',
      numeroSolicitud: '1',
      solicitud: { nombre: 'hola' },
    },
    {
      fecha: '24-12-2024',
      numeroSolicitud: '1',
      solicitud: { nombre: 'hola' },
    },
  ]);

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
        setLicData(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [primerosDosCaracteres]);

  useEffect(() => {
    axios
      .get('http://192.168.100.10:3070/catalogoProductos')
      .then((response) => {
        const jsonData = response.data;
        setFutureData(jsonData);
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
        className="prov-nav w-full"
        style={{ justifyContent: 'center !important' }}
      >
        <h1>Perfil de Proveedor</h1>
      </div>
      <div className="wrapper">
        <div
          className="back-link mt-2 text-blue-500 text-lg cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <span className="back-arrow">&#8592;</span> volver
        </div>
        <div className="mt-5">
          <ProfileCard2 data={data} />
        </div>
        <div className="w-full justify-center mt-5">
          <div className="mt-5">
          <h2 className='font-bold text-lg'>Licitaciones:</h2>
            <div class="grid grid-cols-3 flex justify-center">
              {licData.map((item, index) => (
                <div className="flex justify-center"  key={index}>
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container-a2 mt-10'
                    } w-3/4 flex text-center font-bold`}
                    key={index}
                  >
                    <p>{item.solicitud.nombre}</p>
                    <p>{item.fecha}</p>
                    <p>{item.numeroSolicitud}</p>
                    <div>
                      <button>
                      <Link href="../../Proveedor/LicitacionPro">
                        Ver más
                        </Link>

                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h2 className='mt-10 font-bold text-lg'>Productos futuros:</h2>
          <div
            className="mt-5"
            style={{ marginBottom: '10rem', marginTop: '10rem' }}
          >
            <ProductCarrousell futureData={futureData} />
          </div>
          <h2 className='mt-10 mb-10 font-bold text-lg'>Productos existentes:</h2>
          <TablePProducts />
        </div>
      </div>
    </div>
  );
};
export default Productos;

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
