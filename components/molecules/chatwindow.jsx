import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import json from '../../public/api/pronostico/python/Constanza_v123/Constanza_v1_3/respuesta.json'
import Image from 'next/image';
//import jsondata from '../../public/api/pronostico/python/Constanza_v123/Constanza_v1_3/requisitos_2.json'
import Formulario from '@/components/molecules/Formulariodinamico'
import Modal from '../atoms/Modal';

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(''); // Nuevo estado para el mensaje
  const [respuestaDelServidor, setRespuestaDelServidor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Pregunta Next:',message);
    try {
      const response = await axios.post('http://localhost:5000/api/pronostico/python/Constanza_estable/apichat', {
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
          
            <div>
              <Modal isOpen={isModalOpen} onClose={cerrarModal}>
                  <Formulario jsonFile="requisitos_2" closeModal={cerrarModal}/>
              </Modal></div> 
            <form className='max-w-xl w-full'>
              <textarea
                id="message-input"
                type="text"
                placeholder="Escribe tu mensaje..."
                className='text-black bg-slate-300 px-3 py-2 w-full text-lg rounded-md focus:outline-none'
                value={message} // Establece el valor del textarea según el estado
                onChange={handleChange} // Captura los cambios en el textarea
              ></textarea>
              <div>
                
                <button className="bg-red-900 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none" onClick={abrirModal}>Abrir Modal</button>
              </div>
              <button className="bg-red-900 text-white border-orange-300 px-3 py-2 rounded-md focus:outline-none" onClick={handleSubmit}>Enviar</button>
              
                <div className='mr-5 flex bg-orange-300 rounded-md text-lg text-black'>
                {json.answer === 'Pensando..' ? (
    <img
      src="/images/CerdoChido.gif"
      width={100}
      height={100}
      alt="gif"
      className="mr-2"
    />
  ) : (
    <Image
      src="/images/CerdoChido.png"
      width={100}
      height={100}
      alt="pig"
      className="mr-2"
    />
  )}<p>Constanza: {json.answer}</p>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
