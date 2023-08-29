const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module

const app = express();
app.use(cors());

app.use(express.json());

//const mongoUrl = "mongodb://192.168.100.8:27017/proyectoSRS";
const mongoUrl = "mongodb://192.168.100.20:27017/C3_LaPurisima";

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

    await nuevoTransporte.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});


app.put('/editTransporte/:fecha', async (req, res) => {
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
});



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


const PORT = 3010;
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

