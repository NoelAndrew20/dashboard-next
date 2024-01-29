import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TableTraslados = ({ data }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const displayData = searchTerm
    ? data?.filter(
        (item) =>
          item._id.tipoAlimento &&
          item._id.tipoAlimento.toLowerCase().includes(searchTerm)
      )
    : data;
  const displayDataFinal = displayData?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayData?.length / entriesPerPage);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const formatText = (text) => {
    return text.replace(/([A-Z])|(\d+)/g, ' $1$2').trim();
  };


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
              placeholder="Buscar por nombre"
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
      <div
        className={`${
          isDarkMode ? 'fake-table-d' : 'fake-table'
        } flex justify-around`}
      >
        {' '}
        <ul className="w-full text-center">
          <div className="flex pb-2">
            <div className="w-1/2 text-[#818cf8] font-bold text-lg">Area anterior</div>
            <div className="w-1/2 text-[#818cf8] font-bold text-lg">
              Cantidad de regístros
            </div>
            <div className="w-1/2 text-[#818cf8] font-bold text-lg">Fecha de cambio de área</div>
            <div className="w-1/2 text-[#818cf8] font-bold text-lg">Lote</div>

          </div>
          {displayDataFinal?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleRowClick(index)}
              className="cursor-pointer border-b border-[#c6c6c6]"
            >
              <div className="flex w-full">
                <div className="w-1/2 ">{formatText(item.areaAnterior)}</div>
                <div className="w-1/2 ">{formatNumber(item.cantidadRegistros)}</div>
                <div className="w-1/2 ">{item.fechaCambioArea}</div>
                <div className="w-1/2 ">{item.lote}</div>
              </div>

              {expandedRow === index && (
                <ul>
                  {Object.entries(item.rfidList)
                    .slice(0, 10)
                    .map(([key, value]) => (
                      <li key={key}>
                        <div className="flex justify-center">{value}</div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
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

export default TableTraslados;
