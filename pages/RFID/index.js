import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
//import { useState } from 'react';
import { useState, useEffect } from 'react';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableRFID from '@/components/molecules/TableRFID';
const axios = require('axios');
const RFID = ({ title, description, image }) => {
    const [data, setData] = useState([
        { fecha: { $date: "2023-08-22T16:03:12.135Z" }, unixTime: 1692741792, sensor: "120398", puerta: "1", nave: "Desarrollo", granja: "granajPrueba", zona: "Maternidad", rfid: "71D1433F", },
        { fecha: { $date: "2023-08-22T16:03:12.135Z" }, unixTime: 1692741792, sensor: "120398", puerta: "1", nave: "Desarrollo", granja: "granajPrueba", zona: "Maternidad", rfid: "71D1433F", },
        { fecha: { $date: "2023-08-22T16:03:12.135Z" }, unixTime: 1692741792, sensor: "120398", puerta: "1", nave: "Desarrollo", granja: "granajPrueba", zona: "Maternidad", rfid: "71D1433F", },
    ])

    useEffect(() => {
        axios.get('http://localhost:3060/getAllRFID')
        .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setData(jsonData.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

    return (
        <div>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="RFID" id="aduana"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Elementos existentes</h2>
                <Search data={data} setData={setData} word={"RFID"} />
                <div className="mt-10">
                    <TableRFID data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default RFID;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de RFID";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };