import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import jsonData from '../../../public/api/pronostico/python/output.json'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['A', 'GV', 'MV', 'ML', 'D', 'E'],
        datasets: [
          {
            label: '# of Votes',
            data: [jsonData.alimento.kg_tipo_A.Vientre.A, jsonData.alimento.kg_tipo_A.Vientre.GV, jsonData.alimento.kg_tipo_A.Vientre.MV, jsonData.alimento.kg_tipo_A.Lechon.ML, jsonData.alimento.kg_tipo_A.Lechon.D, jsonData.alimento.kg_tipo_A.Lechon.E,],
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
    return(
        <Pie data={data} />
    )
}
export default PieChart;
