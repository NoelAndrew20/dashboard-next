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

const db = mongoose.connection.useDb("C3_LaPurisima");
db.on('error', console.error.bind(console, 'Error al conectar a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

const solicitudCerdoSchema = new mongoose.Schema(
    {
        fecha: Date,
        raza: String,
        precio: Number,
        precioVariable: Number,
        pesoMinimo: Number,
        responsable: String,
        lote: String,
        historialMedico: [
            {
            vacuna: String,
            },
        ]
    },
    {
        collection: 'solicitudCerdo',
        versionKey: false,
    }
);

const SolicitudCerdo = db.model('solicitudCerdo', solicitudCerdoSchema);

app.get("/getAllSolicitudCerdo", async (req, res) => {
  try {
    const solicitudes = await SolicitudCerdo.find({ });
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de solicitudCerdo:', error);
    res.status(500).json({ mensaje: 'Error al obtener las solicitudes de solicitudCerdo' });
  }
});


app.post("/addCerdo", async (req, res) => {
  try {
    const newAlimento = req.body[0];
    console.log (newAlimento);
    const nuevoSolicitudCerdo = new SolicitudCerdo({
      fecha: Date.now(),
      raza: newAlimento.razaV,
      precio: newAlimento.precioV,
      precioVariable: newAlimento.precioVariableV,
      pesoMinimo: newAlimento.pesoMinV,
      responsable: newAlimento.responsable,
      lote: '12345',
      historialMedico: [
        {
          vacuna: 'vacuna 1',
        },
      ],
    });

    await nuevoSolicitudCerdo.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});


const PORT = 3085;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
