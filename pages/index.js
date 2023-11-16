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
import BarGranja from '@/components/atoms/BarGranja'
import BarGestación1 from '@/components/atoms/BarGestacion1'
import BarGestación2 from '@/components/atoms/BarGestación2'
import BarZen from '@/components/atoms/BarZen'
import cerdoIndex from '../public/images/imagenes/cerdoIndex.png';
import Footer from '@/components/atoms/Footer'

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
              <div className="relative index-cover">
                <img src="/images/imagenes/constanza.gif" alt="Cerdo" className="w-full h-full object-cover" />
                <div className="absolute inset-0 background-cover"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-2xl font-bold">
                  <Image src={"/images/icon/Constanza_logo_blanco.png"} alt="Logo" width={150} height={150} className="pb-2"/>
                  Bienvenido
                </div>
              </div>
              <main>
                <div className="position wrapper">
                  <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-20 pb-50 w-1/3 flex justify-center text-center`}>
                    <h1>Predicción - Total de cerdos en Cuarentena</h1>
                    <div className='w-full flex justify-center'>
                      <div className>
                        <BarGranja/>  {/*primera grafica de pedro aqui te dejo como hacer el fetch*/}
                      </div>
                    </div>
                  </div> 
                  <div className={`${isDarkMode ? "row-container-d mt-20 " : "row-container mt-20 "} w-1/3 flex justify-center text-center`}>
                    <h1>Predicción - Total de cerdos en Gestación 1</h1>
                    <div className='w-full flex justify-center'>
                      <div >
                        <BarGestación1/>  {/*primera grafica de pedro*/}
                      </div>
                    </div>
                  </div> 
                  <div className={`${isDarkMode ? "row-container-d mt-20 " : "row-container mt-20 "} w-1/3 flex justify-center text-center`}>
                    <h1>Predicción - Total de cerdos en Gestación 2</h1>
                    <div className='w-full flex justify-center'>
                      <div >
                        <BarGestación2/>  {/*segunda grafica de pedro*/}
                      </div>
                    </div>
                  </div> 
                </div>
                <div className="cover-text position mt-5">
                  <div>
                    <p>Resultados de la simulación de costos por alimento</p>
                  </div>
                  <div>
                    <TableIndexZona isDarkMode={ isDarkMode }/>
                  </div>
                </div>
                <div className="position wrapper">
                  <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-20 pb-50 w-1/3 flex justify-center text-center`}>
                    <h1>Predicción - Total de cerdos en Cuarentena</h1>
                    <div className='w-full flex justify-center'>
                      <div className>
                        <PieChart/>
                      </div>
                    </div>
                  </div> 
                  <div className={`${isDarkMode ? "row-container-d mt-20 " : "row-container mt-20 "} w-1/3 flex justify-center text-center`}>
                    <h1>Predicción - Total de cerdos en Gestación 1</h1>
                    <div className='w-full flex justify-center'>
                      <div >
                        <BarChart/>
                      </div>
                    </div>
                  </div> 
                  <div className={`${isDarkMode ? "row-container-d mt-20 " : "row-container mt-20 "} w-1/3 flex justify-center text-center`}>
                    <h1>Predicción - Total de cerdos en Zen</h1>
                    <div className='w-full flex justify-center'>
                      <div >
                        <BarZen/>
                      </div>
                    </div>
                  </div> 
                </div>
                <div className="cover-text position mt-5">
                  <div>
                    <p>Tabla muestra de la simulacion de los cerdos por Zona</p>
                  </div>
                  <div>
                    <TableIndex1 isDarkMode={ isDarkMode }/>
                  </div>
                </div>
                  {/*
                <div className="position">
                  <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-10 h-150 w-full flex justify-center`}>
                    <TableIndexZona isDarkMode={ isDarkMode }/>
                  </div>
                  <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-10 h-150 w-full flex justify-center`}>
                    <PieChart/>
                  </div>
                </div>
                <div style={{ width: "auto" }} className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-10 pb-50 h-80 w-full flex justify-center`}>
                    <BarChart/>
                </div> 
                
                <div className={`${isDarkMode ? "row-container-d mt-20 " : "row-container mt-20 "} w-full flex justify-center text-center`}>
                  <h1>Predicción - Total de cerdos en Zen</h1>
                  <div className='w-full flex justify-center'>
                    <div >
                      <BarZen/>  {/*tercera grafica de pedro
                    </div>
                  </div>
                </div> 
                <div className={isDarkMode ? "row-container-d mt-10" : "row-container mt-10"}>
                  <div>
                    <div>
                      <h1>Costo total de Vacunas</h1>
                      <h2>${Math.round(jsonData.vacunas.costo_total_V.Vientre*100)/100}</h2>
                      <p>Periodo de {jsonData1.config.fecha_inicial} a {jsonData1.config.fecha_final}</p>
                    </div>
                    <div>
                      <div id="grafica" className="h-[40vh] flex justify-center">
                        <PieChart/>
                      </div>
                      <div  className=" m-5">
                        <TableIndex1 isDarkMode={ isDarkMode }/>
                        <div>
                          <BarChart1/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>*/}
              </main>
              <Footer />
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