import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import svg from '@/public/images/icon/medicamentos-index.png';
import VATable from '@/components/atoms/VATable';
import BarLN from '@/components/atoms/BarLN';

const axios = require('axios');

const LechonesNacidos = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([
    {
      _id: {
        tipo: 'Semental',
        vacuna: 'P-EPL-V',
      },
      count: 80,
      rfid: ['74F2379177D8', '74519A1AE432'],
    },
    {
      _id: {
        tipo: 'F1',
        vacuna: 'P-AF-F1',
      },
      count: 100,
      rfid: [
        '7251B14BAD5D',
        '7203BC737165',
        '726D0CEABB4A',
        '72BECCA9212E',

        '72E71205EDB3',
        '7246B20FCF1A',
        '723B18365811',
        '72020F4C4A03',
        '728C37C97736',
        '72E9046AA6EA',
        '72F5F489EE78',
        '72AD43A11A7A',
      ],
    },
    {
      _id: {
        tipo: 'Semental',
        vacuna: 'P-DEC-V',
      },
      count: 80,
      rfid: [
        '74F042634709',

        '74DBFEF8811C',
        '7413B7A89748',
        '74487E5449C4',
        '74F260909D1B',
        '742245D20A77',
        '744DCD311ABA',
        '746F370B5CD1',
        '743746EC0AA6',
        '7477475EE266',
        '7421E6DFF9D8',
        '74F2379177D8',
        '74519A1AE432',
      ],
    },
  ]);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Total vacunas por tipo de cerdo" svg={svg} />
      </div>
      <div className="wrapper">
        <h2 className="text-xl mt-5 mb-5">
          Registro de vacunas por tipo de cerdo
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
        <div className="position justify-around">
          <div className="half-graph bg-white rounded-lg p-2">
            <h2 className="mt-2 text-center font-bold">Vacunas</h2>
            <BarLN data={data} />
          </div>
          <div className="w-1/2">
            <VATable data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LechonesNacidos;

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
