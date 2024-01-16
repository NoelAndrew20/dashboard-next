import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';
const axios = require('axios');
const RazaTable = ({ data, setData }) => {
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
      <div className={isDarkMode ? 'table-d' : 'table'}>
        <table className={isDarkMode ? 'table-container-d' : 'table-container'}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>No. de Solicitud</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="table-row">
                  <td>{item.fecha}</td>
                  <td>{item.numeroSolicitud}</td>
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
                        <div>Raza de cerdo</div>
                      </th>
                      <th>
                        <div>Cantidad</div>
                      </th>
                      <th>
                        <div>Fecha programada de entrega</div>
                      </th>
                    </tr>
                    {item.solicitud.map((solicitud, index) => (
                      <tr key={index}>
                        <td>{solicitud.nombre}</td>
                        <td>{solicitud.cantidad}</td>
                        <td>{solicitud.fechaEntrega}</td>
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
  );
};
export default RazaTable;
