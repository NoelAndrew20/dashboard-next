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

const AlertaSensorSchema = new mongoose.Schema(
  {
    fecha: Date,
    config: {
      sensor: String,
      puerta: String,
      nave: String,
      granja: String,
    },
    message: String,
  },
  {
    collection: 'AlertasSensor', // Nombre de la colección en la base de datos
    versionKey: false, // Evitar la inclusión del campo "__v" de versión
  }
);

const AlertaSensor = db.model('AlertaSensor',AlertaSensorSchema);


app.get("/getAllAlertaSensor", async (req, res) => {
  try {
    const allAlertaSensor = await AlertaSensor.find({})
    .sort({ fecha: -1 })
    .limit(30);

    res.send({ status: "ok", data: allAlertaSensor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

const PORT = 3051;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
