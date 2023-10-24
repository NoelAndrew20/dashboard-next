import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableMaterias from '@/components/molecules/TableMaterias';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import TableLicitacion from '@/components/molecules/TableLicitacion';
const axios = require('axios');

const Licitacion = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState([
        {
            solicitud: [
              {nombredealimento: "Maiz amarillo",
              cantidad: 10
            },
            {nombredealimento: "kdkjs",
              cantidad: 53
            },
        ],
            fecha: "2023-10-18",
            precio: 15.99,
            metododeentrega: "CIF",
            lugar: "Ciudad Ejemplo",
            periododesuministro: "2023-10-26",
            caracteristicastecnicas: "Alto contenido de carotenoides, zeaxantina y luteína. Rica fuente de vitamina A, importante para la salud visual."
          }
    ]);

    useEffect(() => {
      axios.get('http://localhost:3082/getAllSolicitudCompraAlimento')
        .then(response => {
          const jsonData = response.data; // Datos de respuesta en formato JSON
          setData(jsonData);
          
          // Recorre los objetos en la respuesta y sus lotes para imprimir los nombres de alimentos
          jsonData.forEach(solicitud => {
            solicitud.lotes.forEach(lote => {
              console.log(lote.nombreAlimento);
            });
          });
        }
        )
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
            <div>
                <Navigation/>
                <NavDashboard section="Licitación"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Materias primas existentes</h2>
                {/*<Search data={data} setData={setData} word={"item"}/>*/}
                <div className="mt-10">
                    <TableLicitacion data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Licitacion;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Licitacion";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };