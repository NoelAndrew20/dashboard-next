//import mongoose from 'mongoose';
const mongoose = require("mongoose");

// Definir un esquema para la colección "Transporte"
const RFIDSchema = new mongoose.Schema(
  {
    fecha: String,
    unixTime: String,
    sensor: String,
    puerta: String,
    nave: String,
    granja: String,
    zona: String,
    rfid: String,
  },
  {
    collection: 'rfid-detections',
    versionKey: false,
  }
);

// Crear un modelo basado en el esquema
mongoose.model('RFID', RFIDSchema);
