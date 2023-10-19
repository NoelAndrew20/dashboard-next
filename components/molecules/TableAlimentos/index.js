import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';
const axios = require('axios');


const TableAlimentos = ({ data, setData }) => {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const entriesPerPage = 10;
    //const totalPages = Math.ceil(data.length / entriesPerPage);
    const totalPages = data ? Math.ceil(data.length / entriesPerPage) : 0;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [searchTerm, setSearchTerm] = useState('');
    const displayData = searchTerm ? data.filter(item => item.fechaEntrega && item.fechaEntrega.toLowerCase().includes(searchTerm)) : data;
    //const displayDataFinal = displayData.slice(startIndex, endIndex);
    const displayDataFinal = displayData ? displayData.slice(startIndex, endIndex) : [];


    useEffect(() => {
      setCurrentPage(1); 
    }, [searchTerm]);

      const handleSendRequest = () => {
        const updatedAlimento = {
            fecha: data[0].fecha,
            nivelentrega: data[0].nivelEntrega,
            fechaentrega: data[0].fechaEntrega,
            nombreZona: data[0].nombreZona,
            nombreSolicitante: data[0].nombreSolicitante,
            estatus: 1,
        };
    
        if (data[0].lotes && data[0].lotes.length > 0) {
          updatedAlimento.nombreAlimento = data[0].lotes[0].nombreAlimento;
          updatedAlimento.cantidad = data[0].lotes[0].cantidad;
          updatedAlimento.unidad = data[0].lotes[0].unidad;
        }
        
        //const apiUrl = 'http://192.168.100.10:3010/editTransporte/' + updatedUsuario.fechaContratacion;  
        const apiUrl = 'http://localhost:3080/editAlimento/';
        axios.put(apiUrl, updatedAlimento)
        .then(response => {
            console.log("Respuesta de la API:", response.data);
        })
        .catch(error => {
            console.error("Error al enviar la solicitud:", error);
        });
    };

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
                        <th>Fecha de solicitud</th>
                        <th>Nivel</th>
                        <th>Nombre del solicitante</th>
                        <th>Alimentos</th>
                        {router.pathname === "/RegistroAlimentos"
                        ?
                        <th>Enviar</th>
                        : ""
                        }
                    </tr>
                </thead>
                <tbody>
                    {displayDataFinal.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                        isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-white' : 'bg-[#F1CD96]')
                        }`}
                    >       
                        <td>{item.fecha}</td>
                        <td>{item.nivelEntrega}</td>
                        <td>{item.nombreSolicitante}</td>
                        <td>
                            <ul>
                                {item.lotes?.map((lote, subIndex) => (
                                <li key={subIndex}>
                                    {lote.nombreAlimento}: {lote.cantidad} {lote.unidad}
                                </li>
                                ))}
                            </ul>
                        </td>
                        {router.pathname === "/RegistroAlimentos"
                        ? <td>
                            <button className="edit-btn" onClick={handleSendRequest}>
                                <Link href="../RegistroAlimentos">
                                    <img src="images/svg/send.svg" width={15} height={15}/>
                                </Link>
                            </button>
                        </td>
                        : ""
                        }
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
export default TableAlimentos;