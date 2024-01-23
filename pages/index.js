import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import Notification from '@/components/molecules/AlertaNotificacion';
import ChatBtn from '@/components/atoms/ChatBtn';
import Link from 'next/link';
const axios = require('axios');
const welcomeMessages = ['¡Bienvenid@!', '¡Hola!', '¡Buen dia!'];

export default function Home({ title, description, image }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [name, setName] = useState('');
  const usuariocookie = Cookies.get('userData');
  const userinfo = usuariocookie ? JSON.parse(usuariocookie) : null;
  const [notificationData, setNotificationData] = useState(null);
  const [audio] = useState(new Audio('./audio/pig-oink.wav'));
  const [data, setData] = useState([
    {
      AlimentosDesglozados: {
        Intermedio1: {
          Kg: 200629,
          Inversion: 3009435.07,
        },
        Enrriquecedor: {
          Kg: 103029.9,
          Inversion: 1545448.56,
        },
        Intermedio2: {
          Kg: 201469.55,
          Inversion: 3022043.29,
        },
        Finalizador: {
          Kg: 1621462.55,
          Inversion: 24321938.2,
        },
        Entreno: {
          Kg: 1001900,
          Inversion: 15028500.05,
        },
      },
      DistribucionCerdos: {
        Gestacion4: 390,
        Maternidad3: 130,
        Gestacion3: 520,
        Maternidad2: 130,
        Gestacion2: 650,
        Maternidad1: 130,
        Gestacion1: 520,
        Cuarentena: 468,
        CIA: 1976,
        CerdoEngordaD: 23663,
        CerdoEngordaC: 11832,
        CerdoEngordaB: 11815,
        CerdoEngordaA: 11869,
        DesarrrolloB: 11818,
        Lechon: 11812,
      },
      SueldosySalariosDesglozados: {
        veterinario: 21276.97,
        vigilantes: 57597.18,
        ayudanteGeneral: 115194.36,
        aplicadorVacunas: 97999.56,
        lavandera: 47997.65,
      },
      VacunasDesglozadas: {
        'P-DEC-F1': 7280,
        'P-RA-F1': 6760,
        'P-VE-F1': 13260,
        'P-EPL-F1': 7800,
        'P-EA-F1': 3380,
        'P-PP-F1': 7800,
        'P-AF-F1': 7020,
        'P-DEC-V': 4992,
        'P-RA-V': 4160,
        'P-VE-V': 11232,
        'P-ER-V': 4160,
        'P-EA-V': 3952,
        'P-PP-V': 5304,
        'P-AF-V': 5616,
        'P-EA-LD': 153816,
        'P-EPL-CE': 165648,
        'P-PP-LD': 260117,
        'P-VE-LD': 165648,
        'P-RA-LD': 236840,
        'P-AF-LD': 177225,
        'P-EC-LD': 189904,
        'P-EPL-L': 378176,
      },
      _id: '65831ef6cc189dd95fdf19ef',
      Ventas: '$120,068,442.06',
      Alimentos: '$46,927,365.17',
      FechaInicial: '14 junio 2027',
      FechaLag: '15 mayo 2027',
      CantidadCerdos: 87723,
      SueldosySalarios: '$340,065.72',
      Vacunas: '$1,820,090.00',
      Gastos: '$49,087,520.89',
      GananciaNeta: '$70,980,921.17',
    },
  ]);
  const handleNotification = (data) => {
    const message = data && data.message ? data.message : 'Mensaje vacío';
    const toastType = message.includes('area')
      ? 'warn'
      : message.includes('40')
        ? 'error'
        : 'info';

    // Muestra la notificación utilizando react-toastify
    toast[toastType](message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    audio.play();
    // Hace visible el componente Notification
    setNotificationData(data);
  };

  useEffect(() => {
    const socket = io('http://192.168.100.10:5010', {
      transports: ['websocket'],
    });

    socket.on('notificationReceived', (data) => {
      handleNotification(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [audio]);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setName(userData.name);
    }
  }, []);

  useEffect(() => {
    axios
      .get('http://192.168.100.10:3143/getAllGastosUltimaQuincena')
      .then((response) => {
        const jsonData = response.data;
        console.log(jsonData);
        setData(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial="initialState"
        animate="animateState"
        exit="exitState"
        variants={{
          initialState: {
            opacity: 0,
          },
          animateState: {
            opacity: 1,
          },
          exitState: {},
        }}
        transition={{ duration: 1 }}
        className="main-page"
      >
        <div className={isDarkMode ? 'darkMode' : 'lightMode'}>
          <StaticMeta title={title} description={description} image={image} />
          <Navigation toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <ChatBtn />
          <div>
            <Notification data={notificationData} />
            <ToastContainer />
          </div>
          <div className="relative index-cover">
            <img
              src="/images/imagenes/constanza.gif"
              alt="Cerdo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 background-cover"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-2xl font-bold">
              <Image
                src={'/images/imagenes/com-1--unscreen.gif'}
                alt="Logo"
                width={150}
                height={150}
                className="pb-2"
                loading="lazy"
              />
              Bienvenido
            </div>
          </div>
          <main>
            {data.map((item, index) => (
              <>
                <div className="position wrapper">
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <p>Ventas</p>
                    <h1 className="text-center">{item.Ventas}</h1>
                    <div className="w-full flex justify-center">
                      <div className="border-t-2 border-gray-500 text-gray-500">
                        {item.FechaLag} - {item.FechaInicial}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <p>Gastos</p>
                    <h1 className="text-center">{item.Gastos}</h1>
                    <div className="w-full flex justify-center">
                      <div className="border-t-2 border-gray-500 text-gray-500">
                        {item.FechaLag} - {item.FechaInicial}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <p>Ganancia Neta</p>
                    <h1 className="text-center">{item.GananciaNeta}</h1>
                    <div className="w-full flex justify-center">
                      <div className="border-t-2 border-gray-500 text-gray-500">
                        {item.FechaLag} - {item.FechaInicial}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    isDarkMode ? 'bg-[#151515]' : 'bg-[#F7F9FB]'
                  } wrapper`}
                >
                  <div className="position">
                    <div
                      className={`${
                        isDarkMode
                          ? 'row-container-d mt-10'
                          : 'row-container-a mt-10'
                      } mt-20 pb-50 w-1/3 flex`}
                    >
                      <div className="flex">
                        <Image
                          src={'/images/icon/alimentos-index.png'}
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span className=" ml-2 font-bold flex items-center">
                          Alimentos
                        </span>
                      </div>
                      <h1 className="text-right text-2xl">{item.Alimentos}</h1>
                      <div className="w-full flex">
                        <div className="text-[#42FF00] justify-left">+0.25</div>
                      </div>
                    </div>
                    <div
                      className={`${
                        isDarkMode
                          ? 'row-container-d mt-10'
                          : 'row-container-a mt-10'
                      } mt-20 pb-50 w-1/3 flex`}
                    >
                      <Link href={'./KPIS/Vacunas'}>
                        <div className="flex">
                          <Image
                            src={'/images/icon/medicamentos-index.png'}
                            width={30}
                            height={30}
                            loading="lazy"
                          />
                          <span className=" ml-2 font-bold flex items-center">
                            Vacunas
                          </span>
                        </div>
                        <h1 className="text-right text-2xl">{item.Vacunas}</h1>
                        <div className="w-full flex">
                          <div className="text-[#F46D22]">-0.25%</div>
                        </div>
                      </Link>
                    </div>
                    <div
                      className={`${
                        isDarkMode
                          ? 'row-container-d mt-10'
                          : 'row-container-a mt-10'
                      } mt-20 pb-50 w-1/3 flex`}
                    >
                      <div className="flex">
                        <Image
                          src={'/images/icon/sueldos-index.png'}
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span className=" ml-2 font-bold flex items-center">
                          Sueldos y salarios
                        </span>
                      </div>
                      <h1 className="text-right text-2xl">
                        {item.SueldosySalarios}
                      </h1>
                      <div className="w-full flex">
                        <div className="text-[#42FF00] justify-left">+0.25</div>
                      </div>
                    </div>
                  </div>
                  <div className="position">
                    <div
                      className={`${
                        isDarkMode
                          ? 'row-container-d mt-10'
                          : 'row-container-a mt-10'
                      } mt-20 pb-50 w-1/3 flex`}
                    >
                      <Link href={'./KPIS/Inseminaciones'}>
                        <div className="flex">
                          <Image
                            src={'/images/icon/servicios-index.png'}
                            width={30}
                            height={30}
                            loading="lazy"
                          />
                          <span className=" ml-2 font-bold flex items-center">
                            Inseminaciones
                          </span>
                        </div>
                        <h1 className="text-right text-2xl">${item.Insumos}</h1>
                        <div className="w-full flex">
                          <div className="text-[#42FF00] justify-left">
                            +0.25
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div
                      className={`${
                        isDarkMode
                          ? 'row-container-d mt-10'
                          : 'row-container-a mt-10'
                      } mt-20 pb-50 w-1/3 flex`}
                    >
                      <Link href={'./KPIS/Montas'}>
                        <div className="flex">
                          <Image
                            src={'/images/icon/montas-index.png'}
                            width={30}
                            height={30}
                            loading="lazy"
                          />
                          <span className=" ml-2 font-bold flex items-center">
                            Montas
                          </span>
                        </div>
                        <h1 className="text-right text-2xl">
                          ${item.Mantenimiento}
                        </h1>
                        <div className="w-full flex">
                          <div className="text-[#F46D22]">-0.25%</div>
                        </div>
                      </Link>
                    </div>
                    <div
                      className={`${
                        isDarkMode
                          ? 'row-container-d mt-10'
                          : 'row-container-a mt-10'
                      } mt-20 pb-50 w-1/3 flex`}
                    >
                      <Link href={'./KPIS/Inventario'}>
                        <div className="flex">
                          <Image
                            src={'/images/icon/pig-index.png'}
                            width={30}
                            height={30}
                            loading="lazy"
                          />
                          <span className=" ml-2 font-bold flex items-center">
                            Inventario
                          </span>
                        </div>
                        <h1 className="text-right text-2xl">
                          ${item.Servicios}
                        </h1>
                        <div className="w-full flex">
                          <div className="text-[#42FF00] justify-left">
                            +0.25
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="cover-text wrapper mt-5 p-5">
                      <div className='position'>
                  
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container-g mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <Link href={'./KPIS/Primerizas'}>
                      <div className="flex">
                        <Image
                          src={'/images/icon/primerizas-index.png'}
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span className=" ml-2 font-bold flex items-center">
                          Primerizas
                        </span>
                      </div>
                      <h1 className="text-right text-2xl">{item.Vacunas}</h1>
                      <div className="w-full flex">
                        <div className="text-[#F46D22]">-0.25%</div>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container-g mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <Link href={'./KPIS/ConsumoAlimentos'}>
                      <div className="flex">
                        <Image
                          src={'/images/icon/alimentos-cerdo-index.png'}
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span className=" ml-2 font-bold flex items-center">
                          Pronóstico de consumo de alimentos
                        </span>
                      </div>
                      <h1 className="text-right text-2xl">${item.Insumos}</h1>
                      <div className="w-full flex">
                        <div className="text-[#42FF00] justify-left">+0.25</div>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container-g mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <Link href={'./KPIS/NuevosLechones'}>
                      <div className="flex">
                        <Image
                          src={'/images/icon/little-pig-index.png'}
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span className=" ml-2 font-bold flex items-center">
                          Nuevos Lechones
                        </span>
                      </div>
                      <h1 className="text-right text-2xl">${item.Insumos}</h1>
                      <div className="w-full flex">
                        <div className="text-[#42FF00] justify-left">+0.25</div>
                      </div>
                    </Link>
                  </div>
                  </div>
                  <div className='position'>
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container-g mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <Link href={'./KPIS/LechonesNacidos'}>
                      <div className="flex">
                        <Image
                          src={'/images/icon/primerizas-index.png'}
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span className=" ml-2 font-bold flex items-center">
                          Peso de lechones nacidos
                        </span>
                      </div>
                      <h1 className="text-right text-2xl">{item.Vacunas}</h1>
                      <div className="w-full flex">
                        <div className="text-[#F46D22]">-0.25%</div>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container-g mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <Link href={'./KPIS/VacunasAplicar'}>
                      <div className="flex">
                        <Image
                          src={'/images/icon/alimentos-cerdo-index.png'}
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span className=" ml-2 font-bold flex items-center">
                          WIP
                        </span>
                      </div>
                      <h1 className="text-right text-2xl">${item.Insumos}</h1>
                      <div className="w-full flex">
                        <div className="text-[#42FF00] justify-left">+0.25</div>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`${
                      isDarkMode
                        ? 'row-container-d mt-10'
                        : 'row-container-g mt-10'
                    } mt-20 pb-50 w-1/3 flex`}
                  >
                    <Link href={'./KPIS/NuevosLechones'}>
                      <div className="flex">
                        <Image
                          src={'/images/icon/little-pig-index.png'}
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span className=" ml-2 font-bold flex items-center">
                          Nuevos Lechones
                        </span>
                      </div>
                      <h1 className="text-right text-2xl">${item.Insumos}</h1>
                      <div className="w-full flex">
                        <div className="text-[#42FF00] justify-left">+0.25</div>
                      </div>
                    </Link>
                  </div>
                  </div>
                </div>
              </>
            ))}
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de Constanza';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
