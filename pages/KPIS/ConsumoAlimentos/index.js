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
      _id: {
        area: "Zen2",
        tipoAlimento: "Enrriquecedor"
      },
      count: 2497.257
    },
    {
      _id: {
        area: "Zen4",
        tipoAlimento: "Enrriquecedor"
      },
      count: 2501.642
    },
    {
      _id: {
        area: "Gestacion7",
        tipoAlimento: "Intermedio1"
      },
      count: 28757.243
    },
    {
      _id: {
        area: "CerdoEngordaD",
        tipoAlimento: "Finalizador"
      },
      count: 141474.369
    },
    {
      _id: {
        area: "Maternidad1",
        tipoAlimento: "Enrriquecedor"
      },
      count: 30033.694
    },
    {
      _id: {
        area: "Maternidad6",
        tipoAlimento: "Enrriquecedor"
      },
      count: 10500.99
    },
    {
      _id: {
        area: "CerdoEngordaA",
        tipoAlimento: "Entreno"
      },
      count: 145146.36
    },
    {
      _id: {
        area: "Maternidad4",
        tipoAlimento: "Enrriquecedor"
      },
      count: 10496.995
    },
    {
      _id: {
        area: "Lechon",
        tipoAlimento: "Papilla"
      },
      count: 33835.051
    },
    {
      _id: {
        area: "Cuarentena",
        tipoAlimento: "Adaptador2"
      },
      count: 12021.626
    },
    {
      _id: {
        area: "Gestacion5",
        tipoAlimento: "Intermedio1"
      },
      count: 28788.139
    },
    {
      _id: {
        area: "Cuarentena",
        tipoAlimento: "Adaptador1"
      },
      count: 14995.326
    },
    {
      _id: {
        area: "Transporte",
        tipoAlimento: "Alimento1"
      },
      count: 1257.581
    },
    {
      _id: {
        area: "CIA",
        tipoAlimento: "Intermedio2"
      },
      count: 278738.095
    },
    {
      _id: {
        area: "Gestacion1",
        tipoAlimento: "Intermedio1"
      },
      count: 28833.005
    },
    {
      _id: {
        area: "Zen3",
        tipoAlimento: "Enrriquecedor"
      },
      count: 2491.354
    },
    {
      _id: {
        area: "Maternidad2",
        tipoAlimento: "Enrriquecedor"
      },
      count: 10494.442000000001
    },
    {
      _id: {
        area: "Gestacion3",
        tipoAlimento: "Intermedio1"
      },
      count: 28739.652
    },
    {
      _id: {
        area: "Maternidad7",
        tipoAlimento: "Enrriquecedor"
      },
      count: 10479.648
    },
    {
      _id: {
        area: "Zen6",
        tipoAlimento: "Enrriquecedor"
      },
      count: 2500.018
    },
    {
      _id: {
        area: "Gestacion6",
        tipoAlimento: "Intermedio1"
      },
      count: 28673.379
    },
    {
      _id: {
        area: "Gestacion4",
        tipoAlimento: "Intermedio1"
      },
      count: 28821.434
    },
    {
      _id: {
        area: "DesarrrolloB",
        tipoAlimento: "Entreno"
      },
      count: 38415.366
    },
    {
      _id: {
        area: "Zen5",
        tipoAlimento: "Enrriquecedor"
      },
      count: 2499.139
    },
    {
      _id: {
        area: "Zen1",
        tipoAlimento: "Enrriquecedor"
      },
      count: 1493.673
    },
    {
      _id: {
        area: "CerdoEngordaB",
        tipoAlimento: "Entreno"
      },
      count: 142699.57200000001
    },
    {
      _id: {
        area: "Maternidad5",
        tipoAlimento: "Enrriquecedor"
      },
      count: 10505.526
    },
    {
      _id: {
        area: "Maternidad3",
        tipoAlimento: "Enrriquecedor"
      },
      count: 10490.474
    },
    {
      _id: {
        area: "DesarrrolloA",
        tipoAlimento: "Preentreno"
      },
      count: 14518.852
    },
    {
      _id: {
        area: "CerdoEngordaC",
        tipoAlimento: "Finalizador"
      },
      count: 140440.248
    },
    {
      _id: {
        area: "Gestacion2",
        tipoAlimento: "Intermedio1"
      },
      count: 28756.048
    }
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
        </div>
        <div className="mt-3">
          <TableConsumoAlimentos data={data} setData={setData} />
        </div>

        <div className="bg-white rounded-lg p-2 mt-5">
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
