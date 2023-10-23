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

const welcomeMessages = [
  '¡Bienvenid@!',
  '¡Hola!',
  '¡Buen dia!',
];
const responsiveStyles = {
  maxWidth: '850px',
  width: '100%', // Opcional: puedes usar 'auto' si quieres mantener la proporción original
  height: 'auto',
};


export default function Home({ title, description, image }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [name, setName] = useState("");

  const usuariocookie = Cookies.get('userData');
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
    const userDataString = localStorage.getItem('userData');
    
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
                className='main-page'>
                
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
        <div className="bienvenida flex">
              <div className=''>
                <Image src={'/images/systemusers_104569.png'} width={100} height={30}/>
              </div>
              <div>
              <h1 className="text-4xl font-bold text-black">{welcomeMessages[welcomeIndex]} {userinfo.user.nombre}</h1>
              </div>
        </div>
        <main
          className={`flex min-h-screen flex-col items-center pad-index`}
        >
          <Chat/>
            
          
          <div className="position pt-2">
          <motion.div
          initial="initialState"
          animate="animateState"
          exit="exitState"
          variants={{
            initialState: {
              opacity: 0,
              x: -100,
            },
            animateState: {
              opacity: 1,
              x: 0,
            },
            exitState: {
              
            },
          }}
          transition={{duration: 2}}
          className='main-page'
          >
            <div className={isDarkMode ? "row-user-d mt-10 mr-5" : "row-user mt-10 mr-5"}>
                <div className={isDarkMode ? "row-container-user-d mt-2 w-[100%]" : "row-container-user mt-2 w-[100%]"}>
                  <div className='flex'>
                  <div id='div3d' className='flex'>
                    <div className='flex flex-col'>
                      <h1 className="text-xg mt-5 ml-2">Ganancias Totales del Periodo</h1>
                      <h2 className="text-3xl mt-20 font-bold">${jsonData.ganancias.ganancia}</h2>
                    </div>
                    <div className='mb-5'>
                    <Modelo3D />
                    </div>
                  </div>
                  </div>
                </div>
            </div>
            </motion.div>
            <motion.div
          initial="initialState"
          animate="animateState"
          exit="exitState"
          variants={{
            initialState: {
              opacity: 0,
              x: 100,
            },
            animateState: {
              opacity: 1,
              x: 0,
            },
            exitState: {
              
            },
          }}
          transition={{duration: 3}}
          className='main-page'
          >
            <div className={isDarkMode ? "row-user-d mt-10 mr-5" : "row-user mt-10 mr-5"}>
              <div>
                <div className={isDarkMode ? "row-container-user-d mt-2 w-[100%]" : "row-container-user mt-2 w-[100%]"}>
                <div id='divperiodo' className='flex'>
                    <div>
                    <Image src={"/images/svg/date.svg"} width={200} height={200} alt="user" className="mr-2" />
                  </div>
                      <div className='flex mt-20'>
                        <p className="text-xl font-bold" >Periodo de {jsonData1.config.fecha_inicial} a {jsonData1.config.fecha_final}</p>
                      </div>
                </div>
                </div>
              </div>
            </div>
          </motion.div>
            
          </div>
          
          <div className="position">
          <motion.div
          initial="initialState"
          animate="animateState"
          exit="exitState"
          variants={{
            initialState: {
              opacity: 0,
              y: 100,
            },
            animateState: {
              opacity: 1,
              y: 0,
            },
            exitState: {
              
            },
          }}
          transition={{duration: 3}}
          className='main-page'
          >
            <div className={isDarkMode ? "row-container-d mt-10" : "row-container mt-10"}>
              <div>
                <div>
                <h1 style={{ fontSize: '20px'}}>Costo total de Alimento</h1>
                <h2 style={{ fontSize: '60px'}}>${jsonData.ganancias.kg.vientre+jsonData.ganancias.kg.lechon+jsonData.ganancias.kg.sementalCIA+jsonData.ganancias.kg.sementalG}</h2>
                </div>
                <div>
                  <p>Periodo de {jsonData1.config.fecha_inicial} a {jsonData1.config.fecha_final}</p>
                </div>
              </div>
              <div className='flex' >
              <div className="responsive-container" id='grafica' style={{ width: '800px', height: '600px' }}><BarChart/></div>
              <div style={{ width: '400px', height: '600px' }} className=" m-5">
                <TableIndex isDarkMode={ isDarkMode }/>
              </div>
              </div>
            </div>
            </motion.div>
          </div>
        
          <div className="position">
            <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-10 h-150 w-full flex justify-center`}>
              <TableIndexZona isDarkMode={ isDarkMode }/>
            </div>
            <div className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-10 h-150 w-full flex justify-center`}>
              <PieChart/>
            </div>
            <div style={{ width: 'auto', height: '800px' }} className={`${isDarkMode ? "row-container-d mt-10" : "row-container mt-10"} mt-10 pb-50 h-80 w-full flex justify-center`}>
              <BarChart/>
            </div>  
          </div>
          
          <div className="position">
            <div className={isDarkMode ? "row-container-d mt-10" : "row-container mt-10"}>
              <div>
                <div>
                <h1>Costo total de Vacunas</h1>
                <h2>${Math.round(jsonData.vacunas.costo_total_V.Vientre*100)/100}</h2>
                <p>Periodo de {jsonData1.config.fecha_inicial} a {jsonData1.config.fecha_final}</p>
                </div>
                <div>
                  </div>
              </div>
              <div className='flex'>
              <div id="grafica" style={{ width: '800px', height: '600px'  }}><PieChart/></div>
              <div style={{ width: '400px', height: '600px' }} className=" m-5">
                <TableIndex1 isDarkMode={ isDarkMode }/>
                <div style={{ width: '120%', height: '80%'  }}><BarChart1/></div>
              </div>
              </div>
            </div>
          </div>


          <div className="position mb-20">
            
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