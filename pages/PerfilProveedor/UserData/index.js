import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import foto from '@/public/images/imagenes/user.png';
import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import ProfileCard2 from '@/components/atoms/ProfileCard2';
import { useRouter } from 'next/router';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
const axios = require('axios');

const UserData = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [newPswd, setNewPswd] = useState(data.password);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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

  const handleNewPswd = (e) => {
    setNewPswd(e.target.value);
  };

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation />
      <div
        className="profile-nav w-full"
        style={{ justifyContent: 'center !important' }}
      >
        <h1>Perfil de Proveedor</h1>
        <div className="mt-5">
          <ProfileCard2 data={data} />
        </div>
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
        <div className="w-full flex justify-center">
          <form className="p-4 w-1/2">
            <label>Usuario:</label>
            <div className="pb-4">
              <div
                className={
                  isDarkMode
                    ? 'profile-input-container-d h-10'
                    : 'profile-input-container h-10'
                }
              >
                <input
                  className={
                    isDarkMode
                      ? 'modal-input-d h-10 p-1'
                      : 'modal-input h-10 p-1'
                  }
                  id="usuario"
                  name="usuario"
                  value={data[0]?.usuario ? data[0]?.usuario : ""}
                  disabled={!editMode} 
                />
              </div>
            </div>
            <label>Nombre:</label>
            <div className="pb-4">
              <div
                className={
                  isDarkMode
                    ? 'profile-input-container-d h-10'
                    : 'profile-input-container h-10'
                }
              >
                <input
                  className={
                    isDarkMode
                      ? 'modal-input-d h-10 p-1'
                      : 'modal-input h-10 p-1'
                  }
                  id="nombre"
                  name="nombre"
                  value={data[0]?.usuario ? data[0]?.usuario : ""}
                  disabled={!editMode} 
                />
              </div>
            </div>
            <label>Correo:</label>
            <div className="pb-4">
              <div
                className={
                  isDarkMode
                    ? 'profile-input-container-d h-10'
                    : 'profile-input-container h-10'
                }
              >
                <input
                  className={
                    isDarkMode
                      ? 'modal-input-d h-10 p-1'
                      : 'modal-input h-10 p-1'
                  }
                  id="correo"
                  name="correo"
                  value={data[0]?.email ? data[0]?.email : ""}
                  disabled={!editMode} 
                />
              </div>
            </div>
            <label>Contraseña:</label>
            <div className="pb-4">
              <div
                className={
                  isDarkMode
                    ? 'profile-input-container-d h-10'
                    : 'profile-input-container h-10'
                }
              >
                <input
                  className={
                    isDarkMode
                      ? 'modal-input-d h-10 p-1'
                      : 'modal-input h-10 p-1'
                  }
                  id="contraseña"
                  name="contraseña"
                  value={data[0]?.contraseña ? data[0]?.contraseña : ""}
                  disabled={!editMode} 
                />
              </div>
            </div>
            <label>Denominación:</label>
            <div className="pb-4">
              <div
                className={
                  isDarkMode
                    ? 'profile-input-container-d h-10'
                    : 'profile-input-container h-10'
                }
              >
                <input
                  className={
                    isDarkMode
                      ? 'modal-input-d h-10 p-1'
                      : 'modal-input h-10 p-1'
                  }
                  id="denominacion"
                  name="denominacion"
                  value={data[0]?.denominacion ? data[0]?.denominacion : ""}
                  disabled={!editMode} 
                />
              </div>
            </div>
            <label>Teléfono:</label>
            <div className="pb-4">
              <div
                className={
                  isDarkMode
                    ? 'profile-input-container-d h-10'
                    : 'profile-input-container h-10'
                }
              >
                <input
                  className={
                    isDarkMode
                      ? 'modal-input-d h-10 p-1'
                      : 'modal-input h-10 p-1'
                  }
                  id="telefono"
                  name="telefono"
                  value={data[0]?.telefono ? data[0]?.telefono : ""}
                  disabled={!editMode} 
                />
              </div>
            </div>
            <label>Celular:</label>
            <div className="pb-4">
              <div
                className={
                  isDarkMode
                    ? 'profile-input-container-d h-10'
                    : 'profile-input-container h-10'
                }
              >
                <input
                  className={
                    isDarkMode
                      ? 'modal-input-d h-10 p-1'
                      : 'modal-input h-10 p-1'
                  }
                  id="celular"
                  name="celular"
                  value={data[0]?.celular ?  data[0]?.celular : ""}
                  disabled={!editMode} 
                />
              </div>
            </div>
            <label>foto:</label>
            <div className="pb-4">
              <div
                className={
                  isDarkMode
                    ? 'profile-input-container-d h-10'
                    : 'profile-input-container h-10'
                }
              >
                <input
                  className={
                    isDarkMode
                      ? 'modal-input-d h-10 p-1'
                      : 'modal-input h-10 p-1'
                  }
                  type="file"
                  id="picture"
                  name="picture"
                  value={data[0]?.picture ? data[0]?.picture : ""}
                />
              </div>
            </div>
            <button type="button" onClick={toggleEditMode} className="button">
              {editMode ? 'Guardar' : 'Editar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserData;

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
