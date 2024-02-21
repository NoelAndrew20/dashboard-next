const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const config = require('../../../config.json');
const mongoUrl = config.mongodesarrollo;
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((e) => console.log(e));
const db = mongoose.connection.useDb('C3_LaPurisima');
db.on(
  'error',
  console.error.bind(console, 'Error connecting to the database:')
);
db.once('open', () => {
  console.log('Successful database connection.');
});

function uploadFiles() {
  const storage = multer.diskStorage({
    destination: './files',
    filename: function (_req, file, cb) {
      const originalname = file.originalname.replace(/\s/g, ''); // Elimina espacios del nombre original
      const filename = `${originalname}`;
      cb(null, filename);
    },
  });
  const upload = multer({ storage: storage });
  return upload.fields([
    { name: 'constanciaFile', maxCount: 1 },
    { name: 'caratulaFile', maxCount: 1 },
    { name: 'opinionFile', maxCount: 1 },
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
    procedencia: String,
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
    actividadesEconomicas: [
      {
        orden: String,
        actividad: String,
        porcentaje: String,
        fechaInicio: String,
        fechaFin: String,
      },
    ],
    regimenes: [
      {
        descripcion: String,
        fechaInicio: String,
        fechaFin: String,
      },
    ],
    productos: [
      {
        ID: String,
        SKU: String,
        nombre: String,
        unidad: String,
        precio: Number,
      },
    ],
    correo: String,
    nombre: String,
    telefono: Number,
    celular: Number,
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
    denominacion: String,
    password: String,
    email: String,
    proveedor: Number,
    telefono: String,
    celular: String,
    picture: String,
    rango: String,
    cambioC: Number,
  },
  {
    collection: 'usuario',
    versionKey: false,
  }
);

const Usuario = db.model('usuario', UsuarioSchema);
const Proveedor = db.model('Proveedor', ProveedorSchema);

app.get('/getDatosProveedor', async (req, res) => {
  try {
    const { usuario } = req.query;
    const proveedor = await Proveedor.findOne({ idProveedor: usuario });
    if (proveedor) {
      res.status(200).json(proveedor);
    } else {
      res
        .status(404)
        .json({ success: false, message: 'Proveedor no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener datos del proveedor:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' });
  }
});

app.get('/getProducto', async (req, res) => {
  try {
    const { email } = req.query;
    const proveedor = await Proveedor.findOne({ correo: email });
    if (!proveedor) {
      return res
        .status(404)
        .send([{ status: 'not found', message: 'Proveedor no encontrado' }]);
    }
    const productos = proveedor.productos;
    res.send(productos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send([{ status: 'error', message: 'Internal server error' }]);
  }
});

app.post('/addDocumentoProveedor', uploadFiles(), (req, res) => {
  res.send('ok');
});

app.post('/addProveedor', async (req, res) => {
  const newProveedor = req.body;
  let primeraLetra = '';
  let segundaLetra = '';

  try {
    const lastId = await Proveedor.findOne({}).sort({ id: -1 }).select('id');
    let nuevoLastid = 1;
    if (lastId) {
      nuevoLastid = lastId.id + 1;
    }
    const tipoProveedor = newProveedor.tipoProveedor;
    if (tipoProveedor) {
      primeraLetra = tipoProveedor[0];
      segundaLetra = tipoProveedor[1];
    }
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    const nuevoProveedor = new Proveedor({
      fecha: fechaActual,
      id: nuevoLastid,
      idProveedor: `${primeraLetra}${segundaLetra}${dia}${mes}${anio}${nuevoLastid}`,
      tipoProveedor: newProveedor.tipoProveedor,
      procedencia: newProveedor.procedencia,
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
      celular: newProveedor.celular,
      estatuscorreo: 0,
      picture: newProveedor.picture || '/images/imagenes/user.png',
    });

    await nuevoProveedor.save();

    const hashedPassword = await bcrypt.hash(nuevoProveedor.rfc, 12);

    const nuevoUsuario = new Usuario({
      usuario: nuevoProveedor.idProveedor,
      nombre: nuevoProveedor.nombre,
      denominacion: nuevoProveedor.denominacion,
      password: hashedPassword,
      email: nuevoProveedor.correo,
      proveedor: 1,
      telefono: nuevoProveedor.telefono,
      celular: nuevoProveedor.celular,
      picture: '/images/imagenes/user.png',
      rango: 'Proveedor',
      cambioC: 0,
    });

    await nuevoUsuario.save();

    const destinatarioCorreo = nuevoProveedor.correo;
    const asuntoCorreo = 'Proveedor Registrado en Constanza';
    const mensajeCorreo =
      'Se ha registrado en nuestro sistema como proveedor confiable, su correo es el proporcionado en el sistema y su contraseña es su RFC.';
    await enviarCorreo(destinatarioCorreo, asuntoCorreo, mensajeCorreo);
    nuevoProveedor.estatuscorreo = 1;

    await nuevoProveedor.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

app.put('/addProducto/:usuario', async (req, res) => {
  try {
    const usuario = req.params.usuario;
    const newProduct = req.body;
    const proveedor = await Proveedor.findOne({ idProveedor: usuario });
    if (!proveedor) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const nuevoID = proveedor.productos.length + 1;
    proveedor.productos.push({
      ID: nuevoID.toString(), // Convierte a cadena si es necesario
      SKU: newProduct.SKU,
      nombre: newProduct.nombre,
      unidad: newProduct.unidad,
      precio: newProduct.precio,
    });

    const updatedProveedor = await proveedor.save();

    res.status(200).json({
      message: 'Datos actualizados con éxito',
      data: updatedProveedor,
    });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});

app.put('/editProductos/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const updatedProduct = req.body;
    const id = updatedProduct.ID;
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

const upload = multer({ dest: '../../public/images/imagenes/' });

app.put('/editUsuario/:usuario', upload.single('picture'), async (req, res) => {
  try {
    const usuarioId = req.params.usuario;
    const { nombre, email, password, denominacion, telefono, celular, picture } =
      req.body;
    const pictureFile = req.file;

    if (!pictureFile && !(nombre || email || password || denominacion || telefono || celular)) {
      return res.status(400).send('Se requiere al menos algun dato de usuario para actualizar');
    }

    let imagePath2 = '';
    if (pictureFile) {
      const imagePath = `../../../public/images/imagenes/${denominacion}.${pictureFile.originalname
        .split('.')
        .pop()}`;
      imagePath2 = `/images/imagenes/${denominacion}.${pictureFile.originalname
        .split('.')
        .pop()}`;
      fs.renameSync(pictureFile.path, imagePath);
    } else {
      imagePath2 = picture; 
    }

    const hashedPassword = password ? await bcrypt.hash(password, 12) : '';

    const updateFields = {
      nombre: nombre || '',
      email: email || '',
      password: hashedPassword || '',
      denominacion: denominacion || '',
      telefono: telefono || '',
      celular: celular || '',
      cambioC: 1,
    };

    if (imagePath2) {
      updateFields.picture = imagePath2;
    }

    await Usuario.findOneAndUpdate(
      { usuario: usuarioId },
      { $set: updateFields }
    );

    res.status(200).send('Usuario actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});


/*app.get('/catalogoProductos', async (req, res) => {
  try {
    const proveedores = await Proveedor.find({});
    let catalogoProductos = [];
    proveedores.forEach(proveedor => {
      const proveedorConProductos = {
        denominacion: proveedor.denominacion,
        productos: proveedor.productos
      };
      catalogoProductos.push(proveedorConProductos);
    });
    res.json(catalogoProductos);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});*/
/*app.get('/catalogoProductos', async (req, res) => {
  try {
    const proveedores = await Proveedor.find({});
    let catalogoProductos = [];
    proveedores.forEach(proveedor => {
      proveedor.productos.forEach(producto => {
        // Solo agregamos el producto al catálogo
        catalogoProductos.push(producto);
      });
    });
    res.json(catalogoProductos);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});*/
app.get('/catalogoProductos', async (req, res) => {
  try {
    const proveedores = await Proveedor.find({});
    let catalogoProductos = [];
    proveedores.forEach((proveedor) => {
      proveedor.productos.forEach((producto) => {
        // Crear un objeto con el formato deseado y agregarlo al catálogo
        catalogoProductos.push({
          SKU: producto.SKU,
          unidad: producto.unidad,
          nombre: producto.nombre,
          precio: producto.precio.toString(), // Convertir el precio a cadena
        });
      });
    });
    res.json(catalogoProductos);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

const PORT = 3070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
