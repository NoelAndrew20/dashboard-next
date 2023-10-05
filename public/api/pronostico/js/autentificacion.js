const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configura la conexión a MongoDB
const dbUrl = 'mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection.useDb("C3_LaPurisima");
db.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Define el modelo de usuario
const User = mongoose.model(
  'usuario',
  new mongoose.Schema({
    // Define la estructura de tus documentos aquí
  }, { collection: 'usuario' })
);

const UsuarioSchema = new mongoose.Schema(
    {
      usuario: String,
      nombre: String,
      apellido: String,
      puesto: String,
      grupo: String,
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
      ciudad: String, 
      estado: String,
      cp: String, 
      id: String, 
      nombreGrupo: String,
  },
    {
      //collection: 'usuarios', // Nombre de la colección en la base de datos
      collection: 'usuario',
      versionKey: false,
    }
  );

  
const Usuario = db.model('usuario', UsuarioSchema);


  
// Rutas de autenticación
app.post('/api/register', async (req, res) => {
  try {
    
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

app.post('/api/pronostico/js/autentificacion/login', async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await Usuario.findOne({email});
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas Usuario' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales incorrectas Contrasena' });
    }
    const token = jwt.sign({ email: user.email }, 'mi_secreto_super_secreto');
    res.json({ user });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error en la autenticación' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
