import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';
const axios = require('axios');


const MenuTable = ({ data, setData }) => {
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


 

    return (
        <>
        
        <div className={isDarkMode ? "table-d" : "table"}>
            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                <thead>
                    <tr>
                        <th>
                            Fecha
                        </th>
                        <th>
                            No. de Solicitud
                        </th>
                        <th>
                            Detalles
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr
                                className={`table-row ${
                                isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-white' : 'bg-[#F1CD96]')
                                }`}
                            >
                              <td>{item.fecha}</td>
                              <td>{item.solicitud}</td>
                              {console.log("la data",data)}

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
                                     Nombre de alimento
                                   </div>
                                 </th>
                                <th>
                                   <div>
                                     Cantidad
                                   </div>
                                </th>
                               </tr>
                               {data[index].solicitudes.map((solicitud, index) => (
                                    <tr key={index}>
                                    <td>{solicitud.nombreAlimento}</td>
                                    <td>{solicitud.cantidad}</td>
                                    </tr>
                                ))}
                              </>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
       
        </>
    )
}
export default MenuTable;
