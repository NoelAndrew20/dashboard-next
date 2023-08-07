import { useState } from "react";

const Table = ({ data }) => {
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