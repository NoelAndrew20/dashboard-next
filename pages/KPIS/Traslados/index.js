import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import svg from '@/public/images/icon/alimentos-cerdo-index.png';
import TableConsumoAlimentos from '@/components/atoms/TableConsumoAlimentos';
import BarConsumo from '@/components/atoms/BarConsumo';
import { useRouter } from 'next/router';
import TableTraslados from '@/components/atoms/TableTraslados';
import BarTraslados from '@/components/atoms/BarTraslados';

const axios = require('axios');

const Traslados = ({ title, description, image }) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [data, setData] = useState([
    {
      lote: '72E19161432B2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7225FF772D4E2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '726D914E554C2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72877F97CD292',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7252121851B82',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7231D590CBFE2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '726BCB5842462',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '722E0D3B086E2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72BA16F0BED82',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72D9D0FB34242',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '727AE640F2A92',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '720A3A5703BF2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '726D0CEABB4A2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '725C0149DDEE2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72ECD22F6FAB2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '721BA8280A3F2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '724285B6A93D2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7203BC7371652',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '729842E11C212',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72A0076B9DDE2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72AAC0827D012',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72A5A1F2E7D82',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '722FF08C83DA2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72F708BA5B962',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7217EE73C1F62',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '722E7D47C63E2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7289C5CAB9C02',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '720F182802C62',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72F5011A490E2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '726AB39B79B52',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '727F628AA0AB2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '727190DA352D2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7245DA202F392',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '721550F5893D2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '728C37C977362',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72409058E46D2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7251B14BAD5D2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '723D1861F7442',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72E9046AA6EA2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '729E02728A742',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '721375E2A2322',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72E7D5E125EE2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '724F8D6D99B32',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72DD91671B892',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7212BE8F37ED2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '728C4A8697862',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '728AFE22D4812',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72E3C3C68E012',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72E6D04AB4C72',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '723B183658112',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72FC76F1C3402',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72D9833CBDE22',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72821BF2835A2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72BECCA9212E2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '723ABE1A7A782',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '728A9AE352E72',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '720BD8484F9A2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72F5F489EE782',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72EE936E675B2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72879E7644BB2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72020F4C4A032',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72FAF2BE6B2A2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72328EDFF90C2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72198F65F76F2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '727A84249D552',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72413A9697D32',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '722E591FAB732',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7246B20FCF1A2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72F10F607AF42',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72E71205EDB32',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72047684D9BC2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '721158F7EC7A2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '729F8AE87BEA2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72D53BE0FC4E2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '721A794CACAF2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '725B73DA97E02',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '725381708D6C2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '720F8C8132102',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7238FAACDDC32',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72786C1997DC2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72CA9E6053C32',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72614C2B86232',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '720D361C169A2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '724AC95A19482',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7215A26ED0C92',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: 'FWILPAA001',
      primerArea: 'Maternidad2',
      ultimaArea: 'Gestacion3',
    },
    {
      lote: '72C1656E0E402',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '728ECF59D7DC2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72B89BC3E4752',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72AD43A11A7A2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72A3ABC8E6762',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '722EA5C2A2AB2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72DFD8FB80022',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7251DD1459312',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7279814611C62',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '725B7F3F30C62',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '728A2583C35E2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '7267A2DC95142',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72E9F4C1966D2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '723F63D800E02',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
    {
      lote: '72DB286B2D0E2',
      primerArea: 'DesarrrolloA',
      ultimaArea: 'DesarrrolloB',
    },
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
      const formattedCurrent = `${fechaInicialDate
        .getUTCDate()
        .toString()
        .padStart(2, '0')}-${(fechaInicialDate.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0')}-${fechaInicialDate.getUTCFullYear()}`;
      const diferenciaEnMilisegundos = fechaFinalDate - fechaInicialDate;
      const lag = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
      setLag(lag);
      const requestData = {
        function: 'Traslados',
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
          console.log(jsonData);
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
      <NavDashboard section="Registro de traslados" svg={svg} />
      <div className="wrapper">
        <div
          className="back-link mt-2 text-blue-500 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <span className="back-arrow">&#8592;</span> Volver
        </div>
        <h2 className="text-xl mt-5 mb-5">Traslados registrados</h2>
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
          <div className="w-1/3 contents">
            <button className="button">Calcular</button>
          </div>
        </div>
        <div className="mt-3">
          <TableTraslados data={data} setData={setData} />
        </div>

        {/*<div className="bg-white rounded-lg p-2 mt-5">
          <h2 className="mt-2 text-center font-bold">
            Cantidad de traslados por RFID
            <BarTraslados data={data} />
          </h2>
            </div>*/}
      </div>
    </div>
  );
};
export default Traslados;

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
