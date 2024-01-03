const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module
const app = express();
app.use(cors());
app.use(express.json());
const config = require('../../../config.json');
const mongoUrl = config.mongodesarrollo;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
const db = mongoose.connection.useDb("prototipoGranjaChilac");
db.on('error', console.error.bind(console, 'Error al conectar a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

const SolicitudCerdoSchema = new mongoose.Schema(
  {
    lote: String,
    tipo: String,
    cantidad: Number,
    fechaLicitacion: String,
    fechaDia0: String, //Fecha en que salen de la granja nucleo
    status: String,
  },
  {
    collection: 'compraCerdos',
    versionKey: false,
  }
);

const SolicitudCerdo = db.model('SolicitudCerdo', SolicitudCerdoSchema);

app.get("/getAllSolicitudCerdo", async (req, res) => {
  try {
    // Consulta todas las solicitudes de cerdo desde la base de datos
    const solicitudes = await SolicitudCerdo.find().limit(15);;

    // Responde con las solicitudes en formato JSON
    res.json(solicitudes);
  } catch (error) {
    // Maneja los errores y responde con un código de estado 500 (Error interno del servidor)
    console.error("Error al obtener las solicitudes de cerdo:", error);
    res.status(500).send("Error interno del servidor");
  }
});

const PORT = 3087;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
