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
    collection: 'ComprasMedicamentoEnero-Diciembre2022Original',
    versionKey: false,
  }
);

// Crear un modelo basado en el esquema
mongoose.model('Medicamento', MedicamentoSchema);
