import { useState } from 'react';
const TableRFID = ({ data, setData }) => {
    const entriesPerPage = 10;
    const totalPages = Math.ceil(data.length / entriesPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentEntries = data.slice(startIndex, endIndex);

    return (
        <>
        <div className="table">
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Zona</th>
                        <th>Puerta</th>
                        <th>Nave</th>
                        <th>Granja</th>
                        <th>RFID</th>
                    </tr>
                </thead>
                <tbody>
                {currentEntries.map((item, index) => (
                    <tr key={index} className="table-cel">
                        <td>{item.zona}</td>
                        <td>{item.puerta}</td>
                        <td>{item.nave}</td>
                        <td>{item.granja}</td>
                        <td>{item.rfid}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="button"
            >
                Anterior
            </button>
            <span className="text-center">{currentPage} de {totalPages}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="button"
            >
                Siguiente
            </button>
        </div>
        </>
    )
}
export default TableRFID;