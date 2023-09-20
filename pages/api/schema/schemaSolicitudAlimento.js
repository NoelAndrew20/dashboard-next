const mongoose = require("mongoose");

// Definir un esquema para la colección "SolicitudAlimento"
const SolicitudAlimentoSchema = new mongoose.Schema(
  {
    nivelEntrega: String,
    fechaEntrega: Date,
    nombreZona: String,
    nombreSolicitante: String,
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

// Crear un modelo basado en el esquema
mongoose.model('SolicitudAlimento', SolicitudAlimentoSchema);
