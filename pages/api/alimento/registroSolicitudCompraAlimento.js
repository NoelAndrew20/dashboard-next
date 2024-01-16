//CRUD Registro se Solicitud de Compra de Alimentos
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

const SolicitudCompraAlimentoSchema = new mongoose.Schema(
  {
    fecha: Date,
    numeroSolicitud: Number,
    nombreSolicitante: String,
    estadoSolicitud: Number,
    tipoDeLicitacion: String,
    solicitud: [
      {
        nombre: String,
        cantidad: Number,
        fechaEntrega: String,
        estatus: Number,
      },
    ],
  },
  {
    collection: 'solicitudCompraAlimento',
    versionKey: false,
  }
);

const SolicitudCompraAlimento = db.model(
  'SolicitudCompraAlimento',
  SolicitudCompraAlimentoSchema
);

app.get('/getAllSolicitudCompraAlimento', async (req, res) => {
  try {
    const unaSemanaAtras = new Date();
    unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);
    const solicitudesCompra = await SolicitudCompraAlimento.find({
      fecha: { $gte: unaSemanaAtras },
    });
    if (solicitudesCompra.length === 0) {
      return res.status(404).json({
        mensaje:
          'No se encontraron solicitudes de compra de alimentos en la última semana',
      });
    }
    res.status(200).json(solicitudesCompra);
  } catch (error) {
    console.error(
      'Error al obtener las solicitudes de compra de alimentos:',
      error
    );
    res.status(500).json({
      mensaje: 'Error al obtener las solicitudes de compra de alimentos',
    });
  }
});

app.post('/addSolicitudCompraAlimento', async (req, res) => {
  try {
    const newAlimento = req.body;
    let tipoDeLicitacion = "Alimento";
    const ultimaSolicitud = await SolicitudCompraAlimento.findOne({})
      .sort({ numeroSolicitud: -1 })
      .select('numeroSolicitud');
    let nuevoNumeroSolicitud = 1;
    if (ultimaSolicitud) {
      nuevoNumeroSolicitud = ultimaSolicitud.numeroSolicitud + 1;
    }
    const solicitudCompra = {
      fecha: Date.now(),
      numeroSolicitud: nuevoNumeroSolicitud,
      nombreSolicitante: req.body.responsable,
      estadoSolicitud: 0,
      tipoDeLicitacion: tipoDeLicitacion,
      solicitud: req.body.solicitudes.map((item) => ({
        nombre: item.nombreAlimento,
        cantidad: item.cantidad,
        fechaEntrega: item.fechaEntrega,
        estatus: 0,
      })),
    };
    const nuevaSolicitudCompra = new SolicitudCompraAlimento(solicitudCompra);

    await nuevaSolicitudCompra.save();

    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});

app.put('/editLicitacion/:nombreAlimento/:cantidad', async (req, res) => {
  try {
    const nombreAlimento = req.params.nombreAlimento;
    const cantidad = req.params.cantidad;
    const updateData = { estatus: 1 };
    const existingLicitacion = await SolicitudCompraAlimento.findOne({
      'solicitud.nombreAlimento': nombreAlimento,
      'solicitud.cantidad': cantidad,
    });
    if (!existingLicitacion) {
      return res.status(404).json({ message: 'Licitación no encontrada' });
    }
    if (existingLicitacion.solicitud.estatus !== 1) {
      const updatedLicitacion = await SolicitudCompraAlimento.findOneAndUpdate(
        {
          'solicitud.nombreAlimento': nombreAlimento,
          'solicitud.cantidad': cantidad,
        },
        { $set: { 'solicitud.$.estatus': updateData.estatus } },
        { new: true }
      );
      res.status(200).json({
        message: 'Estado actualizado con éxito',
        data: updatedLicitacion,
      });
    } else {
      res.status(400).json({
        message: 'No se puede actualizar una solicitud con estatus 1',
      });
    }
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    res.status(500).json({ message: 'Error al actualizar el estado' });
  }
});

const PORT = 3082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
