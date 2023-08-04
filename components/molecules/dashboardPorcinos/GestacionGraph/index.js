import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GestacionGraph = () => {
    const getGraphDataSet = Object.freeze({
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [2, 9, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Dataset 2',
                data: [5, 5, 4, 3, 9, 2],
                backgroundColor: 'rgba(152, 206, 243)',
                borderColor: 'rgba(19, 122, 191))',
                borderWidth: 1,
            },
    ],
    })
    const getGraphDataSet2 = Object.freeze({
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [2, -9, 3, 5, -2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                borderWidth: 2,
                borderRadius: 25
            },
            {
                label: 'Dataset 2',
                data: [5, 5, -4, 3, 9, 2],
                backgroundColor: 'rgba(152, 206, 243)',
                borderColor: 'rgba(19, 122, 191))',
                borderWidth: 1,
            },
    ],
    })
    return (
        <div className="porcinos-area p-5">
            <div>
                <h1 className="graph-title">Ciclos de gestación, maternidad y zona zen</h1>
            </div>
            <div className="w-100 d-flex mt-2">
                <div className="w-50 radar-chart">
                    <Bar data={getGraphDataSet} />
                    <p>Hace 30 días</p>
                </div>
                <div className="w-50 radar-chart" id="chart-2">
                    <Bar data={getGraphDataSet2} />
                    <p>Hoy</p>
                </div>
            </div>
        </div>
    )
}
export default GestacionGraph;