import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const PorcinoStatus = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const getGraphDataSet = Object.freeze({
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [2, 9, 3, 5, 2, 3],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [5, 5, 4, 3, 9, 2],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: [2, 8, 9, 3, 7, 6],
    },
  ],
});

    return (
      <div className="porcino-status">
        <div>
          <h1 className="graph-title">Porcinos por estatus</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="status-chart d-flex justify-content-center align-items-center">
            <Chart type='bar' data={getGraphDataSet} />
          </div>
        </div>
    </div>
    )
}
export default PorcinoStatus;