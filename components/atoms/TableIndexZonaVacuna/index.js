import jsonData from '../../../public/api/pronostico/python/output.json'
import jsonData1 from '../../../public/api/pronostico/python/config.json'
import { useEffect, useState } from 'react';
const TableIndexZonaVacuna = ({}) => {
    const [data, setData] = useState([
        { v1: "A", v2: jsonData.vacunas.num_vacunas.Vientre.A, v3: jsonData1.info_tipos.vientre.Kg.$.A, v4: jsonData.alimento.costo_tipo_A.Vientre.A, },
        { v1: "C", v2: "", v3: jsonData1.info_tipos.sementalCIA.Kg.$.C, v4: "", },
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
        <div className="table-index">
            <table className="table-container-index">
                <thead>
                    <tr>
                        <th>.</th>
                        <th>Tipo Alimento</th>
                        <th>KG Alimento</th>
                        <th>Precio por KG</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                {currentEntries.map((item, index) => (
                    <tr key={index} className="table-cel">
                        <td></td>
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
export default TableIndexZonaVacuna;