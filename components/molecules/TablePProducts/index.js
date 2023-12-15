import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Modal from '@/components/atoms/Modal';
import ProvForm from '@/components/atoms/ProvForm';
const axios = require('axios');

const TablePProducts = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ data, setData ] = useState([]);
    const [newPswd, setNewPswd] = useState(data.password);
    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    let email = "";
    if (token) {
        const decodedToken = jwt.decode(token);
        email = decodedToken.email;
    } 
    else {
        console.error("No se encontró el token en localStorage.");
    }
  
    useEffect(() => {
        axios.get('http://192.168.100.10:3070/getProducto', {
            params: {
                email: email
            }
        })
        .then(response => {
        const jsonData = response.data;
        setData(jsonData);
        })
        .catch(error => {
        console.error(error);
        });
    }, []);
    

  return (
    <>
      <div className={isDarkMode ? "table-d" : "table"}>
          <table className={isDarkMode ? "table-container-d" : "table-container"}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Unidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
              key={index}
              className="table-row">  
                <td>{item.SKU}</td>
                <td>{item.nombre}</td>
                <td>{item.unidad}</td>
                <td>{item.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10 flex justify-end">
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ProvForm 
              data={data} 
              setData={setData} 
              closeModal={closeModal}
            />
          </Modal>
          <button className="button" onClick={openModal}>Agregar Producto</button>
        </div>
      </div>
    </>
  )
}

export default TablePProducts;
