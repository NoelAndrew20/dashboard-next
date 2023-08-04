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
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const AreaHoy = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const getGraphDataSet = Object.freeze({
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [2, 9, 3, 5, 2, 3],
            borderColor: "rgb(233, 11, 9)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: [5, 5, 4, 3, 9, 2],
            borderColor: "rgb(65,105,225)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 3",
            data: [2, 6, 4, 7, 7, 1],
            borderColor: "rgb(65,105,225)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        }
    ]
    })
    return (
        <div className="porcino-status">
            <div>
                <h1 className="graph-title">Porcinos por área hoy</h1>
            </div>
            <div className="d-flex justify-content-center">
                <div className="status-chart">
                    <Line data={getGraphDataSet} />
                </div>
            </div>
        </div>
    )
  }
export default AreaHoy;