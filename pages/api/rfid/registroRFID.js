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
  console.log("Connected to the database");
})
.catch((e) => console.log(e));

const db = mongoose.connection.useDb("C3_LaPurisima");
db.on('error', console.error.bind(console, 'Error al conectar a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});


const RFIDSchema = new mongoose.Schema(
  {  
    fechaPreBautizo: Date,
    lote: String,
    rfid: String,
    tipo: String,
    sexo: String,
    peso: String,
    ciclo: [String],
    cicloFallido: [String],
    fechaIngresoGranja: Date,
    granja: String,
    fechaNaveEntrada: Date,
    fechaNaveSalida: Date,
    zona: String,
    nave: String,
    status: String,
    historialMedico: [String],
    usuario: String,
  },
  {
    collection: 'cerdos',
    versionKey: false,
  }
);

const RFID = db.model('RFID', RFIDSchema);


app.get("/getAllRFID", async (req, res) => {
  try {
    const allRFID = await RFID.find({});
    res.send({ status: "ok", data: allRFID });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

app.get("/countUniqueRFID", async (req, res) => {
  try {
    const uniqueRFIDCount = await RFID.aggregate([
      { $group: { _id: "$rfid", count: { $sum: 1 } } },
      { $group: { _id: null, total: { $sum: 1 } } }
    ]);

    // Si hay resultados, el total será el primer elemento del array uniqueRFIDCount
    const total = uniqueRFIDCount.length > 0 ? uniqueRFIDCount[0].total : 0;

    res.send({ totalUniqueRFID: total });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});




/*app.put('/sendTotal', async (req, res) => {
  try {
    const receivedData = req.body;
    const totalUniqueRFID = receivedData.totalUniqueRFID;
    console.log(totalUniqueRFID);

    const newData = {
      nombre: "Maternidad y Gestacion",
      cantidad: totalUniqueRFID,
    };

    const updatedTotal = await Total.findOneAndUpdate(
      { nombre: newData.nombre }, // Utilizamos el campo 'nombre' para buscar
      { $set: { cantidad: newData.cantidad } }, // Actualizamos el campo 'cantidad'
      { new: true, upsert: true } // Opciones: devolver el nuevo documento y crear si no existe
    );

    res.status(200).json({ message: 'Datos actualizados o insertados con éxito', data: updatedTotal });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});*/


const PORT = 3060;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
