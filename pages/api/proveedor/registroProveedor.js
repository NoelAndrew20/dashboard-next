const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const config = require('../../../config.json');

const app = express();
const mongoUrl = config.mongodesarrollo;

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
      const originalname = file.originalname.replace(/\s/g, ''); // Elimina espacios del nombre original
      //const extension = originalname.slice(originalname.lastIndexOf('.'));
      const filename = `${originalname}`;
      cb(null, filename);
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

async function enviarCorreo(destinatario, asunto, cuerpoMensaje) {
  const remitente = 'proyectoConstanza01@gmail.com';
  const password = 'ndqnuiihqxwscxna';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: remitente,
      pass: password,
    },
  });

  const mensaje = {
    from: remitente,
    to: destinatario,
    subject: asunto,
    text: cuerpoMensaje,
  };

  try {
    const info = await transporter.sendMail(mensaje);
    console.log('Correo enviado: ', info.response);
  } catch (error) {
    console.error('Error al enviar el correo: ', error);
    throw new Error('Error al enviar el correo');
  }
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
    productos: [{
      ID: String,
      SKU: String, 
      nombre: String,
      unidad: String,
      precio: Number
    }],
    correo: String,
    nombre: String,
    telefono: Number,
    estatuscorreo: Number,
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

app.put('/editProducto/:usuario', async (req, res) => {
  try {
    const usuario = req.params.usuario;
    const newProduct = req.body;

    console.log(usuario);
    console.log(newProduct);

    const proveedor = await Proveedor.findOne({ idProveedor: usuario });

    if (!proveedor) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const nuevoID = proveedor.productos.length + 1;

    // Agrega el nuevo producto con el ID actualizado
    proveedor.productos.push({
      ID: nuevoID.toString(), // Convierte a cadena si es necesario
      SKU: newProduct.SKU,
      nombre: newProduct.nombre,
      unidad: newProduct.unidad,
      precio: newProduct.precio
    });

    const updatedProveedor = await proveedor.save();

    res.status(200).json({ message: 'Datos actualizados con éxito', data: updatedProveedor });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});

app.get("/getProducto", async (req, res) => {
  try {
    const { email } = req.query;
    const proveedor = await Proveedor.findOne({ correo: email });
    if (!proveedor) {
      return res.status(404).send([{ status: "not found", message: "Proveedor no encontrado" }]);
    }

    const productos = proveedor.productos;

    // Devuelve un arreglo con el objeto usuario
    res.send(productos);
  } catch (error) {
    console.error(error);
    res.status(500).send([{ status: "error", message: "Internal server error" }]);
  }
});

app.post("/addProveedor", async (req, res) => {
  const newProveedor = req.body;
  let primeraLetra = '';
  let segundaLetra = '';
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
      segundaLetra = tipoProveedor[1];
    }

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
    const anio = fechaActual.getFullYear();

    const nuevoProveedor = new Proveedor({
      fecha: fechaActual,
      id: nuevoLastid,
      idProveedor: `${primeraLetra}${segundaLetra}${dia}${mes}${anio}${nuevoLastid}`, 
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
      productos: newProveedor.productos || [],
      correo: newProveedor.correo,
      nombre: newProveedor.nombre,
      telefono: newProveedor.telefono,
      estatuscorreo: 0,
    });

    await nuevoProveedor.save();

    const hashedPassword = await bcrypt.hash(nuevoProveedor.rfc, 12);

    const nuevoUsuario = new Usuario({
      usuario: nuevoProveedor.idProveedor,
      nombre: nuevoProveedor.nombre,
      password: hashedPassword,
      email: nuevoProveedor.correo,
      proveedor: 1,
      picture: '/images/imagenes/user.png',
      rango: 'fff',
    });

    await nuevoUsuario.save();

    const destinatarioCorreo = nuevoProveedor.correo;
    const asuntoCorreo = 'Proveedor Registrado en Constanza';
    const mensajeCorreo = 'Se ha registrado en nuestro sistema como proveedor confiable, su correo es el proporcionado en el sistema y su contraseña es su RFC.';
    await enviarCorreo(destinatarioCorreo, asuntoCorreo, mensajeCorreo);
    nuevoProveedor.estatuscorreo = 1;
    await nuevoProveedor.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

app.put('/editProductos/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const updatedProduct = req.body;
    const id = updatedProduct.ID;
    console.log(id);


    // Buscar y actualizar el producto en la base de datos
    const resultado = await Proveedor.updateOne(
      { correo: email, 'productos.ID': id },
      {
        $set: {
          'productos.$.SKU': updatedProduct.SKU,
          'productos.$.nombre': updatedProduct.nombre,
          'productos.$.unidad': updatedProduct.unidad,
          'productos.$.precio': updatedProduct.precio,
        },
      }
    );

    if (resultado.nModified > 0) {
      res.json({ message: 'Producto actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
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

