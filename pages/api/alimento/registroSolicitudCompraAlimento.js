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
    fechaSolicitud: String,
    organizacion: String,
    ubicacion: String,
    nivelEntrega: String,
    fechaEntrega: String,
    nombreZona: String,
    nombreSolicitante: String,
    lotes: [
      {
        nombreAlimento: String,
        cantidad: Number,
        unidad: String,
      }
    ]
  },
  {
    collection: 'solicitudCompraAlimento',
    versionKey: false,
  }
  );
                

  const SolicitudCompraAlimento = db.model('SolicitudCompraAlimento', SolicitudCompraAlimentoSchema);


  /*app.get("/getAllSolicitudCompraAlimento", async (req, res) => {
    console.log("aqui");
    try {
      const solicitudes = await SolicitudCompraAlimento.find({ });
      res.json(solicitudes);
    } catch (error) {
      console.error('Error al obtener las solicitudes de alimentos:', error);
      res.status(500).json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
    }
  });*/
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
      console.log(newAlimento);
        // Crea una instancia del modelo Entrega con los datos recibidos del cliente
        const nuevaSolicitudCompra = new SolicitudCompraAlimento({
          fecha: Date.now(),
          lotes: req.body.lotes,
          fechaSolicitud: req.body.fechaSolicitud,
          organizacion: req.body.organizacion,
          ubicacion: req.body.ubicacion,
          nivelEntrega: req.body.nivelEntrega,
          fechaEntrega: req.body.fechaEntrega,
          nombreZona: req.body.nombreZona,
          nombreSolicitante: req.body.nombreSolicitante
        });
  
        // Guarda la nueva entrega en la base de datos
        await nuevaSolicitudCompra.save();
  
        // Envía una respuesta al cliente
        res.status(201).json({ mensaje: 'Entrega guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar la entrega:', error);
        res.status(500).json({ mensaje: 'Error al guardar la entrega' });
    }
  });
  

/*app.get("/getAllalimentot0", async (req, res) => {
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
});*/

const PORT = 3082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
