import { useDarkMode } from "@/context/DarkModeContext";
import { useEffect, useState } from "react";
const CalcuForm = ({setDataCalculator, dataCalculator, alimento, selectedFoodData, setSelectedFoodData, dataFinal, setDataFinal, totalX, setTotalX, totalY, setTotalY
  }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const entriesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [formData, setFormData] = useState(selectedFoodData || {
        nombreAlimento: '',
        cantidad: '',
        //proteina: '',
        //precio: '',
        //precioVariable: '',
      });
    const [totalProte, setTotalProte] = useState("");
    const [totalPrecio, setTotalPrecio] = useState("");
    const [totalPrecioVariable, setTotalPrecioVariable] = useState("");

    const [lotes, setLotes] = useState([]);

    const agregarLote = (e) => {
      e.preventDefault();
      const nuevoLote = {
        totalProte,
        totalPrecio,
        totalPrecioVariable
      };
      setDataCalculator((prevLotes) => [...prevLotes, nuevoLote]);
      setDataFinal((prevData) => [...prevData, nuevoLote]);
    };
    

    {/*const calculateTotalProte = () => {
      let value;
      value = formData.proteina * formData.cantidad / 1000;
      setTotalProte(value);
    }
    const calculateTotalPrecio = () => {
      let value;
      value = formData.precio * formData.cantidad;
      setTotalPrecio(value)
    }
    const calculatePrecioVariable = () => {
      let value;
      value = formData.precioVariable * formData.cantidad;
      setTotalPrecioVariable(value)
    }
    useEffect(() =>{
      calculateTotalPrecio();
      calculateTotalProte();
      calculatePrecioVariable();
    }, [])*/}
  
    return(
        <form className={`${isDarkMode ? "edit-modal-d" : "edit-modal" } bg-white p-4 rounded shadow-md mt-10`}>
        <h2 className="text-lg">Generar calculo: <span className="text-[#D4AF37]">{alimento}</span></h2>
        <div>    
          {selectedFoodData && (

            <div className="flex">
                                    

              <div className="modal-item w-1/2">
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
              <div className="modal-item w-1/2">
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
              {/*<div className="modal-item w-1/3">
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
        </div>
        {/*<div className="flex">
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
        <button  className="button" onClick={agregarLote}>Agregar al total</button>
        */}
        {formData.nombreAlimento !== "" && formData.cantidad !== ""
          ?<button  className="button mt-2" >Agregar a la tabla</button>
          : ""
        }
      </form>
    )
}
export default CalcuForm;