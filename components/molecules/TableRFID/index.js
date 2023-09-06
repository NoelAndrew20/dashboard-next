import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TableRFID = ({ data, setData }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const entriesPerPage = 10;
    const totalPages = Math.ceil(data.length / entriesPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [searchTerm, setSearchTerm] = useState('');

    const displayData = searchTerm ? data.filter(item => item.rfid && item.rfid.toLowerCase().includes(searchTerm)) : data;
    const displayDataFinal = displayData.slice(startIndex, endIndex);
    return (
        <>
        <div className="search-container">
            <input
            type="text"
            className={isDarkMode ? "bg-black" : "bg-white"}
            placeholder="Buscar por RFID"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value.toLocaleLowerCase())}
            />
        </div>
        <div className={isDarkMode ? "table-d" : "table"}>
            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                <thead>
                    <tr>
                    <th>Fecha de registro</th>
                        <th>Zona</th>
                        <th>Puerta</th>
                        <th>Nave</th>
                        <th>Granja</th>
                        <th>RFID</th> 
                    </tr>
                </thead>
                <tbody>
                {displayDataFinal.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                        isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-white' : 'bg-gray-200')
                        }`}
                    > 
                        <td>{item.fecha}</td>
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