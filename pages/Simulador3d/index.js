import Navigation from '@/components/molecules/Navigation'
// import jsonData from '../public/api/pronostico/python/output.json'
import * as THREE from 'three';
import { useState, useEffect } from 'react'
import { useDarkMode } from '@/context/DarkModeContext'
import {motion, AnimetePresence, AnimatePresence } from "framer-motion";
import ThreeModel from '../../components/molecules/Simulador3D';

export default function Home({ title, description, image }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  

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
        className="main-page">
                
      <div className={isDarkMode ? "darkMode" : "lightMode"}>
        <Navigation
         toggleDarkMode={toggleDarkMode}
         isDarkMode={isDarkMode}
        />
        <div className={isDarkMode ? "darkMode" : "lightMode"}>
                <div className={isDarkMode ? "row-user-d mt-10 mr-5" : "row-user mt-10 mr-5"}>
                        <div className={isDarkMode ? "row-container-user-d mt-2 w-[100%]" : "row-container-user mt-2 w-[100%]"}>
                            <div className="flex justify-around">
                            <div id="div3d">
                                <div className="flex flex-col text-center">
                                <h1 className="text-xl">aksjbncdkjasbndkabnsjdn</h1>
                                <h2 className="text-lg mt-5 font-bold"></h2>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
        </div>
        <div className="w-400 h-100 bg-black">

        </div>
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