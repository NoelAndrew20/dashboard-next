import React, { useState, useEffect } from 'react';
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
import GraphInfo from '@/components/atoms/GraphInfo';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VientresCiclo = () => {
    const [isMobile, setIsMobile] = useState(false);
    const getScreenSize = () => {
        screen.width < 1000
        ? setIsMobile(true)
        : setIsMobile(false)
    }
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
    useEffect(() => {
        getScreenSize();
    }, []);
    return (
    
        <div className="porcinos-area p-5">
            <div>
                <h1 className="graph-title">Vientres por ciclo</h1>
            </div>
            {isMobile &&
                <div className="mt-2">
                    <div className="row">
                        <div className="col">
                            <GraphInfo label={"Gestación"} cant={"19,455"}/>
                        </div>
                        <div className="col">
                            <GraphInfo label={"Maternidad"} cant={"487"}/>
                        </div>
                        <div className="col">
                            <GraphInfo label={"Zona Zen"} cant={"34,859"}/>
                        </div>
                        <div className="col">
                            <GraphInfo label={"Total de vientres"} cant={"27,000,000"}/>
                        </div>
                    </div>
                </div>
            }  
            <div className="container-2">
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

                {!isMobile &&
                <div className="d-flex mt-2">
                    <div className="side-column info-column">
                        <GraphInfo label={"Gestación"} cant={"19,455"}/>
                        <GraphInfo label={"Maternidad"} cant={"487"}/>
                        <GraphInfo label={"Zona Zen"} cant={"34,859"}/>
                        <GraphInfo label={"Total de vientres"} cant={"27,000,000"}/>
                    </div>
                </div>
                }   
            </div>
        </div>
    )
}
export default VientresCiclo;