import jsonData from '../../../public/api/pronostico/python/output.json'
import jsonData1 from '../../../public/api/pronostico/python/config.json'
import { useEffect, useState } from 'react';
const TableIndexZona = ({ isDarkMode }) => {
    const [data, setData] = useState([
        { v1: "A", v2: jsonData.alimento.kg_tipo_A.Vientre.A, v3: jsonData1.info_tipos.vientre.Kg.$.A, v4: Math.round(jsonData.alimento.costo_tipo_A.Vientre.A*100)/100, },
        { v1: "C", v2: "", v3: jsonData1.info_tipos.sementalCIA.Kg.$.C, v4: "", },
        { v1: "D", v2: jsonData.alimento.kg_tipo_A.Lechon.D, v3: jsonData1.info_tipos.lechon.Kg.$.D, v4: Math.round(jsonData.alimento.costo_tipo_A.Lechon.D*100)/100, },
        { v1: "E", v2: jsonData.alimento.kg_tipo_A.Lechon.E, v3: jsonData1.info_tipos.lechon.Kg.$.E, v4: Math.round(jsonData.alimento.costo_tipo_A.Lechon.E*100)/100, },
        { v1: "GS", v2: "", v3: jsonData1.info_tipos.sementalG.Kg.$.GS, v4: "", },
        { v1: "GV", v2: jsonData.alimento.kg_tipo_A.Vientre.GV, v3: jsonData1.info_tipos.vientre.Kg.$.GV, v4: Math.round(jsonData.alimento.costo_tipo_A.Vientre.GV*100)/100, },
        { v1: "ML", v2: jsonData.alimento.kg_tipo_A.Lechon.ML, v3: jsonData1.info_tipos.lechon.Kg.$.ML, v4: Math.round(jsonData.alimento.costo_tipo_A.Lechon.ML*100)/100, },
        { v1: "MV", v2: jsonData.alimento.kg_tipo_A.Vientre.MV, v3: jsonData1.info_tipos.vientre.Kg.$.MV, v4: Math.round(jsonData.alimento.costo_tipo_A.Vientre.MV*100)/100, },
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
                        <th>.</th>
                        <th>Tipo Alimento</th>
                        <th>KG Alimento</th>
                        <th>Precio por KG</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                {!isDarkMode 
                ? currentEntries.map((item, index) => (
                    <tr key={index} className={`table-cel ${index % 2 === 0 ? "bg-amber-300" : "bg-white"} ${
                        index % 2 === 0 ? "border-blue-500" : "border-gray-300"
                      }`}>
                        <td></td>
                        <td>{item.v1}</td>
                        <td>{item.v2}</td>
                        <td>{item.v3}</td>
                        <td>${item.v4}</td>
                    </tr>
                ))
                : currentEntries.map((item, index) => (
                    <tr key={index} className="table-cel">
                        <td></td>
                        <td>{item.v1}</td>
                        <td>{item.v2}</td>
                        <td>{item.v3}</td>
                        <td>${item.v4}</td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
            
        </div>
        
        </>
    )
}
export default TableIndexZona;