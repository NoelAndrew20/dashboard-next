import React, { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const LNTable = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div
      className={`${
        isDarkMode ? 'fake-table-d' : 'fake-table'
      } flex justify-around`}
    >
      <ul className="w-full text-center">
        <div className="flex pb-2">
          <div className="w-1/2 text-[#818cf8] font-bold text-lg">Tipo</div>
          <div className="w-1/2 text-[#818cf8] font-bold text-lg">Total</div>
        </div>

        {data.map((rowData, index) => (
          <li
            key={index}
            onClick={() => handleRowClick(index)}
            className="cursor-pointer border-b border-[#c6c6c6]"
          >
            <div className="flex">
              <div className="w-1/2 ">{rowData._id}</div>
              <div className="w-1/2">{rowData.count}</div>
            </div>
            {expandedRow === index && (
              <ul>
                {Object.entries(rowData.uniqueRfids)
                  .slice(0, 10)
                  .map(([key, value]) => (
                    <li key={key}>
                      <div className="flex justify-center">{value}</div>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LNTable;
