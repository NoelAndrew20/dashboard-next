import React, { useState } from 'react';


const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async () => {
    const num_lotes = document.getElementById('num_lotes').value;
    const num_cerdos_por_lote = document.getElementById('num_cerdos_por_lote').value;
    const num_lechones = document.getElementById('num_lechones').value;
    const segundos_por_dia = document.getElementById('segundos_por_dia').value;
  
    // Crear el objeto de mensaje con los valores
    const mensaje = {
      num_lotes,
      num_cerdos_por_lote,
      num_lechones,
      segundos_por_dia,
    };
  
    // Convertir el objeto de mensaje a una cadena de texto
    const mensajeStr = JSON.stringify(mensaje);

    // debe estar MangoNet activada
// conectando con el middleware
const SocketClient = require('../Class/SocketClient.js');
const middleware = new SocketClient('MyPluginName');
middleware.initialize();
let socket = middleware.socket; // cliente conectado

// Emitir un evento a la middleware, puedes agregar más variables al objeto
socket.emit('feed', {
  socketEvent: 'sensors/rfid/init', // evento que se exportará por el socket
  message: 'Datos',num_lotes,num_cerdos_por_lote,num_lechones,segundos_por_dia,
});

// Escuchar un evento de la middleware
socket.on('sensors/rfid/init', (data) => {
  // método para enviar un mensaje a un canal
  console.log(data);
});

  
  };
  
  const handleSubmit2 = async () => {
   
    // debe estar MangoNet activada
// conectando con el middleware
const SocketClient = require('../Class/SocketClient.js');
const middleware = new SocketClient('MyPluginName');
middleware.initialize();
let socket = middleware.socket; // cliente conectado

// Emitir un evento a la middleware, puedes agregar más variables al objeto
socket.emit('feed', {
  socketEvent: 'sensors/rfid/stop', // evento que se exportará por el socket
  message: 'Parar',
});

// Escuchar un evento de la middleware
socket.on('sensors/rfid/stop', (data) => {
  // método para enviar un mensaje a un canal
  console.log(data);
});

  
  };
  

  return (
    <div className={`chat-window ${isOpen ? 'closed' : ''}`}>
      <div className="chat-header" onClick={toggleChat}>
      <div className='constanza_gif'></div>
        <img src="/Logos/Constanzalogo16.png"></img>
        Simulacion de Constanza
      </div>
      {isOpen && (
      <div className="chat-content">
          <div className='avatar_message'>
            <div></div>
            <div className='message'>
            <span className='textomensaje'>Por favor, rellena los campos para que pueda
iniciar la simulación:</span>
            </div>
          </div>
            <div className='form'>
              <div className='form1'>
            <div className='avatar'>
            <img src="/Logos/Constanzalogo200avatar.png" width="60px" height="60px"></img>
            </div>
            <div className='form_inputs'>
              <div className='form_inputs_1'>
                <span>Datos para simulacion</span>
                <div className='form_inputs_2'>
                  <div>
                    <span>Numero de lotes:</span>
                    <input id="num_lotes" label="1-30" />
                  </div>
                  <div>
                    <span>Numero vientres por lote:</span>
                    <input id="num_cerdos_por_lote" />
                  </div>
                </div>
              </div>
            <div className='form_inputs_3'>
                <span>Numero lechones por vientre:</span>
                <input id="num_lechones" />
            </div>
            <span>Datos Temporales</span>
            <div className='form_inputs_4'>
                <span>Segundos por dia(para acelerar o desacelerar la simulacion)</span>
                <input id="segundos_por_dia"></input>
            </div>
            <button onClick={handleSubmit}>Iniciar Simulacion</button>
            <button id='botonparar' onClick={handleSubmit2}>Parar Simulacion</button>
            </div>
            </div>
           
        </div>
                
      </div>
      )}
    </div>
  );
};

export default ChatWindow;
