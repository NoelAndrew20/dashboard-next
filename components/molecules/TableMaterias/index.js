import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TableMaterias = ({ data, setData }) => {
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

    const displayData = searchTerm ? data.filter(item => item.Item_Name && item.Item_Name.toLowerCase().includes(searchTerm)) : data;
    const displayDataFinal = displayData.slice(startIndex, endIndex);

    useEffect(() => {
      setCurrentPage(1); 
    }, [searchTerm]);

    return (
        <>
        <div className="search-container">
            <input
            type="text"
            className={isDarkMode ? "bg-black" : "bg-white"}
            placeholder="Buscar por Nombre"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value.toLocaleLowerCase())}
            />
        </div>
        <div className={isDarkMode ? "table-d" : "table"}>
            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                <thead>
                    <tr>
                        <th>Año recibido</th>
                        <th>Mes recibido</th>
                        <th>Description</th>
                        <th>Nombre del item</th>
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
                        <td>{item.AñoRecibo}</td>
                        <td>{item.MesRecibo}</td>
                        <td>{item.Description}</td>
                        <td>{item.Item_Name}</td>
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
export default TableMaterias;