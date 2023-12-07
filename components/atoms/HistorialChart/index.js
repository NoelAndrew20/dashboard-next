import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const HistorialChart = () => {
  const [data, setData] = useState([]); // Nuevo estado para almacenar los datos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.100.10:3142/getAllSolicitudHistorial');
        const jsonData = response.data;
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const primeros15Datos = data.slice(0, 15);

  const fechas = primeros15Datos.map((item) => item.fecha);
  const cantidadesKg = primeros15Datos.map((item) => item.etapas[0]?.cantidadKg || 0); // Agregar manejo para evitar errores si etapas[0] es undefined

  console.log('Fechas:', fechas);
  console.log('CantidadesKG:', cantidadesKg);

  const chartData = {
    labels: fechas,
    datasets: [
      {
        label: "Total",
        backgroundColor: [
          'rgba(235,148,12, 0.2)',
          'rgba(22, 104, 246, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(65, 244, 205, 0.2)',
          'rgba(205, 65, 244, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        data: cantidadesKg,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default HistorialChart;