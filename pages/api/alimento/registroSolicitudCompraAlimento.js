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


const SolicitudCompraAlimentoSchema = new mongoose.Schema(
  {
    fecha: Date,
    numeroSolicitud: Number,
    nombreSolicitante: String,
    estadoSolicitud: Number,
    tipoDeLicitacion: String,
    solicitud: [
      {
        nombre: String,
        cantidad: Number,
        estatus: Number,
      }
    ]
  },
  {
    collection: 'solicitudCompraAlimento',
    versionKey: false,
  }
  );
                

  const SolicitudCompraAlimento = db.model('SolicitudCompraAlimento', SolicitudCompraAlimentoSchema);

  app.get("/getAllSolicitudCompraAlimento", async (req, res) => {
    try {
        // Calcula la fecha actual menos una semana
        const unaSemanaAtras = new Date();
        unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);

        // Consulta las solicitudes de compra de alimentos con fechas más recientes que una semana atrás
        const solicitudesCompra = await SolicitudCompraAlimento.find({ fecha: { $gte: unaSemanaAtras } });

        // Verifica si se encontraron solicitudes de compra
        if (solicitudesCompra.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron solicitudes de compra de alimentos en la última semana' });
        }

        // Envía las solicitudes de compra al cliente como respuesta
        res.status(200).json(solicitudesCompra);
    } catch (error) {
        console.error('Error al obtener las solicitudes de compra de alimentos:', error);
        res.status(500).json({ mensaje: 'Error al obtener las solicitudes de compra de alimentos' });
    }
});

app.post("/addSolicitudCompraAlimento", async (req, res) => {
  try {
    const newAlimento = req.body;
    let tipoDeLicitacion;
    const inicial = newAlimento.responsable.charAt(0).toUpperCase();
    switch (inicial) {
      case 'A':
        tipoDeLicitacion = 'Alimento';
        break;
      case 'M':
        tipoDeLicitacion = 'Medicamento';
        break;
      case 'C':
        tipoDeLicitacion = 'Vientres';
        break;
      // Agrega más casos según sea necesario
      default:
        tipoDeLicitacion = 'Otro'; // Un valor predeterminado si no coincide con ninguna inicial conocida
    }

    const ultimaSolicitud = await SolicitudCompraAlimento
      .findOne({})
      .sort({ numeroSolicitud: -1 }) // Ordena en orden descendente
      .select('numeroSolicitud');

    let nuevoNumeroSolicitud = 1; // Si no hay solicitudes anteriores, inicia en 1.

    if (ultimaSolicitud) {
    nuevoNumeroSolicitud = ultimaSolicitud.numeroSolicitud + 1;
  }

    const solicitudCompra = {
      fecha: Date.now(),
      numeroSolicitud: nuevoNumeroSolicitud,
      nombreSolicitante: req.body.responsable,
      estadoSolicitud: 0,
      tipoDeLicitacion: tipoDeLicitacion,
      solicitud: req.body.solicitudes.map(item => ({ 
        nombre: item.nombreAlimento, 
        cantidad: item.cantidad,
        estatus: 0,
         }))
    };

    // Crea una instancia del modelo SolicitudCompraAlimento con los datos ajustados
    const nuevaSolicitudCompra = new SolicitudCompraAlimento(solicitudCompra);

    // Guarda la nueva solicitud en la base de datos
    await nuevaSolicitudCompra.save();

    // Envía una respuesta al cliente
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});

app.put('/editLicitacion/:nombreAlimento/:cantidad', async (req, res) => {
  try {
    const nombreAlimento = req.params.nombreAlimento;
    const cantidad = req.params.cantidad;
    const updateData = { estatus: 1 };

    // Verificar si el estatus actual no es igual a 1 antes de la actualización
    const existingLicitacion = await SolicitudCompraAlimento.findOne(
      {
        "solicitud.nombreAlimento": nombreAlimento,
        "solicitud.cantidad": cantidad
      }
    );

    if (!existingLicitacion) {
      return res.status(404).json({ message: 'Licitación no encontrada' });
    }

    if (existingLicitacion.solicitud.estatus !== 1) {
      // Realizar la actualización solo si el estatus actual no es 1
      const updatedLicitacion = await SolicitudCompraAlimento.findOneAndUpdate(
        {
          "solicitud.nombreAlimento": nombreAlimento,
          "solicitud.cantidad": cantidad
        },
        { $set: { "solicitud.$.estatus": updateData.estatus } },
        { new: true }
      );



      /*const apiUrl = 'http://localhost:3083/addSolicitudLicitacion';
      axios.post(apiUrl, updatedLicitacion.solicitud)
        .then(response => {
          console.log("Respuesta de la API:", response.data);
        })
        .catch(error => {
          console.error("Error al enviar la solicitud:", error);
        });*/



      res.status(200).json({ message: 'Estado actualizado con éxito', data: updatedLicitacion });
    } else {
      // El estatus actual es 1, no se realiza la actualización
      res.status(400).json({ message: 'No se puede actualizar una solicitud con estatus 1' });
    }
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    res.status(500).json({ message: 'Error al actualizar el estado' });
  }
});


/*app.put('/editLicitacion/:nombreAlimento/:cantidad', async (req, res) => {
  try {
    const nombreAlimento = req.params.nombreAlimento;
    const cantidad = req.params.cantidad;
    const updateData = { estatus: 1 };
    const updatedLicitacion = await SolicitudCompraAlimento.findOneAndUpdate(
      {
        "solicitud.nombreAlimento": nombreAlimento,
        "solicitud.cantidad": cantidad
      },
      { $set: { "solicitud.$.estatus": updateData.estatus } },
      { new: true }
    );

    if (!updatedLicitacion) {
      return res.status(404).json({ message: 'Licitación no encontrada' });
    }

    res.status(200).json({ message: 'Estado actualizado con éxito', data: updatedLicitacion });
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    res.status(500).json({ message: 'Error al actualizar el estado' });
  }
});*/
  
const PORT = 3082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

