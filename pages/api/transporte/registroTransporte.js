/*
Reestructurar todo
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const mongoUrl = "mongodb://192.168.100.10:27017/C3_LaPurisima";
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
    const allTransporte = await Transporte.find({})
    .sort({ fecha: -1 }) // Cambia 'fechaRegistro' al campo apropiado de fecha en tu esquema
    .limit(30);
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

    if (!updatedTransporte) {
      return res.status(404).json({ message: 'Transporte no encontrado' });
    }

    res.status(200).json({ message: 'Datos actualizados con éxito', data: updatedTransporte });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/


/*
//import mongoose from 'mongoose';
const mongoose = require("mongoose");

// Definir un esquema para la colección "Transporte"
const TransporteSchema = new mongoose.Schema(
  {
    fecha: Date,
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
  },
  {
    //collection: 'transportes', // Nombre de la colección en la base de datos
    collection: 'transportePrueba',
    versionKey: false,
  }
);

// Crear un modelo basado en el esquema
mongoose.model('Transporte', TransporteSchema);

//export default Transporte;
*/