import React, { useEffect, useState, useRef } from 'react';
import Navigation from '@/components/molecules/Navigation'
import axios from 'axios';
import { Howl } from 'howler';
import json from '../../public/api/pronostico/python/Constanza_v15/respuesta.json'
import Image from 'next/image';
import jsondata from '../../public/api/pronostico/python/Constanza_v15/requisitos_2.json'
import Formulario from '@/components/molecules/Formulariodinamico'
import Modal from '../../components/atoms/Modal';
import respuesta from '../../public/api/pronostico/python/Constanza_v15/respuestacons.json'
import { useDarkMode } from '@/context/DarkModeContext'
import {motion, AnimetePresence, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
=======
import StaticMeta from '@/components/atoms/StaticMeta';
>>>>>>> 509fcd2401893519b85fc61170ec8023b98c1c4e

  
  
const ChatWindow = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState(""); // Nuevo estado para el mensaje
    const [respuestaDelServidor, setRespuestaDelServidor] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]); // Arreglo para almacenar los mensajes
    const audioSrc = "./api/pronostico/python/Constanza_v15/respuesta.mp3";
    const [prevAnswer, setPrevAnswer] = useState("");
    const audioRef = useRef(null);
  
  
    const toggleChat = () => {
      setIsOpen(!isOpen);
    };
  
    const handleChange = (e) => {
      setMessage(e.target.value); // Actualiza el estado del mensaje mientras se escribe
    };
  
    const abrirModal = (e) => {
      e.preventDefault();
      setIsModalOpen(true);
      console.log("abrir modal");
    };
    
    const cerrarModal = () => {
      setIsModalOpen(false);
    }
  
    const sound = new Howl({
      src: [audioSrc],
    });
  
    const playAudio = (e) => {
      e.preventDefault(); // Evitar la actualización de la página al hacer clic en el botón de "play"
      if (audioRef.current) {
        audioRef.current.play();
      }
    };
  
    useEffect(() => {
      if (respuesta.answer !== prevAnswer) {
        setPrevAnswer(respuesta.answer);
    
        if ( json.answer === "Esperando") {
          sound.play();
        }
      }
    },);

    useEffect(() => {
        console.log("chatMessages:", chatMessages); // Agregar este console.log
      }, [chatMessages]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Pregunta Next:",message);
      try {
        const response = await axios.post("http://localhost:5000/api/pronostico/python/Constanza_v15/apichat_cons_v15", {
          question: message, // Envía el contenido del textarea como "question"
        });
        console.log(message);
        if (response.status === 200) {
          const data = response.data;
          console.log("Respuesta de Constanza JSON:", data);
          console.log("Mensaje de Constanza:", data.answer);
          console.log("Respuesta",respuestaDelServidor);
          console.log(json.answer)
          if (data.answer === "Pensando") {
            setIsSpinning(true);
          } else {
            setIsSpinning(false);
          }
          setChatMessages([...chatMessages, message]);
          // Agregar la respuesta del servidor al arreglo de mensajes
          setChatMessages([...chatMessages, data.answer]);
          // Puedes mostrar la respuesta en la interfaz de usuario si lo deseas
          setRespuestaDelServidor(data.answer);
        } else {
          console.error("Error al comunicarse con Constanza");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
  
  

    return (
          <AnimatePresence>
        <Navigation
         toggleDarkMode={toggleDarkMode}
         isDarkMode={isDarkMode}
        />
                
               <div className='w-full h-full bg-black'>
                        <div className="flex bg-blue-400 justify-center">

                            
                            <div>
                            <Modal isOpen={isModalOpen} onClose={cerrarModal}>
                                <Formulario jsonFile="requisitos_2" closeModal={cerrarModal}/>
                            </Modal>
                            </div> 
                            <form className="max-w-xl w-full">
                                <div className="w-100 h-200 bg-black">
                                            <Image 
                                                src={"/images/icon/logo_blanco.png"} 
                                                alt="Constanza Logo" 
                                                className="mr-20"
                                                width={30}
                                                height={30}
                                            />
                                </div>
                                <div className="flex bg-red-500 w-200 h-200 mt-10">
                                        <div>
                                            <Image 
                                                src={"/images/icon/logo_blanco.png"} 
                                                alt="Constanza Logo" 
                                                className="mr-20"
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                        {<p className="font-bold">Constanza:&nbsp;{respuesta.answer}</p>}
                                            {respuesta.answer && (
                                                <button onClick={playAudio}>
                                                    <img src="./images/svg/play.svg" alt="Play" width={20}/>
                                                </button>
                                        )}
                                        <audio autoplay ref={audioRef}>
                                            <source src="./api/pronostico/python/Constanza_v15/respuesta.mp3" type="audio/mpeg" />
                                                Tu navegador no soporta la reproducción de audio.
                                        </audio>
                                </div>
                                <div className="flex flex-row bg-[#A5B4FC] rounded-md text-lg text-black">
                                    <div className="">
                                        {json.answer === "Pensando.." ? (
                                            <img
                                            src="/images/CerdoChido.gif"
                                            width={150}
                                            height={150}
                                            alt="gif"
                                            className="mr-2"
                                            />
                                        ) : json.answer === "Puedes Abrir el cuestionario" ? (
                                            <Image
                                            src="/images/Cerdocomiendo.gif"
                                            width={150}
                                            height={150}
                                            alt="pig"
                                            className="mr-2"
                                            />
                                        ) : json.answer.includes("Error")?(
                                            <Image
                                            src="/images/Cerdomorido.gif"
                                            width={150}
                                            height={150}
                                            alt="pig"
                                            className="mr-2"
                                            />
                                        ): json.answer === "Esperando" ? (
                                            <Image
                                            src="/images/Cerdomimido1.gif"
                                            width={150}
                                            height={150}
                                            alt="pig"
                                            className="mr-2"
                                            />
                                        ): (
                                            <Image
                                            src="/images/CerdoChido.png"
                                            width={150}
                                            height={150}
                                            alt="pig"
                                            className="mr-2"
                                            />
                                        )} 
                                    </div>
                                    <div className="text-const w-100">
                                        {<p className="font-bold">{json.answer}</p>}
                                    </div>
                                </div>
                                <div>
                                <textarea
                                id="message-input"
                                type="text"
                                placeholder="Escribe tu mensaje..."
                                className="text-black mt-5 bg-[#F7F9FB] px-3 py-2 w-full text-lg rounded-md focus:outline-none"
                                value={message} // Establece el valor del textarea según el estado
                                onChange={handleChange} // Captura los cambios en el textarea
                                ></textarea>
                                <div className="flex justify-around">
                                    <button className="bg-gray-700 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-1/3 text-center" onClick={abrirModal}>Formulario</button>
                                    <button className="bg-blue-500 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-1/3" onClick={handleSubmit}>Enviar</button>
                                </div>
                                </div>
                                
                            </form>
                        </div>
                        </div>
    </AnimatePresence>
        
      )
  }

export default ChatWindow;
export const getServerSideProps = async () => {
  const title = "Constanza";
  const description =
<<<<<<< HEAD
    "Dashboard de Constanza";
=======
    "Chat de Constanza";
>>>>>>> 509fcd2401893519b85fc61170ec8023b98c1c4e
  const image = "images/icon/logo-400.png";
  return {
    props: {
      title,
      description,
      image,
    },
  };
};