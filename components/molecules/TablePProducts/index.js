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
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState([
    { SKU: '1', unidad: '2', nombre: 'hola', precio: '4' },
    { SKU: '3', unidad: '4', nombre: 'hola', precio: '6' },
  ]);

  const [newPswd, setNewPswd] = useState(data.password);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedValues(data[index]);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const IDP = editedValues.ID;
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;
    const updatedProduct = {
      ID: IDP,
      SKU: editedValues.SKU,
      nombre: editedValues.nombre,
      unidad: editedValues.unidad,
      precio: editedValues.precio,
    };

    const apiUrl = 'http://192.168.100.10:3070/editProductos/' + email;
    axios
      .put(apiUrl, updatedProduct)
      .then((response) => {
        console.log('Respuesta de la API:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
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
  const handleDelete = (index) => {
    setEditingIndex(index);
    setEditedValues(data[index]);
    handleEditeDelete(data[index]);
  };

  const handleEditeDelete = (index) => {
    const editedValues = index;

    const updatedUsuario = {
      ID: IDP,
      SKU: editedValues.SKU,
      nombre: editedValues.nombre,
      unidad: editedValues.unidad,
      precio: editedValues.precio,
    };
  };

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let email = '';
  if (token) {
    const decodedToken = jwt.decode(token);
    email = decodedToken.email;
  } else {
    console.error('No se encontró el token en localStorage.');
  }

  useEffect(() => {
    axios
      .get('http://192.168.100.10:3070/getProducto', {
        params: {
          email: email,
        },
      })
      .then((response) => {
        const jsonData = response.data;
        setData(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className={isDarkMode ? 'table-d' : 'table'}>
        <table className={isDarkMode ? 'table-container-d' : 'table-container'}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Unidad</th>
              <th>Precio</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{item.SKU}</td>
                <td>{item.nombre}</td>
                <td>{item.unidad}</td>
                <td>{item.precio}</td>
                <td>
                  <button
                    onClick={() => handleEdit(index)}
                    className="edit-btn"
                  >
                    <img src="../images/svg/edit.svg" width={15} height={15} />
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <img src="images/svg/trash.svg" width={10} height={10} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEditModal && (
          <div
            className={`${
              isDarkMode ? 'edit-modal-d' : 'edit-modal'
            } bg-white p-4 rounded shadow-md absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-4/4`}
          >
            <h2 className="font-bold">Editar Datos</h2>
            <div>
              <div className="flex">
                <div className="modal-item w-1/3">
                  <p>SKU:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    id="SKU"
                    name="SKU"
                    value={editedValues.SKU || ''}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="modal-item w-1/3">
                  <p>Nombre:</p>{' '}
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="nombre"
                    value={editedValues.nombre || ''}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="modal-item w-1/3">
                  <p>Unidad:</p>{' '}
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="unidad"
                    value={editedValues.unidad || ''}
                    onChange={handleEditInputChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="modal-item w-1/3">
                  <p>Precio:</p>
                  <input
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="precio"
                    value={editedValues.precio || ''}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="modal-item w-1/3"></div>
                <div className="modal-item w-1/3"></div>
              </div>
            </div>
            <div className="mt-5 flex justify-between">
              <button className="button" onClick={handleSaveEdit}>
                Guardar
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        <div className="mt-10 flex justify-end">
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ProvForm data={data} setData={setData} closeModal={closeModal} />
          </Modal>
          <button className="button" onClick={openModal}>
            Agregar Producto
          </button>
        </div>
      </div>
    </>
  );
};

export default TablePProducts;
