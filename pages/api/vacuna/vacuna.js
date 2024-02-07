//Crud de vacunas
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

const vacunaSchema = new mongoose.Schema(
  {
    tipo: Number,
    precio: Number,
    nomenclatura: String,
    componenteActivo: String,
    tipoDeCerdo: String,
    dosis: String,
    aguja: String,
    nombre: String,
    fecha: Date,
  },
  {
    collection: 'vacuna',
    versionKey: false,
  }
);

const Vacuna = db.model('vacuna', vacunaSchema);

app.get('/getAllvacunas', async (req, res) => {
  try {
    const solicitudes = await Vacuna.find({ });
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de vacunas:', error);
    res
      .status(500)
      .json({ mensaje: 'Error al obtener las solicitudes de vacunas' });
  }
});

app.post('/addVacuna', async (req, res) => {
  try {
    let tipo = 0;
    const newVacuna = req.body[0];
    if (newVacuna.tipo === 'preventivo') {
      tipo = 0;
    }
    if (newVacuna.tipo === 'correctivo') {
      tipo = 1;
    }
    const nuevoVacuna = new Vacuna({
      fecha: Date.now(),
      nombre: newVacuna.nombre,
      tipo: tipo,
      dosis: newVacuna.dosis,
      precio: newVacuna.precio,
      nomenclatura: newVacuna.nomenclatura,
      componenteActivo: newVacuna.activos,
    });

    await nuevoVacuna.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

const PORT = 3088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
