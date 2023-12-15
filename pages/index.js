import Navigation from '@/components/molecules/Navigation'
import PieChart from '@/components/atoms/PieChart'
import BarChart from '@/components/atoms/BarChart'
import BarChart1 from '@/components/atoms/BarChart1'
import StaticMeta from '@/components/atoms/StaticMeta'
import TableIndex from '@/components/atoms/TableIndex'
import TableIndex1 from '@/components/atoms/TableIndexVacuna'
import jsonData from '../public/api/pronostico/python/output.json'
import jsonData1 from '../public/api/pronostico/python/config.json'
import Image from 'next/image'
import Modelo3D from '../components/molecules/3dmodel';
import Chat from '../components/molecules/chatwindow'
import { useState, useEffect } from 'react'
import TableIndexZona from '@/components/atoms/TableIndexZona'
import { useDarkMode } from '@/context/DarkModeContext'
import Cookies from 'js-cookie';
import {motion, AnimetePresence, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client'
import BarGranja from '@/components/atoms/BarGranja'
import HistorialChart from '@/components/atoms/HistorialChart'
import BarGestación2 from '@/components/atoms/BarGestación2'
import BarZen from '@/components/atoms/BarZen'
import cerdoIndex from '../public/images/imagenes/cerdoIndex.png';
import Footer from '@/components/atoms/Footer'
import Notification from '@/components/molecules/AlertaNotificacion'
import { data } from 'autoprefixer'
import ChatBtn from '@/components/atoms/ChatBtn'
const axios = require('axios');
const welcomeMessages = [
  "¡Bienvenid@!",
  "¡Hola!",
  "¡Buen dia!",
];



export default function Home({ title, description, image }) {

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [name, setName] = useState("");
  const usuariocookie = Cookies.get("userData");
  const userinfo = usuariocookie ? JSON.parse(usuariocookie) : null;
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [notificationData, setNotificationData] = useState(null);
  const [audio] = useState(new Audio('./audio/imperial_alert.mp3')); // Reemplaza con la ruta correcta de tu archivo de sonido
  const [data, setData] = useState([])
  const handleNotification = (data) => {
    console.log('Notificación recibida:', data);
    const message = data && data.message ? data.message : 'Mensaje vacío';
    const toastType = message.includes('area') ? 'warn' : message.includes('40') ? 'error' : 'info';

    // Muestra la notificación utilizando react-toastify
    toast[toastType](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    audio.play();
    // Hace visible el componente Notification
    setNotificationData(data);
  };

  useEffect(() => {
    const socket = io('http://192.168.100.10:5010', { transports: ['websocket'] });

    socket.on('notificationReceived', (data) => {
      console.log('Evento de notificación recibido en Next.js:', data);
      handleNotification(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [audio]);
  
  useEffect(() => {
    // Usar un temporizador para cambiar el mensaje cada 3 segundos
    const intervalId = setInterval(() => {
      setWelcomeIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
    }, 3000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    //console.log(localStorage)
    const userDataString = localStorage.getItem("userData");
    
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setName(userData.name);
    }
  }, []);

  useEffect(() => {
    axios.get('http://192.168.100.10:3143/getAllGastosUltimaQuincena')
    .then(response => {
        const jsonData = response.data; // Datos de respuesta en formato JSON
        console.log(jsonData)
        setData(jsonData);
    })
    .catch(error => {
        console.error(error);
    });
}, [])

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
            exitState: {
              
            },
          }}
          transition={{duration: 1}}
          className="main-page"
        >        
          <div className={isDarkMode ? "darkMode" : "lightMode"}>
            <StaticMeta
              title={title}
              description={description}
              image={image}
            />      
              <Navigation
              toggleDarkMode={toggleDarkMode}
              isDarkMode={isDarkMode}
              />
              <ChatBtn/>
              <div>
                  <Notification data={notificationData} />
                  <ToastContainer/>
                </div>
              <div className="relative index-cover">
                <img src="/images/imagenes/constanza.gif" alt="Cerdo" className="w-full h-full object-cover" />
                <div className="absolute inset-0 background-cover"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-2xl font-bold">
                  <Image src={"/images/icon/Constanza_logo_blanco.png"} alt="Logo" width={150} height={150} className="pb-2"/>
                  Bienvenido
                </div>
              </div>
              <main>
                  {data.map((item, index) => (
                    <>
                    <div className="position wrapper">
                      <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-20 pb-50 w-1/3 flex`}>
                        <p>Ventas</p>
                        <h1 className="text-center">$380,520.00</h1>
                        <div className='w-full flex justify-center'>
                          <div className="border-t-2 border-gray-500 text-gray-500">
                            11 Noviembre - 16 Noviembre 2023
                          </div>
                        </div>
                      </div> 
                      <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-20 pb-50 w-1/3 flex`}>
                        <p>Gastos</p>
                        <h1 className="text-center">$254,610.00</h1>
                        <div className='w-full flex justify-center'>
                          <div className="border-t-2 border-gray-500 text-gray-500">
                            11 Noviembre - 16 Noviembre 2023
                          </div>
                        </div>
                      </div> 
                      <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-20 pb-50 w-1/3 flex`}>
                        <p>Ganancia Neta</p>
                        <h1 className="text-center">$154,610.00</h1>
                        <div className='w-full flex justify-center'>
                          <div className="border-t-2 border-gray-500 text-gray-500">
                            11 Noviembre - 16 Noviembre 2023
                          </div>
                        </div>
                      </div> 
                    </div>
                    <div className={`${isDarkMode ? "bg-[#151515]" : "bg-[#F7F9FB]"} wrapper`}>
                  <div className="position">
                    <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container-a mt-10"} mt-20 pb-50 w-1/3 flex`}>
                     
                      <div className="flex">
                        <Image src={"/images/icon/alimentos-index.png"} width={30} height={30}/>
                        <span className=" ml-2 font-bold flex items-center">Alimentos</span>
                      </div>
                      <h1 className="text-right text-2xl">{item.Alimentos}</h1>
                      <div className='w-full flex'>
                        <div className="text-[#42FF00] justify-left">
                          +0.25
                        </div>
                      </div>
                    </div> 
                    <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container-a mt-10"} mt-20 pb-50 w-1/3 flex`}>
                      <div className="flex">
                        <Image src={"/images/icon/medicamentos-index.png"} width={30} height={30}/>
                        <span className=" ml-2 font-bold flex items-center">Medicamentos</span>
                      </div>                      
                      <h1 className="text-right text-2xl">${ item.Medicamentos }</h1>
                      <div className='w-full flex'>
                        <div className="text-[#F46D22]">
                          -0.25%
                        </div>
                      </div>
                    </div> 
                    <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container-a mt-10"} mt-20 pb-50 w-1/3 flex`}>
                      <div className="flex">
                        <Image src={"/images/icon/sueldos-index.png"} width={30} height={30}/>
                        <span className=" ml-2 font-bold flex items-center">Sueldos y salarios</span>
                      </div>                        
                      <h1 className="text-right text-2xl">${ item.Sueldos }</h1>
                      <div className='w-full flex'>
                        <div className="text-[#42FF00] justify-left">
                          +0.25
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="position">
                    <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container-a mt-10"} mt-20 pb-50 w-1/3 flex`}>
                      <div className="flex">
                        <Image src={"/images/icon/insumos-index.png"} width={30} height={30}/>
                        <span className=" ml-2 font-bold flex items-center">Insumos</span>
                      </div> 
                      <h1 className="text-right text-2xl">${ item.Insumos }</h1>
                      <div className='w-full flex'>
                        <div className="text-[#42FF00] justify-left">
                          +0.25
                        </div>
                      </div>
                    </div> 
                    <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container-a mt-10"} mt-20 pb-50 w-1/3 flex`}>
                      <div className="flex">
                        <Image src={"/images/icon/mantenimiento-index.png"} width={30} height={30}/>
                        <span className=" ml-2 font-bold flex items-center">Mantenimiento</span>
                      </div> 
                      <h1 className="text-right text-2xl">${ item.Mantenimiento }</h1>
                      <div className='w-full flex'>
                        <div className="text-[#F46D22]">
                          -0.25%
                        </div>
                      </div>
                    </div> 
                    <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container-a mt-10"} mt-20 pb-50 w-1/3 flex`}>
                      <div className="flex">
                        <Image src={"/images/icon/servicios-index.png"} width={30} height={30}/>
                        <span className=" ml-2 font-bold flex items-center">Servicios</span>
                      </div> 
                      <h1 className="text-right text-2xl">${ item.Servicios }</h1>
                      <div className='w-full flex'>
                        <div className="text-[#42FF00] justify-left">
                          +0.25
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>
     
                </>
                ))}
                  
        
                  
                <div className="cover-text position mt-5 p-5">
                  <div className={`${isDarkMode ? "row-container-d" : "row-container"} w-1/3 flex justify-center text-center`}>
                    <h1>Predicción - Total de cerdos en Cuarentena</h1>
                    <div className='w-full flex justify-center'>
                      <div className>
                        <PieChart/>
                      </div>
                    </div>
                  </div> 
                  <div>
                    <TableIndex1 isDarkMode={ isDarkMode }/>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-5 mb-5 w-1/2 flex justify-center text-center`}>
                    <h1>Personal</h1>
                      <div className="p-2">
                        <TableIndex isDarkMode={ isDarkMode }/>
                      </div>
                  </div> 
                </div>
                <div className="h-chart">
                  <h1 className="text-lg font-bold">Predicción - Total de alimentos</h1>
                    <HistorialChart/>
                </div>
              </main>
            </div>
          </motion.div>
        </AnimatePresence>

    )
  }


export const getServerSideProps = async () => {
  const title = "Constanza";
  const description =
    "Dashboard de Constanza";
  const image = "images/icon/logo-400.png";
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
