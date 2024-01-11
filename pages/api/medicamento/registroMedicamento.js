/*
Estructurar todo

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module
const app = express();
app.use(cors());
app.use(express.json());

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

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

*/

/*
//import mongoose from 'mongoose';
const mongoose = require("mongoose");

// Definir un esquema para la colección "Transporte"
const MedicamentoSchema = new mongoose.Schema(
  {
    AñoRecibo: String,
    MesRecibo: String,
    Vendor_Packslip_ID: String,
    Project_ID: String,
    Description: String,
    Employee_ID: String,
    Receipt_Employee_ID: String,
    Vendor_ID: String,
    PO_Name: String,
    Purch_Order_ID: String,
    Item_ID: String,
    Item_Name: String,
    Purch_Order_Date: String,
    Unit_of_Measure: String,
    Uni_Compra: String,
    Pur_Conv_Factor: String,
    AP_Currency_Rate: String,
    Suma_de_Receipt_Qty: String,
    Suma_de_PO_Unit_Price: String,
    Suma_de_ImportePartida: String,
  },
  {
    collection: 'ComMedEne-Dic2022',
    versionKey: false,
  }
);

// Crear un modelo basado en el esquema
mongoose.model('Medicamento', MedicamentoSchema);

*/