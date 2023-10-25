const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const multer = require('multer');
const config = require('../../../config.json');
const mongoUrl = config.mongodesarrollo;
app.use(cors());
app.use(express.json());

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to the database");
})
.catch((e) => console.log(e));

const db = mongoose.connection.useDb("C3_LaPurisima");
db.on('error', console.error.bind(console, 'Error connecting to the database:'));
db.once('open', () => {
  console.log('Successful database connection.');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dashboard-next/pages/Documentos');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage});

const ProveedorSchema = new mongoose.Schema(
  {
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
      calle1: String,
      calle2: String,
      actividad: String,
      regimen: String,
      correo: String,
      nombre: String,
      telefono: Number,
  },  
{
  collection: 'proveedor',
  versionKey: false,
}
);

const Proveedor = db.model('Proveedor', ProveedorSchema);

app.post("/addProveedor",  upload.single('file'), async (req, res) => {
  try {
    // Manejo de errores de multer
    if (req.fileValidationError) {
      return res.status(400).json({ mensaje: 'Error al cargar el archivo', error: req.fileValidationError });
    }

    console.log("Datos enviados en la solicitud POST:", req.body);

    const {
      denominacion,
      rfc,
      regimenCapital,
      cp,
      vialidad,
      exterior,
      interior,
      colonia,
      localidad,
      municipio,
      entidad,
      calle1,
      calle2,
      actividad,
      regimen,
      correo,
      nombre,
      telefono,
      file,
    } = req.body;

    

    if (!denominacion || !rfc) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }
      const nuevoProveedor = new Proveedor({
        denominacion,
        rfc,
        regimenCapital,
        cp,
        vialidad,
        exterior,
        interior,
        colonia,
        localidad,
        municipio,
        entidad,
        calle1,
        calle2,
        actividad,
        regimen,
        correo,
        nombre,
        telefono,
        //file: req.file.originalname, // Puedes agregar el nombre del archivo aquí si lo necesitas
      });

      await nuevoProveedor.save();

      res.json({ mensaje: 'Datos guardados exitosamente' });

    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
  });

  /*app.get('/documentos/:nombreArchivo', (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    const rutaArchivo = path.join(__dirname, 'dashboard-next/pages/Documentos', nombreArchivo);
    
    // Asegúrate de manejar errores en caso de que el archivo no exista
    res.sendFile(rutaArchivo);
  });*/

/*exports.upload = (req, res) => {
  res.send({ data: 'Enviar un archivo' });
};*/

/*const ProveedorSchema = new mongoose.Schema(
  {
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
    calle1: String,
    calle2: String,
    actividad: String,
    regimen: String,
    correo: String,
    nombre: String,
    telefono: Number,
    file: String, // Agrega un campo para almacenar el nombre del archivo
  },
  {
    collection: 'proveedor',
    versionKey: false,
  }
);

const Proveedor = db.model('Proveedor', ProveedorSchema);

/*app.post("/addProveedor",  upload.single('file'), async (req, res) => {
  console.log("aqui");
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ mensaje: 'Error al cargar el archivo', error: req.fileValidationError });
    }

    // El archivo se encuentra en req.file
    const archivoAdjunto = req.file;
    console.log("Archivo recibido:", archivoAdjunto.originalname);


  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});*/


/*app.post("/addProveedor",  upload.single('file'), async (req, res) => {
  try {
    // Manejo de errores de multer
    if (req.fileValidationError) {
      return res.status(400).json({ mensaje: 'Error al cargar el archivo', error: req.fileValidationError });
    }

    console.log("Datos enviados en la solicitud POST:", req.body);

    const {
      denominacion,
      rfc,
      regimenCapital,
      cp,
      vialidad,
      exterior,
      interior,
      colonia,
      localidad,
      municipio,
      entidad,
      calle1,
      calle2,
      actividad,
      regimen,
      correo,
      nombre,
      telefono,
      file,
    } = req.body;

    if (!denominacion || !rfc) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }

    const nuevoProveedor = new Proveedor({
      denominacion,
      rfc,
      regimenCapital,
      cp,
      vialidad,
      exterior,
      interior,
      colonia,
      localidad,
      municipio,
      entidad,
      calle1,
      calle2,
      actividad,
      regimen,
      correo,
      nombre,
      telefono,
      file: req.file ? req.file.originalname : '', // Almacenamos el nombre del archivo si se cargó uno
    });

    await nuevoProveedor.save();

    res.json({ mensaje: 'Datos guardados exitosamente' });

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

const PORT = 3090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const multer = require('multer');
const config = require('../../../config.json');
const mongoUrl = config.mongodesarrollo;
app.use(cors());
app.use(express.json());

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to the database");
})
.catch((e) => console.log(e));

const db = mongoose.connection.useDb("C3_LaPurisima");
db.on('error', console.error.bind(console, 'Error connecting to the database:'));
db.once('open', () => {
  console.log('Successful database connection.');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '//192.168.100.10/home/SRS-Cons/Documentos/ArchivoProveedor/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const ProveedorSchema = new mongoose.Schema(
    {
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
        calle1: String,
        calle2: String,
        actividad: String,
        regimen: String,
        correo: String,
        nombre: String,
        telefono: Number,
    },  
  {
    collection: 'proveedor',
    versionKey: false,
  }
);

const Proveedor = db.model('Proveedor', ProveedorSchema);*/

/*app.post("/addProveedor",  upload.single('file'), async (req, res) => {
  try {
    // Manejo de errores de multer
    if (req.fileValidationError) {
      return res.status(400).json({ mensaje: 'Error al cargar el archivo', error: req.fileValidationError });
    }

    console.log("Datos enviados en la solicitud POST:", req.body);

    const {
      denominacion,
      rfc,
      regimenCapital,
      cp,
      vialidad,
      exterior,
      interior,
      colonia,
      localidad,
      municipio,
      entidad,
      calle1,
      calle2,
      actividad,
      regimen,
      correo,
      nombre,
      telefono,
      file,
    } = req.body;

    

    if (!denominacion || !rfc) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }

    // Crear una nueva instancia del modelo Proveedor con los datos del formulario
      const nuevoProveedor = new Proveedor({
        denominacion,
        rfc,
        regimenCapital,
        cp,
        vialidad,
        exterior,
        interior,
        colonia,
        localidad,
        municipio,
        entidad,
        calle1,
        calle2,
        actividad,
        regimen,
        correo,
        nombre,
        telefono,
        //file: req.file.originalname, // Puedes agregar el nombre del archivo aquí si lo necesitas
      });

      await nuevoProveedor.save();

      res.json({ mensaje: 'Datos guardados exitosamente' });

    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
  });*/

const PORT = 3070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
