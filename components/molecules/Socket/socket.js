// import { useEffect } from 'react';
// import io from 'socket.io-client';

// let socket;

// export const initSocket = () => {
//   socket = io('http://localhost:5000/api/pronostico/python/Constanza_v123/Constanza_v1_3/apichat_v13'); // Cambia la URL al servidor Flask

//   socket.on('diccionario-generado', () => {
//     // Ejecuta la función del lado del cliente cuando se recibe el mensaje
//     // Aquí puedes llamar a la función o realizar acciones del lado del cliente
//     console.log('Mensaje "diccionario generado" recibido desde el servidor');
//     // Ejemplo: ejecutarFuncionCliente();
//   });
// };

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//   }
// };

// const Socket = () => {
//   useEffect(() => {
//     initSocket();

//     return () => {
//       disconnectSocket();
//     };
//   }, []);

//   return null;
// };

// export default Socket;
