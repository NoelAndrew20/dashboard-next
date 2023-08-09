import { useRouter } from 'next/router';
const Table = ({ data }) => {
    const router = useRouter();

    return (
        <div className="table">
            <table className="table-container">
            {router.pathname === "/RegistroUsuarios"
            ? 
            (
                <>
                <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Puesto</th>
                    <th>Grupo</th>
                </tr>
                </thead>
                <tbody>

                {data.map((item, index) => (
                    <tr key={index} className="table-cel">
                        <td>{item.usuario}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido}</td>
                        <td>{item.puesto}</td>
                        <td>{item.grupo}</td>
                    </tr>
                ))}
                </tbody>
                </>
            )
            : router.pathname === "/RegistroTransporte"
            ?
            (
                <>
                <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Camion</th>
                    <th>Destino</th>
                    <th>Hora salida granja</th>
                    <th>Hora llegada destino</th>
                    <th>Cantidad de cerdos</th>
                    <th>Auditor</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="table-cel">
                        <td>{item.fecha}</td>
                        <td>{item.camion}</td>
                        <td>{item.destino}</td>
                        <td>{item.salida}</td>
                        <td>{item.hrLlegada}</td>
                        <td>{item.ctCerdos}</td>
                        <td>{item.auditor}</td>

                    </tr>
                ))}
                </tbody>
                </>
                )
                :
                <>
                <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Camion</th>
                    <th>Destino</th>
                    <th>Hora salida granja</th>
                    <th>Hora llegada destino</th>
                    <th>Cantidad de cerdos</th>
                    <th>Auditor</th>
                </tr>
                </thead>
                <tbody>
               
                    <tr className="table-cel">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                </>
            }
            </table>
        </div>
    )
}
export default Table;