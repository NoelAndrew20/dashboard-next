import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; 

import data from './../../../utils/simulacionGranja.json';//este archivo

const BarGranja = () => {
  {/*const [data, setData]=useState([]) y antes de todos la horchata haces el fetch y lo seteas,como siempre
Ahorita data viene de un archivo, pero cuando hagas el set nada mas borra el import y ya no pasa nada*/}
  const currentDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

  const currentDateFormatted = currentDate.replace(/(\d{2})-(\d{2})-(\d{2})/, '$1-$2-$3');
  const startIndex = data.findIndex(item => item.Fecha === currentDate);

  if (startIndex === -1) {
    return <div>No se encontraron datos para la fecha actual.</div>;
  }
  const slicedData = data.slice(startIndex, startIndex + 20);

  const labels = slicedData.map(item => item.Fecha);
  const totals = slicedData.map(item => item.Cuarentena.Total);

  const barData = { 
    labels,
    datasets: [
      {
        label: 'Total',
        data: totals,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return <Bar data={barData} />; 
};

export default BarGranja;
