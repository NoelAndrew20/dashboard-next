import { useEffect, useState } from 'react';
const TableIndex = ({}) => {
    const [data, setData] = useState([
        { v1: "valor1", v2: "1692741792", v3: "hola", v4: "sdsds", },
        { v1: "valor1", v2: "1692741792", v3: "hola", v4: "sdsds", },
        { v1: "valor1", v2: "1692741792", v3: "hola", v4: "sdsds", },
        { v1: "valor1", v2: "1692741792", v3: "hola", v4: "sdsds", },
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
        <div className="table">
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Valor 1</th>
                        <th>Valor 2</th>
                        <th>Valor 3</th>
                        <th>Valor 4</th>
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
        <div className="mt-3">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="button"
            >
                Anterior
            </button>
            <span className="text-center">{currentPage} de {totalPages}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="button"
            >
                Siguiente
            </button>
        </div>
        </>
    )
}
export default TableIndex;