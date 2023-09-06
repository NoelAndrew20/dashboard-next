import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TableAlertas = ({ data, setData }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
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
        <div className={isDarkMode ? "table-d" : "table"}>
            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                <thead>
                    <tr>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                        <th>Puerta</th>
                        <th>Area</th>
                        <th>Nave</th>
                        <th>Granja</th>
                    </tr>
                </thead>
                <tbody>
                {currentEntries.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                        isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-white' : 'bg-gray-200')
                        }`}
                    >                          <td>
                        {item.message.split('[ALERTA]').map((part, partIndex) => (
                            partIndex === 1 ? (
                            <span key={partIndex}><label className="alert-message">ALERTA</label> {part}</span>
                            ) : (
                            <span key={partIndex}>{part}</span>
                            )
                        ))}
                        </td>
                        <td>{item.fecha}</td>
                        <td>{item.puerta}</td>
                        <td>{item.area}</td>
                        <td>{item.nave}</td>
                        <td>{item.granja}</td>
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
export default TableAlertas;