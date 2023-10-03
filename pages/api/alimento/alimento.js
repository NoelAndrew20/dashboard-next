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

const alimentoSchema = new mongoose.Schema(
  {
    fecha: Date,
    nombreAlimento: String,
    tipo: Number,
    proteina: Number,
    precio: Number,
    precioVariable: Number,
  },
  {
    collection: 'alimento',
    versionKey: false,
  }
);

const SolicitudAlimento = db.model('alimento', alimentoSchema);

app.get("/getAllalimentot0", async (req, res) => {
  try {
    const solicitudes = await SolicitudAlimento.find({ tipo: 0});
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});

app.get("/getAllalimentot1", async (req, res) => {
  try {
    const solicitudes = await SolicitudAlimento.find({ tipo: 1});
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});

app.get("/getAllalimentot2", async (req, res) => {
  try {
    const solicitudes = await SolicitudAlimento.find({ tipo: 2});
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});


app.post("/addAlimento", async (req, res) => {
  try {
    let tipo = 0;
    const newAlimento = req.body[0];
    if (newAlimento.tipoV === "alimentos") {
      tipo = 0;
    }
    if (newAlimento.tipoV === "complemento alimento") {
      tipo = 1;
    }
    if (newAlimento.tipoV === "complemento extra") {
      tipo = 2;
    }
    const nuevoAlimento = new SolicitudAlimento({
      fecha: Date.now(),
      nombreAlimento: newAlimento.nombreAlimentoV,
      tipo: tipo,
      proteina: newAlimento.proteinaV,
      precio: newAlimento.precioV,
      precioVariable: newAlimento.precioVariableV,
    });

    await nuevoAlimento.save(); // Guarda el nuevo alimento en la base de datos

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});
  
const PORT = 3081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

