const TableGeneralCerdos = ({ isDarkMode, data }) => {
    return (
        <>
         <div className={isDarkMode ? 'table-index-d' : 'table-index'}>
            <table className={isDarkMode ? 'table-container-index-d' : 'table-container-index'}>
                <thead>
                    <tr>
                        <th>Zonas</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CIA</td>
                        <td>{data[0]?.DistribucionCerdos.CIA}</td>
                    </tr>
                    <tr>
                        <td>Engorda A</td>
                        <td>{data[0]?.DistribucionCerdos.CerdoEngordaA}</td>
                    </tr>
                    <tr>
                        <td>Engorda B</td>
                        <td>{data[0]?.DistribucionCerdos.CerdoEngordaB}</td>
                    </tr>
                    <tr>
                        <td>Engorda C</td>
                        <td>{data[0]?.DistribucionCerdos.CerdoEngordaC}</td>
                    </tr>
                    <tr>
                        <td>Engorda D</td>
                        <td>{data[0]?.DistribucionCerdos.CerdoEngordaD}</td>
                    </tr>
                    <tr>
                        <td>Cuarentena</td>
                        <td>{data[0]?.DistribucionCerdos.Cuarentena}</td>
                    </tr>
                    <tr>
                        <td>Desarrrollo B</td>
                        <td>{data[0]?.DistribucionCerdos.DesarrrolloB}</td>
                    </tr>
                    <tr>
                        <td>Gestacion 1</td>
                        <td>{data[0]?.DistribucionCerdos.Gestacion1}</td>
                    </tr>
                    <tr>
                        <td>Gestacion 2</td>
                        <td>{data[0]?.DistribucionCerdos.Gestacion2}</td>
                    </tr>
                    <tr>
                        <td>Gestacion 3</td>
                        <td>{data[0]?.DistribucionCerdos.Gestacion3}</td>
                    </tr>
                    <tr>
                        <td>Gestacion 4</td>
                        <td>{data[0]?.DistribucionCerdos.Gestacion4}</td>
                    </tr>
                    <tr>
                        <td>Lechón</td>
                        <td>{data[0]?.DistribucionCerdos.Lechon}</td>
                    </tr>
                    <tr>
                        <td>Maternidad 1</td>
                        <td>{data[0]?.DistribucionCerdos.Maternidad1}</td>
                    </tr>
                    <tr>
                        <td>Maternidad 2</td>
                        <td>{data[0]?.DistribucionCerdos.Maternidad2}</td>
                    </tr>
                    <tr>
                        <td>Maternidad 3</td>
                        <td>{data[0]?.DistribucionCerdos.Maternidad3}</td>
                    </tr>
                </tbody>
            </table>
            <p className="text-center">Total: { data[0]?.CantidadCerdos }</p>
        </div>
        
        </>
    )
}
export default TableGeneralCerdos;