const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Definición del modelo
const Cerdo = mongoose.model('Cerdo', {
  RFID: String, // Ajusta el tipo de dato según tu colección
  // Otros campos de tu colección
});

// Evento de conexión exitosa
db.on('connected', () => {
  console.log('Conexión a MongoDB establecida');
});

// Evento de error
db.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

// Consulta para obtener valores de la columna RFID
const obtenerRFID = async () => {
  try {
    const rfidValues = await Cerdo.distinct('RFID').exec();
    return rfidValues;
  } catch (error) {
    console.error('Error al obtener valores de RFID:', error);
    return [];
  }
};

module.exports = {
  obtenerRFID
};
