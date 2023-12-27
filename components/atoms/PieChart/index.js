import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import jsonData from '../../../public/api/output.json'
import jsonData1 from '../../../public/api/config.json'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ dataArray }) => {
    const data = {
        labels: ['Gestacion 4', 'Maternidad 3', 'Gestacion 3', 'Maternidad 2', 'Gestacion 2', 'Maternidad 1', 'Gestacion 1', 'Cuarentena', 'CIA', 'CerdoEngorda D', 'CerdoEngordaC', 'CerdoEngordaB', 'CerdoEngorda A', 'Desarrollo B', 'Lechon'],
        datasets: [
          {
            label: '# de cerdos',
            data: [
              dataArray[0].DistribucionCerdos.Gestacion4, 
              dataArray[0].DistribucionCerdos.Maternidad3,
              dataArray[0].DistribucionCerdos.Gestacion3, 
              dataArray[0].DistribucionCerdos.Maternidad2,
              dataArray[0].DistribucionCerdos.Gestacion2, 
              dataArray[0].DistribucionCerdos.Maternidad1,
              dataArray[0].DistribucionCerdos.Gestacion1, 
              dataArray[0].DistribucionCerdos.Cuarentena, 
              dataArray[0].DistribucionCerdos.CIA, 
              dataArray[0].DistribucionCerdos.CerdoEngordaD, 
              dataArray[0].DistribucionCerdos.CerdoEngordaC, 
              dataArray[0].DistribucionCerdos.CerdoEngordaB, 
              dataArray[0].DistribucionCerdos.CerdoEngordaA, 
              dataArray[0].DistribucionCerdos.DesarrrolloB, 
              dataArray[0].DistribucionCerdos.Lechon, 

            ],
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
