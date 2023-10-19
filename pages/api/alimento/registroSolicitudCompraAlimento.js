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


const SolicitudCompraAlimentoSchema = new mongoose.Schema(
  {
    fecha: Date,
    numeroSolicitud: Number,
    nombreSolicitante: String,
    solicitud: [
      {
        nombreAlimento: String,
        cantidad: Number,
      }
    ]
  },
  {
    collection: 'solicitudCompraAlimento',
    versionKey: false,
  }
  );
                

  const SolicitudCompraAlimento = db.model('SolicitudCompraAlimento', SolicitudCompraAlimentoSchema);
  app.get("/getAllSolicitudCompraAlimento", async (req, res) => {
    try {
        // Consulta todas las solicitudes de compra de alimentos en la base de datos
        const solicitudesCompra = await SolicitudCompraAlimento.find();

        // Verifica si se encontraron solicitudes de compra
        if (solicitudesCompra.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron solicitudes de compra de alimentos' });
        }

        // Envía las solicitudes de compra al cliente como respuesta
        res.status(200).json(solicitudesCompra);
    } catch (error) {
        console.error('Error al obtener las solicitudes de compra de alimentos:', error);
        res.status(500).json({ mensaje: 'Error al obtener las solicitudes de compra de alimentos' });
    }
});

app.post("/addSolicitudCompraAlimento", async (req, res) => {
  try {
    const newAlimento = req.body;
    const ultimaSolicitud = await SolicitudCompraAlimento
      .findOne({})
      .sort({ numeroSolicitud: -1 }) // Ordena en orden descendente
      .select('numeroSolicitud');

    let nuevoNumeroSolicitud = 1; // Si no hay solicitudes anteriores, inicia en 1.

    if (ultimaSolicitud) {
    nuevoNumeroSolicitud = ultimaSolicitud.numeroSolicitud + 1;
  }

    const solicitudCompra = {
      fecha: Date.now(),
      numeroSolicitud: nuevoNumeroSolicitud,
      nombreSolicitante: req.body.nombreSolicitante,
      solicitud: req.body.solicitudes  // Usa "solicitudes" en lugar de "solicitud"
    };

    // Crea una instancia del modelo SolicitudCompraAlimento con los datos ajustados
    const nuevaSolicitudCompra = new SolicitudCompraAlimento(solicitudCompra);

    // Guarda la nueva solicitud en la base de datos
    await nuevaSolicitudCompra.save();

    // Envía una respuesta al cliente
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});

  
const PORT = 3082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

