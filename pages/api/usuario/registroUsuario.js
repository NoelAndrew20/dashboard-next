const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module
const app = express();
app.use(cors());
app.use(express.json());
const config = require('../../../config.json');
const mongoUrl = config.mongodesarrollo;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to database");
})
.catch((e) => console.log(e));

//const db = mongoose.connection.useDb("C3_LaPurisima");
const db = mongoose.connection.useDb("prototipoGranja");

db.on('error', console.error.bind(console, 'Error al conectar a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

const UsuarioSchema = new mongoose.Schema(
  {
    picture: String,
    usuario: String,
    nombre: String,
    apellidop: String,
    apellidom: String,
    granja: String,
    responsabilidad: [
      {
          nombre: String
      }
  ],
    area: String,
    password: String,
    email: String, 
    fechaNacimiento: String, 
    genero: String, 
    horario: String, 
    fechaContratacion: String, 
    departamento: String,
    status: String,
    contacto: String, 
    salario: String,
    calle: String,
    numeroI: String,
    numeroE: String,
    ciudad: String, 
    estado: String,
    cp: String, 
    tarea: String, 
    epp: String,
    proveedor: Number,
    rango: String, 
},
  {
    //collection: 'usuarios', // Nombre de la colección en la base de datos
    collection: 'usuario',
    versionKey: false,
  }
);

const Usuario = db.model('usuario', UsuarioSchema);




app.get("/getAllUsuario", async (req, res) => {
  try {
    const activeUsuarios = await Usuario.find({  })
    .sort({ fechaContratacion: -1 }) 
    .limit(30);
    res.send({ status: "ok", data: activeUsuarios });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

app.get("/getUsuario", async (req, res) => {
  try {
    const { email } = req.query;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).send([{ status: "not found", message: "Usuario no encontrado" }]);
    }

    // Devuelve un arreglo con el objeto usuario
    res.send([usuario]);
  } catch (error) {
    console.error(error);
    res.status(500).send([{ status: "error", message: "Internal server error" }]);
  }
});


app.post("/addUsuario", async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const nuevoUsuario = new Usuario({
      picture: data.picture || '/images/imagenes/user.png',
      usuario: data.usuario,
      nombre: data.nombre,
      apellidop: data.apellidop,
      apellidom: data.apellidom,
      granja: data.granja,
      responsabilidad: data.responsabilidad,
      area: data.area,
      password: hashedPassword,
      email: data.email,
      fechaNacimiento: data.fechaNacimiento,
      genero: data.genero,
      horario: data.horario,
      fechaContratacion: data.fechaContratacion,
      departamento: data.departamento,
      status: data.status,
      contacto: data.contacto,
      salario: data.salario,
      calle: data.calle,
      numeroI: data.numeroI,
      numeroE: data.numeroE,
      ciudad: data.ciudad,
      estado: data.estado,
      cp: data.cp,
      tarea: data.tarea,
      epp: data.epp,
      proveedor: 0,
      rango: 'nuevo',
    });

    await nuevoUsuario.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

app.put('/editUsuario/:fechaContratacion', async (req, res) => {
  try {
    const fechaContratacion = req.params.fechaContratacion;
    const newData = req.body;

    const updatedUsuario = await Usuario.findOneAndUpdate(
      { fechaContratacion: fechaContratacion },
      { $set: newData },
      { new: true }
    );

    if (!updatedUsuario) {
      return res.status(404).json({ message: 'Transporte no encontrado' });
    }

    res.status(200).json({ message: 'Datos actualizados con éxito', data: updatedUsuario });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const token = jwt.sign(
        {
          granja: user.granja,
          usuario: user.usuario,
          nombre: user.nombre,
          apellidop: user.apellidop,
          apellidom: user.apellidom,
          proveedor: user.proveedor,
          email: user.email,
          rango: user.rango,
        },
        'mi_secreto_super_secreto', // Cambia esto a tu secreto real
        { expiresIn: '15m' } // Tiempo de expiración del token
      );

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token: token, // Enviar el token al cliente
      });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

const PORT = 3020;
app.listen(PORT, () => {
  console.log('Server is running on port ',{PORT});
});