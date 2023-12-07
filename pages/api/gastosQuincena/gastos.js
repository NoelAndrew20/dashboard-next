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

const db = mongoose.connection.useDb("prototipoGranjaCancun");
db.on('error', console.error.bind(console, 'Error al conectar a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});


const GastosSchema = new mongoose.Schema(
  {
    Alimento: String,
    Medicamentos: String,
    Sueldos: String,
    Insumos: String,
    Mantenimiento: String,
    Servicios: String,
  },
  {
    collection: 'gastosUltimaQuincena',
    versionKey: false,
  }
  );
                

  const SolicitudGastos = db.model('SolicitudGastos', GastosSchema);
  app.get("/getAllGastosUltimaQuincena", async (req, res) => {
    try {
        const solicitud = await SolicitudGastos.find();
        if (solicitud.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron solicitudes de compra de alimentos' });
        }
        res.status(200).json(solicitud);
    } catch (error) {
        console.error('Error al obtener las solicitudes de compra de alimentos:', error);
        res.status(500).json({ mensaje: 'Error al obtener las solicitudes de compra de alimentos' });
    }
});
  

const PORT = 3143;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
