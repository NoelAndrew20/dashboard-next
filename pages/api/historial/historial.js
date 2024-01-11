const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../../../config.json');
const mongoUrl = config.mongodesarrollo;
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => console.log(e));

const db = mongoose.connection.useDb('prototipoGranjaCancun');
db.on(
  'error',
  console.error.bind(console, 'Error al conectar a la base de datos:')
);
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

const HistorialSchema = new mongoose.Schema(
  {
    fecha: String,
    etapas: [
      {
        area: String,
        total: Number,
        tipoAlimento: String,
        cantidadKg: Number,
      },
    ],
  },
  {
    collection: 'historial',
    versionKey: false,
  }
);

const SolicitudHistorial = db.model('SolicitudHistorial', HistorialSchema);
app.get('/getAllSolicitudHistorial', async (req, res) => {
  try {
    const solicitud = await SolicitudHistorial.find();
    if (solicitud.length === 0) {
      return res
        .status(404)
        .json({
          mensaje: 'No se encontraron solicitudes de compra de alimentos',
        });
    }
    res.status(200).json(solicitud);
  } catch (error) {
    console.error(
      'Error al obtener las solicitudes de compra de alimentos:',
      error
    );
    res
      .status(500)
      .json({
        mensaje: 'Error al obtener las solicitudes de compra de alimentos',
      });
  }
});

const PORT = 3142;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
