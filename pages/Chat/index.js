import React, { useEffect, useState, useRef } from 'react';
import Navigation from '@/components/molecules/Navigation';
import axios from 'axios';
import { Howl } from 'howler';
import json from '../../public/api/python/Constanza_v15/respuesta.json';
import Image from 'next/image';
import jsondata from '../../public/api/python/Constanza_v15/requisitos_2.json';
import FormularioArchivo from '@/components/molecules/FormArchivo';
import Formulario from '@/components/molecules/Formulariodinamico';
import Modal from '../../components/atoms/Modal';
import respuesta from '../../public/api/python/Constanza_v15/respuestacons.json';
import { useDarkMode } from '@/context/DarkModeContext';
import { motion, AnimetePresence, AnimatePresence } from 'framer-motion';
import StaticMeta from '@/components/atoms/StaticMeta';

const ChatWindow = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatLocked, setIsChatLocked] = useState(true);
  const [message, setMessage] = useState(''); // Nuevo estado para el mensaje
  const [respuestaDelServidor, setRespuestaDelServidor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]); // Arreglo para almacenar los mensajes
  const audioSrc = './api/python/Constanza_v15/respuesta.mp3';
  const [prevAnswer, setPrevAnswer] = useState('');
  const audioRef = useRef(null);
  const [audioSource, setAudioSource] = useState(audioSrc);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isWelcomeAudioPlayed, setIsWelcomeAudioPlayed] = useState(false);
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const userMessages = chatMessages.filter((message) => message.isUser);
  const serverMessages = chatMessages.filter((message) => !message.isUser);
  const [jsonContent, setJsonContent] = useState(null);

  useEffect(() => {
    const unlockChatTimeout = setTimeout(() => {
      setIsChatLocked(false);
    }, 4000);
    return () => clearTimeout(unlockChatTimeout);
  }, []);

  useEffect(() => {
    const playWelcomeAudio = async () => {
      try {
        const username = 'Alfonso';
        await axios.post(
          'http://192.168.100.10:5003/api/python/Constanza_v15/usuario',
          { username }
        );
        setIsUsernameSet(true);

        const welcomeSound = new Howl({
          src: ['./api/python/Constanza_v15/Bienvenida.mp3'],
          onend: () => {
            setIsWelcomeAudioPlayed(true);
          },
        });

        const unlockAudioContext = () => {
          welcomeSound.once('unlock', () => {
            welcomeSound.play();
          });
        };

        if (Howler.ctx.state === 'suspended') {
          unlockAudioContext();
        } else {
          welcomeSound.play();
        }
      } catch (error) {
        console.error('Error al reproducir el audio de bienvenida:', error);
      }
    };

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
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    }
  };

  useEffect(() => {
    if (elNavegadorEsCompatible()) {
      const recognitionInstance = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();

      recognitionInstance.continuous = false;
      recognitionInstance.lang = 'es-ES,en-US';
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onresult = (event) => {
        const spokenText = event.results[0][0].transcript.toLowerCase();
        setMessage(spokenText);
        addMessageToChat(spokenText, true);
        if (spokenText.includes('abrir formulario')) {
          abrirModalVoz();
        }
        if (
          spokenText.includes('consultar manual de operaciones') ||
          spokenText.includes('consult operations manual')
        ) {
        }
        handleSubmitVoz(spokenText);
      };

      recognitionInstance.onnomatch = (event) => {};

      recognitionInstance.onerror = (event) => {};

      setRecognition(recognitionInstance);
    }
  }, []);

  const clearChat = () => {
    setChatMessages([]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    if (!isChatLocked) {
      setMessage(e.target.value);
      messageRef.current = e.target.value;
    }
  };

  const abrirModalVoz = () => {
    setIsModalOpen(true);
  };

  const abrirModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    const question = formData.Question;
    addMessageToChat(question, true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

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
    if (
      message === 'Hello ChatPig' ||
      message === 'Bienvenido' ||
      message === null
    ) {
      return;
    }

    if (chatMessages.some((msg) => msg.text === message)) {
      return;
    }

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser },
    ]);
  };

  useEffect(() => {
    if (respuesta.answer !== prevAnswer && isWelcomeAudioPlayed) {
      setPrevAnswer(respuesta.answer);

      if (json.answer === 'Esperando') {
        const timestamp = new Date().getTime();
        setAudioSource(`./api/python/Constanza_v15/respuesta.mp3?${timestamp}`);
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

  useEffect(() => {}, [chatMessages]);

  const handleSubmitVoz = async (spokenText) => {
    try {
      const response = await axios.post(
        'http://192.168.100.10:5003/api/python/Constanza_v15/apichat_cons_v15',
        {
          question: spokenText,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setRespuestaDelServidor(data.answer);

        if (json.answer === 'Esperando') {
          console.log('respuestaant', prevAnswer);
          addMessageToChat(message, true);
          addMessageToChat(data.resultado, false);
        }
        if (data.answer === 'Pensando') {
          setIsSpinning(true);
        } else {
          setIsSpinning(false);
        }
      } else {
        console.error('Error al comunicarse con Constanza');
      }
      console.log(respuesta.answer);
      console.log(`Mensaje del usuario: ${message}`);
      console.log(`Respuesta del servidor: ${data.answer}`);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('token', token);
    try {
      const response = await axios.post(
        'http://192.168.100.10:5003/api/python/Constanza_v15/apichat_cons_v15',
        {
          question: message,
          token: token,
        }
      );
      console.log(message);
      console.log(token);
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setRespuestaDelServidor(data.answer);
        if (json.answer === "Esperando") {
          addMessageToChat(message, true);
          addMessageToChat(data.resultado, false);
        }
        if (data.answer === 'Pensando') {
          setIsSpinning(true);
        } else {
          setIsSpinning(false);
        }
      } else {
        console.error('Error al comunicarse con Constanza');
      }
      console.log('dew', respuesta.answer);
      console.log(`Mensaje del usuario: ${message}`);
      console.log(`Respuesta del servidor: ${data.answer}`);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const combinedMessages = [];
  for (
    let i = 0;
    i < Math.max(userMessages.length, serverMessages.length);
    i++
  ) {
    if (userMessages[i]) {
      combinedMessages.push(userMessages[i]);
    }
    if (serverMessages[i]) {
      combinedMessages.push(serverMessages[i]);
    }
  }

  useEffect(() => {
    fetch('./api/python/Constanza_v15/senal_cons.json')
      .then((response) => response.json())
      .then((data) => {
        setJsonContent(data);
      })
      .catch((error) =>
        console.error('Error al cargar el archivo JSON:', error)
      );
  }, []);

  const formatText = (text) => {
    const fixedText = text.replace(/'/g, '"');
    const parsedObject = JSON.parse(fixedText);
    let formattedText = '';

    for (const key in parsedObject) {

      const formattedValue = typeof parsedObject[key] === 'number'
        ? parsedObject[key] % 1 === 0
          ? parsedObject[key].toLocaleString('en-US')
          : parsedObject[key].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : parsedObject[key];

      const formattedKey = key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^([a-z])/, (match) => match.toUpperCase());

        formattedText += `${formattedKey}: ${formattedValue}\n`;
    }

    formattedText = formattedText.slice(0, -2);

    return formattedText;
  };

  return (
    <div className={isDarkMode ? 'bg-[#151515]' : 'lightMode'}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className={isDarkMode ? 'darkMode' : 'lightMode'}>
        <form
          className={`wrapper full-viewport ${
            isDarkMode ? 'bg-[#151515]' : 'bg-white'
          } `}
        >
          <div
            className="absolute inset-0 bg-center"
            style={{
              backgroundImage: 'url("./images/icon/Constanza_logo_blanco.png")',
              transform: 'scale(0.5)',
              zIndex: 0,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="relative z-10 h-[55vh]">
            <div className="flex justify-center h-full flex-col rounded-md text-lg text-black">
              <div className="h-full overflow-y-auto rounded-lg">
                {combinedMessages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.isUser
                        ? 'user-message flex'
                        : 'system-message flex'
                    }
                  >
                    <div className="w-3/4">
                      {message.text}
                      {!message.isUser && jsonContent.function === "AltaProveedores" && (
                        <div>
                          <FormularioArchivo onFormSubmit={handleFormSubmit} />
                        </div>
                      )}
                      {!message.isUser &&
                        message.text.includes(
                          'Por favor seleccione su constancia de situación fiscal'
                        ) &&
                        jsonContent.function === 'AltaProveedores' && (
                          <div>
                            <FormularioArchivo
                              onFormSubmit={handleFormSubmit}
                            />
                          </div>
                        )}
                    </div>

                    <div>
                      {!message.isUser && (
                        <Image
                          src={'/images/icon/logo_blanco.png'}
                          alt="Constanza Logo"
                          width={50}
                          height={50}
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-20 p">
              <div className="flex flex-col w-full justify-start">
                {
                  <div className="flex justify-center w-200 h-100 p-3 rounded-md">
                    <div>
                      <Image
                        src={'/images/icon/logo_blanco.png'}
                        alt="Constanza Logo"
                        className="mr-20"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                }
                <div className="flex justify-start ml-2">
                  <div className="flex justify-start">
                    {json.answer === 'Pensando..' ? (
                      <img
                        src="/images/Constanzapensando.gif"
                        width={80}
                        height={80}
                        alt="gif"
                        className="mr-2"
                      />
                    ) : json.answer === 'Puedes Abrir el cuestionario' ? (
                      <Image
                        src="/images/Constanzaespera.gif"
                        width={80}
                        height={80}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : json.answer.includes('Error') ? (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={80}
                        height={80}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : json.answer === 'Esperando' ? (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={80}
                        height={80}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={80}
                        height={80}
                        alt="pig"
                        className="mr-2"
                      />
                    )}
                  </div>
                  <div className="flex justify-start text-const w-3/4 items-center">
                    {<p className="font-bold text-center">{json.answer}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pb-5 mt-3">
              <div className="relative flex text-chat mr-2">
                <textarea
                  id="message-input"
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  disabled={isChatLocked}
                  className={`${
                    isDarkMode
                      ? 'bg-[#151515] border border-[#D4AF37]'
                      : 'modal-input border border-gray-300'
                  } flex-grow px-3 py-2 w-full h-full text-lg rounded-lg shadow-md`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="absolute right-0 top-10 mt-2 mr-3 text-white border-orange-300 rounded-md focus:outline-none send-btn">
                  <button onClick={handleSubmit}>
                    <img
                      src="./images/svg/send.svg"
                      alt="Send"
                      className="send-img"
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-evenly items-center btns-chat">
                {/*<div>
                  <button className="bg-slate-400 text-white border-orange-300 mr-1 px-3 py-2 rounded-md focus:outline-none w-100 text-center shadow-md" onClick={toggleRecognition} type="button">
                    {isListening ? <img src="./images/svg/record.svg" alt="Play" width={30} height={30} /> : <img src="./images/svg/micro.svg" alt="Play" width={30} height={30} />}
                  </button>
                    </div>*/}
                <div>
                  <button
                    className="bg-slate-400 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none w-100 text-center shadow-md"
                    onClick={playAudio}
                  >
                    <img
                      src="./images/svg/playblack.svg"
                      alt="Play"
                      width={20}
                    />
                  </button>
                  <audio ref={audioRef}>
                    <source
                      src={`./api/python/Constanza_v15/respuesta.mp3?${new Date().getTime()}`}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Chat de Constanza';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
