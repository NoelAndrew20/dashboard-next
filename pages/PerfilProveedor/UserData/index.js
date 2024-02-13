import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import foto from '@/public/images/imagenes/user.png';
import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import ProfileCard2 from '@/components/atoms/ProfileCard2';
import { useRouter } from 'next/router';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import { set } from 'mongoose';
const axios = require('axios');

const UserData = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [data, setData] = useState([
    {
      _id: "65c66d83caf732483e7addf6",
      usuario: "Al92202469",
      nombre: "Jocd",
      denominacion: "JOCD",
      password: "12345",
      email: "ramirez.martinez.josedejesus0@gmail.com",
      proveedor: 1,
      telefono: "2211847999",
      celular: "2211847999",
      picture: "/images/imagenes/user.png",
      responsabilidad: []
    }
  ]);
  const [userAux, setUserAux] = useState(
    data[0]?.usuario
  );
  const [nombreAux, setNombreAux] = useState(
    data[0]?.nombre
  );
  const [emailAux, setEmailAux] = useState(
    data[0]?.email
  );
  const [contraseñaAux, setContraseñaAux] = useState(
    data[0]?.contraseña
  );
  const [denominacionAux, setDenominacionAux] = useState(
    data[0]?.denominacion
  );
  const [telefonoAux, setTelefono] = useState(
    data[0]?.telefono
  );
  const [celularAux, setCelularAux] = useState(
    data[0]?.celular
  );
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
 
  const handleUserChange = (e) => {
    setUserAux(e.target.value);
  };
  const handleNombreChange = (e) => {
    setNombreAux(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailAux(e.target.value);
  };
  const handleContraseñaChange = (e) => {
    setContraseñaAux(e.target.value);
  };
  const handleDenoChange = (e) => {
    setDenominacionAux(e.target.value);
  };
  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };
  const handleCelularChange = (e) => {
    setCelularAux(e.target.value);
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
                  value={userAux}
                  onChange={handleUserChange}

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
                  value={nombreAux}
                  onChange={handleNombreChange}

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
                  value={emailAux}
                  onChange={handleEmailChange}

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
                  value={contraseñaAux}
                  onChange={handleContraseñaChange}

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
                  value={denominacionAux}
                  onChange={handleDenoChange}

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
                  value={telefonoAux}
                  onChange={handleTelefonoChange}

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
                  value={celularAux}
                  onChange={handleCelularChange}
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
