const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module

const app = express();
app.use(cors());

app.use(express.json());

//const mongoUrl = "mongodb://192.168.100.8:27017/proyectoSRS";
const mongoUrl = "mongodb://192.168.100.10:27017/C3_LaPurisima";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to database");
})
.catch((e) => console.log(e));

require("../schema/schemaMedicamento.js");
const Medicamento = mongoose.model("Medicamento");

app.get("/getAllMedicamento", async (req, res) => {
  try {
    const allMedicamento = await Medicamento.find({});
    res.send({ status: "ok", data: allMedicamento });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});


/*app.post("/addTransporte", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const nuevoTransporte = new Transporte({
      //fecha: data.fecha,
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

    await nuevoTransporte.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});*/

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

