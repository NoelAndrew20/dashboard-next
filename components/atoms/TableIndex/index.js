import jsonData from '../../../public/api/pronostico/python/output.json'
import React, { useEffect, useState } from 'react';

const TableIndex = ({ isDarkMode }) => {
  const [data, setData] = useState([
    { v1: "Vientre", v2: Math.round(jsonData.alimento.costo_total_A.Vientre*100)/100 },
    { v1: "Lechon", v2: Math.round(jsonData.alimento.costo_total_A.Lechon*100)/100 },
    { v1: "CDI", v2: "" },
    { v1: "Celador", v2: "" },
  ]);

  const entriesPerPage = 10;
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = data.slice(startIndex, endIndex);


  return (
    <div className={isDarkMode ? 'table-index-d' : 'table-index'}>
      <table className={isDarkMode ? 'table-container-index-d' : 'table-container-index'}>
        <thead>
          <tr>
            <th></th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
      {!isDarkMode 
      ?
          currentEntries.map((item, index) => (
            <tr
              key={index}
              className={`table-cel ${index % 2 === 0 ? "bg-amber-300" : "bg-warmGray-300"} ${
                index % 2 === 0 ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <td className="px-4" >{item.v1}</td>
              <td className="px-4" >{item.v2}</td>
            </tr>
          ))
          :
          
            currentEntries.map((item, index) => (
              <tr
                key={index}
                
                className="table-cel">
                <td className="px-4" >{item.v1}</td>
                <td className="px-4" >{item.v2}</td>
              </tr>
            ))
            } 
        </tbody>
      </table>
    </div>
  );
};

export default TableIndex;
