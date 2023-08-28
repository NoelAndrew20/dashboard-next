//import mongoose from 'mongoose';
const mongoose = require("mongoose");

// Definir un esquema para la colección "Transporte"
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
    collection: 'usuarioPrueba',
    versionKey: false,
  }
);

// Crear un modelo basado en el esquema
mongoose.model('Usuario', UsuarioSchema);

//export default Transporte;



