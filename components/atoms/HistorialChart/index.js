import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // Cambia "Bar" a "Bar"

// Importa tu archivo "simulacionGranja"
import data from './../../../utils/Historial.json';

const HistorialChart = () => {
  const primeros15Datos = data.slice(0, 15);

  const fechas = primeros15Datos.map((item) => item.fecha);
  const cantidadesKg = primeros15Datos.map((item) => item.etapas[0].cantidadKg);

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
