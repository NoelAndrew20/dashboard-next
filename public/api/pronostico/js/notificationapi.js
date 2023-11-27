const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 3001;
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de CORS
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
dbMongo = 'basePruebasJesus';
collection = 'alerta';
const db = mongoose.connection.useDb("basePruebaJesus");

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB Base de Datos basePruebaJesus');
});

// Definir un modelo para la colección alerta
const Alerta = mongoose.model('Alerta', { mensaje: String });

// Ruta para obtener alertas
app.get('/api/alertas', async (req, res) => {
  try {
    // Obtiene los mensajes de la colección alerta
    const alertas = await Alerta.find();
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener alertas de la colección' });
  }
});

// Ruta para agregar una alerta
app.post('/api/notificar', async (req, res) => {
  try {
    // Asumiendo que recibes el contenido de la alerta en el cuerpo de la solicitud
    const { mensaje } = req.body;

    // Guarda la alerta en la colección alerta
    const nuevaAlerta = new Alerta({ mensaje });
    await nuevaAlerta.save();

    // Envia una respuesta exitosa
    res.status(201).json({ success: true, message: 'Alerta guardada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la alerta en la colección' });
  }
});

// Configuración de cambio de transmisión para la colección alerta
const alertaStream = Alerta.watch();

// Maneja los eventos de cambio de transmisión
alertaStream.on('change', (change) => {
  console.log('Cambio en la colección alerta:', change);

  // Aquí puedes notificar a tu aplicación Next.js sobre el cambio
  // Puedes utilizar sockets, eventos, o cualquier otro método para notificar a la aplicación cliente
  // Por ejemplo, puedes emitir un evento de socket.io
  io.emit('nuevoAlerta', { mensaje: '¡Nueva alerta disponible!' });
});

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`Servidor de API en ejecución en http://localhost:${PORT}`);
});