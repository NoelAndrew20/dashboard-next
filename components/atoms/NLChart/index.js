import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NLChart = ({dataArr}) => {


  const data = {
    labels: dataArr.map(item => item._id),
    datasets: [
      {
        label: 'Conteo',
        data: dataArr.map(item => item.count),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: 'category',
          position: 'bottom',
        },
      ],
      yAxes: [
        {
          type: 'linear',
          position: 'left',
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default NLChart;
