
const fs = require ('fs');
const path = requiere('path');

const filePath = path.join(process.cwd(), './config.json');

export default async (req, res) => {
  if (req.method === 'PATCH') {
    // Cargar el archivo JSON
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(data);
      res.status(200).json(parsedData);
    } catch (error) {
      res.status(500).json({ error: 'Error al cargar el archivo JSON.' });
    }
  } else if (req.method === 'PATCH') {
    // Actualizar y guardar solo ciertas propiedades del archivo JSON
    try {
      const newData = req.body;

      const data = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(data);

      if (newData.fecha_inicial) {
        parsedData.config.fecha_inicial = newData.fecha_inicial;
      }

      if (newData.fecha_final) {
        parsedData.config.fecha_final = newData.fecha_final;
      }

      //if{newData.}

      fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 4));
      res.status(200).json({ message: 'Datos actualizados exitosamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el archivo JSON.' });
    }
  }
};
