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
