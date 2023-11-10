import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TableSeleccion = ({ data, setData }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();
    const entriesPerPage = 10;
    const totalPages = Math.ceil(data?.length / entriesPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    
    const [searchTerm, setSearchTerm] = useState('');

    const displayData = searchTerm ? data.filter(item => item.numeroSolicitud && item.numeroSolicitud.toLowerCase().includes(searchTerm)) : data;
    const displayDataFinal = displayData?.slice(startIndex, endIndex);

    useEffect(() => {
      setCurrentPage(1); 
    }, [searchTerm]);


    return (
        <>
        <div className="search-container mb-5">
            <div className={isDarkMode ? "flex inner-search-d" : "flex inner-search"}>
                <div>
                    <input
                        type="text"
                        className={isDarkMode ? "bg-black" : "bg-white"}
                        placeholder="Buscar por solicitud"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value.toLocaleLowerCase())}
                    />
                </div>
                <div className="inner-search-icon">
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 15.5L19 19" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div className={isDarkMode ? "table-d" : "table"}>
            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                <thead>
                    <tr>
                        <th>Solicitud</th>
                        <th>Nombre del solicitante</th>
                        <th>Nombre alimento</th>
                        <th>Precio</th>
                        <th>Metodo de entrega</th>
                    </tr>
                </thead>
                <tbody>
                    {displayDataFinal?.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                        isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-[#F7F9FB]' : 'bg-[#a5b4fc]')
                        }`}
                    >  
                        <td>
                            {item.numeroSolicitud}
                        </td>
                        <td>
                            {item.nombreSolicitante}
                        </td>
                        <td>
                            {item.solicitud && item.solicitud[0] ? item.solicitud[0].nombreAlimento : ''}
                        </td>
                        <td>
                            {item.solicitud && item.solicitud[0] ? item.solicitud[0].precio : ''}
                        </td>
                        <td>
                            {item.solicitud && item.solicitud[0] ? item.solicitud[0].metodo : ''}
                        </td>
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
export default TableSeleccion;