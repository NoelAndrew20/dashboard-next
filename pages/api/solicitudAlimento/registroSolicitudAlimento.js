const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module

const app = express();
app.use(cors());

app.use(express.json());

//const mongoUrl = "mongodb://192.168.100.8:27017/proyectoSRS";
const mongoUrl = "mongodb://192.168.100.10:27017/C3_LaPurisima";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to database");
})
.catch((e) => console.log(e));

require("../schema/schemaSolicitudAlimento.js");
const SolicitudAlimento = mongoose.model("SolicitudAlimento");

app.get("/getAllSolicitudAlimento", async (req, res) => {
  try {
    // Consulta la base de datos para obtener todas las solicitudes de alimentos
    const solicitudes = await SolicitudAlimento.find();

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
          nivelEntrega: req.body.nivelEntrega,
          fechaEntrega: req.body.fechaEntrega,
          nombreZona: req.body.nombreZona,
          nombreSolicitante: req.body.nombreSolicitante,
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

/*app.post("/addAlimento", async (req, res) => {

  const newAlimento = req.body;

  console.log("Datos recibidos desde el cliente:", newAlimento);

  res.send("Datos recibidos correctamente");
});*/

/*app.post("/addAlimento", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const nuevoAlimento = new Alimento({
      fecha: data.fecha,
      granja: data.granja,
      camion: data.camion,
      jaula: data.jaula,
      operador: data.operador,
      cliente: data.cliente,
      destino: data.destino,
      salida: data.salida,
      hrLlegada: data.hrLlegada,
      tmpRecorrido: data.tmpRecorrido,
      hrInicio: data.hrInicio,
      kgSalida: data.kgSalida,  
      kgDesembarque: data.kgDesembarque,
      rango: data.rango,
      muertos: data.muertos,
      parada: data.parada,
      auditor: data.auditor,
      incidencias: data.incidencias,
      revision: data.revision,
      hrFinal: data.hrFinal,
      merma: data.merma,
      ctCerdos: data.ctCerdos,
    });

    await nuevoAlimento.save();

    const nuevaSolicitud = new SolicitudAlimento({
      nivel: nivelEntrega,
      fecha: fechaEntrega,
      zona: nombreZona,
      usuario: nombreSolicitante,
      lotes: lotes,
    });

    // Guarda la nueva solicitud en la base de datos
    await nuevaSolicitud.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});*/


/*app.put('/editTransporte/:fecha', async (req, res) => {
  try {
    const fecha = req.params.fecha;
    const newData = req.body;

    const updatedTransporte = await Transporte.findOneAndUpdate(
      { fecha: fecha },
      { $set: newData },
      { new: true }
    );

    // Si updatedTransporte es null, significa que no se encontró el transporte
    if (!updatedTransporte) {
      return res.status(404).json({ message: 'Transporte no encontrado' });
    }

    res.status(200).json({ message: 'Datos actualizados con éxito', data: updatedTransporte });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});*/



/*app.put('/editTransporte/:fecha', async (req, res) => {
  try {
    const fecha = req.params.fecha;
    const newData = req.body;

    const updatedTransporte = await Transporte.findOneAndUpdate(
      { fecha: fecha },
      { $set: newData },
      { new: true }
    );

    // Si updatedTransporte es null, significa que no se encontró el transporte
    if (!updatedTransporte) {
      return res.status(404).json({ message: 'Transporte no encontrado' });
    }

    res.status(200).json({ message: 'Datos actualizados con éxito', data: updatedTransporte });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});*/


const PORT = 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




/*const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');



const app = express();
app.use(express.json());

const mongoUrl = "mongodb://192.168.100.8:27017/proyectoSRS";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to database");
})
.catch((e) => console.log(e));

require("../schema/schemaTransporte.js");
const Transporte = mongoose.model("Transporte");

app.get("/getAllTransporte", async (req, res) => {
  try {
    const allTransporte = await Transporte.find({});
    res.send({ status: "ok", data: allTransporte });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});


app.post("/addTransporte", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const nuevoTransporte = new Transporte({
      //fecha: data.fecha,
      granja: data.granja,
      camion: data.camion,
      jaula: data.jaula,
      operador: data.operador,
      cliente: data.cliente,
      destino: data.destino,
      salida: data.salida,
      hrLlegada: data.hrLlegada,
      tmpRecorrido: data.tmpRecorrido,
      hrInicio: data.hrInicio,
      kgSalida: data.kgSalida,  
      kgDesembarque: data.kgDesembarque,
      rango: data.rango,
      muertos: data.muertos,
      parada: data.parada,
      auditor: data.auditor,
      incidencias: data.incidencias,
      revision: data.revision,
      hrFinal: data.hrFinal,
      merma: data.merma,
      ctCerdos: data.ctCerdos,
    });

    await nuevoTransporte.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/



/*import mongoose from 'mongoose';

// Definir un esquema para la colección "transporte"
const TransporteSchema = new mongoose.Schema({
  fecha: String,
  granja: String,
  camion: String,
  jaula: String,
  operador: String,
  cliente: String,
  destino: String,
  salida: String,
  hrLlegada: String,
  tmpRecorrido: String,
  hrInicio: String,
  kgSalida: String,
  kgDesembarque: String,
  rango: String,
  muertos: String,
  parada: String,
  auditor: String,
  incidencias: String,
  revision: String,
  hrFinal: String,
  merma: String,
  ctCerdos: String,
}, { versionKey: false });

// Crear un modelo basado en el esquema
const Transporte = mongoose.model('Transporte', TransporteSchema);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body; // Obtener los datos del cuerpo de la solicitud POST

    // Conectar a la base de datos MongoDB
    await mongoose.connect('mongodb://192.168.100.8:27017/proyectoSRS', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    

    try {
      // Crear una nueva instancia del modelo con los datos recibidos
      const nuevoTransporte = new Transporte({
        fecha: data.fecha,
        granja: data.granja,
        camion: data.camion,
        jaula: data.jaula,
        operador: data.operador,
        cliente: data.cliente,
        destino: data.destino,
        salida: data.salida,
        hrLlegada: data.hrLlegada,
        tmpRecorrido: data.tmpRecorrido,
        hrInicio: data.hrInicio,
        kgSalida: data.kgSalida,
        kgDesembarque: data.kgDesembarque,
        rango: data.rango,
        muertos: data.muertos,
        parada: data.parada,
        auditor: data.auditor,
        incidencias: data.incidencias,
        revision: data.revision,
        hrFinal: data.hrFinal,
        merma: data.merma,
        ctCerdos: data.ctCerdos,
      });

      // Guardar el nuevo transporte en la base de datos
      await nuevoTransporte.save();

      // Cerrar la conexión a la base de datos
      await mongoose.connection.close();

      res.status(200).json({ message: 'Datos guardados con éxito' });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).json({ message: 'Error al guardar los datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}*/

