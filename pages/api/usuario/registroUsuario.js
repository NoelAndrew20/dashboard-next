const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module

const app = express();
app.use(cors());

app.use(express.json());

//const mongoUrl = "mongodb://192.168.100.8:27017/proyectoSRS";
const mongoUrl = "mongodb://192.168.100.20:27017/C3_LaPurisima";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to database");
})
.catch((e) => console.log(e));

require("../schema/schemaUsuario.js");
const Usuario = mongoose.model("Usuario");

app.get("/getAllUsuario", async (req, res) => {
  try {
    const allUsuario = await Usuario.find({});
    res.send({ status: "ok", data: allUsuario });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

app.post("/addUsuario", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const nuevoUsuario = new Usuario({
      usuario: data.usuario,
      nombre: data.nombre,
      apellido: data.apellido,
      puesto: data.puesto,
      grupo: data.grupo,
      password: data.password,
      email: data.email,
      fechaNacimiento: data.fechaNacimiento,
      genero: data.genero,
      horario: data.horario,
      fechaContratacion: data.fechaContratacion,
      departamento: data.departamento,
      status: data.estado,
      contacto: data.contacto,
      salario: data.salario,
      puesto: data.puesto,
      grupo: data.grupo,
      calle: data.calle,
      ciudad: data.ciudad,
      estado: data.estado,
      cp: data.cp,
      id: data.id,
      nombreGrupo: data.nombreGrupo,
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

    // Si updatedTransporte es null, significa que no se encontró el transporte
    if (!updatedUsuario) {
      return res.status(404).json({ message: 'Transporte no encontrado' });
    }

    res.status(200).json({ message: 'Datos actualizados con éxito', data: updatedUsuario });
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});


const PORT = 3020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



/*import mongoose from 'mongoose';

// Definir un esquema para la colección "usuarios"
const UsuarioSchema = new mongoose.Schema({
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
    estado: String,
    contacto: String, 
    salario: String,
    calle: String,
    ciudad: String, 
    estado: String,
    cp: String, 
    id: String, 
    nombreGrupo: String, 
}, { versionKey: false });

// Crear un modelo basado en el esquema
const Usuario = mongoose.model('Usuario', UsuarioSchema);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body; // Obtener los datos del cuerpo de la solicitud POST

    // Conectar a la base de datos MongoDB
    await mongoose.connect('mongodb://192.168.100.8:27017/proyectoSRS', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    

    try {
      // Crear una nueva instancia del modelo con los datos recibidos
      const nuevoUsuario = new Usuario({
        usuario: data.usuario,
        nombre: data.nombre,
        apellido: data.apellido,
        puesto: data.puesto,
        grupo: data.grupo,
        password: data.password,
        email: data.email,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
        horario: data.horario,
        fechaContratacion: data.fechaContratacion,
        departamento: data.departamento,
        estado: data.estado,
        contacto: data.contacto,
        salario: data.salario,
        puesto: data.puesto,
        grupo: data.grupo,
        calle: data.calle,
        ciudad: data.ciudad,
        estado: data.estado,
        cp: data.cp,
        id: data.id,
        nombreGrupo: data.nombreGrupo,
    });

      // Guardar el nuevo transporte en la base de datos
      await nuevoUsuario.save();

      // Cerrar la conexión a la base de datos
      await mongoose.connection.close();

      res.status(200).json({ message: 'Datos guardados con éxito' });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).json({ message: 'Error al guardar los datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
*/