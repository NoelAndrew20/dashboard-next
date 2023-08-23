import Image from 'next/image';
import { useState } from 'react';

const TableAlertas = ({ data, setData }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
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
        <div className="table">
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Tipo</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                {currentEntries.map((item, index) => (
                    <tr key={index} className="table-cel">
                        <td>{item.Fecha}</td>
                        <td>{item.Hora}</td>
                        <td>{item.Tipo}</td>
                        <td>
                            <button onClick={()=> {setShowEditModal(true), setSelectedImage(item.Imagen)}}>
                                Ver imagen
                            </button>
                        </td>
                    </tr>
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
            <span className="text-center">{currentPage} de {totalPages}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="button"
            >
                Siguiente
            </button>
        </div>
        {showEditModal && (
            <div className="edit-modal bg-white p-4 rounded shadow-md absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-4/4">
                <Image src={selectedImage} width={350} height={350} alt="alerta"/>
                <div className="mt-5 flex justify-between">
                    <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cerrar</button>
                </div>
            </div>
        )}
        </>
    )
}
export default TableAlertas;