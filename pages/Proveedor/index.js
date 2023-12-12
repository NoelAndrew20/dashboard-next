import ProfileCard from '@/components/atoms/ProfileCard';
import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState } from 'react';
import foto from '@/public/images/imagenes/user.png';
import PerfilProveedor from '@/components/molecules/ProfileProveedor';
const Proveedor = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [ data, setData ] = useState([
      {
        picture: foto, 
        nombre: "Usuario", 
        responsabilidad: [{nombre: "Checar vacunas"},{nombre: "limpieza de anaquel"} , {nombre: "Cerrar puertas"}],
        apellidop: "Apellido paterno",
        apellidom: "Apelllido materno",
        granja: "1",
        area: "1",
        password: "$2b$12$lHRldawIB8TIpAVAApS3ae2g.GSJUgCgkunm3hwEdQGTjIDFgwa8.",
        email: "1",
        fechaNacimiento: "0001-01-01",
        genero: "masculino",
        horario: "1",
        fechaContratacion: "0001-01-01",
        departamento: "1",
        stat: "activo",
        contacto: "1",
        salario: "1",
        calle: "1",
        numeroI: "1",
        numeroE: "1",
        ciudad: "1",
        estado: "1",
        cp: "1",
        tarea: "1",
        epp: "1",
        proveedor: 0
      }
    ]);
    return(
      <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
        <StaticMeta
          title={title}
          description={description}
          image={image}
        />     
        <Navigation/>
        <div className="profile-nav w-full flex-col">
          <h1>Perfil de Proveedor</h1>
          <div className="mt-5">
            <ProfileCard data={data}/>
          </div>
        </div>

          <div className="wrapper">
          <div className="mt-10">
            <PerfilProveedor data={data}/>
          </div>
        </div>
      </div>
    )
}
export default Proveedor;

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