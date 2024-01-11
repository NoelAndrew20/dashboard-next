import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableRFID from '@/components/molecules/TableRFID';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import svg from '@/public/images/svg/label.svg';
const axios = require('axios');

const RFID = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [total, setTotal] = useState([]);
  const [diferenciaDias, setDiferenciaDias] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://192.168.100.10:3060/getAllRFID')
      .then((response) => {
        const jsonData = response.data;
        setData(jsonData.data);
        const fechaActual = new Date();
        const diferencias = []; // Crear un array para almacenar las diferencias de días
        jsonData.data.forEach((item) => {
          const fechaS = item.fechaNaveEntrada;
          const fecha = new Date(fechaS);
          const año1 = fecha.getFullYear();
          const mes1 = (fecha.getMonth() + 1).toString().padStart(2, '0');
          const dia1 = fecha.getDate().toString().padStart(2, '0');
          const hora1 = fecha.getHours().toString().padStart(2, '0');
          const minutos1 = fecha.getMinutes().toString().padStart(2, '0');
          const segundos1 = fecha.getSeconds().toString().padStart(2, '0');
          const milisegundos1 = fecha
            .getMilliseconds()
            .toString()
            .padStart(3, '0');
          const fechaFormateada = `${año1}-${dia1}-${mes1}T${hora1}:${minutos1}:${segundos1}.${milisegundos1}Z`;
          const fechaF = new Date(fechaFormateada);
          const diferenciaMilisegundos = fechaActual - fechaF;
          const diferenciaDia = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
          diferencias.push(diferenciaDia);
        });
        setDiferenciaDias(diferencias);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://192.168.100.10:3060/countUniqueRFID')
      .then((response) => {
        const jsonData = response.data;
        setTotal(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Dashboard: RFID" svg={svg} />
      </div>
      <div className="wrapper">
        <h2 className="text-xl mt-5 mb-5">Elementos existentes</h2>
        {/*<Search data={data} setData={setData} word={"fecha"} />*/}
        <div className="mt-10">
          <TableRFID
            data={data}
            setData={setData}
            diferenciaDias={diferenciaDias}
          />
        </div>
        <div className="flex justify-end">
          <span>Total de cerdos: {total.totalUniqueRFID}</span>
        </div>
      </div>
    </div>
  );
};
export default RFID;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de RFID';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
