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

const CompraSchema = new mongoose.Schema(
  {
    cantidadT: Number,
    celular: Number,
    colonia: String,
    coloniaCompra: String,
    coloniaFactura: String,
    condicionesEntrega: String,
    correo: String,
    correoCompra1: String,
    cp: Number,
    cpCompra: Number,
    denominacion: String,
    denominacionCompra: String,
    descripcion: String,
    estado: String,
    estadoCompra: String,
    exterior: String,
    exteriorCompra: String,
    fechaCompra: String,
    formaFactura: String,
    interior: String,
    interiorCompra: String,
    municipio: String,
    municipioCompra: String,  
    nombreCompra: String,
    nombreElaborado: String,
    ordenCompra: String,
    pagoFactura: String,
    partida: String,
    pu: String,
    puestoElaborado: String,
    telefono: Number,
    telefonoCompra: Number,
    tiempoEntrega: String,
    tipoCambio: String,
    total: Number,
    vialidad: String,
    vialidadCompra: String,
  },
  {
    collection: 'compra',
    versionKey: false,
  }
);

const Compra = db.model('Compra', CompraSchema);

app.get('/getAllCompra', async (req, res) => {
  try {
    const solicitudes = await Compra.find({ estatus: 0 });
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res
      .status(500)
      .json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});

app.post('/addCompra', async (req, res) => {
  try {
    const newCompra = req.body;
    const nuevaSolicitud = new Compra({
      cantidadT: newCompra.cantidadT,
      colonia: newCompra.colonia,
      coloniaCompra: newCompra.coloniaCompra,
      coloniaFactura: newCompra.coloniaFactura,
      condicionesEntrega: newCompra.condicionesEntrega,
      correo: newCompra.correo,
      correoCompra1: newCompra.correoCompra1,
      cp: newCompra.cp,
      cpCompra: newCompra.cpCompra,
      denominacion: newCompra.denominacion,
      denominacionCompra: newCompra.denominacionCompra,
      descripcion: newCompra.descripcion,
      estado: newCompra.estado,
      estadoCompra: newCompra.estadoCompra,
      exterior: newCompra.exterior,
      exteriorCompra: newCompra.exteriorCompra,
      fechaCompra: newCompra.fechaCompra,
      formaFactura: newCompra.formaFactura,
      interior: newCompra.interior,
      interiorCompra: newCompra.interiorCompra,
      municipio: newCompra.municipio,
      municipioCompra: newCompra.municipioCompra,
      nombreCompra: newCompra.nombreCompra,
      nombreElaborado: newCompra.nombreElaborado,
      ordenCompra: newCompra.ordenCompra,
      pagoFactura: newCompra.pagoFactura,
      partida: newCompra.partida,
      pu: newCompra.pu,
      puestoElaborado: newCompra.puestoElaborado,
      telefono: newCompra.telefono,
      telefonoCompra: newCompra.telefonoCompra,
      tiempoEntrega: newCompra.tiempoEntrega,
      tipoCambio: newCompra.tipoCambio,
      total: newCompra.total,
      vialidad: newCompra.vialidad,
      vialidadCompra: newCompra.vialidadCompra,
    });

    await nuevaSolicitud.save();

    res.status(201).json({ mensaje: 'Compra guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la compra:', error);
    res.status(500).json({ mensaje: 'Error al guardar la compra' });
  }
});


const PORT = 3090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
