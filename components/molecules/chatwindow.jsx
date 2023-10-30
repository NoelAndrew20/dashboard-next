import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Howl } from 'howler';
import json from '../../public/api/pronostico/python/Constanza_v15/respuesta.json'
import Image from 'next/image';
import jsondata from '../../public/api/pronostico/python/Constanza_v15/requisitos_2.json'
import Formulario from '@/components/molecules/Formulariodinamico'
import Modal from '../atoms/Modal';
import respuesta from '../../public/api/pronostico/python/Constanza_v15/respuestacons.json'



const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(''); // Nuevo estado para el mensaje
  const [respuestaDelServidor, setRespuestaDelServidor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]); // Arreglo para almacenar los mensajes
  const audioSrc = './api/pronostico/python/Constanza_v15/respuesta.mp3';
  const [prevAnswer, setPrevAnswer] = useState('');
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
  
      if ( json.answer === 'Esperando') {
        sound.play();
      }
    }
  },);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Pregunta Next:',message);
    try {
      const response = await axios.post('http://localhost:5000/api/pronostico/python/Constanza_v15/apichat_cons_v15', {
        question: message, // Envía el contenido del textarea como 'question'
      });
      console.log(message);
      if (response.status === 200) {
        const data = response.data;
        console.log('Respuesta de Constanza JSON:', data);
        console.log('Mensaje de Constanza:', data.answer);
        console.log('Respuesta',respuestaDelServidor);
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
        console.error('Error al comunicarse con Constanza');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  
  return (
    <div className={`chat-window ${isOpen ? 'closed' : ''}`}>
      <div className="chat-header" onClick={toggleChat}>
        <div className='constanza_gif'></div>
        <img src="/Logos/Constanzalogo16.png" alt="Constanza Logo" className="mr-12"></img>
        Simulación de Constanza
      </div>
      {isOpen && (
        <div className="chat-content">
          <div className="input-container">

          <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={index % 2 === 0 ? "user-message" : "server-message"}>
                  {msg}
                </div>
              ))}
            </div>
            <div>
              <Modal isOpen={isModalOpen} onClose={cerrarModal}>
                  <Formulario jsonFile="requisitos_2" closeModal={cerrarModal}/>
              </Modal></div> 
            <form className='max-w-xl w-full'>
                <div className='flex flex-row bg-blue-100 rounded-md text-lg text-black'>
                      <div className=''>
                        {json.answer === 'Pensando..' ? (
                            <img
                              src="/images/CerdoChido.gif"
                              width={150}
                              height={150}
                              alt="gif"
                              className="mr-2"
                            />
                          ) : json.answer === 'Puedes Abrir el cuestionario' ? (
                            <Image
                              src="/images/Cerdocomiendo.gif"
                              width={150}
                              height={150}
                              alt="pig"
                              className="mr-2"
                            />
                          ) : json.answer.includes('Error')?(
                            <Image
                              src="/images/Cerdomorido.gif"
                              width={150}
                              height={150}
                              alt="pig"
                              className="mr-2"
                            />
                          ): json.answer === 'Esperando' ? (
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
                      <div className='text-const w-100'>
                        {<p className='font-bold'>{json.answer}</p>}
                      </div>
                </div>
                <div>
                  <textarea
                  id="message-input"
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  className='text-black mt-5 bg-slate-300 px-3 py-2 w-full text-lg rounded-md focus:outline-none'
                  value={message} // Establece el valor del textarea según el estado
                  onChange={handleChange} // Captura los cambios en el textarea
                ></textarea>
                  <div className='grid justify-items-left ml-60'>
                    <button className="flex bg-red-900 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none" onClick={abrirModal}><img src={"/images/svg/form.svg"} width={20} height={20} ></img>Formulario</button>
                    <button className="bg-red-900 mt-5 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none" onClick={handleSubmit}>Enviar</button>
                  </div>
                </div>
                <div className='flex bg-red w-200 h-200'>
                  {<p className='font-bold'>Constanza:{respuesta.answer}</p>}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
