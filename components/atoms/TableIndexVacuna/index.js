import { useEffect, useState } from 'react';
import jsonData from '../../../public/api/output.json'
import jsonData1 from '../../../public/api/config.json'
const TableIndexVacuna = ({ isDarkMode }) => {
    const [data, setData] = useState([
        { zona: "Cuarentena", cantidad: 200, v3: jsonData1.info_tipos.vientre.ApVac.$.zona, v4: "", },
        { zona: "Engorda", cantidad: 40, v3: jsonData1.info_tipos.vientre.ApVac.$.cantidad, v4: "", },
        { zona: "Adaptacion", cantidad: 50, v3: jsonData1.info_tipos.vientre.ApVac.$.V3, v4: "", },
        { zona: "Zona Zen", cantidad: 100, v3: jsonData1.info_tipos.vientre.ApVac.$.V4, v4: "", },
        { zona: "CDI", cantidad: 30, v3: jsonData1.info_tipos.vientre.ApVac.$.V4, v4: "", },

      ])
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
        <>
         <div className={isDarkMode ? 'table-index-d' : 'table-index'}>
            <table className={isDarkMode ? 'table-container-index-d' : 'table-container-index'}>
                <thead>
                    <tr>
                        <th>Zonas</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                {currentEntries.map((item, index) => (
                    <tr key={index} className="table-cel">
                        <td>{item.zona}</td>
                        <td>{item.cantidad}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
        
        </>
    )
}
export default TableIndexVacuna;