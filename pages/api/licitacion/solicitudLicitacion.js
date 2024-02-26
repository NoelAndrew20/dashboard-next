//CRUD Licitacion de Alimentos guarda modal de solicitudes de licitacion
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

const generarCodigo = (fechaParametro, metodo, nombre) => {
  const fecha = new Date(fechaParametro);
  const parte1 = `${fecha.getFullYear()}${
    fecha.getMonth() + 1
  }${fecha.getDate()}`;
  const parte2 = metodo.substring(0, 2);
  const parte3 = nombre.substring(0, 2);
  const codigo = `${parte3}${parte1}${parte2}`;

  return codigo;
};

const SolicitudLicitacionSchema = new mongoose.Schema(
  {
    fecha: Date,
    estadoSolicitud: Number,
    tipoDeLicitacion: String,
    nombreSolicitante: String,
    numeroSolicitud: Number,
    username: String,
    solicitud: [
      {
        codigo: String,
        cantidad: Number,
        unidad: String,
        fecha: Date,
        lugar: String,
        metodo: String,
        nombre: String,
        pago: String,
        plazo: Number,
        plazoTipo: String,
        fechaEntrega: String,
        precio: Number,
        costoUnitario: Number,
        tipoM: String,
        impuesto: String,
        estatus: Number,
      },
    ],
  },
  {
    collection: 'solicitudLicitacion',
    versionKey: false,
  }
);

const SolicitudLicitacion = db.model(
  'SolicitudLicitacion',
  SolicitudLicitacionSchema
);

app.get('/getAllSolicitudLicitacion', async (req, res) => {
  try {
    const solicitudes = await SolicitudLicitacion.find( );
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res
      .status(500)
      .json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});

app.get('/getLicitaciones1', async (req, res) => {
  try {
    const { usuario } = req.query;

    const solicitudes = await SolicitudLicitacion.find(
      {
        username: usuario,
        estadoSolicitud: 1,
      },
      { numeroSolicitud: 1, _id: 0 }
    );

    if (solicitudes.length === 0) {
      return res.status(404).json({
        mensaje:
          'No se encontraron solicitudes con estado 1 para el usuario proporcionado',
      });
    }

    res.status(200).json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes:', error);
    res.status(500).json({
      mensaje: 'Error al obtener las solicitudes',
    });
  }
});

app.get('/getSolicitudEstatus1', async (req, res) => {
  try {
    const { usuario } = req.query;

    const solicitudEstatus1 = await SolicitudLicitacion.aggregate([
      { $match: { username: usuario } },
      { $unwind: '$solicitud' },
      { $match: { 'solicitud.estatus': 1 } },
      { $project: { numeroSolicitud: 1, 'solicitud.nombre': 1, _id: 0 } },
    ]);

    res.json(solicitudEstatus1);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/getOneSolicitudLicitacion', async (req, res) => {
  try {
    const { usuario, solicitud } = req.query;
    const solicitudEncontrada = await SolicitudLicitacion.findOne({
      username: usuario,
      numeroSolicitud: solicitud,
    });
    if (!solicitudEncontrada) {
      return res.status(404).json({
        mensaje:
          'No se encontró la solicitud de licitación para el usuario y número de solicitud proporcionados.',
      });
    }
    res.status(200).json(solicitudEncontrada);
  } catch (error) {
    console.error('Error al obtener la solicitud de licitación:', error);
    res.status(500).json({
      mensaje: 'Error al obtener la solicitud de licitación',
    });
  }
});

app.post('/addSolicitudLicitacion', async (req, res) => {
  try {
    const newAlimento = req.body;
    const solicitudesCompra = await SolicitudLicitacion.find({
      'solicitud.0.estatus': 1,
      username: newAlimento.usuario,
      numeroSolicitud: newAlimento.numeroSolicitud,
      'solicitud.0.nombre': newAlimento.nombre,
    });
    if (solicitudesCompra.length > 0) {
      return res.status(400).json({ mensaje: 'Licitación ya creada' });
    }
    const primerCaracter = newAlimento.usuario[0];
    const segundoCaracter = newAlimento.usuario[1];
    let tipoProveedor;
    if (primerCaracter === 'A' && segundoCaracter === 'l') {
      tipoProveedor = 'Alimento';
    } else if (primerCaracter === 'V' && segundoCaracter === 'a') {
      tipoProveedor = 'Vacuna';
    } else if (primerCaracter === 'V' && segundoCaracter === 'i') {
      tipoProveedor = 'Vientres';
    } else {
      tipoProveedor = 'Tipo Desconocido';
    }
    const codigo = generarCodigo(
      newAlimento.fechaSolicitud,
      newAlimento.metodo,
      newAlimento.nombre
    );
    const nuevaSolicitud = new SolicitudLicitacion({
      fecha: newAlimento.fechaSolicitud,
      nombreSolicitud: newAlimento.nombreSolicitud,
      estadoSolicitud: 0,
      tipoDeLicitacion: tipoProveedor,
      numeroSolicitud: newAlimento.numeroSolicitud,
      nombreSolicitante: newAlimento.nombreSolicitante,
      username: newAlimento.usuario,
      solicitud: [
        {
          codigo: codigo,
          cantidad: newAlimento.cantidad,
          unidad: newAlimento.unidad,
          fecha: newAlimento.fecha,
          lugar: newAlimento.lugar,
          metodo: newAlimento.metodo,
          nombre: newAlimento.nombre,
          pago: newAlimento.pago,
          plazo: newAlimento.plazo,
          plazoTipo: newAlimento.plazoTipo,
          fechaEntrega: newAlimento.fechaEntrega,
          precio: newAlimento.precio,
          costoUnitario: newAlimento.costoUnitario,
          tipoM: newAlimento.tipoM,
          impuesto: newAlimento.impuesto,
          estatus: 1,
        },
      ],
    });

    await nuevaSolicitud.save();

    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});

const PORT = 3083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
