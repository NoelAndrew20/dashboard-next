import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TableCerdos = ({ data, setData }) => {
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
        (item) => item.granja && item.granja.toLowerCase().includes(searchTerm)
      )
    : data;
  const displayDataFinal = displayData?.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
              placeholder="Buscar por granja"
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
              <th>Proveedor</th>
              <th>Granja</th>
              <th>Sede</th>
              <th>Gastos</th>
            </tr>
          </thead>
          <tbody>
            {displayDataFinal?.map((item, index) => (
              <tr className="table-row" key={index}>
                <td>{item.proveedores.nombreProveedor}</td>
                <td>{item.granja}</td>
                <td>{item.proveedores.sede}</td>
                <td>{item.gastos}</td>
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
            isDarkMode ? 'modal-content-d' : 'modal-content '
          } bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto z-50`}
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
                <p>Apellido:</p>{' '}
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="apellido"
                  value={editedValues.apellido || ''}
                  onChange={handleEditInputChange}
                />
              </div>
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
                <p>Puesto:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="puesto"
                  value={editedValues.puesto || ''}
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
                <p>Status:</p>
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
                <p>ID del grupo:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="id"
                  value={editedValues.id || ''}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Nombre del grupo:</p>
                <input
                  className={
                    isDarkMode
                      ? 'edit-input-container-d'
                      : 'edit-input-container'
                  }
                  name="nombreGrupo"
                  value={editedValues.nombreGrupo || ''}
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
export default TableCerdos;
