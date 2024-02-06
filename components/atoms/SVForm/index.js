import { useDarkMode } from '@/context/DarkModeContext';
import { useEffect, useState } from 'react';
const SVForm = ({ addFormData, nombre, selectedFoodData }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const [formData, setFormData] = useState(
    selectedFoodData || {
      nombre: '',
      cantidad: '',
      fechaEntrega: '',
    }
  );

  const agregarLote = () => {
    const nuevoLote = {
      nombre: formData.nombre,
      cantidad: formData.cantidad,
      fechaEntrega: formData.fechaEntrega,
    };
    addFormData(nuevoLote);
  };

  useEffect(() => {
    agregarLote();
  }, [formData]);

  return (
    <div>
      <div>
        {selectedFoodData && (
          <div className="flex">
            <div className="modal-item w-1/2">
              <p className="font-bold">Nombre de nombre:</p>
              <input
                className={
                  isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
                }
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                disabled
              />
            </div>
            <div className="modal-item w-1/2">
              <p className="font-bold">Cantidad:</p>
              <input
                className={
                  isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
                }
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={(e) =>
                  setFormData({ ...formData, cantidad: e.target.value })
                }
                required
              />
            </div>

            <div className="modal-item w-1/2">
              <p className="font-bold">Fecha de entrega:</p>
              <input
                className={
                  isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
                }
                type="date"
                name="fechaEntrega"
                value={formData.fechaEntrega}
                onChange={(e) =>
                  setFormData({ ...formData, fechaEntrega: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SVForm;
