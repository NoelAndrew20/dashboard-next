import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import svg from '@/public/images/icon/alimentos-cerdo-index.png';
import TableConsumoAlimentos from '@/components/atoms/TableConsumoAlimentos';
import BarConsumo from '@/components/atoms/BarConsumo';
import { useRouter } from 'next/router';

const axios = require('axios');

const ConsumoAlimentos = ({ title, description, image }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Enrriquecedor',
      cantidad: 10140,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Intermedio1',
      cantidad: 36140,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Adaptador1',
      cantidad: 8580,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Alimento1',
      cantidad: 1638,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Intermedio2',
      cantidad: 37024,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Adaptador2',
      cantidad: 6864,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Finalizador',
      cantidad: 899147,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Entreno',
      cantidad: 1133686,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Papilla',
      cantidad: 365887,
    },
    {
      fechaInicial: '01-01-2024',
      fechaFinal: '01-02-2024',
      nombreAlimento: 'Preentreno',
      cantidad: 117796,
    },
  ]);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation />
      <NavDashboard section="Pronóstico de consumo de alimentos" svg={svg} />
      <div className="wrapper">
        <div
          className="back-link mt-2 text-blue-500 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <span className="back-arrow">&#8592;</span> Volver
        </div>
        <h2 className="text-xl mt-5 mb-5">Consumo de alimentos</h2>
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
                isDarkMode ? 'modal-input-container-d' : 'modal-input-container'
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
        <div className="mt-3">
          <TableConsumoAlimentos data={data} setData={setData} />
        </div>

        <div className="bg-white rounded-lg p-2">
          <h2 className="mt-2 text-center font-bold">
            Cantidad de inseminaciones de cerdos por zona
          </h2>
          <BarConsumo data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};
export default ConsumoAlimentos;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de Inseminaciones';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
