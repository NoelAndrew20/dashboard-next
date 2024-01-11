import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const Table = ({ data, setData }) => {
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
  const displayData = searchTerm
    ? data?.filter(
        (item) => item.nombre && item.nombre.toLowerCase().includes(searchTerm)
      )
    : data;
  const displayDataFinal = displayData?.slice(startIndex, endIndex);

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
      nombreGrupo: editedValues.nombreGrupo,
    };

    const axios = require('axios');
    const apiUrl =
      'http://192.168.100.20:3020/editUsuario/' +
      updatedUsuario.fechaContratacion;
    axios
      .put(apiUrl, updatedUsuario)
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

  const handleEditeDelete = (index) => {
    const editedValues = index;

    const updatedUsuario = {
      usuario: editedValues.usuario,
      nombre: editedValues.nombre,
      apellidop: editedValues.apellidop,
      apellidom: editedValues.apellidom,
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
      nombreGrupo: editedValues.nombreGrupo,
    };

    const axios = require('axios');
    const apiUrl =
      'http://192.168.100.10:3020/editUsuario/' +
      updatedUsuario.fechaContratacion;
    axios
      .put(apiUrl, updatedUsuario)
      .then((response) => {
        console.log('Respuesta de la API:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
  };

  return (
    <>
      <div className="search-container mb-5">
        <div
          className={isDarkMode ? 'flex inner-search-d' : 'flex inner-search'}
        >
          <div>
            <input
              type="text"
              className={isDarkMode ? 'bg-black' : 'bg-white'}
              placeholder="Buscar por Nombre"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value.toLocaleLowerCase())
              }
            />
          </div>
          <div className="inner-search-icon">
            <svg
              width="24"
              height="24"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 15.5L19 19"
                stroke="#ADADAD"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                stroke="#ADADAD"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={isDarkMode ? 'table-d' : 'table'}>
        <table className={isDarkMode ? 'table-container-d' : 'table-container'}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Departamento</th>
              {/*<th>Responsabilidad</th>*/}
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {displayDataFinal?.map((item, index) => (
              <tr className="table-row" key={index}>
                <td>{item.nombre}</td>
                <td>{item.email}</td>
                <td>{item.departamento}</td>
                {/*<td>{item.responsabilidad}</td>*/}
                <td>
                  <button
                    onClick={() => handleEdit(index)}
                    className="edit-btn"
                  >
                    <img src="images/svg/edit.svg" width={15} height={15} />
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
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="button"
        >
          Anterior
        </button>
        <span>
          {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="button"
        >
          Siguiente
        </button>
      </div>
      {showEditModal && (
        <div
          className={`${
            isDarkMode ? 'edit-modal-d' : 'edit-modal'
          } bg-white p-4 rounded shadow-md absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-4/4`}
        >
          <h2>Editar Datos</h2>
          <div>
            <div className="flex">
              <div className="modal-item w-1/3">
                <p>Usuario:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="usuario"
                  value={editedValues.usuario || ''}
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
                <p>Apellido paterno:</p>{' '}
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="apellido"
                  value={editedValues.apellidop || ''}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="modal-item w-1/3">
                <p>Apellido materno:</p>{' '}
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="apellidom"
                  value={editedValues.apellidom || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3"></div>
              <div className="modal-item w-1/3"></div>
            </div>
            <div className="flex">
              <div className="modal-item w-1/3">
                <p>Password:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="password"
                  value={editedValues.password || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Email:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="email"
                  value={editedValues.email || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Fecha de Nacimiento:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={editedValues.fechaNacimiento || ''}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="modal-item w-1/3">
                <p>Género:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="genero"
                  value={editedValues.genero || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Responsabilidad:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="responsabilidad"
                  value={editedValues.responsabilidad || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Salario diario:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="salario"
                  value={editedValues.salario || ''}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="modal-item w-1/3">
                <p>Horario:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="horario"
                  value={editedValues.horario || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Fecha de contratacion:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  type="date"
                  id="fechaContratacion"
                  name="fechaContratacion"
                  value={editedValues.fechaContratacion || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Departamento:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="departamento"
                  value={editedValues.departamento || ''}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="modal-item w-1/3">
                <p>Estatus:</p>
                <select
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="statu"
                  value={editedValues.statu || ''}
                  onChange={handleEditInputChange}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
              <div className="modal-item w-1/3">
                <p>Contacto:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="contacto"
                  value={editedValues.contacto || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Grupo:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="grupo"
                  value={editedValues.grupo || ''}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="modal-item w-1/3">
                <p>Calle:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="calle"
                  value={editedValues.calle || ''}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="modal-item w-1/3">
                <p>Numero Interior:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="numeroI"
                  value={editedValues.numeroI || ''}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="modal-item w-1/3">
                <p>Numero Exterior:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="numeroE"
                  value={editedValues.numeroE || ''}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="modal-item w-1/3">
                <p>Ciudad:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="ciudad"
                  value={editedValues.ciudad || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Estado:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="estado"
                  value={editedValues.estado || ''}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="modal-item w-1/3">
                <p>Código postal:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="cp"
                  value={editedValues.cp || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Tarea:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="id"
                  value={editedValues.tarea || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Equipo de protección personal:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="epp"
                  value={editedValues.epp || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Área:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="area"
                  value={editedValues.area || ''}
                  onChange={handleEditInputChange}
                />
              </div>
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
      {showConfirmation && (
        <div
          className={`${
            isDarkMode ? ' bg-black' : 'bg-white'
          } confirmation bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4/4 overflow-y-auto`}
        >
          Elemento eliminado
        </div>
      )}
    </>
  );
};
export default Table;
