// api/run-script.js
import { spawn } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Lógica para ejecutar el script de Python
    try {
      const pythonScriptPath = path.join(process.cwd(), 'scripts', 'python/modo_calculadora.py');
      const pythonProcess = spawn('python', [pythonScriptPath]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`Python output: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        if (code === 0) {
          res.status(200).json({ message: 'Script ejecutado con éxito.' });
        } else {
          res.status(500).json({ message: 'Error al ejecutar el script.' });
        }
      });
    } catch (error) {
      console.error('Error al ejecutar el script:', error);
      res.status(500).json({ message: 'Error al ejecutar el script.' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido.' });
  }
}
