import { useDarkMode } from "@/context/DarkModeContext";
import { useState } from "react";
const CalcuFormOther = ({addOrder, alimento}) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showEditModal, setShowEditModal] = useState(false);
    const entriesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [searchTerm, setSearchTerm] = useState("");
    const [nombreAlimentoV, setNombreAlimentoV] = useState("");
    const [tipoV, setTipoV] = useState("");
    const [proteinaV, setProteinaV] = useState("");
    const [precioV, setPrecioV] = useState("");
    const [precioVariableV, setPrecioVariableV] = useState("");
    const [complemento1V, setComplemento1V] = useState("");
    const [complemento2V, setComplemento2V] = useState("");
    const [total, setTotal] = useState("")
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [proteinaObjV, setProteinaObjV] = useState("");
    return(
    <form className={`${isDarkMode ? "edit-modal-d" : "edit-modal" } bg-white p-4 rounded shadow-md mt-10`}>
        <h2 className="text-lg">Generar calculo: <span className="text-[#D4AF37]">{alimento}</span></h2>
        <div>
            <div className="flex">
                <div className="modal-item w-1/3">
                    <p>Nombre de alimento:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="text" name="NombreAlimento" value={nombreAlimentoV} onChange={(e) => setNombreAlimentoV(e.target.value)} required/>
                </div>
                <div className="modal-item w-1/3">
                    <p>Tipo:</p> 
                    <select className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} name="cantidad" value={tipoV} onChange={(e) => setTipoV(e.target.value)} required>
                        <option value=""></option>
                        <option value="alimentos">Alimentos</option>
                        <option value="complemento alimento">Complemento alimento</option>
                        <option value="complemento extra">Complemento extra alimento</option>
                    </select>
                </div>
                <div className="modal-item w-1/3">
                    <p>% de Proteina:</p> <input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="number" name="proteina" value={proteinaV} onChange={(e) => setProteinaV(e.target.value)} required/>
                </div>
            </div>
            <div className="flex">
                <div className="modal-item w-1/3">
                    <p>Precio:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="number" name="precio" value={precioV} onChange={(e) => setPrecioV(e.target.value)} required/>
                </div>
                <div className="modal-item w-1/3">
                    <p>Precio variable:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}  type="number" name="precioVariable" value={precioVariableV} onChange={(e) => setPrecioVariableV(e.target.value)} required/>
                </div>
            </div>
        </div>
        <div className="flex justify-center pt-5">
            <div>
                <button id="ButtonG" className="button primary" onClick={()=> addOrder()}>Guardar</button>
            </div>
        </div>
    </form>
    )
}
export default CalcuFormOther;