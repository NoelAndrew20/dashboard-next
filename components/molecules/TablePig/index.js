import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';
const axios = require('axios');


const TablePig = ({ data, setData }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const entriesPerPage = 10;
    const totalPages = data ? Math.ceil(data.length / entriesPerPage) : 0;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [searchTerm, setSearchTerm] = useState('');
 
    useEffect(() => {
      setCurrentPage(1); 
    }, [searchTerm]);


    return (
        <>
     
        <div className={isDarkMode ? "table-d" : "table"}>
          <table className={isDarkMode ? "table-container-d" : "table-container"}>
            <thead>
              <tr>
                <th>Fecha Inicial</th>
                <th>Fecha Final</th>
                <th>Zona</th>
                <th>Nombre del alimento</th>
                <th>Cantidad en KG</th>
              </tr>
            </thead> 
            <tbody>
              {data.map((item, index) => (               
                <tr className="table-row"  key={ index }>
                <td>{item.lote}</td>
                <td>{item.tipo}</td>
                <td>{item.cantidad}</td>
                <td>{item.fechaLicitacion}</td>
                <td>{item.fechaDia0}</td>
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
            <span>{currentPage} de {totalPages}</span>
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
export default TablePig;