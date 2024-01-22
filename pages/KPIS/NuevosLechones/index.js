import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import svg from '@/public/images/icon/servicios-index.png';
import TableNL from '@/components/atoms/TableNL';
import BubbleGraph from '@/components/atoms/NLChart';

const axios = require('axios');

const NuevosLechones = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([
    {
      _id: '729A5230FF981',
      count: 13,
    },
    {
      _id: '7255324299901',
      count: 12,
    },
    {
      _id: '7295B4AB634E1',
      count: 12,
    },
    {
      _id: '72413AD230A81',
      count: 12,
    },
    {
      _id: '72CCA0E63F2D1',
      count: 14,
    },
  ]);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Nuevos lechones" svg={svg} />
      </div>
      <div className="wrapper">
        <h2 className="text-xl mt-5 mb-5">Registro de nuevos lechones</h2>

        <div className="position justify-around">
          <div className="half-graph bg-white rounded-lg p-2">
            <h2 className="mt-2 text-center font-bold">
              Total de nuevos lechones registrados
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
            <BubbleGraph dataArr={data} setData={setData} />
          </div>
          <div className="w-1/2">
            <TableNL data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NuevosLechones;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de Nuevos Lechones';
  const image = '/images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
