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

const generarCodigo = (fecha, metodo, nombre) => {
  const fechaSolicitud = new Date(fecha);
  const parte1 = `${fechaSolicitud.getFullYear()}${
    fechaSolicitud.getMonth() + 1
  }${fechaSolicitud.getDate()}`;
  const parte2 = metodo.substring(0, 2);
  const parte3 = nombre.substring(0, 2);
  const codigo = `${parte3}${parte1}${parte2}`;

  return codigo;
};

const SolicitudLicitacionSchema = new mongoose.Schema(
  {
    fechaSolicitud: Date,
    nombreSolicitante: String,
    numeroSolicitud: Number,
    username: String,
    tipoProveedor: String,
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
    const solicitudesCompra = await SolicitudLicitacion.find();
    if (solicitudesCompra.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron solicitudes de compra de alimentos',
      });
    }
    const uniqueAlimentos = Array.from(
      new Set(solicitudesCompra.map((item) => item.solicitud[0].nombre))
    );
    const filteredSolicitudes = uniqueAlimentos.map((alimento) => {
      const matchingSolicitudes = solicitudesCompra.filter(
        (item) => item.solicitud[0].nombre === alimento
      );
      const lowestPriceSolicitud = matchingSolicitudes.reduce(
        (min, current) =>
          current.solicitud[0].precio < min.solicitud[0].precio ? current : min,
        matchingSolicitudes[0]
      );
      return lowestPriceSolicitud;
    });
    res.status(200).json(filteredSolicitudes);
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

app.get('/getOneSolicitudLicitacion', async (req, res) => {
  try {
    const { usuario, solicitud } = req.query;
    const solicitudEncontrada = await SolicitudLicitacion.findOne({
      'username': usuario,
      'numeroSolicitud': solicitud,
    });
    if (!solicitudEncontrada) {
      return res.status(404).json({
        mensaje: 'No se encontró la solicitud de licitación para el usuario y número de solicitud proporcionados.',
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
      fechaSolicitud: newAlimento.fechaSolicitud,
      numeroSolicitud: newAlimento.numeroSolicitud,
      nombreSolicitante: newAlimento.nombreSolicitante,
      username: newAlimento.usuario,
      tipoProveedor: tipoProveedor,
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
