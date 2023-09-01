import React from 'react';
import jsonData from '../../../public/api/pronostico/python/output.json'
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

const BarChart = ()=>{

    const labels = ['M','D','E'];
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Lechon',
          data: [Math.round(jsonData.alimento.costo_etapa_A.Lechon.M*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Lechon.D*100)/10,Math.round(jsonData.alimento.costo_etapa_A.Lechon.E*100)/1000,],
          backgroundColor: 'rgba(162, 150, 21, 1)',
        },
      ]
    };
    return <Bar data={data} />
  }
  export default BarChart;