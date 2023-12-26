const express = require('express');
const cors = require('cors'); // Importa el paquete cors

const app = express();

const corsOptions = {
    origin: 'http://localhost:5000/api/pronostico/python/apiconfig', // Cambia esto a tu URL de la API en Python
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
app.use(cors(corsOptions));
  

app.listen(3002, () => {
  console.log('Server is running on port 3000');
});
