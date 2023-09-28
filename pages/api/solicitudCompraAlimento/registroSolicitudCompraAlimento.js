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


/*app.get("/getAllSolicitudCompraAlimento", async (req, res) => {
  try {
    // Consulta la base de datos para obtener todas las solicitudes de alimentos
    const solicitudes = await SolicitudAlimento.find({ estatus: 1 });

    // Envía las solicitudes al cliente en formato JSON
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});



app.post("/addAlimento", async (req, res) => {
  try {
    const newAlimento = req.body;
    console.log(newAlimento);
      // Crea una instancia del modelo Entrega con los datos recibidos del cliente
      const nuevaSolicitud = new SolicitudAlimento({
        fecha: Date.now(),
        nivelEntrega: req.body.nivelEntrega,
        fechaEntrega: req.body.fechaEntrega,
        nombreZona: req.body.nombreZona,
        nombreSolicitante: req.body.nombreSolicitante,
        estatus: 0,
        lotes: req.body.lotes
      });

      // Guarda la nueva entrega en la base de datos
      await nuevaSolicitud.save();

      // Envía una respuesta al cliente
      res.status(201).json({ mensaje: 'Entrega guardada correctamente' });
  } catch (error) {
      console.error('Error al guardar la entrega:', error);
      res.status(500).json({ mensaje: 'Error al guardar la entrega' });
  }
});


app.put('/editAlimento', async (req, res) => {
  try {
    const newData = req.body;

    const updatedAlimento = await SolicitudAlimento.findOneAndUpdate(
      { fecha: newData.fecha }, // Filtro por _id o el campo adecuado
      { $set: newData }, // Los nuevos datos a actualizar
      { new: true }
    );

    // Si updatedAlimento es null, significa que no se encontró el alimento
    if (!updatedAlimento) {
      return res.status(404).json({ message: 'Alimento no encontrado' });
    }

    res.status(200).json({ message: 'Datos actualizados con éxito', data: updatedAlimento });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});*/

const PORT = 3081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

