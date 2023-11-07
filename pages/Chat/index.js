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
import StaticMeta from '@/components/atoms/StaticMeta';



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
    const [audioSource, setAudioSource] = useState(audioSrc);
    

    const clearChat = () => {
      setChatMessages([]);
    }

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
      console.log("respuestaant",prevAnswer);
    };

    const cerrarModal = () => {
      setIsModalOpen(false);
    }

    const sound = new Howl({
      src: [audioSrc],
    });

    const playAudio = (e) => {
      e.preventDefault();
    
      if (audioRef.current) {
        audioRef.current.src = audioSource;
        audioRef.current.play();
      }
    };
    
    const addMessageToChat = (message, isUser) => {
      
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser },
      ]);
      console.log(`Nuevo mensaje: ${message}`);
    };
    

    useEffect(() => {

      if (respuesta.answer !== prevAnswer) {
        setPrevAnswer(respuesta.answer);
    
        if (respuesta.answer === "Esperando") {
          
          setAudioSource("./api/pronostico/python/Constanza_v15/respuesta.mp3");
          sound.play();
        }
        if (message) {
          addMessageToChat(message, true);
        }
        if (respuesta.answer) {
          addMessageToChat(respuesta.answer, false);
        }
      }
    }, [respuesta.answer, prevAnswer]);
    

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
          console.log(respuesta.answer);
          setRespuestaDelServidor(data.answer);
  
          // Agrega la respuesta actual al arreglo de mensajes
          if (json.answer === "Esperando") {
            console.log("respuestaant",prevAnswer);
            addMessageToChat(message, true);
            addMessageToChat(respuesta.answer, false);
          }
          if (data.answer === "Pensando") {
            setIsSpinning(true);
          } else {
            setIsSpinning(false);
          }
        } else {
          console.error("Error al comunicarse con Constanza");
        }
        console.log(respuesta.answer)
        console.log(`Mensaje del usuario: ${message}`);
        console.log(`Respuesta del servidor: ${data.answer}`);

      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };



    return (
      <>
      <StaticMeta
        title={title}
        description={description}
        image={image} 
      />
        <AnimatePresence>
          <Navigation
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode} />
          <div className='w-full h-full bg-black'>
            <div className="bg-[#2C2C2C]">
              <div>
                <Modal isOpen={isModalOpen} onClose={cerrarModal}>
                  <Formulario jsonFile="requisitos_2" closeModal={cerrarModal} />
                </Modal>
              </div>
              <div className="w-100 h-200 bg-black p-3">
                
              </div>
              
              <form className="wrapper full-viewport">
                <div className="flex justify-center h-60 m-20 flex-row rounded-md text-lg text-black">
                <div id="chat" className=' w-full h-full overflow-y-auto rounded-lg'>
                  {chatMessages.map((message, index) => (
                  <div
                      key={index}
                      className={message.isUser ? "user-message" : "system-message"}
                    >
                      {message.text}
                      {!message.isUser && ( // Solo renderiza la imagen para los mensajes del sistema
                            <Image
                              src={"/images/icon/logo_blanco.png"}
                              alt="Constanza Logo"
                              className="mr-20"
                              width={30}
                              height={30}
                            />
                          )}
                      
                    </div>
                  ))}
                </div>
                </div>
                <div className="flex justify-center bg-[#a78bfa] w-200 h-200 p-3 rounded-md">
                  <div>
                    <Image
                      src={"/images/icon/logo_blanco.png"}
                      alt="Constanza Logo"
                      className="mr-20"
                      width={30}
                      height={30} />
                  </div>
                  {<p className="font-bold self-center">Constanza:{respuesta.answer}</p>}
                  {respuesta.answer && (
                    <button onClick={playAudio}>
                      <img src="./images/svg/play.svg" alt="Play" width={20} />
                    </button>
                  )}
                  <audio autoplay ref={audioRef}>
                    <source src="./api/pronostico/python/Constanza_v15/respuesta.mp3" type="audio/mpeg" />
                    Tu navegador no soporta la reproducción de audio.
                  </audio>
              </div>
                <div className="flex mt-5">
                  <div className="bg-[#A5B4FC] w-40 rounded-md	">
                      <div className="text-const w-100">
                        {<p className="font-bold text-center">{json.answer}</p>}
                      </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              {json.answer === "Pensando.." ? (
                                <img
                                  src="/images/CerdoChido.gif"
                                  width={150}
                                  height={150}
                                  alt="gif"
                                  className="mr-2" />
                              ) : json.answer === "Puedes Abrir el cuestionario" ? (
                                <Image
                                  src="/images/Cerdocomiendo.gif"
                                  width={150}
                                  height={150}
                                  alt="pig"
                                  className="mr-2" />
                              ) : json.answer.includes("Error") ? (
                                <Image
                                  src="/images/Cerdomorido.gif"
                                  width={150}
                                  height={150}
                                  alt="pig"
                                  className="mr-2" />
                              ) : json.answer === "Esperando" ? (
                                <Image
                                  src="/images/Cerdomimido1.gif"
                                  width={150}
                                  height={150}
                                  alt="pig"
                                  className="mr-2" />
                              ) : (
                                <Image
                                  src="/images/CerdoChido.png"
                                  width={150}
                                  height={150}
                                  alt="pig"
                                  className="mr-2" />
                              )}
                            </div>
                          </div>
                    <textarea
                      id="message-input"
                      type="text"
                      placeholder="Escribe tu mensaje..."
                      className="text-black m-5 bg-[#F7F9FB] px-3 py-2 w-full h-100 text-lg rounded-md focus:outline-none"
                      value={message} // Establece el valor del textarea según el estado
                      onChange={handleChange} // Captura los cambios en el textarea
                    />
                    <div className="flex flex-col justify-around">
                    <button onClick={clearChat}>
                      <img src="./images/svg/trash.svg" alt="Play" width={20} />
                    </button>
                      <button className="bg-gray-700 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-100 text-center" onClick={abrirModal}>Formulario</button>
                      <button className="bg-blue-500 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-100" onClick={handleSubmit}>Enviar</button>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        </AnimatePresence>
      </>

      )
  }

export default ChatWindow;
export const getServerSideProps = async () => {
  const title = "Constanza";
  const description =
    "Chat de Constanza";
  const image = "images/icon/logo-400.png";
  return {
    props: {
      title,
      description,
      image,
    },
  };
};