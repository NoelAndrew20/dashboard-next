import React, { useEffect, useState, useRef } from 'react';
import Navigation from '@/components/molecules/Navigation'
import axios from 'axios';
import { Howl } from 'howler';
import json from '../../public/api/pronostico/python/Constanza_v15/respuesta.json'
import Image from 'next/image';
import jsondata from '../../public/api/pronostico/python/Constanza_v15/requisitos_2.json'
import FormularioArchivo from '@/components/molecules/FormArchivo'
import Formulario from '@/components/molecules/Formulariodinamico';
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
    const [isWelcomeAudioPlayed, setIsWelcomeAudioPlayed] = useState(false);
    const [isUsernameSet, setIsUsernameSet] = useState(false);
    const userMessages = chatMessages.filter(message => message.isUser);
    const serverMessages = chatMessages.filter(message => !message.isUser);
    const [jsonContent, setJsonContent] = useState(null);

    useEffect(() => {
      const playWelcomeAudio = async () => {
        try {

          const username = "Alfonso";
          await axios.post('http://192.168.100.10:5003/api/pronostico/python/Constanza_v15/usuario', { username });
          setIsUsernameSet(true);

          const welcomeSound = new Howl({
            src: ['./api/pronostico/python/Constanza_v15/Bienvenida.mp3'],
            onend: () => {
              setIsWelcomeAudioPlayed(true);
              // Lógica adicional después de que se reproduzca el audio de bienvenida, si es necesario
            },
          });
    
          // Intenta iniciar manualmente el contexto de audio
          const unlockAudioContext = () => {
            welcomeSound.once('unlock', () => {
              // Reproduce el sonido después de que el contexto de audio se haya desbloqueado
              welcomeSound.play();
            });
          };
    
          // Verifica si el contexto de audio está bloqueado y, si es así, intenta desbloquearlo
          if (Howler.ctx.state === 'suspended') {
            unlockAudioContext();
          } else {
            // Reproduce el sonido directamente si el contexto de audio ya está desbloqueado
            welcomeSound.play();
          }
        } catch (error) {
          console.error('Error al reproducir el audio de bienvenida:', error);
        }
      };
    
      // Llama a la función al montar el componente
      if (!isUsernameSet) {
    playWelcomeAudio();
  }
    }, []);
    
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

    const handleFormSubmit = (formData) => {
     console.log("Pregunta del modal",formData);
     const question = formData.Question;
     addMessageToChat(question, true);
    };

    const cerrarModal = () => {
      setIsModalOpen(false);
    }

    const sound = new Howl({
      src: [audioSrc],
    });

    const playAudio = (e) => {
      if (e) {
        e.preventDefault();
      }    
      if (audioRef.current) {
        audioRef.current.src = audioSource;
        audioRef.current.play();
      }
    };
    
    const addMessageToChat = (message, isUser) => {
      // Filtra los mensajes no deseados
      if (message === "Hello ChatPig" || message === "Bienvenido" || message === null) {
        return;
      }
    
      // Verifica si el mensaje ya existe en el estado del chat
      if (chatMessages.some((msg) => msg.text === message)) {
        return;
      }

      // Agrega el nuevo mensaje al estado del chat
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser },
      ]);
      console.log(`Nuevo mensaje: ${message}`);
    };
    

    useEffect(() => {

      if (respuesta.answer !== prevAnswer && isWelcomeAudioPlayed) {
        setPrevAnswer(respuesta.answer);
    
        if (json.answer === "Esperando") {
          
          const timestamp = new Date().getTime(); // Obtener un sello de tiempo actual
          setAudioSource(`./api/pronostico/python/Constanza_v15/respuesta.mp3?${timestamp}`);
          playAudio();
        }
        if (message) {
          addMessageToChat(message, true);
        }
        if (respuesta.answer) {
          addMessageToChat(respuesta.answer, false);
        }
      }
    }, [respuesta.answer, prevAnswer, isWelcomeAudioPlayed]);
    

    useEffect(() => {
        console.log("chatMessages:", chatMessages); // Agregar este console.log
      }, [chatMessages]);


      const handleSubmitVoz = async (spokenText) => {
        console.log("Pregunta Next:",message);
        try {
          const response = await axios.post("http://192.168.100.10:5003/api/pronostico/python/Constanza_v15/apichat_cons_v15", {
            question: spokenText, // Envía el contenido del textarea como "question"
          });
          console.log(message);
          if (response.status === 200) {
            const data = response.data;
            console.log("Respuesta de Constanza JSON:", data);
            console.log("Mensaje de Constanza:", data.resultado);
            console.log("Respuesta",respuestaDelServidor);
            console.log(respuesta.answer);
            setRespuestaDelServidor(data.answer);
    
            // Agrega la respuesta actual al arreglo de mensajes
            if (json.answer === "Esperando") {
              console.log("respuestaant",prevAnswer);
              addMessageToChat(message, true);
              addMessageToChat(data.resultado, false);
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
        const response = await axios.post("http://192.168.100.10:5003/api/pronostico/python/Constanza_v15/apichat_cons_v15", {
          question: message, // Envía el contenido del textarea como "question"
        });
        console.log(message);
        if (response.status === 200) {
          const data = response.data;
          console.log("Respuesta de Constanza JSON:", data);
          console.log("Mensaje de Constanza:", data.resultado);
          console.log("Respuesta",respuestaDelServidor);
          console.log("onjeto",respuesta.answer);
          setRespuestaDelServidor(data.answer);
          console.log("respuestachida",data.answer);
  
          // Agrega la respuesta actual al arreglo de mensajes
          if (json.answer === "Esperando") {
            console.log("respuestaant",prevAnswer);
            addMessageToChat(message, true);
            addMessageToChat(data.resultado, false);
          }
          if (data.answer === "Pensando") {
            setIsSpinning(true);
          } else {
            setIsSpinning(false);
          }
        } else {
          console.error("Error al comunicarse con Constanza");
        }
        console.log("dew",respuesta.answer)
        console.log(`Mensaje del usuario: ${message}`);
        console.log(`Respuesta del servidor: ${data.answer}`);

      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    const combinedMessages = [];
    for (let i = 0; i < Math.max(userMessages.length, serverMessages.length); i++) {
      if (userMessages[i]) {
        combinedMessages.push(userMessages[i]);
      }
      if (serverMessages[i]) {
        combinedMessages.push(serverMessages[i]);
      }
    }

    useEffect(() => {
      // Cargar y analizar el contenido del archivo JSON
      fetch('./api/pronostico/python/Constanza_v15/senal_cons.json')  // Reemplaza con la ruta correcta
        .then(response => response.json())
        .then(data => {
          setJsonContent(data);
          console.log('Contenido del archivo JSON:', data); // Imprimir contenido en la consola
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
    }, []);

    return (
      <div className={isDarkMode ? "bg-[#151515]" : "lightMode"}>
      <StaticMeta
        title={title}
        description={description}
        image={image} 
      />
      <Navigation
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode} 
      />
        <div className={isDarkMode ? "darkMode" : "lightMode"}>
            <form className={`wrapper full-viewport ${isDarkMode ? "bg-[#151515]" : "bg-white"} `} >
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: 'url("./images/icon/Constanza_logo_blanco.png")',
                  transform: 'scale(0.5)',
                  zIndex: 0,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              />
                <div className="relative z-10 h-[55vh]">
                  <div className="flex justify-center h-full flex-col rounded-md text-lg text-black">
                    <div className='h-full overflow-y-auto rounded-lg'>
                      {combinedMessages.map((message, index) => (
                        <div
                          key={index}
                          className={message.isUser ? "user-message flex" : "system-message flex"}
                        >
                          <div className="w-3/4">
                            {message.text}
                            {!message.isUser && message.text.includes("Por favor seleccione su constancia de situación fiscal") && jsonContent.function === "AltaProveedores" && (
                              <div>
                                <FormularioArchivo onFormSubmit={handleFormSubmit}/>
                              </div>
                            )}
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
                  <div className="flex mt-20 p">
                    <div className="flex flex-col w-full justify-start">
                      {/*
                      <div className="flex justify-center w-200 h-100 p-3 rounded-md">
                        <div>
                          <Image
                            src={"/images/icon/logo_blanco.png"}
                            alt="Constanza Logo"
                            className="mr-20"
                            width={30}
                            height={30} />
                        </div>
                        {<p className="font-bold self-center"></p>}
                        {respuesta.answer && (
                          <div className="flex ml-2">
                            <button onClick={playAudio}>
                              <img src="./images/svg/playblack.svg" alt="Play" width={20} />
                            </button>
                            <audio ref={audioRef}>
                              <source src={`./api/pronostico/python/Constanza_v15/respuesta.mp3?${new Date().getTime()}`} type="audio/mpeg" />
                              Tu navegador no soporta la reproducción de audio.
                            </audio>
                          </div>
                        )}
                        </div>*/}
                      <div className="flex justify-start ml-2">
                        <div className="flex justify-start">
                          {json.answer === "Pensando.." ? (
                            <img
                              src="/images/Constanzapensando.gif"
                              width={80}
                              height={80}
                              alt="gif"
                              className="mr-2" 
                            />
                            ) : json.answer === "Puedes Abrir el cuestionario" ? (
                              <Image
                                src="/images/Constanzaespera.gif"
                                width={80}
                                height={80}
                                alt="pig"
                                className="mr-2" />
                            ) : json.answer.includes("Error") ? (
                              <Image
                                src="/images/ConstanzaLogo_00000.png"
                                width={80}
                                height={80}
                                alt="pig"
                                className="mr-2" />
                            ) : json.answer === "Esperando" ? (
                              <Image
                                src="/images/ConstanzaLogo_00000.png"
                                width={80}
                                height={80}
                                alt="pig"
                                className="mr-2" />
                            ) : (
                              <Image
                                src="/images/ConstanzaLogo_00000.png"
                                width={80}
                                height={80}
                                alt="pig"
                                className="mr-2" />
                            )}
                        </div>
                        <div className="flex justify-start text-const w-3/4 items-center">
                          {<p className="font-bold text-center">{json.answer}</p>}
                        </div>
                      </div>
                    
                    </div>
                    
                  </div>
                  <div  className="flex pb-5 mt-3">
                    <div className="relative flex text-chat mr-2">
                      <textarea
                        id="message-input"
                        type="text"
                        placeholder="Escribe tu mensaje..."
                        className={`${isDarkMode ? "bg-[#151515] border border-[#D4AF37]" : "modal-input border border-gray-300"} flex-grow px-3 py-2 w-full h-full text-lg rounded-lg shadow-md`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <div className="absolute right-0 top-10 mt-2 mr-3 text-white border-orange-300 rounded-md focus:outline-none send-btn">
                        <button onClick={handleSubmit}>
                          <img src='./images/svg/send.svg' alt="Send" className="send-img"/>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-evenly items-center btns-chat">
                      <div>
                        <button className="bg-slate-400 text-white border-orange-300 mr-1 px-3 py-2 rounded-md focus:outline-none w-100 text-center shadow-md" onClick={toggleRecognition} type="button">
                          {isListening ? <img src="./images/svg/record.svg" alt="Play" width={30}  height={30}/> : <img src="./images/svg/micro.svg" alt="Play" width={30} height={30}/>}
                        </button>
                      </div>
                      <div>
                        <button className="bg-slate-400 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-100 text-center shadow-md" onClick={abrirModal}>
                          <img src="./images/svg/form.svg" alt="Play" width={30}/>
                        </button>
                      </div>
                    </div>
                  </div> 
                </div>
              </form>
            </div>
      </div>

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