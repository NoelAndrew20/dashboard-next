const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../../../config.json');
const mongoUrl = config.mongodesarrollo;
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((e) => console.log(e));

const db = mongoose.connection.useDb('C3_LaPurisima');
db.on(
  'error',
  console.error.bind(console, 'Error al conectar a la base de datos:')
);
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
    causaMuerte: [
      {
        causa: String,
        responsable: String,
        fecha: Date,
      },
    ],
    historialMedico: [String],
    usuario: String,
  },
  {
    collection: 'cerdos',
    versionKey: false,
  }
);

const RFID = db.model('RFID', RFIDSchema);

app.get('/getAllRFID', async (req, res) => {
  try {
    const allRFID = await RFID.find({});
    res.send({ status: 'ok', data: allRFID });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

app.get('/muertes', async (req, res) => {
  try {
    const rfidData = await RFID.find();

    const groupedData = rfidData.reduce((result, item) => {
      const key = `${item.granja}_${item.nave}_${item.zona}`;
      if (!result[key]) {
        result[key] = {
          granja: item.granja,
          nave: item.nave,
          zona: item.zona,
          muertos: 0,
          detalles: [],
        };
      }

      if (item.status === 'Muerto' && item.causaMuerte.length > 0) {
        result[key].muertos += 1;

        item.causaMuerte.forEach((causa) => {
          result[key].detalles.push({
            rfid: item.rfid,
            causa: causa.causa,
            fecha: causa.fecha,
          });
        });
      }

      return result;
    }, {});

    const groupedArray = Object.values(groupedData);
    res.json(groupedArray);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/countUniqueRFID', async (req, res) => {
  try {
    const uniqueRFIDCount = await RFID.aggregate([
      { $group: { _id: '$rfid', count: { $sum: 1 } } },
      { $group: { _id: null, total: { $sum: 1 } } },
    ]);
    const total = uniqueRFIDCount.length > 0 ? uniqueRFIDCount[0].total : 0;
    res.send({ totalUniqueRFID: total });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

const PORT = 3060;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
