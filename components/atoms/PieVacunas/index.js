import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const PieVacunas = ({ dataArray }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    updateChart();
  }, [dataArray]);

  const updateChart = () => {
    if (!dataArray) return;

    const labels = dataArray.map(item => item.tipo);
    const totals = dataArray.map(item => calculateSum(item.vacunas));

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: totals,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(235,148,12, 0.2)',
            'rgba(22, 104, 246, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(65, 244, 205, 0.2)',
            'rgba(205, 65, 244, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderWidth: 1,
        },
      ],
    };

    setData(chartData);
  };

  const calculateSum = (nestedObject) => {
    return Object.values(nestedObject).reduce((acc, value) => {
      return acc + (typeof value === 'number' ? value : 0);
    }, 0);
  };

  return (
    <div>
      {data && <Pie data={data} />}
    </div>
  );
};

export default PieVacunas;
