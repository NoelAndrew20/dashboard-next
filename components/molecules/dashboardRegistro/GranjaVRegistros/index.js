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
import GraphInfo from '@/components/atoms/GraphInfo';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const GranjaVRegistros = () => {
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
        <div className="porcinos-area">
            <div className="gvr-container p-5">
                <div className="gvr-chart">
                    <div>
                        <h1 className="graph-title">Total de porcinos dentro de la granja vs. registros</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="status-chart">
                          <Chart type='bar' data={getGraphDataSet} />
                      </div>
                    </div>
                </div>
                <div className="info-column justify-content-center">
                    <div className="d-flex justify-content-center">
                        <div className="gvr-info-container">
                            <p>Mes actual</p>
                            <GraphInfo label={"Por nacimiento"} cant={"19,455"} id={"container5"}/>
                            <GraphInfo label={"Por compra"} cant={"487"} id={"container1"}/>
                            <GraphInfo label={"Por venta"} cant={"34,859"} id={"container9"}/>
                            <GraphInfo label={"Por muerte"} cant={"45,967"} id={"container10"}/>
                            <GraphInfo label={"Total"} cant={"27,000,000"} id={"container11"}/> 
                        </div>
                        <div className="gvr-info-container">
                            <p>Año acumulado</p>
                            <GraphInfo label={"Por nacimiento"} cant={"19,455"} id={"container5"}/>
                            <GraphInfo label={"Por compra"} cant={"487"} id={"container1"}/>
                            <GraphInfo label={"Por venta"} cant={"34,859"} id={"container9"}/>
                            <GraphInfo label={"Por muerte"} cant={"45,967"} id={"container10"}/>
                            <GraphInfo label={"Total"} cant={"27,000,000"} id={"container11"}/> 
                        </div>
                    </div>
                </div>          
            </div>
        </div>
    )
}
export default GranjaVRegistros;