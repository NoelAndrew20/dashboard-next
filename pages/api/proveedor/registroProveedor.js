const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const config = require('../../../config.json');

const app = express();
const mongoUrl = config.mongodesarrollo;
const bcrypt = require('bcrypt');
// Configuración de CORS y middleware JSON
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => console.log(e));

const db = mongoose.connection.useDb("prototipoGranja");

// Manejo de eventos de la conexión a la base de datos
db.on('error', console.error.bind(console, 'Error connecting to the database:'));
db.once('open', () => {
  console.log('Successful database connection.');
});

function uploadFiles(){
const storage = multer.diskStorage({
    destination: './files',
    filename: function (_req, file, cb) {
      var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
      cb(null, Date.now() + extension);
    }
  })
  
  //const upload = multer({ storage: storage }).single('file');
  const upload = multer({ storage: storage });

  return upload.fields([
    { name: 'constanciaFile', maxCount: 1 },
    { name: 'caratulaFile', maxCount: 1 },
    { name: 'opinionFile', maxCount: 1 }
]);
}

const ProveedorSchema = new mongoose.Schema(
  {
    fecha: Date,
    id: { type: Number, unique: true, required: true, default: 0 },
    idProveedor: String,
    tipoProveedor: String,
    denominacion: String,
    rfc: String,
    regimenCapital: String,
    cp: Number,
    vialidad: String,
    exterior: String,
    interior: String,
    colonia: String,
    localidad: String,
    municipio: String,
    entidad: String,
    //calle1: String,
    //calle2: String,
    actividadesEconomicas: [{
      orden: String,
      actividad: String,
      porcentaje: String,
      fechaInicio: String,
      fechaFin: String
    }],
    regimenes: [{
      descripcion: String,
      fechaInicio: String,
      fechaFin: String
    }],
    correo: String,
    nombre: String,
    telefono: Number,
  },
  {
    collection: 'proveedor',
    versionKey: false,
  }
);

const UsuarioSchema = new mongoose.Schema(
  {
    usuario: String,
    nombre: String,
    password: String,
    email: String, 
    proveedor: Number,
  },
  {
    //collection: 'usuarios', // Nombre de la colección en la base de datos
    collection: 'usuario',
    versionKey: false,
  }
);

const Usuario = db.model('usuario', UsuarioSchema);
const Proveedor = db.model('Proveedor', ProveedorSchema);


/*app.post('/addProveedor', uploadFiles(), (req, res) => {
    res.send('ok');
});*/


app.post("/addProveedor", async (req, res) => {
  const newProveedor = req.body;
  

  let primeraLetra = '';
  try {
    const lastId = await Proveedor
    .findOne({})
    .sort({ id: -1 })
    .select('id');

    let nuevoLastid = 1;
    //const nextId = lastId ? lastId.id + 1 : 1;
    if (lastId) {
      nuevoLastid = lastId.id + 1;
      console.log(nuevoLastid);
    }

    const tipoProveedor = newProveedor.tipoProveedor;

    if (tipoProveedor) {
      primeraLetra = tipoProveedor[0];
    }

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
    const anio = fechaActual.getFullYear();

    const nuevoProveedor = new Proveedor({
      fecha: fechaActual,
      id: nuevoLastid,
      idProveedor: `${primeraLetra}${dia}${mes}${anio}${nuevoLastid}`, 
      tipoProveedor: newProveedor.tipoProveedor,
      denominacion: newProveedor.denominacion,
      rfc: newProveedor.rfc,
      regimenCapital: newProveedor.regimenCapital,
      cp: newProveedor.cp,
      vialidad: newProveedor.vialidad,
      exterior: newProveedor.exterior,
      interior: newProveedor.interior,
      colonia: newProveedor.colonia,
      localidad: newProveedor.localidad,
      municipio: newProveedor.municipio,
      entidad: newProveedor.entidad,
      actividadesEconomicas: newProveedor.actividadesEconomicas || [],
      regimenes: newProveedor.regimenes || [],
      correo: newProveedor.correo,
      nombre: newProveedor.nombre,
      telefono: newProveedor.telefono,
    });

    await nuevoProveedor.save();

    const hashedPassword = await bcrypt.hash(nuevoProveedor.rfc, 12);

    const nuevoUsuario = new Usuario({
      usuario: nuevoProveedor.idProveedor,
      nombre: nuevoProveedor.nombre,
      password: hashedPassword,
      email: nuevoProveedor.correo,
      proveedor: 1,
    });

    await nuevoUsuario.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});


app.post('/addDocumentoProveedor', uploadFiles(), (req, res) => {
  // Manejo del archivo subido
  res.send('ok');
});


const PORT = 3070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

