//CRUD Registro de Solicitudes
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../../../config.json');
const mongoUrl = config.mongodesarrollo;
const nodemailer = require('nodemailer');
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

const asuntoCorreo = 'Nueva licitacion';
const mensajeCorreo = 'Hay una nueva licitacion disponible para ti.';

async function enviarCorreosProveedores(tipoProveedor) {
  try {
    const proveedores = await Proveedor.find(
      { tipoProveedor },
      { _id: 0, correo: 1 }
    );

    for (const proveedor of proveedores) {
      const destinatarioCorreo = proveedor.correo;
      await enviarCorreo(destinatarioCorreo, asuntoCorreo, mensajeCorreo);
    }

    console.log(
      `Correos enviados exitosamente a proveedores de ${tipoProveedor.toLowerCase()}.`
    );
  } catch (error) {
    console.error(
      `Error al obtener los correos de proveedores de ${tipoProveedor.toLowerCase()} o al enviar los correos: `,
      error
    );
    throw new Error(
      `Error al procesar la solicitud de correos a proveedores de ${tipoProveedor.toLowerCase()}.`
    );
  }
}

async function enviarCorreo(destinatario, asunto, cuerpoMensaje) {
  const remitente = 'proyectoConstanza01@gmail.com';
  const password = 'ndqnuiihqxwscxna';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: remitente,
      pass: password,
    },
  });

  //const firmaImagen = fs.readFileSync(path.join(__dirname, '/ConstanzaCorreo.jpg'), 'base64');
  //<img src="data:image/jpg;base64,${firmaImagen}" alt="Firma">
  const firmaImagenURL =
    'https://images.unsplash.com/photo-1705179910388-2e27559c3f39?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const firmaHTML = `
  <p>Atentamente: </p>
  <img src="${firmaImagenURL}" alt="Firma">
