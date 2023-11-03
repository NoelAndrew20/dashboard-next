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
 


    useEffect(() => {
      setCurrentPage(1); 
    }, [searchTerm]);

      const handleSendRequest = () => {
        const updatedAlimento = {
            fechaInicial: data[0].fechaInicial,
            fechaFinal: data[0].fechaFinal, 
            nombreAlimento: data[0].nombreAlimento,
            cantidad: data[0].cantidad,
        };
    

        
        const apiUrl = 'http://192.168.100.10:3080/editAlimento';
        //const apiUrl = 'http://localhost:3080/editAlimento/';
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
     
        <div className={isDarkMode ? "table-d" : "table"}>
            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                <thead>
                    <tr>
                        <th>Fecha Inicial</th>
                        <th>Fecha Final</th>
                        <th>Zona</th>
                        <th>Nombre del alimento</th>
                        <th>Cantidad</th>
                        {router.pathname === "/RegistroAlimentos"
                        ?
                        <th>Enviar</th>
                        : ""
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                        isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-[#F7F9FB]' : 'bg-[#a5b4fc]')
                        }`}
                    >       
                        <td>{item.solicitudes[index].fechaInicial}</td>
                        <td>{item.solicitudes[index].fechaFinal}</td>
                        <td>{item.nombreAlimento}</td>
                        <td>{item.cantidad}</td>
                        
                        {/*<td>
                            <ul>
                                {item.lotes?.map((lote, subIndex) => (
                                <li key={subIndex}>
                                    {lote.nombreAlimento}: {lote.cantidad} {lote.unidad}
                                </li>
                                ))}
                            </ul>
                        </td>*/}
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