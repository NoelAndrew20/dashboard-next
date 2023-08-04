import { useState } from "react";

const Table = () => {
    const [data, setData] = useState([
        {usuario: 'lorem', nombre: 'lorem', apellido: 'lorem', puesto:'lorem', grupo: 'lorem'},
        {usuario: 'lorem2', nombre: 'lorem2', apellido: 'lorem2', puesto:'lorem2', grupo: 'lorem2'},
        {usuario: 'lorem3', nombre: 'lorem3', apellido: 'lorem3', puesto:'lorem3', grupo: 'lorem3'},
        {usuario: 'lorem4', nombre: 'lorem4', apellido: 'lorem4', puesto:'lorem4', grupo: 'lorem4'}
    ])
    return (
        <div className="table">
            <table className="table-container">
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
            </table>
        </div>
    )
}
export default Table;