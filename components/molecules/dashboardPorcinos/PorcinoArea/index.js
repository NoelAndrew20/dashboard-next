import React, { useState, useEffect } from 'react';
import {
Chart as ChartJS,
RadialLinearScale,
PointElement,
LineElement,
Filler,
Tooltip,
Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import GraphInfo from '@/components/atoms/GraphInfo';

ChartJS.register(
RadialLinearScale,
PointElement,
LineElement,
Filler,
Tooltip,
Legend
);

const PorcinoArea = () => {
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
    useEffect(() => {
        getScreenSize();
    }, []);
    return (
        <div className="porcinos-area p-5">
            <div>
                <h1 className="graph-title">Tipo de porcino por área</h1>
            </div>
            {isMobile &&
                <div className="mt-2">
                    <div className="row">
                        <div className="col">
                            <GraphInfo label={"Vientres"} cant={"19,455"}/>
                        </div>
                        <div className="col">
                            <GraphInfo label={"Sementales"} cant={"487"}/>
                        </div>
                        <div className="col">
                            <GraphInfo label={"Lechones"} cant={"34,859"}/>
                        </div>
                        <div className="col">
                            <GraphInfo label={"Engorda"} cant={"45,967"}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <GraphInfo label={"Totales"} cant={"27,000,000"}/>
                        </div>
                    </div>
                </div>
            }  
            <div className="container-2">
                <div className="radar-chart-container">
                    <div className="radar-chart">
                        <Radar data={getGraphDataSet} />
                        <p>Hace 30 días</p>

                    </div>
                    <div className="radar-chart" id="chart-2">
                        <Radar data={getGraphDataSet} />
                        <p>Hace 30 días</p>
                    </div>
                </div>
                {!isMobile &&
                <div className="side-column">
                    <div className="info-column">
                        <GraphInfo label={"Vientres"} cant={"19,455"}/>
                        <GraphInfo label={"Sementales"} cant={"487"}/>
                        <GraphInfo label={"Lechones"} cant={"34,859"}/>
                        <GraphInfo label={"Engorda"} cant={"45,967"}/>
                        <GraphInfo label={"Totales"} cant={"27,000,000"}/>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}
export default PorcinoArea;