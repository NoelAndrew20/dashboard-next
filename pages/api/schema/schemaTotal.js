const mongoose = require("mongoose");

// Definir un esquema para la colección "Total"
const TotalSchema = new mongoose.Schema(
  {
    nombre: String,
    cantidad: Number
  },
  /*MaternidadyGestancion: Number,
    Adaptacion: Number,
    Destete: Number,
    CDI: Number,*/
  {
    collection: 'total',
    versionKey: false,
  }
);

// Crear un modelo basado en el esquema
mongoose.model('Total', TotalSchema);
