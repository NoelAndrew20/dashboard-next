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
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import NavDashboard from '@/components/molecules/NavDashboard';
import svg from '@/public/images/svg/chat.png';

const ChatWindow = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const userMessages = chatMessages.filter((message) => message.isUser);
  const serverMessages = chatMessages.filter((message) => !message.isUser);
  const [listening, setListening] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const textareaRef = useRef(null);
  const audioRef = useRef(null);
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const addMessageToChat = (message, isUser) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser },
    ]);
  };

  const setFocusOnTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  
  //Modulo que va mas en putiza
  const speakMessage = (message) => {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synthesis.speak(utterance);
};

  /*const speakMessage = async (message) => {
    try {
      const apiUrl = 'http://192.168.100.10:7000/constanza/heard';
      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  useEffect(() => {}, []);*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    addMessageToChat(message, true);
    //reproduce lo que envias
    //speakMessage(message);
    setMessage('');
    setIsButtonDisabled(true);
    setFocusOnTextarea();
    try {
      const apiUrl = 'http://192.168.100.10:7003/constanza/listens';
      const service = localStorage.getItem('servicio');
      const requestData = {
        text: message,
        service: service,
      };

      const response = await axios.post(apiUrl, requestData);
      const result = response.data;
      console.log(response);
      console.log(response.data.result.answer);
      if (result.result === null || (result.result.answer && result.result.answer.length === 0)) {
        addMessageToChat('¡No se encontró información disponible! Vuelve a solicitarla con distintos parámetros por favor.', false);
        speakMessage('¡No se encontró información disponible! Vuelve a solicitarla con distintos parámetros por favor.');
        console.log(result.result);
      } else if (
        result.result === '¡Lo siento! no entiendo tu petición. Vuelve a solicitarla de distinta forma.'
      ) {
        addMessageToChat(result.result, false);
        speakMessage(result.result);
        console.log(result.result);
      } else {
        if (result.result.answer) {
          addMessageToChat(result.result.answer, false);
        }
      }
    } catch (error) {
      console.error('Error al enviar la solicitud al servidor:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (message.trim() !== '') {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [userMessages, serverMessages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const combinedMessages = userMessages.reduce((acc, userMsg, index) => {
    acc.push(userMsg);
    const serverMsg = serverMessages[index];
    if (serverMsg) {
      acc.push(serverMsg);
    }
    return acc;
  }, []);
  

  const hanldeTextChange = () => {
    message && message.trim() !== ''
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true);
  };

  useEffect(() => {
    hanldeTextChange();
  }, [message]);

  let recognition = null;
  const startListening = () => {
    if (recognition && recognition.running) {
      recognition.stop();
      setListening(false);
    } else {
      recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US, es-ES, pt-BR'; 

      recognition.onresult = event => {
        const speechToText = event.results[0][0].transcript;
        console.log('Texto reconocido:', speechToText);
      };

      recognition.onerror = event => {
        console.error('Error en el reconocimiento de voz:', event.error);
        recognition.stop();
        setListening(false);
      };

      recognition.onend = () => {
        console.log('Fin del reconocimiento de voz.');
        setListening(false);
      };

      recognition.start();
      setListening(true);
    }
  };

  return (
    <>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <NavDashboard section="Habla con Constanza" svg={svg} />

      <div className={isDarkMode ? 'darkMode' : 'lightMode'}>
        <form
          className={`wrapper min-h-[80vh] pt-5 ${
            isDarkMode ? 'bg-[#151515]' : 'bg-white'
          } `}
        >
          <div className="relative z-10 bg-chat">
            <div className="flex justify-center h-full flex-col rounded-md text-lg text-black">
              <div ref={chatContainerRef} className="h-full overflow-y-auto rounded-lg">
                {combinedMessages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.isUser === true
                        ? 'user-message flex'
                        : 'system-message flex'
                    }
                  >
                    <div className="w-3/4">
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-[20px] p">
              <div className="flex flex-col w-full justify-start">
                <div className="flex justify-start ml-2">
                  <div className="flex justify-start">
                    {json.answer === 'Pensando..' ? (
                      <img
                        src="/images/Constanzapensando.gif"
                        width={40}
                        height={40}
                        alt="gif"
                        className="mr-2"
                      />
                    ) : json.answer === 'Puedes Abrir el cuestionario' ? (
                      <Image
                        src="/images/Constanzaespera.gif"
                        width={40}
                        height={40}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : json.answer.includes('Error') ? (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={40}
                        height={40}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : json.answer === 'Esperando' ? (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={40}
                        height={40}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={40}
                        height={40}
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
                  className="text-input"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    hanldeTextChange();
                  }}
                  onKeyDown={handleKeyDown}
                  ref={textareaRef}
                />
              </div>
              <div className="flex justify-between items-center btns-chat">
                <div>
                  <button
                    className={`button ${
                      isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                  >
                    <img
                      src="./images/svg/send.png"
                      alt="Send"
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
                <audio ref={audioRef}>
                  <source src="/audio/audio.mp3" type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
                <div>
                  <button
                    className="button"
                    onClick={startListening}
                    type="button"
                  >
                    {listening ? (
                      <img
                        src="./images/svg/record.png"
                        alt="Play"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <img
                        src="./images/svg/micro.png"
                        alt="Play"
                        width={30}
                        height={30}
                      />
                    )}
                  </button>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
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

/*import React, { useEffect, useState, useRef } from 'react';
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
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import NavDashboard from '@/components/molecules/NavDashboard';
import svg from '@/public/images/svg/chat.png';

const ChatWindow = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatLocked, setIsChatLocked] = useState(true);
  const [message, setMessage] = useState('');
  const [respuestaDelServidor, setRespuestaDelServidor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const unlockChatTimeout = setTimeout(() => {
      setIsChatLocked(false);
    }, 4000);
    return () => clearTimeout(unlockChatTimeout);
  }, []);

  useEffect(() => {
    const playWelcomeAudio = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        const username = decodedToken.nombre;
        console.log('user', username);
        await axios.post(
          'http://192.168.100.10:5003/api/python/Constanza_v15/respuesta.mp3',
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
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser },
    ]);
  };

  useEffect(() => {
    if (
      submitButtonClicked &&
      respuesta.answer !== prevAnswer &&
      isWelcomeAudioPlayed
    ) {
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
      setSubmitButtonClicked(false);
    }
  }, [submitButtonClicked, respuesta.answer, prevAnswer, isWelcomeAudioPlayed]);

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
    addMessageToChat(message, true);
    console.log(message);
    try {
      const response = await axios.post(
        'http://192.168.100.10:5003/api/python/Constanza_v15/apichat_cons_v15',
        {
          question: message,
          token: token,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setRespuestaDelServidor(data.answer);
        addMessageToChat(data.resultado, false);
        if (data.mensaje === 'MP3 generado con exito') {
          const timestamp = new Date().getTime();
          setAudioSource(
            `./api/python/Constanza_v15/respuesta.mp3?${timestamp}`
          );
          setTimeout(() => {
            playAudio();
          }, 4000);
        }
        if (data.answer === 'Pensando') {
          setIsSpinning(true);
        } else {
          setIsSpinning(false);
        }
      } else {
        console.error('Error al comunicarse con Constanza');
        if (response.status === 500) {
          addMessageToChat('No te entendí', false);
          const timestamp = new Date().getTime();
          setAudioSource(
            `./api/python/Constanza_v15/respuesta.mp3?${timestamp}`
          );
          setTimeout(() => {
            playAudio();
          }, 100);
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      if (error.response && error.response.status === 500) {
        addMessageToChat('No te entendí', false);
        const timestamp = new Date().getTime();
        setAudioSource(`./api/python/Constanza_v15/respuesta.mp3?${timestamp}`);
        setTimeout(() => {
          playAudio();
        }, 100);
      }
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
  });

  const formatText = (text) => {
    const fixedText = text.replace(/'/g, '"');
    const parsedObject = JSON.parse(fixedText);
    let formattedText = '';

    for (const key in parsedObject) {
      const formattedValue =
        typeof parsedObject[key] === 'number'
          ? parsedObject[key] % 1 === 0
            ? parsedObject[key].toLocaleString('en-US')
            : parsedObject[key].toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
          : parsedObject[key];

      const formattedKey = key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^([a-z])/, (match) => match.toUpperCase());

      formattedText += `${formattedKey}: ${formattedValue}\n`;
    }

    formattedText = formattedText.slice(0, -2);

    return formattedText;
  };

  const hanldeTextChange = () => {
    message && message.trim() !== ''
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true);
  };

  useEffect(() => {
    hanldeTextChange();
  }, [message]);

  return (
    <>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <NavDashboard section="Habla con Constanza" svg={svg} />

      <div className={isDarkMode ? 'darkMode' : 'lightMode'}>
        <form
          className={`wrapper min-h-[80vh] pt-5 ${
            isDarkMode ? 'bg-[#151515]' : 'bg-white'
          } `}
        >
          <div className="relative z-10 bg-chat">
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
                      {!message.isUser &&
                        jsonContent.function === 'AltaProveedores' && (
                          <div></div>
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
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-[20px] p">
              <div className="flex flex-col w-full justify-start">
                <div className="flex justify-start ml-2">
                  <div className="flex justify-start">
                    {json.answer === 'Pensando..' ? (
                      <img
                        src="/images/Constanzapensando.gif"
                        width={40}
                        height={40}
                        alt="gif"
                        className="mr-2"
                      />
                    ) : json.answer === 'Puedes Abrir el cuestionario' ? (
                      <Image
                        src="/images/Constanzaespera.gif"
                        width={40}
                        height={40}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : json.answer.includes('Error') ? (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={40}
                        height={40}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : json.answer === 'Esperando' ? (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={40}
                        height={40}
                        alt="pig"
                        className="mr-2"
                      />
                    ) : (
                      <Image
                        src="/images/ConstanzaLogo_00000.png"
                        width={40}
                        height={40}
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
                  className="text-input"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    hanldeTextChange;
                  }}
                />
              </div>
              <div className="flex justify-between items-center btns-chat">
                <div>
                  <button
                    className={`button ${
                      isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                  >
                    <img
                      src="./images/svg/send.png"
                      alt="Send"
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
                <div>
                  <button
                    className="button"
                    onClick={toggleRecognition}
                    type="button"
                  >
                    {isListening ? (
                      <img
                        src="./images/svg/record.png"
                        alt="Play"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <img
                        src="./images/svg/micro.png"
                        alt="Play"
                        width={30}
                        height={30}
                      />
                    )}
                  </button>
                </div>
                <div>
                  <button className="button" onClick={playAudio}>
                    <img
                      src="./images/svg/playblack.png"
                      alt="Play"
                      width={30}
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
    </>
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
*/
