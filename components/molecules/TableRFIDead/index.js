import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';

const TableRFIDead = ({ data, setData, diferenciaDias }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const entriesPerPage = 10;
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const handleExpand = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const [searchTerm, setSearchTerm] = useState('');

  const displayData = searchTerm
    ? data?.filter(
        (item) => item.rfid && item.rfid.toLowerCase().includes(searchTerm)
      )
    : data;
  const displayDataFinal = displayData?.slice(startIndex, endIndex);
  return (
    <>
      <div className="search-container mb-5">
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
              <th>Granja</th>
              <th>Área</th>
              <th>Zona</th>
              <th>Cantidad de decesos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="table-row">
                  <td>{item.granja}</td>
                  <td>{item.nave}</td>
                  <td>{item.zona}</td>
                  <td>{item.muertos}</td>
                  <td className=" p-1 flex justify-center">
                    <button
                      className="flex align-center"
                      onClick={() => handleExpand(index)}
                    >
                      {expandedRow === index ? (
                        <Image
                          src="images/svg/expanded.svg"
                          width={25}
                          height={25}
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src="images/svg/expand.svg"
                          width={25}
                          height={25}
                          loading="lazy"
                        />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <>
                    <tr>
                      <th>
                        <div>RFID</div>
                      </th>
                      <th>
                        <div>Causa</div>
                      </th>
                      <th>
                        <div>Fecha de deceso</div>
                      </th>
                    </tr>
                    {item.detalles.map((detalles, index) => (
                      <tr key={index}>
                        <td>{detalles.rfid}</td>
                        <td>{detalles.causa}</td>
                        <td>{detalles.fecha}</td>
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
export default TableRFIDead;
