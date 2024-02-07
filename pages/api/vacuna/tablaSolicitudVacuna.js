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
const db = mongoose.connection.useDb('C3_LaPurisima');
db.on(
  'error',
  console.error.bind(console, 'Error al conectar a la base de datos:')
);
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

const SolicitudCerdoSchema = new mongoose.Schema(
  {
    lote: String,
    tipo: String,
    cantidad: Number,
    fechaLicitacion: String,
    fechaDia0: String,
    status: String,
  },
  {
    collection: 'compraCerdos',
    versionKey: false,
  }
);

const SolicitudCerdo = db.model('SolicitudCerdo', SolicitudCerdoSchema);

app.get('/getAllSolicitudCerdo', async (req, res) => {
  try {
    const solicitudes = await SolicitudCerdo.find().limit(15);
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de cerdo:', error);
    res.status(500).send('Error interno del servidor');
  }
});

const PORT = 3089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
