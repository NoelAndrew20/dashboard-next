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

const BarChart = ()=> {
    
const labels = ['C', 'A1', 'A2', 'A3', 'A4', 'G1', 'M1C','M1D','Z1','G2','M2C','M2D','Z2','G3','M3C','M3D','Z3','G4','M4C','M4D','Z4','G5','M5C','M5D','Z5','G6','M6C','M6D'];


const data = {
  labels,
  datasets: [
    {
      label: 'Vientre',
      data: [Math.round(jsonData.alimento.costo_etapa_A.Vientre.C*100)/100,jsonData.alimento.costo_etapa_A.Vientre.A1,Math.round(jsonData.alimento.costo_etapa_A.Vientre.A2*100)/100,jsonData.alimento.costo_etapa_A.Vientre.A3,Math.round(jsonData.alimento.costo_etapa_A.Vientre.A4*100)/100,jsonData.alimento.costo_etapa_A.Vientre.G1,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M1C*100)/100,jsonData.alimento.costo_etapa_A.Vientre.M1D,Math.round(jsonData.alimento.costo_etapa_A.Vientre.Z1*100)/100,jsonData.alimento.costo_etapa_A.Vientre.G2,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M2C*100)/100,jsonData.alimento.costo_etapa_A.Vientre.M2D,Math.round(jsonData.alimento.costo_etapa_A.Vientre.Z2*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.G3*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M3C*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M3D*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.Z3*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.G4*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M4C*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M4D*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.Z4*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.G5*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M5C*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M5D*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.Z5*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.G6*100)/100,Math.round(jsonData.alimento.costo_etapa_A.Vientre.M6C*100)/100,],
    backgroundColor: 'rgba(233,151,9, 0.6)',
    },
  ],
};

  return <Bar data={data} />;
}

export default BarChart;