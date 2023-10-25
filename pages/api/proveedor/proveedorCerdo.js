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

//require("../schema/schemaSolicitudAlimento.js");
//const SolicitudAlimento = mongoose.model("SolicitudAlimento");

const ProveedorCerdoSchema = new mongoose.Schema(
    {
      nombreProveedor: String,
      Contacto: {
        nombrePersona: String,
        correo: String,
        numeroTelefono: String
      },
      direccion: {
        calle: String,
        numero: String,
        colonia: String,
        municipio: String,
        estado: String,
        codigoPostal: String
      },
      productos: [{
        nombre: String,
        precio: Number
      }]
    },  
  {
    collection: 'proveedorCerdo',
    versionKey: false,
  }
);

const ProveedorCerdo = db.model('ProveedorCerdo', ProveedorCerdoSchema);

app.get("/getAllProveedorCerdo", async (req, res) => {
  try {
    const solicitudes = await ProveedorCerdo.find();
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

const PORT = 3072;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

