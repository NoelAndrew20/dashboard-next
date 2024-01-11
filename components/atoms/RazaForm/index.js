import { useDarkMode } from '@/context/DarkModeContext';
import { useEffect, useState } from 'react';
const RazaForm = ({ addFormData, alimento, selectedFoodData }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const [formData, setFormData] = useState(
    selectedFoodData || {
      raza: '',
      cantidad: '',
    }
  );

  const agregarLote = () => {
    const nuevoLote = {
      raza: formData.raza,
      cantidad: formData.cantidad,
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
              <p className="font-bold">Raza de cerdo:</p>
              <input
                className={
                  isDarkMode ? 'edit-input-container-d' : 'edit-input-container'
                }
                type="text"
                name="NombreAlimento"
                value={formData.raza}
                onChange={(e) =>
                  setFormData({ ...formData, raza: e.target.value })
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
          </div>
        )}
      </div>
    </div>
  );
};
export default RazaForm;
