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
  
  ]);
  const [current, setFechaInicial] = useState('');
  const [current2, setFechaFinal] = useState('');
  const [lag, setLag] = useState(0);
  
  const handleFechaChange = (e) => {
    setFechaInicial(e.target.value);
  };

  const handleFechaFinalChange = (e) => {
    setFechaFinal(e.target.value);
  };

  const apiUrl = 'http://192.168.100.10:3144/KPI';
  const clicData = () => {
    if (current && current2) {
      const fechaInicialDate = new Date(current);
      const fechaFinalDate = new Date(current2);

      fechaInicialDate.setUTCHours(0, 0, 0, 0);
      const formattedCurrent = `${fechaInicialDate.getUTCDate().toString().padStart(2, '0')}-${(fechaInicialDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${fechaInicialDate.getUTCFullYear()}`;
      const diferenciaEnMilisegundos = fechaFinalDate - fechaInicialDate;
      const lag = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
      setLag(lag);
      const requestData = {
        function: 'ConteoCerdos',
        parameters: {
          current: formattedCurrent,
          lag: lag,
        },
      };

      axios
        .post(apiUrl, requestData)
        .then((response) => {
          const jsonData = response.data;
          setData(jsonData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    clicData();
  }, [current, current2]);


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
                value={current}
                onChange={handleFechaChange}
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
                value={current2}
                onChange={handleFechaFinalChange}
              />
            </div>
          </div>
        </div>
        <div className="position justify-around">
          <div className="half-graph bg-white rounded-lg p-2">
            <GraphInventario data={data} setData={setData} />
          </div>
          <div className='w-1/2'>
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
