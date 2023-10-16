import { useDarkMode } from "@/context/DarkModeContext";
import { useEffect, useState } from "react";
const CalcuForm = ({addFormData, alimento, selectedFoodData}) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const entriesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    
    const [formData, setFormData] = useState(selectedFoodData || {
        nombreAlimento: '',
        cantidad: '',
      });

    const agregarLote = () => {
      const nuevoLote = {
        nombreAlimento: formData.nombreAlimento,
        cantidad: formData.cantidad,
        
      };
      addFormData(nuevoLote);  
      // Resto de la lógica
    };
    
    useEffect(() => {
      agregarLote(); // Llamar agregarLote después de calcular los valores
    }, [formData]);

    return(
        <div>
          <div>    
            {selectedFoodData && (

              <div className="flex">
                                      

                <div className="modal-item w-1/2">
                  <p className="font-bold">Nombre de alimento:</p>
                  <input
                    className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
                    type="text"
                    name="NombreAlimento"
                    value={formData.nombreAlimento}
                    onChange={(e) => setFormData({ ...formData, nombreAlimento: e.target.value })}
                    required
                  />
                </div>
                <div className="modal-item w-1/2">
                  <p className="font-bold">Cantidad:</p>
                  <input
                    className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                  />
                </div>
                {/*
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
            </div>*/}
              </div>
            )}
            {/* Otros campos */}
          </div>
          {/*
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
            <h2>Total de proteina: {isNaN(totalProte) ? 0 : totalProte}</h2>
          </div>
          <div className="flex pt-5 justify-center text-lg bold">
            <h2>Total de precio: {isNaN(totalPrecio) ? 0 : totalPrecio}</h2>
          </div>
          <button  className="button" onClick={agregarLote}>Agregar al total</button>*/}
        </div>
    )
}
export default CalcuForm;