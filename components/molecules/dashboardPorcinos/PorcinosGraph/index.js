import { useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from "react-chartjs-2"
import GraphInfo from "@/components/atoms/GraphInfo";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const PorcinosGraph = () => {
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
      return (
        <>
        <div className="justify-content-center">
            <div className="container-1">
                    <div className="graph-container">
                        <div className="d-flex">
                            <div>
                                <div>
                                    <h1 className="graph-title">Resumen de cantidad por tipo</h1>
                                </div>
                                <div className="lineal-graphic">
                                    <Line data={getGraphDataSet} />
                                </div>
                            </div>
                            <div className="info-column">
                                <GraphInfo label={"Vientres"} cant={"19,455"}/>
                                <GraphInfo label={"Sementales"} cant={"487"}/>
                                <GraphInfo label={"Lechones"} cant={"34,859"}/>
                                <GraphInfo label={"Engorda"} cant={"45,967"}/>
                                <GraphInfo label={"Totales"} cant={"27,000,000"}/>
                            </div>
                        </div>
                </div>
                <div className="info-container flex-column">
                    <div className="flex-column">
                        <div className="resumen-alertas">
                            <h5>Resumen de alertas</h5>
                            <div className="row">
                                <div className="col">
                                    <GraphInfo label={"Lechones"} cant={"34,859"}/>
                                </div>
                                <div className="col">
                                    <GraphInfo label={"Lechones"} cant={"34,859"}/>
                                </div>
                                <div className="col">
                                    <GraphInfo label={"Lechones"} cant={"34,859"}/>
                                </div>
                            </div>
                        </div>
                        <div>
                        <div className="resumen-area mt-2">
                            <h5>Resumen de cantidad por área</h5>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <GraphInfo label={"Lechones"} cant={"34,859"} id={"container1"}/>
                                    </div>
                                    <div className="col-md-4">
                                        <GraphInfo label={"Lechones"} cant={"34,859"} id={"container2"}/>
                                    </div>
                                    <div className="col-md-4">
                                        <GraphInfo label={"Lechones"} cant={"34,859"} id={"container3"}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <GraphInfo label={"Lechones"} cant={"34,859"} id={"container4"}/>
                                    </div>
                                    <div className="col-md-4">
                                        <GraphInfo label={"Lechones"} cant={"34,859"} id={"container5"}/>
                                    </div>
                                    <div className="col-md-4">
                                        <GraphInfo label={"Lechones"} cant={"34,859"} id={"container6"}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <GraphInfo label={"Lechones"} cant={"34,859"} id={"container7"}/>
                                    </div>
                                    <div className="col-md-4">
                                        <GraphInfo label={"Lechones"} cant={"34,859"} id={"container8"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default PorcinosGraph;