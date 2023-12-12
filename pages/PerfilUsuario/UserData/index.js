import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import foto from '@/public/images/imagenes/user.png';
import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import ProfileCard from '@/components/atoms/ProfileCard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
const axios = require('axios');

const UserData = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();

    const [ data, setData ] = useState([]);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let email = "";
  if (token) {
    const decodedToken = jwt.decode(token);
    email = decodedToken.email;
  } 
  else {
    console.error("No se encontró el token en localStorage.");
  }
  
  useEffect(() => {
    axios.get('http://192.168.100.10:3020/getUsuario', {
      params: {
        email: email
      }
    })
    .then(response => {
      const jsonData = response.data; // Datos de respuesta en formato JSON
      console.log(jsonData);
  
      // Asegúrate de que data sea un arreglo
      setData(jsonData);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);



    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <Navigation/>
            <div className="profile-nav w-full" style={{justifyContent: "center !important"}}>
                <h1>Perfil de usuario</h1>
            </div>
            <div className="wrapper">
                <div className="back-link mt-2 text-blue-500 cursor-pointer" onClick={()=> { router.back() }}>
                    <span className="back-arrow">&#8592;</span> volver
                </div>
                <div className="mt-5">
                    <ProfileCard data={data}/>
                </div>
                <div className="w-full flex justify-center">
                <div className="p-4 w-1/2">
                    <label>Nombre:</label>
                    <div className="pb-4">
                        <div  className={isDarkMode ? "profile-input-container-d h-10" : "profile-input-container h-10"}>
                            <input className={isDarkMode ? "modal-input-d h-10 p-1" : "modal-input h-10 p-1"} id="nombre" name="nombre" value={data[0]?.nombre} disabled/>
                        </div>
                    </div>
                    <label>Apellido paterno:</label>
                    <div className="pb-4">
                        <div  className={isDarkMode ? "profile-input-container-d h-10" : "profile-input-container h-10"}>
                            <input className={isDarkMode ? "modal-input-d h-10 p-1" : "modal-input h-10 p-1"} id="apellidop" name="apellidop" value={data[0]?.apellidop} disabled/>
                        </div>
                    </div>
                    <label>Apellido materno:</label>
                    <div className="pb-4">
                        <div  className={isDarkMode ? "profile-input-container-d h-10" : "profile-input-container h-10"}>
                            <input className={isDarkMode ? "modal-input-d h-10 p-1" : "modal-input h-10 p-1"} id="apellidom" name="apellidom" value={data[0]?.apellidom} disabled/>
                        </div>
                    </div>
                    <label>Correo:</label>
                    <div className="pb-4">
                        <div  className={isDarkMode ? "profile-input-container-d h-10" : "profile-input-container h-10"}>
                            <input className={isDarkMode ? "modal-input-d h-10 p-1" : "modal-input h-10 p-1"} id="correo" name="correo" value={data[0]?.email} disabled/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default UserData;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Perfil de usuarios";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
};