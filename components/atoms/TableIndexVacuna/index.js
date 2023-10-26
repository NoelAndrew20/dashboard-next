import jsonData from '../../../public/api/pronostico/python/output.json'
import jsonData1 from '../../../public/api/pronostico/python/config.json'
import { useEffect, useState } from 'react';
const TableIndexVacuna = ({ isDarkMode }) => {
    const [data, setData] = useState([
        { v1: "V1", v2: "", v3: jsonData1.info_tipos.vientre.ApVac.$.V1, v4: "", },
        { v1: "V2", v2: "", v3: jsonData1.info_tipos.vientre.ApVac.$.V2, v4: "", },
        { v1: "V3", v2: "", v3: jsonData1.info_tipos.vientre.ApVac.$.V3, v4: "", },
        { v1: "V4", v2: "", v3: jsonData1.info_tipos.vientre.ApVac.$.V4, v4: "", },
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
                        <th>Tipo vacuna/medicamento</th>
                        <th>Número aplicaciones</th>
                        <th>Precio por aplicación</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                {currentEntries.map((item, index) => (
                    <tr key={index} className="table-cel">
                        <td>{item.v1}</td>
                        <td>{item.v2}</td>
                        <td>{item.v3}</td>
                        <td>{item.v4}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
        
        </>
    )
}
export default TableIndexVacuna;