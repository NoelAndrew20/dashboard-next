import { useDarkMode } from '@/context/DarkModeContext';
import { useState } from 'react';
const CalcuOtherSV = ({ alimento }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [tipo, setTipo] = useState('');
  const [dosis, setDosis] = useState('');
  const [nomenclatura, setNomenclatura] = useState('');
  const [activos, setActivos] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState('');
  const addOrder = async () => {
    try {
      if (
        nombre !== '' &&
        precio !== '' &&
        tipo != '' &&
        dosis !== '' &&
        nomenclatura !== '' &&
        activos !== ''
      ) {
        const newOrder = {
          nombre: nombre,
          precio: precio,
          tipo: tipo,
          dosis: dosis,
          nomenclatura: nomenclatura,
          componenteActivo: activos
        };

        const newData = [...data, newOrder];
        setData(newData);
        setNombre('');
        setPrecio('');
        setTipo('');
        setDosis('');
        setNomenclatura('');
        setActivos('');
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

  return (
    <form
      className={`${
        isDarkMode ? 'edit-modal-d' : 'edit-modal'
      } bg-white p-4 rounded shadow-md mt-10`}
    >
      <h2 className="text-lg">
        Generar calculo: <span className="text-[#D4AF37]">{alimento}</span>
      </h2>
      <div>
        <div className="flex">
          <div className="modal-item w-1/3">
            <p>Nombre de vacuna:</p>
            <input
              className={
                isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
              }
              type="text"
              name="NombreAlimento"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="modal-item w-1/3">
            <p>Precio:</p>
            <input
              className={
                isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
              }
              name="cantidad"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="modal-item w-1/3">
            <p>Tipo:</p>
            <input
              className={
                isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
              }
              type="number"
              name="proteina"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex">
          <div className="modal-item w-1/3">
            <p>Dosis:</p>
            <input
              className={
                isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
              }
              type="number"
              name="precio"
              value={dosis}
              onChange={(e) => setDosis(e.target.value)}
              required
            />
          </div>
          <div className="modal-item w-1/3">
            <p>Nomenclatura:</p>
            <input
              className={
                isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
              }
              type="text"
              name="dosisariable"
              value={nomenclatura}
              onChange={(e) => setNomenclatura(e.target.value)}
              required
            />
          </div>
          <div className="modal-item w-1/3">
            <p>Componente Activo:</p>
            <input
              className={
                isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
              }
              type="text"
              name="dosisariable"
              value={activos}
              onChange={(e) => setActivos(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-5">
        <div>
          <button
            id="ButtonG"
            className="button primary"
            onClick={() => addOrder()}
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};
export default CalcuOtherSV;
