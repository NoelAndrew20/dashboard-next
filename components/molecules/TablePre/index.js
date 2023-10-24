import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';
const axios = require('axios');


const TablePre = ({ data, setData }) => {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleExpand = (index) => {
      setExpandedRow(index === expandedRow ? null : index);
    };
    const entriesPerPage = 10;
    const totalPages = data ? Math.ceil(data.length / entriesPerPage) : 0;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [searchTerm, setSearchTerm] = useState('');
    const displayData = searchTerm ? data.filter(item => item.fechaEntrega && item.fechaEntrega.toLowerCase().includes(searchTerm)) : data;
    const displayDataFinal = displayData ? displayData.slice(startIndex, endIndex) : [];


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
                        placeholder="Buscar por fecha"
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
                        <th>
                            Fecha
                        </th>
                        <th>
                            Solicitud
                        </th>
                        <th>
                            Detalles
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayDataFinal.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr
                                className={`table-row ${
                                isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-[#F7F9FB]' : 'bg-[#a5b4fc]')
                                }`}
                            >
                              <td>{item.fecha}</td>
                              <td>{item.solicitud}</td>
                              <td className=" p-1 flex justify-center">
                                <button
                                  className="flex align-center"
                                  onClick={() => handleExpand(index)}
                                >
                                {expandedRow === index ? 
                                    <Image src="images/svg/expanded.svg" width={25} height={25}/>
                                    :<Image src="images/svg/expand.svg" width={25} height={25}/>
                                }
                                </button>
                              </td>
                            </tr>
                            {expandedRow === index && (
                            <>
                            <tr>
                                <th>
                                   <div>
                                     #
                                   </div>
                                 </th>
                                <th>
                                   <div>
                                     RFID
                                   </div>
                                </th>
                               </tr>
                               {item.solicitudes.map((solicitud, i) => (
                                <tr key={i}>
                                    <td>{solicitud.no}</td>
                                    <td>{solicitud.rfid}</td>
                                </tr>
                                ))}
                              </>
                            )}
                        </React.Fragment>
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
export default TablePre;