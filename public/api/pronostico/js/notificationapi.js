const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Servidor Socket.IO en ejecución');
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Escucha el evento 'notification' proveniente del código Python
  socket.on('notification', (data) => {
    console.log('Evento de notificación recibido desde Python:', data);

    // Emite una señal al cliente Next.js
    io.emit('notificationReceived',data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
