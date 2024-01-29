import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import svg from '@/public/images/icon/medicamentos-index.png';
import LNTable from '@/components/atoms/LNTable';
import LineKPI from '@/components/atoms/LineKPI';
import VATable from '@/components/atoms/VATable';
import VAChart from '@/components/atoms/VAChart';
import { useRouter } from 'next/router';

const axios = require('axios');

const VacunasAplicar = ({ title, description, image }) => {
  const router = useRouter();
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
    {
      _id: {
        tipo: 'Semental',
        vacuna: 'P-RA-V',
      },
      count: 80,
      rfid: [
        '74F042634709',
        '740B674EBFA0',
        '74C57836D716',
        '74A52C0283B3',

        '7402BB4DD0FC',
        '746469CE4441',
        '74BD712E87C9',
        '74687784D114',
        '74B367A914CD',
        '7416F918FDC3',
        '74096517EC43',
        '749B0014B54A',
        '7460049B69B3',

        '747F8A86014B',
        '7419E340C8C1',
        '74D60A569DF7',
        '743746EC0AA6',
        '7421E6DFF9D8',
        '7477475EE266',
        '74519A1AE432',
        '74F2379177D8',
      ],
    },
    {
      _id: {
        tipo: 'F2',
        vacuna: 'P-PP-LD',
      },
      count: 1185,
      rfid: [
        '7314D8DC2971',
        '73ECF7CD4856',
        '73F8AA22F1A3',
        '73498CE520F2',
        '732715A32954',
        '735AB4432A8B',
        '736CC492C18C',
        '73E5C21FE656',
        '7348EFF33629',
        '7389364A9057',

        '731B826B7897',
        '73CFCCED76DD',
        '73346D16236E',
        '73C1FA4BF740',
        '730A5731913E',
        '731E28289482',
        '73FF5519E158',
        '732FC3EBCAC4',
        '73820434EB43',
        '73D2C5389700',
        '73F0D51FA554',
        '7396FFCE9AC5',

        '73707630CFE4',
        '73C75985EC2D',
        '73B565A120AF',
        '73A929A4EABC',
      ],
    },
    {
      _id: {
        tipo: 'F1',
        vacuna: 'P-DEC-F1',
      },
      count: 100,
      rfid: [
        '72AD43A11A7A',
        '725B7F3F30C6',
        '72D9D0FB3424',
        '729E02728A74',
        '72877F97CD29',
        '72F5F489EE78',
        '728C37C97736',
        '721550F5893D',
        '724F8D6D99B3',
        '728A9AE352E7',
        '72EE936E675B',
        '7215A26ED0C9',
        '7225FF772D4E',
        '7238FAACDDC3',
        '720BD8484F9A',
        '721158F7EC7A',
        '72BA16F0BED8',
        '725381708D6C',
        '72E9046AA6EA',
        '727190DA352D',
        '72614C2B8623',
      ],
    },
    {
      _id: {
        tipo: 'Semental',
        vacuna: 'P-AF-V',
      },
      count: 80,
      rfid: [
        '74F042634709',
        '740B674EBFA0',
        '74C57836D716',
        '74A52C0283B3',
        '74E8233144F8',
        '740779C080AD',
        '74C1999EA83D',
        '74D143B9B283',
        '7428F741E5D9',
        '741AA8FC0F6A',
        '74CF0640FE72',
        '740A02214C8E',
        '7400E28B5DB3',
      ],
    },
    {
      _id: {
        tipo: 'F1',
        vacuna: 'P-RA-F1',
      },
      count: 100,
      rfid: [
        '725B7F3F30C6',
        '72D9D0FB3424',
        '729E02728A74',
        '72614C2B8623',
        '72AAC0827D01',
        '72877F97CD29',
        '727190DA352D',
        '721375E2A232',
        '7289C5CAB9C0',
        '7212BE8F37ED',
        '728C4A869786',
        '725381708D6C',
        '721158F7EC7A',
        '72BA16F0BED8',
        '720BD8484F9A',
        '7215A26ED0C9',
        '7238FAACDDC3',
        '728A9AE352E7',
        '7225FF772D4E',
        '721550F5893D',
        '724F8D6D99B3',
        '72EE936E675B',
        '728C37C97736',
        '72E9046AA6EA',
        '72F5F489EE78',
        '72AD43A11A7A',
      ],
    },
    {
      _id: {
        tipo: 'F2',
        vacuna: 'P-AF-LD',
      },
      count: 1202,
      rfid: [
        '739F21E823C4',
        '73D79132D703',
        '7356524D3995',
        '73267BDC6AEC',
        '73498CE520F2',
        '734E13B9D840',
        '73720C5BC9B5',
        '7378AD79037C',
        '73E4D6114C87',
        '73EE8910187C',
        '73E21485C8D7',
        '73DAAA2A3E07',
        '73E9BD23EE89',
        '738580C86C6A',
        '736952F6EB39',
        '73FA1215A90E',
        '738FA96EFF0E',
        '73D638C09CCE',
        '73D22206A78F',
        '73C1597DB14F',
        '7386D6448897',
        '73C35D9C1E28',
        '73697F49FBE2',
        '73FDC2ABA933',
        '73EC0E8C1EFA',
        '73B20CECA89F',
        '73A569583232',

        '730E1812A1F1',
      ],
    },
    {
      _id: {
        tipo: 'F1',
        vacuna: 'P-EPL-F1',
      },
      count: 100,
      rfid: [
        '725B7F3F30C6',
        '72AD43A11A7A',
        '72D9D0FB3424',
        '729E02728A74',
        '72F5F489EE78',
        '72877F97CD29',
        '728C37C97736',
        '721550F5893D',

        '73BDE55B2496',
        '739F21E823C4',
      ],
    },
    {
      _id: {
        tipo: 'F2',
        vacuna: 'P-DEC-LD',
      },
      count: 1244,
      rfid: [
        '732DE46F2359',
        '73FCB194F72A',
        '7356524D3995',
        '73D79132D703',
        '73267BDC6AEC',
        '7350DE577BF3',
        '737F3910ABBF',
        '736076811499',
        '730C43376D38',
        '73FE3149EEB5',
        '73E5C21FE656',
        '7348EFF33629',
        '7389364A9057',
        '739D39263D67',
        '736E87FB712E',
        '73BF19C23BD6',
        '73D94EF0091D',
        '7377F8EF072A',
        '73779CCB452B',
        '739AEAD66BED',
        '73FD242CA925',
        '731CA92791DB',
        '73A2479CFCBD',
        '73B879EF23FF',
        '73B6620AA4B5',
        '73769402512F',
        '73572A0CFF9D',
        '73BBBCE6EC2D',
      ],
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
      const formattedCurrent = `${fechaInicialDate.getUTCDate().toString().padStart(2, '0')}-${(fechaInicialDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${fechaInicialDate.getUTCFullYear()}`;
      const diferenciaEnMilisegundos = fechaFinalDate - fechaInicialDate;
      const lag = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
      setLag(lag);

      const requestData = {
        function: 'ConteoVacunas',
        parameters: {
          current: formattedCurrent,
          lag: lag,
        },
      };

      axios
        .post(apiUrl, requestData)
        .then((response) => {
          const jsonData = response.data;
          console.log(jsonData);
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
      <NavDashboard section="" svg={svg} />
      <div className="wrapper">
        <div
          className="back-link mt-2 text-blue-500 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <span className="back-arrow">&#8592;</span> Volver
        </div>
        <h2 className="text-xl mt-5 mb-5"></h2>
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
            <h2 className="mt-2 text-center font-bold"></h2>
            <VAChart data={data} setData={setData} />
          </div>
          <div className="w-1/2">
            <VATable data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default VacunasAplicar;

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
