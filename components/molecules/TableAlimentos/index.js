import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';

const TableAlimentos = ({ data, setData }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const entriesPerPage = 10;
    const totalPages = Math.ceil(data.length / entriesPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    
    const [searchTerm, setSearchTerm] = useState('');

    const displayData = searchTerm ? data.filter(item => item.nombre && item.nombre.toLowerCase().includes(searchTerm)) : data;
    const displayDataFinal = displayData.slice(startIndex, endIndex);

    useEffect(() => {
      setCurrentPage(1); 
    }, [searchTerm]);


    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedValues(data[index]);
        setShowEditModal(true);
    };


    const handleDelete = (index) => {
        setEditingIndex(index);
        setEditedValues(data[index]);
        handleEditeDelete(data[index]);
    };
 
    const handleSaveEdit = () => {
        const updatedUsuario = { 
            usuario: editedValues.usuario,
            nombre: editedValues.nombre,
            apellido: editedValues.apellido,
            puesto: editedValues.puesto,
            grupo: editedValues.grupo,
            password: editedValues.password,
            email: editedValues.email,
            fechaNacimiento: editedValues.fechaNacimiento,
            genero: editedValues.genero,
            horario: editedValues.horario,
            fechaContratacion: editedValues.fechaContratacion,
            departamento: editedValues.departamento,
            status: editedValues.status,
            contacto: editedValues.contacto,
            salario: editedValues.salario,
            calle: editedValues.calle,
            ciudad: editedValues.ciudad,
            estado: editedValues.estado,
            cp: editedValues.cp,
            id: editedValues.id,
            nombreGrupo: editedValues.nombreGrupo
        };
    
        const axios = require("axios");
        console.log(updatedUsuario.usuario, updatedUsuario);

        const apiUrl = 'http://192.168.100.20:3020/editUsuario/' + updatedUsuario.fechaContratacion;
        axios.put(apiUrl, updatedUsuario)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });

            setShowEditModal(false);
            setEditedValues({});
    };



    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditedValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };
      
      
    const handleEditeDelete = (index) => {
        const editedValues = index;

        const updatedUsuario = {
            usuario: editedValues.usuario,
            nombre: editedValues.nombre,
            apellido: editedValues.apellido,
            puesto: editedValues.puesto,
            grupo: editedValues.grupo,
            password: editedValues.password,
            email: editedValues.email,
            fechaNacimiento: editedValues.fechaNacimiento,
            genero: editedValues.genero,
            horario: editedValues.horario,
            fechaContratacion: editedValues.fechaContratacion,
            departamento: editedValues.departamento,
            status: 'Inactivo',
            contacto: editedValues.contacto,
            salario: editedValues.salario,
            calle: editedValues.calle,
            ciudad: editedValues.ciudad,
            estado: editedValues.estado,
            cp: editedValues.cp,
            id: editedValues.id,
            nombreGrupo: editedValues.nombreGrupo
        };

        const axios = require("axios");
        console.log(updatedUsuario.usuario, updatedUsuario);

        const apiUrl = 'http://192.168.100.20:3020/editUsuario/' + updatedUsuario.fechaContratacion;
        axios.put(apiUrl, updatedUsuario)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });
    };

    return (
        <>
        <div className="search-container mb-5">
            <div className={isDarkMode ? "flex inner-search-d" : "flex inner-search"}>
                <div>
                    <input
                        type="text"
                        className={isDarkMode ? "bg-black" : "bg-white"}
                        placeholder="Buscar por Nombre"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value.toLocaleLowerCase())}
                    />
                </div>
                <div className="inner-search-icon">
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 15.5L19 19" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div className={isDarkMode ? "table-d" : "table"}>
            <table className={isDarkMode ? "table-container-d" : "table-container"}>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Puesto</th>
                        <th>Grupo</th>
                        <th>Enviar</th>
                    </tr>
                </thead>
                <tbody>
                    {displayDataFinal.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                        isDarkMode ? (index % 2 === 0 ? 'bg-black' : 'bg-gray-500') : (index % 2 === 0 ? 'bg-white' : 'bg-[#F1CD96]')
                        }`}
                    >       
                        <td>{item.usuario}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido}</td>
                        <td>{item.puesto}</td>
                        <td>{item.grupo}</td>
                        <td>
                            <button onClick={() => handleEdit(index)} className="edit-btn">
                                <Link href="../SolicitudCompra">
                                    <img src="images/svg/send.svg" width={15} height={15}/>
                                </Link>
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
            <span>{currentPage} de {totalPages}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="button"
            >
                Siguiente
            </button>
        </div>
         {showConfirmation && (
            <div className={`${isDarkMode ? " bg-black" : "bg-white"} confirmation bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4/4 overflow-y-auto`}>
                Elemento eliminado
            </div>
        )}
        </>
    )
}
export default TableAlimentos;