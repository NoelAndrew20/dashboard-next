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
      unidad: '',
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const agregarLote = () => {
    const nuevoLote = {
      nombre: formData.nombre,
      cantidad: formData.cantidad,
      fechaEntrega: formData.fechaEntrega,
      unidad: formData.unidad
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
              <p className="font-bold">Nombre de medicamento:</p>
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
            <p className="font-bold">Unidad de medida:</p>
                  <select
                    className={
                      isDarkMode
                        ? 'edit-input-container-d'
                        : 'edit-input-container'
                    }
                    name="unidad"
                    value={formData.unidad}
                    onChange={handleInputChange}
                  >
                    <option value="" defaultValue>
                      Selecciona...
                    </option>
                    <option value="Kg">Kg</option>
                    <option value="Ton">Ton</option>
                    <option value="Pza">Pza</option>
                    <option value="M3">M3</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                  </select>
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
