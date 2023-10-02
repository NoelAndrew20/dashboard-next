import { useDarkMode } from "@/context/DarkModeContext";
import { useState } from "react";
const CalcuForm = ({addOrder, alimento, selectedFoodData, setSelectedFoodData}) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const entriesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [formData, setFormData] = useState(selectedFoodData || {
        nombreAlimento: '',
        cantidad: '',
        proteina: '',
        precio: '',
        precioVariable: '',
      });
    const [total, setTotal] = useState("")

    return(
        <form className={`${isDarkMode ? "edit-modal-d" : "edit-modal" } bg-white p-4 rounded shadow-md mt-10`}>
        <h2 className="text-lg">Generar calculo: <span className="text-[#D4AF37]">{alimento}</span></h2>
        {console.log(selectedFoodData)}
        <div>    
          {selectedFoodData && (

            <div className="flex">
                                    

              <div className="modal-item w-1/3">
                <p>Nombre de alimento:</p>
                <input
                  className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
                  type="text"
                  name="NombreAlimento"
                  value={formData.nombreAlimento}
                  onChange={(e) => setFormData({ ...formData, nombreAlimento: e.target.value })}
                  required
                />
              </div>
              <div className="modal-item w-1/3">
                <p>Cantidad:</p>
                <input
                    className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                    required
                />
              </div>
              <div className="modal-item w-1/3">
                <p>% de Proteina:</p>
                <input
                  className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
                  type="number"
                  name="proteina"
                  value={formData.proteina}
                  onChange={(e) => setFormData({ ...formData, proteina: e.target.value })}
                  required
                />
              </div>
            </div>
          )}
          {/* Otros campos */}
        </div>
        <div className="flex">
          <div className="modal-item w-1/3">
            <p>Precio:</p>
            <input
              className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
              type="number"
              name="precio"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              required
            />
          </div>
          <div className="modal-item w-1/3">
            <p>Precio variable:</p>
            <input
              className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
              type="number"
              name="precioVariable"
              value={formData.precioVariable}
              onChange={(e) => setFormData({ ...formData, precioVariable: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="flex pt-5 justify-center text-lg bold">
          <h2>Total: {total}</h2>
        </div>
      </form>
    )
}
export default CalcuForm;