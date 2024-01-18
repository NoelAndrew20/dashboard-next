import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableInventario from '@/components/molecules/TableInventario';
import svg from '@/public/images/icon/servicios-index.png';
import BarKPI from '@/components/atoms/BarKPI';
import TableVacunas from '@/components/atoms/TableVacunas';
import PieVacunas from '@/components/atoms/PieVacunas';

const axios = require('axios');

const Vacunas = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([
    { tipo: 'EPL', vacunas: { F1: 260, L: 11846 } },
    { tipo: 'DEC', vacunas: { F1: 130, V: 104 } },
    { tipo: 'RA', vacunas: { F1: 130, V: 104 } },
    { tipo: 'ER', vacunas: { V: 200 } },
  ]);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Total de vacunas" svg={svg} />
      </div>
      <div className="wrapper">
      <h2 className="text-xl mt-5 mb-5">Registro de vacunas</h2>

      <div className="position justify-around">
          <div className="half-graph bg-white rounded-lg p-2">
            <h2 className="mt-2 text-center font-bold">
              Total de vacunas por tipo
            </h2>
            <PieVacunas dataArray={data} setData={setData} />
          </div>
          <div className='w-1/2'>
            <TableVacunas data={data} setData={setData} />
          </div>
          </div>
      </div>
    </div>
  );
};
export default Vacunas;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de Inseminaciones';
  const image = '/images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
