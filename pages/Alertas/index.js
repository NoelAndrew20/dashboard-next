import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
//import { useState } from 'react';
import { useState, useEffect } from 'react';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableAlertas from '@/components/molecules/TableAlertas';
import { useDarkMode } from '@/context/DarkModeContext';
const axios = require('axios');

const Alertas = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState([
        { message: "ALERT: pigs detected at backdoor.", fecha: "2023-08-01T10:26:57.037Z", puerta: "1", area: "1", nave: "1", granja: "1" },
        { message: "ALERT: pigs detected at backdoor.", fecha: "2023-08-01T10:26:57.037Z", puerta: "1", area: "1", nave: "1", granja: "1" },
        { message: "ALERT: pigs detected at backdoor.", fecha: "2023-08-01T10:26:57.037Z", puerta: "1", area: "1", nave: "1", granja: "1" },
        { message: "ALERT: pigs detected at backdoor.", fecha: "2023-08-01T10:26:57.037Z", puerta: "1", area: "1", nave: "1", granja: "1" },
        { message: "ALERT: pigs detected at backdoor.", fecha: "2022-07-01T10:26:57.037Z", puerta: "1", area: "1", nave: "1", granja: "1" },
        { message: "ALERT: pigs detected at backdoor.", fecha: "2021-09-01T10:26:57.037Z", puerta: "1", area: "1", nave: "1", granja: "1" },
    ])

    useEffect(() => {
        axios.get('http://192.168.100.20:3050/getAllAlerta')
        //axios.get('http://localhost:3050/getAllAlerta')
        .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setData(jsonData.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Alertas" id="alertas"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Elementos existentes</h2>
                {/*<Search data={data} setData={setData} word={"fecha"}/>*/}
                <div className="mt-10">
                    <TableAlertas data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Alertas;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Alertas";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };