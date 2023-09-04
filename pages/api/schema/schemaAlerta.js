//import mongoose from 'mongoose';
const mongoose = require("mongoose");

// Definir un esquema para la colección "Transporte"
const AlertaSchema = new mongoose.Schema(
  {
    message: String,
    alert_id: String,
    photo_path: String,
    fecha: Date,
    unixTime: String,
    camera: String,
    camera_rtsp: String,
    puerta: String,
    area: String,
    nave: String,
    granja: String,
    tag: String,
    door_pos: String,
    medicion: String,
  },
  {
    collection: 'cameras-ALERTS',
    versionKey: false,
  }
);

// Crear un modelo basado en el esquema
mongoose.model('Alerta', AlertaSchema);

