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


const SolicitudLicitacionSchema = new mongoose.Schema(
  {
    fechaSolicitud: Date,
    nombreSolicitante: String,
    numeroSolicitud: Number,
    solicitud: [
      {
        cantidad: Number,
        fecha: Date,
        lugar: String,
        metodo: String,
        nombreAlimento: String,
        pago: String,
        periodo: Date,
        precio: Number,
        estatus: Number,
      }
    ]
  },
  {
    collection: 'solicitudLicitacion',
    versionKey: false,
  }
  );
                

  const SolicitudLicitacion = db.model('SolicitudLicitacion', SolicitudLicitacionSchema);

app.get("/getAllSolicitudLicitacion", async (req, res) => {
  try {
      // Consulta todas las solicitudes de compra de alimentos en la base de datos
      const solicitudesCompra = await SolicitudLicitacion.find();

      // Verifica si se encontraron solicitudes de compra
      if (solicitudesCompra.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron solicitudes de compra de alimentos' });
      }

      // Ordena las solicitudes de compra por precio de menor a mayor
      solicitudesCompra.sort((a, b) => a.solicitud[0].precio - b.solicitud[0].precio);

      // Envía las solicitudes de compra ordenadas al cliente como respuesta
      res.status(200).json(solicitudesCompra);
  } catch (error) {
      console.error('Error al obtener las solicitudes de compra de alimentos:', error);
      res.status(500).json({ mensaje: 'Error al obtener las solicitudes de compra de alimentos' });
  }
});

    app.post("/addSolicitudLicitacion", async (req, res) => {
      try {
          const newAlimento = req.body;
          console.log(newAlimento);
  
          // Crea una instancia del modelo SolicitudLicitacion con los datos recibidos del cliente
          const nuevaSolicitud = new SolicitudLicitacion({
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
  
    
    

/*app.put('/editLicitacion', async (req, res) => {
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
  
const PORT = 3083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
