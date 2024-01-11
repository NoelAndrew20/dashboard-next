//CRUD Registro Solicitudes de alimentos
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

const SolicitudAlimentoSchema = new mongoose.Schema(
  {
    fechaInicial: String,
    fechaFinal: String,
    CerdoEngordaB: {
      nombreAlimento: String,
      cantidad: Number,
    },
    Lechon: {
      nombreAlimento: String,
      cantidad: Number,
    },
    CerdoEngordaC: {
      nombreAlimento: String,
      cantidad: Number,
    },
    DesarrolloA: {
      nombreAlimento: String,
      cantidad: Number,
    },
    DesarrolloB: {
      nombreAlimento: String,
      cantidad: Number,
    },
    CerdoEngordaD: {
      nombreAlimento: String,
      cantidad: Number,
    },
    Gestacion6: {
      nombreAlimento: String,
      cantidad: Number,
    },
    Maternidad4: {
      nombreAlimento: String,
      cantidad: Number,
    },
    Zen5: {
      nombreAlimento: String,
      cantidad: Number,
    },
    Gestacion4: {
      nombreAlimento: String,
      cantidad: Number,
    },
    Gestacion5: {
      nombreAlimento: String,
      cantidad: Number,
    },
    Maternidad5: {
      nombreAlimento: String,
      cantidad: Number,
    },
    Zen4: {
      nombreAlimento: String,
      cantidad: Number,
    },
    CerdoEngordaA: {
      nombreAlimento: String,
      cantidad: Number,
    },
  },
  {
    collection: 'pronosticoConsumoAlimentos',
    versionKey: false,
  }
);

const SolicitudAlimento = db.model(
  'SolicitudAlimento',
  SolicitudAlimentoSchema
);

app.get('/getAllSolicitudAlimento', async (req, res) => {
  try {
    const solicitudes = await SolicitudAlimento.find({});
    const totalCantidadesPorAlimento = {};
    solicitudes.forEach((solicitud) => {
      solicitud = solicitud.toObject();
      for (const key in solicitud) {
        if (solicitud[key].nombreAlimento && solicitud[key].cantidadRequerida) {
          const nombreAlimento = solicitud[key].nombreAlimento;
          const cantidadRequerida = solicitud[key].cantidadRequerida;
          if (totalCantidadesPorAlimento[nombreAlimento]) {
            totalCantidadesPorAlimento[nombreAlimento] += cantidadRequerida;
          } else {
            totalCantidadesPorAlimento[nombreAlimento] = cantidadRequerida;
          }
        }
      }
    });
    const response = {
      solicitudes: solicitudes,
      totalCantidadesPorAlimento: totalCantidadesPorAlimento,
    };
    res.json(response);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res
      .status(500)
      .json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});

app.get('/getAllSolicitudCompraAlimento', async (req, res) => {
  try {
    const solicitudes = await SolicitudAlimento.find({ estatus: 1 });
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res
      .status(500)
      .json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});

app.post('/addAlimento', async (req, res) => {
  try {
    const newAlimento = req.body;
    const nuevaSolicitud = new SolicitudAlimento({
      fecha: Date.now(),
      nivelEntrega: req.body.nivelEntrega,
      fechaEntrega: req.body.fechaEntrega,
      nombreZona: req.body.nombreZona,
      nombreSolicitante: req.body.nombreSolicitante,
      estatus: 0,
      lotes: req.body.lotes,
    });

    await nuevaSolicitud.save();

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

const PORT = 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
