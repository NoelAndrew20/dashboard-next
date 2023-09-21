const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

// Parsear solicitudes JSON
app.use(bodyParser.json());

app.post('/api/pronostico/python/Constanza_estable/stable', (req, res) => {
  try {
    const { question } = req.body;
    console.log('Pregunta recibida en la API:', question);

    // Ejecutar el entorno de Python
    const environmentName = 'C_stable_v1_2';
    const activateEnvCmd = `activate ${environmentName} && python stable.py`;

    // Ejecutar el script de Python
    // const scriptName = 'stable.py'; // Cambiar al nombre de tu script si es necesario
    // const runScriptCmd = `python ${scriptName}`;
    // const combinedCmd = `${activateEnvCmd} && ${runScriptCmd}`;

    exec(activateEnvCmd, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing script:', error);
        return res.status(500).json({ message: 'Error executing script', output: '', error: error.message });
      }

      const outputText = stdout.toString();
      const output = outputText.trim();

      if (output.includes('kill')) {
        // Terminar procesos relacionados con el script Python (ajusta según sea necesario)
        exec("pkill -f python", () => {
          console.log('Procesos terminados');
        });
        return res.json({ message: 'Procesos terminados' });
      }

      if (output.includes('Question:')) {
        return res.json({ message: 'Se necesita la pregunta' });
      } else if (output.includes('Ingrese el argumento 1:')) {
        return res.json({ message: 'Se necesita el 1 argumento' });
      } else {
        return res.json({ message: 'Ejecución exitosa', output });
      }
    });
  } catch (e) {
    console.error('Error en la solicitud:', e);
    return res.status(500).json({ message: 'Error en la solicitud', output: '', error: e.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor Node.js en funcionamiento en el puerto ${PORT}`);
});
