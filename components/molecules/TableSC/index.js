import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import RazaForm from '@/components/atoms/RazaForm';
import NewRaza from '@/components/atoms/NewRaza';
import jwt from 'jsonwebtoken';

const TableSC = ({
  data,
  setData,
  dataOrder,
  setDataOrder,
  dataList,
  setDataList,
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const [searchTerm, setSearchTerm] = useState('');
  const [razaV, setNombreAlimentoV] = useState('');
  const [tipoV, setTipoV] = useState('');
  const [proteinaV, setProteinaV] = useState('');
  const [precioV, setPrecioV] = useState('');
  const [precioVariableV, setPrecioVariableV] = useState('');
  const [complemento1V, setComplemento1V] = useState('');
  const [complemento2V, setComplemento2V] = useState('');
  const [proteinaObjV, setProteinaObjV] = useState('');
  const [showForms, setShowForms] = useState({});
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [complementoData2, setComplementoData2] = useState([]);
  const [selectedFoodData, setSelectedFoodData] = useState(); // Estado para almacenar los datos del alimento seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [dataAux, setDataAux] = useState([]);
  const [dataAuxComplemento, setDataAuxComplemento] = useState([]);
  const [dataAuxComplemento2, setDataAuxComplemento2] = useState([]);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [dataFinal, setDataFinal] = useState();
  const axios = require('axios');
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const responsable = decodedToken.usuario;

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
        acc[formData.raza] = formData;
        return acc;
      }, {})
    );

    const combinedData = {
      solicitudes: jsonData.map((item) => ({
        raza: item.raza,
        cantidad: item.cantidad,
        fechaEntrega: item.fechaEntrega,
      })),
      responsable: responsable,
    };

    setShowForms({});
    setDataList([...dataList, combinedData]);
    setSelectedFoodData(null);

    const apiUrl = 'http://192.168.100.10:3086/addSolicitudCompraCerdo';
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
      if (item.raza !== item.raza) {
        updatedShowForms[item.raza] = event.target.checked;
      } else {
        updatedShowForms[item.raza] = false;
      }
    });

    setShowForms(updatedShowForms);
    const selectedFood = data.find((food) => food.raza === item.raza);
    setSelectedFoodData(selectedFood);
    setShowForms((prevShowForms) => ({
      ...prevShowForms,
      [item.raza]: !prevShowForms[item.raza],
    }));
    const oneSelected = Object.values(updatedShowForms).some(
      (isSelected) => isSelected
    );
    setIsCheckboxSelected(oneSelected);
  };

  const addOrder = async () => {
    try {
      if (
        razaV !== '' &&
        tipoV !== '' &&
        proteinaV != '' &&
        precioV !== '' &&
        precioVariableV !== ''
      ) {
        const newOrder = {
          razaV: razaV,
          tipoV: tipoV,
          proteinaV: proteinaV,
          precioV: precioV,
          precioVariableV: precioVariableV,
          complemento1V: complemento1V,
          complemento2V: complemento2V,
          proteinaObjV: proteinaObjV,
        };

        const newData = [...dataOrder, newOrder];
        setDataOrder(newData);
        setNombreAlimentoV('');
        setTipoV('');
        setProteinaV('');
        setPrecioV('');
        setPrecioVariableV('');
        setSuccessMessage('Orden guardada exitosamente');
        setErrorMessage('');
      } else {
        setErrorMessage('Por favor completa los cambios');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Hubo un error al guardar el usuario');
      setSuccessMessage('');
    }
  };
  const handleDeselectAllCheckboxes = () => {
    const updatedShowForms = { ...showForms };

    Object.keys(updatedShowForms).forEach((key) => {
      updatedShowForms[key] = false;
    });

    setShowForms(updatedShowForms);
  };

  return (
    <>
      <div
        className={`${
          isDarkMode ? 'fake-table-d' : 'fake-table'
        } flex justify-around`}
      >
        <div className="w-1/3 text-center">
          <ul>
            <h2>Raza de cerdo</h2>
            {data.map((item, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    name="alimento"
                    value={item.raza}
                    onChange={(event) => {
                      handleCheckboxChange(event, item);
                    }}
                    checked={showForms[item.raza]}
                  />
                  &nbsp;{item.raza}
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
            <NewRaza data={data} setData={setData} closeModal={closeModal} />
          </div>
        </div>
        <button className="button mt-4" onClick={openModal}>
          Agregar raza
        </button>
      </div>
      {selectedFoodData ? (
        <form
          className={`${
            isDarkMode ? 'edit-modal-d' : 'edit-modal'
          } bg-white p-4 rounded shadow-md mt-10`}
          onSubmit={generateJSON}
        >
          {Object.entries(showForms).map(([raza, showForm]) => {
            if (showForm) {
              return (
                <RazaForm
                  addFormData={addFormData}
                  selectedFoodData={selectedFoodData}
                  alimento={raza}
                />
              );
            }
            return '';
          })}

          <button className="button mt-4" type="submit">
            Agregar solicitud
          </button>
        </form>
      ) : (
        ''
      )}
    </>
  );
};

export default TableSC;
