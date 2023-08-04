import React from 'react';
import { useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from "react-chartjs-2"
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
import { Doughnut } from 'react-chartjs-2';
import GraphInfo from '@/components/atoms/GraphInfo';

const CantidadGraph = () => {
    const [diasTotal, setDiasTotal] = useState(0)
    const [arrayPrueba, setarrayPrueba] = useState([
      { tipoAlmento: "alimento1", racion: 3, diasAlimento: 2, proveedor: "Comida1", precio: 14.5 },
      { tipoAlmento: "alimento2", racion: 5, diasAlimento: 10, proveedor: "Comida2", precio: 14.6 },
      { tipoAlmento: "alimento3", racion: 100, diasAlimento: 70, proveedor: "Comida2", precio: 17.6 },
      { tipoAlmento: "alimento4", racion: 8, diasAlimento: 6, proveedor: "Comida2", precio: 24.6 }
    ])

    const labels = arrayPrueba.map((x) => x.racion)
    const getGraphDataSet = Object.freeze({
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: arrayPrueba.map((x) => x.diasAlimento),
            borderColor: "rgb(233, 11, 9)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: arrayPrueba.map((x) => x.precio),
            borderColor: "rgb(65,105,225)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        }
    ]
    })
    const getGraphDataSet2 = Object.freeze({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        })
      return (
        <>
        <div className="justify-content-center">
            <div className="container-1">
                    <div className="graph-container">
                        <div className="d-flex">
                            <div>
                                <div>
                                    <h1 className="graph-title">Cantidad de registros</h1>
                                </div>
                                <div className="lineal-graphic">
                                    <Line data={getGraphDataSet} />
                                </div>
                            </div>
                            <div className="info-column">
                                <GraphInfo label={"Por nacimiento"} cant={"19,455"}/>
                                <GraphInfo label={"Por compra"} cant={"487"}/>
                                <GraphInfo label={"Por venta"} cant={"34,859"}/>
                                <GraphInfo label={"Por muerte"} cant={"45,967"}/>
                                <GraphInfo label={"Total"} cant={"27,000,000"}/>   
                            </div>
                        </div>
                </div>
                <div className="info-container flex-column">
                <div className="graph-container">
                        <div className="d-flex">
                            <div>
                                <div>
                                    <h1 className="graph-title">Cantidad acumulada de registros</h1>
                                </div>
                                <div className="lineal-graphic">
                                    <Doughnut data={getGraphDataSet2} />
                                </div>
                            </div>
                            <div className="info-column">
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
        </div>
        </>
    )
}
export default CantidadGraph;