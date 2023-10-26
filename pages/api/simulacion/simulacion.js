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

const SimulacionSchema = new mongoose.Schema({
  Total: Number,
  Alimento: String,
  InversionAlimento: Number,
  KgConsumidos: Number,
  InversionMedicamento: Number,
  Medicamentos: {
    type: Map,
    of: {
      Cant: Number,
      Inversion: Number,
    },
  },
}, {
  collection: 'simulacionGranjaFront',
  versionKey: false,
});

  // Define el esquema de data
const dataSchema = new mongoose.Schema({
  Fecha: String,
  Transporte: SimulacionSchema,
  Cuarentena: SimulacionSchema,
  Gestacion1: SimulacionSchema,
  Maternidad1: SimulacionSchema,
  Zen1: SimulacionSchema,
  Gestacion2: SimulacionSchema,
  Maternidad2: SimulacionSchema,
  Zen2: SimulacionSchema,
  Gestacion3: SimulacionSchema,
  Maternidad3: SimulacionSchema,
  Zen3: SimulacionSchema,
  Gestacion4: SimulacionSchema,
  Maternidad4: SimulacionSchema,
  Zen4: SimulacionSchema,
  Gestacion5: SimulacionSchema,
  Maternidad5: SimulacionSchema,
  Zen5: SimulacionSchema,
  Gestacion6: SimulacionSchema,
  Maternidad6: SimulacionSchema,
  Zen6: SimulacionSchema,
  Gestacion7: SimulacionSchema,
  Maternidad7: SimulacionSchema,
  Lechon: SimulacionSchema,
  DesarrolloA: SimulacionSchema,
  DesarrolloB: SimulacionSchema,
  CerdoEngordaA: SimulacionSchema,
  CerdoEngordaB: SimulacionSchema,
  CerdoEngordaC: SimulacionSchema,
  CerdoEngordaD: SimulacionSchema,
});

  const Simulacion = db.model('Simulacion', SimulacionSchema);
  app.get("/getAllSimulacion", async (req, res) => {
    try {
        // Consulta todas las simulaciones de granja en la base de datos
        const simulacion = await Simulacion.find();

        // Verifica si se encontraron simulaciones de granja
        if (simulacion.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron simulaciones de granja' });
        }

        // Envía las simulaciones de granja al cliente como respuesta
        res.status(200).json(simulacion);
    } catch (error) {
        console.error('Error al obtener las simulaciones de granja:', error);
        res.status(500).json({ mensaje: 'Error al obtener las simulaciones de granja' });
    }
});


   /* app.post("/addSimulacion", async (req, res) => {
      try {
          const newAlimento = req.body;
          console.log(newAlimento);
          const nuevaSolicitud = new Simulacion({
            fechaSolicitud: newAlimento.fechaSolicitud,
            numeroSolicitud: newAlimento.numeroSolicitud,
            nombreSolicitante: newAlimento.nombreSolicitante,
            solicitud: newAlimento,
          });
  
          // Guarda la nueva solicitud en la base de datos
          await nuevaSolicitud.save();
  
          // Envía una respuesta al cliente
          res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
      } catch (error) {
          console.error('Error al guardar la solicitud:', error);
          res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
      }
  });
  
    
    

app.put('/editLicitacion', async (req, res) => {
  const datosRecibidos = req.body;
  console.log(datosRecibidos);

  // Recorre los objetos en datosRecibidos
  for (let i = 0; i < datosRecibidos.length; i++) {
    if (datosRecibidos[i].nombre === 'Jesus') {
      // Realiza la edición en el objeto que cumple con la condición
      datosRecibidos[i].campoQueQuieresEditar = 'Nuevo valor';
      // Puedes realizar otras ediciones aquí
    }
  }

  // Envía una respuesta al cliente
  res.send('Licitación actualizada con éxito');
});*/
  
const PORT = 3141;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
