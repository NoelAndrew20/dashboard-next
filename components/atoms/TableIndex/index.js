import jsonData from '../../../public/api/pronostico/python/output.json'
import { useEffect, useState } from 'react';
const TableIndex = ({ isDarkMode }) => {
    const [data, setData] = useState([
        { v1: "Vientre", v2: "", v3: "", v4: jsonData.alimento.costo_total_A.Vientre, },
        { v1: "Lechon", v2: "", v3: "", v4: jsonData.alimento.costo_total_A.Lechon, },
        { v1: "CDI", v2: "", v3: "", v4: "", },
        { v1: "Celador", v2: "", v3: "", v4: "", },
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
    useEffect(() => {
        console.log(data)
    })
    return (
        <>
        <div className={isDarkMode ? 'table-index-d' : 'table-index'}>
            <table className={isDarkMode ? 'table-container-index-d' : 'table-container-index'}>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Precio</th>
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
export default TableIndex;