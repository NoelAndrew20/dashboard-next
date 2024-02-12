import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import jwt from 'jsonwebtoken';
import SVForm from '@/components/atoms/SVForm';
import CalcuOtherSV from '@/components/atoms/CalcuOtherSV';

const TableSV = ({ data, setData, dataList, setDataList }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const [showForms, setShowForms] = useState({});
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(false);
  const [selectedFoodData, setSelectedFoodData] = useState(); // Estado para almacenar los datos del alimento seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const axios = require('axios');

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let responsable = '';
  if (token) {
    const decodedToken = jwt.decode(token);
    responsable = decodedToken.usuario;
  } else {
    console.error('No se encontró el token en localStorage.');
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const addFormData = (formData) => {
    setFormDataList([...formDataList, formData]);
  };

  const generateJSON = (e) => {
    e.preventDefault();
    const jsonData = Object.values(
      formDataList.reduce((acc, formData) => {
        acc[formData.nombre] = formData;
        return acc;
      }, {})
    );

    const combinedData = {
      solicitudes: jsonData.map((item) => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        fechaEntrega: item.fechaEntrega,
        unidad: item.unidad,
      })),
      responsable: responsable,
    };

    console.log(combinedData);
    setShowForms({});
    setDataList([...dataList, combinedData]);
    setSelectedFoodData(null);

  const apiUrl = 'http://192.168.100.10:3086/addSolicitudCompraVacuna';
  axios
    .post(apiUrl, combinedData)
    .then((response) => {
      console.log('Respuesta de la API:', response.data);
    })
    .catch((error) => {
      console.error('Error al enviar la solicitud:', error);
    });
};


  const handleCheckboxChange = (event, item) => {
    setSelectedCheckboxIndex(true);
    const updatedShowForms = { ...showForms };
    data.forEach((item) => {
      if (item.nombre !== item.nombre) {
        updatedShowForms[item.nombre] = event.target.checked;
      } else {
        updatedShowForms[item.nombre] = false;
      }
    });

    setShowForms(updatedShowForms);
    const selectedFood = data.find((food) => food.nombre === item.nombre);
    setSelectedFoodData(selectedFood);
    setShowForms((prevShowForms) => ({
      ...prevShowForms,
      [item.nombre]: !prevShowForms[item.nombre],
    }));
    const oneSelected = Object.values(updatedShowForms).some(
      (isSelected) => isSelected
    );
    setIsCheckboxSelected(oneSelected);
  };

  return (
    <>
      <div
        className={`${
          isDarkMode ? 'fake-table-d' : 'fake-table'
        } flex justify-around`}
      >
        <div className="w-1/3">
          <ul>
            <h2>Vacuna correctiva</h2>
            {data
              .filter((item) => item.tipo === 1)
              .map((item, index) => (
                <li key={index}>
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="alimento"
                      value={item.nombre}
                      onChange={(event) => {
                        handleCheckboxChange(event, item);
                      }}
                      checked={showForms[item.nombre]}
                    />
                    &nbsp;{item.nombre}
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <div className="w-1/3">
          <ul>
            <h2>Vacuna preventiva</h2>
            {data
              .filter((item) => item.tipo === 0)
              .map((item, index) => (
                <li key={index}>
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="alimento"
                      value={item.nombre}
                      onChange={(event) => {
                        handleCheckboxChange(event, item);
                      }}
                      checked={showForms[item.nombre]}
                    />
                    &nbsp;{item.nombre}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div>
        <div className={`modal ${isModalOpen ? 'block' : 'hidden'}`}>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
            onClick={closeModal}
          ></div>
          <div
            className={`${
              isDarkMode ? 'modal-content-d' : 'modal-content '
            } bg-white p-4 rounded shadow-md absolute top-[60vh] left-1/2 transform -translate-x-1/2 overflow-y-auto z-50`}
          >
            <CalcuOtherSV
              data={data}
              setData={setData}
              closeModal={closeModal}
            />
          </div>
        </div>
        <button className="button mt-2" onClick={openModal}>
          Agregar vacuna
        </button>
      </div>
      {selectedFoodData ? (
        <form
          className={`${
            isDarkMode ? 'edit-modal-d' : 'edit-modal'
          } bg-white p-4 rounded shadow-md mt-10`}
          onSubmit={generateJSON}
        >
          {Object.entries(showForms).map(([nombre, showForm]) => {
            if (showForm) {
              return (
                <SVForm
                  addFormData={addFormData}
                  selectedFoodData={selectedFoodData}
                  nombre={nombre}
                />
              );
            }
            return '';
          })}

          <button className="button mt-2" type="submit">
            Agregar solicitud
          </button>
        </form>
      ) : (
        ''
      )}
    </>
  );
};

export default TableSV;
