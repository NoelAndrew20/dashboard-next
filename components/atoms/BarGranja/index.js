import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
const axios = require('axios');
const BarGranja = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://192.168.100.10:3141/getAllSimulacion')
      .then((response) => {
        const data = response.data;
        setData(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const currentDate = new Date()
    .toLocaleDateString('en-GB')
    .replace(/\//g, '-');
  const currentDateFormatted = currentDate.replace(
    /(\d{2})-(\d{2})-(\d{2})/,
    '$1-$2-$3'
  );
  const startIndex = data?.findIndex((item) => item.Fecha === currentDate);
  if (startIndex === -1) {
    return <div>No se encontraron datos para la fecha actual.</div>;
  }
  const slicedData = data?.slice(startIndex, startIndex + 20);
  const labels = slicedData?.map((item) => item.Fecha);
  const totals = slicedData?.map((item) => item.Cuarentena.Total);
  const barData = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: totals,
        backgroundColor: ['rgba(200, 145, 22, 1)', 'rgb(13, 61, 100)'],
      },
    ],
  };
  return <Bar data={barData} />;
};

export default BarGranja;
