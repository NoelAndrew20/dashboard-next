import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Formulario = ({ jsonFile, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [jsonDescription, setJsonDescription] = useState(null);

  const [formGeneratedData, setFormGeneratedData] = useState({});
  const [formKey, setFormKey] = useState(0);

  const guardardatosjson = async (e) => {
    e.preventDefault();
    const jsondata = {
      ...formData,
    };
    console.log(jsondata);
    setFormGeneratedData(jsondata);

    fetch(
      'http://localhost:5000/api/pronostico/python/Constanza_v123/Constanza_v1_3/requisitos_2.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsondata),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error al obtener los datos:', error));
  };

  const handleFormReload = () => {
    // Realiza las acciones necesarias para recargar los datos JSON
    // y actualiza jsonDescription si es necesario
    // Por ejemplo, puedes volver a hacer la llamada fetch
    // y luego actualizar jsonDescription y formKey
    fetch(`../../api/pronostico/python/Constanza_v123/Constanza_v1_3/${jsonFile}.json`)
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
    fetch(`../../api/pronostico/python/Constanza_v123/Constanza_v1_3/${jsonFile}.json`)
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

  if (!jsonDescription) {
    return <div>Cargando descripción del formulario...</div>;
  }

  return (
    <div key={formKey}>
      <button type="button" class="transition hover:rounded-md hover:bg-orange-300" className="text-white border-blue-500 rounded-md focus:outline-none" onClick={handleFormReload}><img src={"/images/svg/update.svg"} width={20} height={20} ></img></button>
      {Object.keys(jsonDescription).map((key) => (
        <div key={key}>
          <label className='text-black'>
            {key}:
            <input
              className='hover:border-2 hover:border-orange-200 mb-5 text-black bg-orange-50  px-3 py-2 w-full text-lg rounded-md focus:outline-none'
              type="text"
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
            />
          </label>
          
        </div>
        
      ))}
      <button type="submit" className="hover:text-orange-300 hover:border-2 hover:border-orange-300 hover:bg-red-900 bg-orange-300 text-red-900 mt-5 py-2 px-3 py-2 rounded-md focus:outline-none" onClick={guardardatosjson}>Listo</button>
    </div>
  );
};

export default Formulario;
