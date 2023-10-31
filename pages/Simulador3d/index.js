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