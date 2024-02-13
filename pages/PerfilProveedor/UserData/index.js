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
      _id: '65c66d83caf732483e7addf6',
      usuario: 'Al92202469',
      nombre: 'Jocd',
      denominacion: 'JOCD',
      password: '12345',
      email: 'ramirez.martinez.josedejesus0@gmail.com',
      proveedor: 1,
      telefono: '2211847999',
      celular: '2211847999',
      picture: '/images/imagenes/user.png',
      responsabilidad: [],
      cambioC: 0,
    },
  ]);
  useEffect(() => {
    console.log(data[0].cambioC);
  });
  const [userAux, setUserAux] = useState(data[0]?.usuario);
  const [nombreAux, setNombreAux] = useState(data[0]?.nombre);
  const [emailAux, setEmailAux] = useState(data[0]?.email);
  const [contraseñaAux, setContraseñaAux] = useState(data[0]?.password);
  const [denominacionAux, setDenominacionAux] = useState(data[0]?.denominacion);
  const [telefonoAux, setTelefono] = useState(data[0]?.telefono);
  const [celularAux, setCelularAux] = useState(data[0]?.celular);
  const [selectedFile, setSelectedFile] = useState(null);
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
        const cambioC = jsonData[0]?.cambioC;
        if (cambioC === 1) {
          setContraseñaAux('La contraseña está oculta.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('usuario', userAux);
    formData.append('nombre', nombreAux);
    formData.append('email', emailAux);
    formData.append('password', contraseñaAux);
    formData.append('denominacion', denominacionAux);
    formData.append('telefono', telefonoAux);
    formData.append('celular', celularAux);
    formData.append('picture', selectedFile);
    const usuarioValue = formData.get('usuario');
    const apiUrl = `http://192.168.100.10:3070/editUsuario/${usuarioValue}`;
    axios
      .put(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Asegúrate de establecer el encabezado Content-Type correctamente
        },
      })
      .then((response) => {
        console.log('Respuesta de la API:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
  };

  const handleButton = () => {
    if (editMode) {
      handleSave();
      setEditMode(!editMode);
    } else {
      toggleEditMode();
    }
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
        <div className="mt-5"></div>
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
                  onChange={(e) => setUserAux(e.target.value)}
                  disabled
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
                  onChange={(e) => setNombreAux(e.target.value)}
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
                  onChange={(e) => setEmailAux(e.target.value)}
                  disabled
                />
              </div>
            </div>
            {data[0]?.cambioC === 0 ||
            data[0]?.cambioC === undefined ||
            data[0]?.cambioC === null ? (
              <>
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
                      onChange={(e) => setContraseñaAux(e.target.value)}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </>
            ) : (
              ''
            )}

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
                  onChange={(e) => setDenominacionAux(e.target.value)}
                  disabled
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
                  onChange={(e) => setTelefono(e.target.value)}
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
                  onChange={(e) => setCelularAux(e.target.value)}
                  disabled={!editMode}
                />
              </div>
            </div>
            <label>Foto:</label>
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
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <button type="button" onClick={handleButton} className="button">
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
