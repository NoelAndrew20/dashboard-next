import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeContext'

const Formulario = ({ jsonFile, onSubmit, onFormSubmit }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({});
  const [jsonDescription, setJsonDescription] = useState(null);

  const [formGeneratedData, setFormGeneratedData] = useState({});
  const [formKey, setFormKey] = useState(0);

  const guardardatosjson = async (e) => {
    e.preventDefault();
    const jsondata = {
      ...formData,
    };
    setFormGeneratedData(jsondata);

    fetch(
      'http://localhost:5000/api/pronostico/python/Constanza_v15/requisitos_2.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsondata),
      }
    )
      .then((response) => response.json())
      .then((data) => {
      console.log("respuestaservidor",data)
      onFormSubmit(formData);
    })
      .catch((error) => console.error('Error al obtener los datos:', error));
  };

  const handleFormReload = () => {
    // Realiza las acciones necesarias para recargar los datos JSON
    // y actualiza jsonDescription si es necesario
    // Por ejemplo, puedes volver a hacer la llamada fetch
    // y luego actualizar jsonDescription y formKey
    fetch(`../../api/pronostico/python/Constanza_v15/${jsonFile}.json`)
      .then((response) => response.json())
      .then((data) => {
        setJsonDescription(data);
        setFormData(data); // Establecer los valores iniciales desde el JSON
        setFormKey((prevKey) => prevKey + 1); // Forzar la actualización del formulario
      })
      .catch((error) => {
        console.error('Error al cargar el JSON:', error);
      });
  };

  useEffect(() => {
    fetch(`../../api/pronostico/python/Constanza_v15/${jsonFile}.json`)
      .then((response) => response.json())
      .then((data) => {
        setJsonDescription(data);
        setFormData(data); // Establecer los valores iniciales desde el JSON
      })
      .catch((error) => {
        console.error('Error al cargar el JSON:', error);
      });
  }, [jsonFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormReset = () => {
    setFormData(jsonDescription); // Restablecer los valores desde el JSON
  };

  const getTypeFromJSON = (fieldName) => {
    // Obtener el tipo de dato del JSON (cadena, número, etc.)
    const typeInfo = jsonDescription[fieldName];
    const isDateField = fieldName.toLowerCase().includes('mes');

    if (isDateField) {
      return "date"; // Si el nombre del campo contiene "mes", renderizar un input de fecha
    } else if (typeInfo && typeInfo.includes("str")) {
      return "text"; // Si es una cadena, renderizar un input de texto
    } else {
      return "text"; // Por defecto, renderizar un input de texto
    }
  };

  if (!jsonDescription) {
    return <div>Cargando descripción del formulario...</div>;
  }

  return (
    <div key={formKey} >
      <button type="button" class="transition hover:rounded-md hover:bg-orange-300" className="text-white border-blue-500 rounded-md focus:outline-none" onClick={handleFormReload}><img src={"/images/svg/update.svg"} width={20} height={20} ></img></button>
      {Object.keys(jsonDescription).map((key) => (
        <div key={key}>
          <label className={`text-2xl flex flex-col items-center mt-3`}>
            {key}:
            <input
              className={`${isDarkMode ? "bg-[#151515] border-2 border-[#D4AF37] text-white hover:border-white" : "text-black bg-white border-2 border-neutral-200 hover:border-black"} hover:border-2 mb-5  px-3 py-2 w-2/4 text-lg rounded-md focus:outline-none`}
              type={getTypeFromJSON(key)} // Utilizar la función para determinar el tipo de entrada
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
        <div className='flex justify-end'>
          <button type="submit" onClick={guardardatosjson}><img src='./images/svg/send.svg' width={40}></img></button>
        </div>
      </div>
  );
};

export default Formulario;
