import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableInventario from '@/components/molecules/TableInventario';
import GraphInventario from '@/components/atoms/GraphInventario';
import svg from '@/public/images/icon/pig-index.png';
import { useRouter } from 'next/router';

const axios = require('axios');

const Inventario = ({ title, description, image }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([
    {
      _id: 'CerdoEngordaD',
      count: 11455,
    },
    {
      _id: 'CerdoEngordaA',
      count: 11465,
    },
    {
      _id: 'CerdoEngordaC',
      count: 11498,
    },
    {
      _id: 'CerdoEngordaB',
      count: 11450,
    },
    {
      _id: 'DesarrrolloB',
      count: 11450,
    },
    {
      _id: 'CIA',
      count: 936,
    },
    {
      _id: 'Transporte',
      count: 234,
    },
    {
      _id: 'Maternidad1',
      count: 130,
    },
    {
      _id: 'DesarrrolloA',
      count: 11500,
    },
    {
      _id: 'Gestacion1',
      count: 520,
    },
    {
      _id: 'Cuarentena',
      count: 468,
    },
    {
      _id: 'Lechon',
      count: 11432,
    },
    {
      _id: 'Gestacion2',
      count: 520,
    },
  ]);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation />
      <NavDashboard section="Total de inventario" svg={svg} />
      <div className="wrapper">
        <div
          className="back-link mt-2 text-blue-500 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <span className="back-arrow">&#8592;</span> Volver
        </div>
        <h2 className="text-xl mt-5 mb-5">Inventario de cerdos existente</h2>
        <div className="flex justify-center pb-5">
          <div className="w-1/3">
            <div>
              <label htmlFor="inicial" className="modal-label">
                Fecha inicial:
              </label>
            </div>
            <div
              className={
                isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
              }
            >
              <input
                type="date"
                id="inicial"
                name="inicial"
                className={isDarkMode ? 'modal-input-d' : 'modal-input'}
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
                isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
              }
            >
              <input
                type="date"
                id="final"
                name="final"
                className={isDarkMode ? 'modal-input-d' : 'modal-input'}
              />
            </div>
          </div>
          <div className="w-1/3 contents">
            <button className="button">Calcular</button>
          </div>
        </div>
        <div className="position justify-around">
          <div className="half-graph bg-white rounded-lg p-2">
            <GraphInventario data={data} setData={setData} />
          </div>
          <div>
            <TableInventario data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Inventario;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de Inventario';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
