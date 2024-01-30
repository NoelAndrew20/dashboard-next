import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const GraphInventario = ({ data }) => {
  const chartData = {
    labels: data.map(item => item._id.area),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
            'rgba(235,148,12, 0.2)',
            'rgba(22, 104, 246, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(65, 244, 205, 0.2)',
            'rgba(205, 65, 244, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(22, 104, 246, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(65, 244, 205, 1)',
            'rgba(205, 65, 244, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      <h2 className="mt-2 text-center font-bold">Cantidad de inventario de cerdos por zona</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default GraphInventario;
