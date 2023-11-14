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
    const [recognition, setRecognition] = useState(null);
    const [isListening, setIsListening] = useState(false);
  
    const elNavegadorEsCompatible = () => {
      return (
        navigator.userAgent.indexOf('Chrome') > -1 ||
        navigator.userAgent.indexOf('Edge') > -1 ||
        navigator.userAgent.indexOf('Safari') > -1
      );
    };

    const toggleRecognition = () => {
      if (recognition) {
        if (isListening) {
          console.log("Deteniendo reconocimiento de voz.");
          recognition.stop();
        } else {
          console.log("Iniciando reconocimiento de voz...");
          recognition.start();
        }
        setIsListening(!isListening);
      }
    };
  
    useEffect(() => {
      if (elNavegadorEsCompatible()) {
        const recognitionInstance =
          new (
            window.SpeechRecognition ||
            window.webkitSpeechRecognition ||
            window.mozSpeechRecognition ||
            window.msSpeechRecognition
          )();
  
        recognitionInstance.continuous = false;
        recognitionInstance.lang = 'es-ES,en-US';
        recognitionInstance.interimResults = false;
        recognitionInstance.maxAlternatives = 1;
  
        recognitionInstance.onresult = (event) => {
          const spokenText = event.results[0][0].transcript.toLowerCase();
          console.log('Texto detectado:', spokenText);
          setMessage(spokenText);
          addMessageToChat(spokenText, true);
          if (spokenText.includes("abrir formulario")) {
            console.log("Abrir formulario"|| spokenText.includes("open form"));
            abrirModalVoz();
          }
          if (spokenText.includes("consultar manual de operaciones")|| spokenText.includes("consult operations manual")) {
            console.log("Sistema Experto");
          }
          handleSubmitVoz(spokenText);  // Pasa el mensaje actualizado como argumento

        };
        
        recognitionInstance.onnomatch = (event) => {
          console.log("No he reconocido ese texto.");
        };
  
        recognitionInstance.onerror = (event) => {
          console.log('Error en el reconocimiento:', event.error);
        };
        
        setRecognition(recognitionInstance);
        
      }
    }, []);
    


    const clearChat = () => {
      setChatMessages([]);
    }

    const toggleChat = () => {
      setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
      setMessage(e.target.value); // Actualiza el estado del mensaje mientras se escribe
    };

    const abrirModalVoz = () => {
      setIsModalOpen(true);
      console.log("abrir modal");
      console.log("respuestaant",prevAnswer);
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


      const handleSubmitVoz = async (spokenText) => {
        console.log("Pregunta Next:",message);
        try {
          const response = await axios.post("http://localhost:5000/api/pronostico/python/Constanza_v15/apichat_cons_v15", {
            question: spokenText, // Envía el contenido del textarea como "question"
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
          <Navigation
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode} />
          <div className='w-full h-full bg-black'>
            <div className="bg-white">
              <div>
                <Modal isOpen={isModalOpen} onClose={cerrarModal}>
                  <Formulario jsonFile="requisitos_2" closeModal={cerrarModal} />
                </Modal>
              </div>
              <div className="w-100 h-200 bg-white p-3">
                
              </div>
              
              <form className="wrapper full-viewport bg-white">
                <div className="flex justify-center h-80 m-20 flex-col rounded-md text-lg text-black">
                <div id="chat" className=' w-full h-full overflow-y-auto rounded-lg'>
                  {chatMessages.map((message, index) => (
                  <div
                      key={index}
                      className={message.isUser ? "user-message flex" : "system-message flex"}
                    >
                      <div className="w-3/4">
                        {message.text}
                      </div>
                      <div>
                        {!message.isUser && ( // Solo renderiza la imagen para los mensajes del sistema
                          <Image
                            src={"/images/icon/logo_blanco.png"}
                            alt="Constanza Logo"
                            width={50}
                            height={50}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                </div>
                <div className="flex mt-40">
                  <div className="flex flex-col w-full justify-start">
                            <div className="flex justify-center w-200 h-200 p-3 rounded-md">
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
                                    <img src="./images/svg/playblack.svg" alt="Play" width={20} />
                                  </button>
                                )}
                                <audio autoPlay ref={audioRef}>
                                  <source src="./api/pronostico/python/Constanza_v15/respuesta.mp3" type="audio/mpeg" />
                                  Tu navegador no soporta la reproducción de audio.
                                </audio>
                            </div>
                            <div style={{ display: "flex", justifyContent: "start", marginLeft: "1%" }}>
                              {json.answer === "Pensando.." ? (
                                <img
                                  src="/images/icon/Constanzatransf.gif"
                                  width={60}
                                  height={60}
                                  alt="gif"
                                  className="mr-2" />
                              ) : json.answer === "Puedes Abrir el cuestionario" ? (
                                <Image
                                  src="/images/icon/Constanzatransf.gif"
                                  width={60}
                                  height={60}
                                  alt="pig"
                                  className="mr-2" />
                              ) : json.answer.includes("Error") ? (
                                <Image
                                  src="/images/icon/logo_color.png"
                                  width={60}
                                  height={60}
                                  alt="pig"
                                  className="mr-2" />
                              ) : json.answer === "Esperando" ? (
                                <Image
                                  src="/images/icon/logo_color.png"
                                  width={60}
                                  height={60}
                                  alt="pig"
                                  className="mr-2" />
                              ) : (
                                <Image
                                  src="/images/icon/logo_color.png"
                                  width={60}
                                  height={60}
                                  alt="pig"
                                  className="mr-2" />
                              )}
                              <div className="flex justify-start text-const w-full mt-16">
                                {<p className="font-bold text-center">{json.answer}</p>}
                              </div>
                            </div>
                              <div  className="relative">
                              <textarea
                                id="message-input"
                                type="text"
                                placeholder="Escribe tu mensaje..."
                                className="text-black bg-slate-50 px-3 py-2 w-full h-full text-lg rounded-[20px] shadow border border-gray-800"
                                value={message} // Establece el valor del textarea según el estado
                                onChange={(e) => setMessage(e.target.value)}
                              />
                              <button className="absolute right-1 bottom-4 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-30" onClick={handleSubmit}>
                                <img src='./images/svg/send.svg' width={40}></img>
                              </button>
                            </div>
                          </div>  
                    <div className="flex flex-col justify-around">
                      <button onClick={clearChat}>
                        <img src="./images/svg/trash.svg" alt="Play" width={20} />
                      </button>
                      <div className='flex p-5 mt-10'>
                          <button className="bg-slate-400 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-100 text-center" onClick={toggleRecognition} type="button">
                            {isListening ? <img src="./images/svg/record.svg" alt="Play" width={40} /> : <img src="./images/svg/micro.svg" alt="Play" width={50} height={50}/>}
                          </button>
                          <button className="bg-slate-400 ml-5 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-100 text-center" onClick={abrirModal}>
                          <img src="./images/svg/form.svg" alt="Play" width={40} height={40}/>
                          </button>
                      </div>
                    </div>
                  </div>
              </form>
            </div>
          </div>
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