`;

  const mensaje = {
    from: remitente,
    to: destinatario,
    subject: asunto,
    //text: cuerpoMensaje,
    html: `${cuerpoMensaje}<br><br>${firmaHTML}`,
  };

  try {
    const info = await transporter.sendMail(mensaje);
    console.log('Correo enviado a', destinatario, ':', info.response);
  } catch (error) {
    console.error('Error al enviar el correo a', destinatario, ':', error);
  }
}

const ProveedorSchema = new mongoose.Schema(
  {
    fecha: Date,
    id: { type: Number, unique: true, required: true, default: 0 },
    idProveedor: String,
    tipoProveedor: String,
    denominacion: String,
    rfc: String,
    regimenCapital: String,
    cp: Number,
    vialidad: String,
    exterior: String,
    interior: String,
    colonia: String,
    localidad: String,
    municipio: String,
    entidad: String,
    actividadesEconomicas: [
      {
        orden: String,
        actividad: String,
        porcentaje: String,
        fechaInicio: String,
        fechaFin: String,
      },
    ],
    regimenes: [
      {
        descripcion: String,
        fechaInicio: String,
        fechaFin: String,
      },
    ],
    productos: [
      {
        ID: String,
        SKU: String,
        nombre: String,
        unidad: String,
        precio: Number,
      },
    ],
    correo: String,
    nombre: String,
    telefono: Number,
    estatuscorreo: Number,
  },
  {
    collection: 'proveedor',
    versionKey: false,
  }
);

const SolicitudCompraSchema = new mongoose.Schema(
  {
    fecha: Date,
    numeroSolicitud: Number,
    nombreSolicitud: String,
    nombreSolicitante: String,
    estadoSolicitud: Number,
    tipoDeLicitacion: String,
    solicitud: [
      {
        nombre: String,
        cantidad: Number,
        fechaEntrega: String,
        estatus: Number,
        unidad: String,
      },
    ],
  },
  {
    collection: 'solicitudCompra',
    versionKey: false,
  }
);

const SolicitudCompra = db.model('SolicitudCompra', SolicitudCompraSchema);
const Proveedor = db.model('Proveedor', ProveedorSchema);

app.get('/getAllSolicitudCompra', async (req, res) => {
  try {
    const { tipoDeLicitacion } = req.query;
    const unaSemanaAtras = new Date();
    unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);
    const solicitudesCompra = await SolicitudCompra.find({
      tipoDeLicitacion,
      fecha: { $gte: unaSemanaAtras },
    });

    if (solicitudesCompra.length === 0) {
      return res.status(404).json({
        mensaje:
          'No se encontraron solicitudes de compra para el tipo de licitación en la última semana',
      });
    }

    res.status(200).json(solicitudesCompra);
  } catch (error) {
    console.error('Error al obtener las solicitudes de compra:', error);
    res.status(500).json({
      mensaje: 'Error al obtener las solicitudes de compra',
    });
  }
});

app.post('/addSolicitudCompraCerdo', async (req, res) => {
  try {
    const newAlimento = req.body;
    let tipoDeLicitacion = 'Vientre';
    let unidad = 'Pza';
    const ultimaSolicitud = await SolicitudCompra.findOne({})
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
        nombre: item.raza,
        cantidad: item.cantidad,
        fechaEntrega: item.fechaEntrega,
        estatus: 0,
        unidad: unidad,
      })),
    };
    const nuevaSolicitudCompra = new SolicitudCompra(solicitudCompra);

    await nuevaSolicitudCompra.save();

    await enviarCorreosProveedores('Vientre');

    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});

app.post('/addSolicitudCompraAlimento', async (req, res) => {
  try {
    const newAlimento = req.body;
    let tipoDeLicitacion = 'Alimento';

    const nombresAlimentos = req.body.solicitudes.map(item => item.nombreAlimento);
    let nombreSolicitud = `Abastecimiento de ${nombresAlimentos.join(', ')}`;
    
    const ultimaSolicitud = await SolicitudCompra.findOne({})
      .sort({ numeroSolicitud: -1 })
      .select('numeroSolicitud');
    let nuevoNumeroSolicitud = 1;
    if (ultimaSolicitud) {
      nuevoNumeroSolicitud = ultimaSolicitud.numeroSolicitud + 1;
    }
    const solicitudCompra = {
      fecha: Date.now(),
      numeroSolicitud: nuevoNumeroSolicitud,
      nombreSolicitud: nombreSolicitud,
      nombreSolicitante: req.body.responsable,
      estadoSolicitud: 0,
      tipoDeLicitacion: tipoDeLicitacion,
      solicitud: req.body.solicitudes.map((item) => ({
        nombre: item.nombreAlimento,
        cantidad: item.cantidad,
        fechaEntrega: item.fechaEntrega,
        estatus: 0,
        unidad: item.unidad,
      })),
    };
    const nuevaSolicitudCompra = new SolicitudCompra(solicitudCompra);

    await nuevaSolicitudCompra.save();

    await enviarCorreosProveedores('Alimento');

    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});

app.post('/addSolicitudCompraVacuna', async (req, res) => {
  try {
    const newAlimento = req.body;
    let tipoDeLicitacion = 'Vacuna';
    const ultimaSolicitud = await SolicitudCompra.findOne({})
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
        nombre: item.nombre,
        cantidad: item.cantidad,
        fechaEntrega: item.fechaEntrega,
        estatus: 0,
        unidad: item.unidad,
      })),
    };
    const nuevaSolicitudCompra = new SolicitudCompra(solicitudCompra);

    await nuevaSolicitudCompra.save();

    await enviarCorreosProveedores('Vacuna');

    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});



app.put('/editLicitacion/:nombre/:cantidad', async (req, res) => {
  try {
    const nombreAlimento = req.params.nombre;
    const cantidad = req.params.cantidad;
    const updateData = { estatus: 1 };
    const existingLicitacion = await SolicitudCompra.findOne({
      'solicitud.nombre': nombre,
      'solicitud.cantidad': cantidad,
    });
    if (!existingLicitacion) {
      return res.status(404).json({ message: 'Licitación no encontrada' });
    }
    if (existingLicitacion.solicitud.estatus !== 1) {
      const updatedLicitacion = await SolicitudCompra.findOneAndUpdate(
        {
          'solicitud.nombre': nombre,
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

const PORT = 3086;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
