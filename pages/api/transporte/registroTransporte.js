
//import mongoose from 'mongoose';

const mongoose = require('mongoose')


// Definir un esquema para la colección "transporte"
const TransporteSchema = new mongoose.Schema({
  fecha: String,
  granja: String,
  camion: String,
  jaula: String,
  operador: String,
  cliente: String,
  destino: String,
  salida: String,
  hrLlegada: String,
  tmpRecorrido: String,
  hrInicio: String,
  kgSalida: String,
  kgDesembarque: String,
  rango: String,
  muertos: String,
  parada: String,
  auditor: String,
  incidencias: String,
  revision: String,
  hrFinal: String,
  merma: String,
  ctCerdos: String,
}, { versionKey: false });

// Crear un modelo basado en el esquema
const Transporte = mongoose.model('Transporte', TransporteSchema);

export default async function postHandler(req, res) {
  if (req.method === 'POST') {
    const data = req.body; // Obtener los datos del cuerpo de la solicitud POST

    // Conectar a la base de datos MongoDB
    await mongoose.connect('mongodb://192.168.100.8:27017/proyectoSRS', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      // Crear una nueva instancia del modelo con los datos recibidos
      const nuevoTransporte = new Transporte({
        fecha: data.fecha,
        granja: data.granja,
        camion: data.camion,
        jaula: data.jaula,
        operador: data.operador,
        cliente: data.cliente,
        destino: data.destino,
        salida: data.salida,
        hrLlegada: data.hrLlegada,
        tmpRecorrido: data.tmpRecorrido,
        hrInicio: data.hrInicio,
        kgSalida: data.kgSalida,
        kgDesembarque: data.kgDesembarque,
        rango: data.rango,
        muertos: data.muertos,
        parada: data.parada,
        auditor: data.auditor,
        incidencias: data.incidencias,
        revision: data.revision,
        hrFinal: data.hrFinal,
        merma: data.merma,
        ctCerdos: data.ctCerdos,
      });

      // Guardar el nuevo transporte en la base de datos
      await nuevoTransporte.save();

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

export async function getHandler(req, res) {
  if (req.method === 'GET') {
    try {
      // Conectar a la base de datos MongoDB
      await mongoose.connect('mongodb://192.168.100.8:27017/proyectoSRS', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('Conexión exitosa a la base de datos');

      // Obtener todos los transportes de la colección
      const transportes = await Transporte.find();

      // Cerrar la conexión a la base de datos
      await mongoose.connection.close();

      res.status(200).json(transportes);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ message: 'Error al obtener los datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}

















/*import mongoose from 'mongoose';


// Definir un esquema para la colección "transporte"
const TransporteSchema = new mongoose.Schema({
  fecha: String,
  granja: String,
  camion: String,
  jaula: String,
  operador: String,
  cliente: String,
  destino: String,
  salida: String,
  hrLlegada: String,
  tmpRecorrido: String,
  hrInicio: String,
  kgSalida: String,
  kgDesembarque: String,
  rango: String,
  muertos: String,
  parada: String,
  auditor: String,
  incidencias: String,
  revision: String,
  hrFinal: String,
  merma: String,
  ctCerdos: String,
}, { versionKey: false });

// Crear un modelo basado en el esquema
const Transporte = mongoose.model('Transporte', TransporteSchema);


export default async function postHandler(req, res) {
  if (req.method === 'POST') {
    const data = req.body; // Obtener los datos del cuerpo de la solicitud POST

    // Conectar a la base de datos MongoDB
    await mongoose.connect('mongodb://192.168.100.8:27017/proyectoSRS', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    

    try {
      // Crear una nueva instancia del modelo con los datos recibidos
      const nuevoTransporte = new Transporte({
        fecha: data.fecha,
        granja: data.granja,
        camion: data.camion,
        jaula: data.jaula,
        operador: data.operador,
        cliente: data.cliente,
        destino: data.destino,
        salida: data.salida,
        hrLlegada: data.hrLlegada,
        tmpRecorrido: data.tmpRecorrido,
        hrInicio: data.hrInicio,
        kgSalida: data.kgSalida,
        kgDesembarque: data.kgDesembarque,
        rango: data.rango,
        muertos: data.muertos,
        parada: data.parada,
        auditor: data.auditor,
        incidencias: data.incidencias,
        revision: data.revision,
        hrFinal: data.hrFinal,
        merma: data.merma,
        ctCerdos: data.ctCerdos,
      });

      // Guardar el nuevo transporte en la base de datos
      await nuevoTransporte.save();

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




export default async function getHandler(req, res) {
  if (req.method === 'GET') {
    try {
      // Conectar a la base de datos MongoDB
      await mongoose.connect('mongodb://192.168.100.8:27017/proyectoSRS', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Obtener todos los transportes de la colección
      const transportes = await Transporte.find();

      // Cerrar la conexión a la base de datos
      await mongoose.connection.close();

      res.status(200).json(transportes);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ message: 'Error al obtener los datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}*/