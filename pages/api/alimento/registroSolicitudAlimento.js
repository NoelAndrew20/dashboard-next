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

const SolicitudAlimento = db.model('SolicitudAlimento', SolicitudAlimentoSchema);

/*app.get("/getAllSolicitudAlimento", async (req, res) => {
  try {
    const solicitudes = await SolicitudAlimento.find({});
    //res.json(solicitudes);
    res.send({ status: "ok", data: solicitudes });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});*/
app.get("/getAllSolicitudAlimento", async (req, res) => {
  try {
    const solicitudes = await SolicitudAlimento.find({ });
    const totalCantidadesPorAlimento = {};

    // Itera a través de las solicitudes y acumula las cantidades por nombreAlimento
    solicitudes.forEach((solicitud) => {
      solicitud = solicitud.toObject(); // Convierte el documento de Mongoose a un objeto
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

    // Agrega las sumas al objeto de respuesta
    const response = {
      solicitudes: solicitudes,
      totalCantidadesPorAlimento: totalCantidadesPorAlimento,
    };

    res.json(response);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});

app.get("/getAllSolicitudCompraAlimento", async (req, res) => {
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
});

const PORT = 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//require("../schema/schemaSolicitudAlimento.js");
//const SolicitudAlimento = mongoose.model("SolicitudAlimento");

/*const SolicitudAlimentoSchema = new mongoose.Schema(
  {
    fecha: Date,
    nivelEntrega: String,
    fechaEntrega: Date,
    nombreZona: String,
    nombreSolicitante: String,
    estatus: Number,
    lotes: [
      {
        nombreAlimento: String,
        cantidad: Number,
        unidad: String,
      }
    ]
  },
  {
    collection: 'solicitudAlimento',
    versionKey: false,
  }
);

const SolicitudAlimento = db.model('SolicitudAlimento', SolicitudAlimentoSchema);

app.get("/getAllSolicitudAlimento", async (req, res) => {
  try {
    const solicitudes = await SolicitudAlimento.find({ estatus: 0 });
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de alimentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener las solicitudes de alimentos' });
  }
});


app.get("/getAllSolicitudCompraAlimento", async (req, res) => {
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
});

const PORT = 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/
