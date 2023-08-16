import { useRouter } from 'next/router';
import { useState } from 'react';
const Table = ({ data, setData }) => {
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = (index) => {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 1000); 
    };

    return (
        <>
        <div className="table">
            <table className="table-container">
            {router.pathname === "/RegistroUsuarios"
            ? (
                <>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Puesto</th>
                        <th>Grupo</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={index} className="table-row">
                        <td>{item.usuario}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido}</td>
                        <td>{item.puesto}</td>
                        <td>{item.grupo}</td>
                        <td>
                            <button onClick={() => ""} className="edit-btn"><img src="images/svg/edit.svg" width={15} height={15}/></button>
                        </td>
                        <td>
                            <button className="delete-btn" onClick={() => handleDelete(index)}>
                                <img src="images/svg/trash.svg" width={10} height={10}/>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </>

            ) : router.pathname === "/RegistroTransporte"
            ? (
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
                        <th>Editar</th>
                        <th>Eliminar</th>
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
                        <td>
                            <button className="edit-btn"><img src="images/svg/edit.svg" width={15} height={15}/></button>
                        </td>
                        <td>
                            <button className="delete-btn" onClick={() => handleDelete(index)}>
                                <img src="images/svg/trash.svg" width={10} height={10}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                </>
                ) :
                <>
                <thead>
                    <tr>
                        <th>lorem</th>
                        <th>lorem</th>
                        <th>lorem</th>
                        <th>lorem</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-cel">
                        <td>lorem</td>
                        <td>lorem</td>
                        <td>lorem</td>
                        <td>lorem</td>
                    </tr>
                    <tr className="table-cel">
                        <td>lorem</td>
                        <td>lorem</td>
                        <td>lorem</td>
                        <td>lorem</td>
                    </tr>
                    <tr className="table-cel">
                        <td>lorem</td>
                        <td>lorem</td>
                        <td>lorem</td>
                        <td>lorem</td>
                    </tr>
                    <tr className="table-cel">
                        <td>lorem</td>
                        <td>lorem</td>
                        <td>lorem</td>
                        <td>lorem</td>
                    </tr>
                </tbody>
                </>
            }
            </table>
        </div>
         {showConfirmation && (
            <div className="confirmation bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4/4 overflow-y-auto">
                Elemento eliminado
            </div>
        )}
        </>
    )
}
export default Table;