const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module

const app = express();
app.use(cors());

app.use(express.json());

//const mongoUrl = "mongodb://192.168.100.8:27017/maindb";
const mongoUrl = "mongodb://192.168.100.20:27017/C3_LaPurisima";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to database");
})
.catch((e) => console.log(e));

require("../schema/schemaAlerta.js");
const Alerta = mongoose.model("Alerta");

app.get("/getAllAlerta", async (req, res) => {
  try {
    const allAlerta = await Alerta.find({});
    res.send({ status: "ok", data: allAlerta });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
