import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TableNL = ({ data }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const displayData = searchTerm
    ? data?.filter(
        (item) => item._id && item._id.toLowerCase().includes(searchTerm)
      )
    : data;
  const displayDataFinal = displayData?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayData?.length / entriesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      <div className="search-container flex justify-center mb-5">
        <div
          className={isDarkMode ? 'flex inner-search-d' : 'flex inner-search'}
        >
          <div>
            <input
              type="text"
              className={isDarkMode ? 'bg-black' : 'bg-white'}
              placeholder="Buscar por RFID"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value.toLocaleLowerCase())
              }
            />
          </div>
          <div className="inner-search-icon">
            <svg
              width="24"
              height="24"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 15.5L19 19"
                stroke="#ADADAD"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                stroke="#ADADAD"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={isDarkMode ? 'table-d' : 'table'}>
        <table className={isDarkMode ? 'table-container-d' : 'table-container'}>
          <thead>
            <tr>
              <th>Numero de cerdos</th>
              <th>RFID</th>
              <th>Numero de parto</th>
            </tr>
          </thead>
          <tbody>
            {displayDataFinal?.map((item, index) => (
              <tr className="table-row" key={index}>
                <td>{item._id.slice(0, -1)}</td>
                <td>{item._id.slice(-1)}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="button"
        >
          Anterior
        </button>
        <span className="text-center">
          {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="button"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default TableNL;
