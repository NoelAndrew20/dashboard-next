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

const LineChart = ({ dataArray }) => {
    const data = {
        labels: dataArray.map(item => item.dia),
        datasets: [
        {
            label: 'Dataset 1',
            data: dataArray.map(item => parseInt(item.kg)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        ],
    };
    
    return <Line data={data} />;
}
export default LineChart;

