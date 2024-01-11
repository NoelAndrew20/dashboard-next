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

const SimulacionSchema = new mongoose.Schema(
  {
    Total: Number,
    Alimento: String,
    InversionAlimento: Number,
    KgConsumidos: Number,
    InversionMedicamento: Number,
    Medicamentos: {
      type: Map,
      of: {
        Cant: Number,
        Inversion: Number,
      },
    },
  },
  {
    collection: 'simulacionGranjaFront',
    versionKey: false,
  }
);

const dataSchema = new mongoose.Schema({
  Fecha: String,
  Transporte: SimulacionSchema,
  Cuarentena: SimulacionSchema,
  Gestacion1: SimulacionSchema,
  Maternidad1: SimulacionSchema,
  Zen1: SimulacionSchema,
  Gestacion2: SimulacionSchema,
  Maternidad2: SimulacionSchema,
  Zen2: SimulacionSchema,
  Gestacion3: SimulacionSchema,
  Maternidad3: SimulacionSchema,
  Zen3: SimulacionSchema,
  Gestacion4: SimulacionSchema,
  Maternidad4: SimulacionSchema,
  Zen4: SimulacionSchema,
  Gestacion5: SimulacionSchema,
  Maternidad5: SimulacionSchema,
  Zen5: SimulacionSchema,
  Gestacion6: SimulacionSchema,
  Maternidad6: SimulacionSchema,
  Zen6: SimulacionSchema,
  Gestacion7: SimulacionSchema,
  Maternidad7: SimulacionSchema,
  Lechon: SimulacionSchema,
  DesarrolloA: SimulacionSchema,
  DesarrolloB: SimulacionSchema,
  CerdoEngordaA: SimulacionSchema,
  CerdoEngordaB: SimulacionSchema,
  CerdoEngordaC: SimulacionSchema,
  CerdoEngordaD: SimulacionSchema,
});

const Simulacion = db.model('Simulacion', SimulacionSchema);
app.get('/getAllSimulacion', async (req, res) => {
  try {
    const simulacion = await Simulacion.find();
    if (simulacion.length === 0) {
      return res
        .status(404)
        .json({ mensaje: 'No se encontraron simulaciones de granja' });
    }
    res.status(200).json(simulacion);
  } catch (error) {
    console.error('Error al obtener las simulaciones de granja:', error);
    res
      .status(500)
      .json({ mensaje: 'Error al obtener las simulaciones de granja' });
  }
});

const PORT = 3141;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
