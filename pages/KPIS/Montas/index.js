import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableInventario from '@/components/molecules/TableInventario';
import svg from '@/public/images/icon/montas-index.png';
import LineKPI from '@/components/atoms/LineKPI';
import { useRouter } from 'next/router';

const axios = require('axios');

const Montas = ({ title, description, image }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([
    {
      _id: 'CIA',
      count: 936,
    },
    {
      _id: 'Gestacion',
      count: 1500,
    },
  ]);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation />
      <NavDashboard section="Total de montas de cerdos" svg={svg} />
      <div className="wrapper">
        <div
          className="back-link mt-2 text-blue-500 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <span className="back-arrow">&#8592;</span> Volver
        </div>
        <h2 className="text-xl mt-5 mb-5">Registro de montas</h2>
        <div className="position justify-around">
          <div className="half-graph bg-white rounded-lg p-2">
            <h2 className="mt-2 text-center font-bold">
              Cantidad de montas de cerdos por zona
            </h2>
            <div className="flex justify-center pb-5">
              <div className="w-1/3">
                <div>
                  <label htmlFor="inicial" className="modal-label">
                    Fecha inicial:
                  </label>
                </div>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="date"
                    id="inicial"
                    name="inicial"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    value=""
                  />
                </div>
              </div>
              <div className="w-1/3">
                <div>
                  <label htmlFor="sku" className="modal-label">
                    Fecha final:
                  </label>
                </div>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="date"
                    id="final"
                    name="final"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    value=""
                  />
                </div>
              </div>
            </div>
            <LineKPI data={data} setData={setData} />
          </div>
          <div>
            <TableInventario data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Montas;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de Montas';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
