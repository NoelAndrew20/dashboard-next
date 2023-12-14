import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TableMaternidad3 = ({ data }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const entriesPerPage = 10;
  const totalPages = Math.ceil(data?.length / entriesPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;


  const displayData = searchTerm ? data?.filter(item => item.campo1 && item.campo1.toLowerCase().includes(searchTerm)) : data;
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
                        placeholder="Buscar por Nombre"
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
              <th>Campo 1</th>
              <th>Campo 2</th>
              <th>Campo 3</th>
              <th>Campo 4</th>
            </tr>
          </thead>
          <tbody>
            {displayDataFinal?.slice(startIndex, endIndex).map((item, index) => (
              <tr className="table-row">
                <td>{item.campo1}</td>
                <td>{item.campo2}</td>
                <td>{item.campo3}</td>
                <td>{item.campo4}</td>
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

export default TableMaternidad3;
