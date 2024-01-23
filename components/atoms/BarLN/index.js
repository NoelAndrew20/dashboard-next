import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

const BarLN = ({ data }) => {
  const chartData = {
    labels: data.map(item => item._id.vacuna),
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
          
      },
    ],
  };
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  return (
    <div>
      <Bar data={chartData} options={chartOptions}/>
    </div>
  );
};

export default BarLN;
