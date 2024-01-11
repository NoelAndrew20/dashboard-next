const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../../../config.json');
const { ST } = require('next/dist/shared/lib/utils');
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
    correoCompra1: String,
    correoCompra2: String,
    cp: Number,
    cpCompra: Number,
    cpFactura: Number,
    denominacion: String,
    denominacionCompra: String,
    descripcion: String,
    empresa: String,
    estado: String,
    estadoCompra: String,
    estadoFactura: String,
    exterior: String,
    exteriorCompra: String,
    exteriorFactura: String,
    fechaCompra: String,
    formaFactura: String,
    interior: String,
    interiorCompra: String,
    interiorFactura: String,
    municipio: String,
    municipioCompra: String,
    municipioFactura: String,
    nombreCompra: String,
    nombreElaborado: String,
    nombreFactura: String,
    ordenCompra: String,
    pagoFactura: String,
    partida: String,
    pu: String,
    puestoElaborado: String,
    rfc: String,
    rfcFactura: String,
    telefono: Number,
    telefonoCompra: Number,
    tiempoEntrega: String,
    tipoCambio: String,
    total: Number,
    unitario: Number,
    vialidad: String,
    vialidadCompra: String,
    vialidadFactura: String,
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
      celular: newCompra.celular,
      colonia: newCompra.colonia,
      coloniaCompra: newCompra.coloniaCompra,
      coloniaFactura: newCompra.coloniaFactura,
      condicionesEntrega: newCompra.condicionesEntrega,
      correoCompra1: newCompra.correoCompra1,
      correoCompra2: newCompra.correoCompra2,
      cp: newCompra.cp,
      cpCompra: newCompra.cpCompra,
      cpFactura: newCompra.cpFactura,
      denominacion: newCompra.denominacion,
      denominacionCompra: newCompra.denominacionCompra,
      descripcion: newCompra.descripcion,
      empresa: newCompra.empresa,
      estado: newCompra.estado,
      estadoCompra: newCompra.estadoCompra,
      estadoFactura: newCompra.estadoFactura,
      exterior: newCompra.exterior,
      exteriorCompra: newCompra.exteriorCompra,
      exteriorFactura: newCompra.exteriorFactura,
      fechaCompra: newCompra.fechaCompra,
      formaFactura: newCompra.formaFactura,
      interior: newCompra.interior,
      interiorCompra: newCompra.interiorCompra,
      interiorFactura: newCompra.interiorFactura,
      municipio: newCompra.municipio,
      municipioCompra: newCompra.municipioCompra,
      municipioFactura: newCompra.municipioFactura,
      nombreCompra: newCompra.nombreCompra,
      nombreElaborado: newCompra.nombreElaborado,
      nombreFactura: newCompra.nombreFactura,
      ordenCompra: newCompra.ordenCompra,
      pagoFactura: newCompra.pagoFactura,
      partida: newCompra.partida,
      pu: newCompra.pu,
      puestoElaborado: newCompra.puestoElaborado,
      rfc: newCompra.rfc,
      rfcFactura: newCompra.rfcFactura,
      telefono: newCompra.telefono,
      telefonoCompra: newCompra.telefonoCompra,
      tiempoEntrega: newCompra.tiempoEntrega,
      tipoCambio: newCompra.tipoCambio,
      total: newCompra.total,
      unitario: newCompra.unitario,
      vialidad: newCompra.vialidad,
      vialidadCompra: newCompra.vialidadCompra,
      vialidadFactura: newCompra.vialidadFactura,
    });

    await nuevaSolicitud.save();

    res.status(201).json({ mensaje: 'Compra guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la compra:', error);
    res.status(500).json({ mensaje: 'Error al guardar la compra' });
  }
});

app.put('/editAlimento', async (req, res) => {
  try {
    const newData = req.body;

    const updatedAlimento = await SolicitudAlimento.findOneAndUpdate(
      { fecha: newData.fecha },
      { $set: newData },
      { new: true }
    );
    if (!updatedAlimento) {
      return res.status(404).json({ message: 'Alimento no encontrado' });
    }
    res
      .status(200)
      .json({ message: 'Datos actualizados con éxito', data: updatedAlimento });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});

const PORT = 3090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
