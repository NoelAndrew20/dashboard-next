import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // Cambia "Pie" a "Bar"

// Importa tu archivo "simulacionGranja"
import data from './../../../utils/simulacionGranja.json';

const BarZen = () => {
  const currentDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

  const currentDateFormatted = currentDate.replace(/(\d{2})-(\d{2})-(\d{2})/, '$1-$2-$3');
  const startIndex = data.findIndex(item => item.Fecha === currentDate);

  if (startIndex === -1) {
    return <div>No se encontraron datos para la fecha actual.</div>;
  }
  const slicedData = data.slice(startIndex, startIndex + 20);

  const labels = slicedData.map(item => item.Fecha);
  const totals = slicedData.map(item => item.Zen1?.Total);

  const barData = { // Cambia "pieData" a "barData"
    labels,
    datasets: [
      {
        label: 'Total', // Agrega una etiqueta
        data: totals,
        backgroundColor: [
          "rgba(200, 145, 22, 1)",
          "rgb(13, 61, 100)"
        ],
      },
    ],
  };

  return <Bar data={barData} />; // Usa "Bar" en lugar de "Pie"
};

export default BarZen;
