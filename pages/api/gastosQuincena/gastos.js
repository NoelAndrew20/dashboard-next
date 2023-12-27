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

const db = mongoose.connection.useDb("prototipoGranjaChilac");
db.on('error', console.error.bind(console, 'Error al conectar a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});


const GastosSchema = new mongoose.Schema(
  {
    Ventas: String,
    Alimentos: String,
    AlimentosDesglozados: {
      Intermedio1: {
        Kg: Number,
        Inversion: Number,
      },
      Enrriquecedor: {
        Kg: Number,
        Inversion: Number,
      },
      Intermedio2: {
        Kg: Number,
        Inversion: Number,
      },
      Finalizador: {
        Kg: Number,
        Inversion: Number,
      },
      Entreno: {
        Kg: Number,
        Inversion: Number,
      },
    },
    FechaInicial: String,
    FechaLag: String,
    CantidadCerdos: Number,
    DistribucionCerdos: {
      Gestacion4: Number,
      Maternidad3: Number,
      Gestacion3: Number,
      Maternidad2: Number,
      Gestacion2: Number,
      Maternidad1: Number,
      Gestacion1: Number,
      Cuarentena: Number,
      CIA: Number,
      CerdoEngordaD: Number,
      CerdoEngordaC: Number,
      CerdoEngordaB: Number,
      CerdoEngordaA: Number,
      DesarrolloB: Number,
      Lechon: Number,
    },
    SueldosySalarios: String,
    SueldosySalariosDesglozados: {
      veterinario: Number,
      vigilantes: Number,
      ayudanteGeneral: Number,
      aplicadorVacunas: Number,
      lavandera: Number,
    },
    Vacunas: String,
    VacunasDesglozadas: {
      "P-DEC-F1": Number,
      "P-RA-F1": Number,
      "P-VE-F1": Number,
      "P-EPL-F1": Number,
      "P-EA-F1": Number,
      "P-PP-F1": Number,
      "P-AF-F1": Number,
      "P-DEC-V": Number,
      "P-RA-V": Number,
      "P-VE-V": Number,
      "P-ER-V": Number,
      "P-EA-V": Number,
      "P-PP-V": Number,
      "P-AF-V": Number,
      "P-EA-LD": Number,
      "P-EPL-CE": Number,
      "P-PP-LD": Number,
      "P-VE-LD": Number,
      "P-RA-LD": Number,
      "P-AF-LD": Number,
      "P-EC-LD": Number,
      "P-EPL-L": Number,
    },
  },
  {
    collection: 'index',
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
