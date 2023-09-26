import { useDarkMode } from "@/context/DarkModeContext";
import { useState } from "react";
const CalcuForm = ({addOrder, alimento}) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showEditModal, setShowEditModal] = useState(false);
    const entriesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const [searchTerm, setSearchTerm] = useState("");
    const [nombreAlimentoV, setNombreAlimentoV] = useState("");
    const [cantidadV, setCantidadV] = useState("");
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
             {/*
            <div className="flex">
               
                <div className="modal-item w-1/3 relative">
                    <p>Proteina Objetivo:</p>
                    <input
                        className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}
                        type="number"
                        name="proteinaObjV"
                        value={proteinaObjV}
                        onChange={(e) => setProteinaObjV(e.target.value)}
                        required
                    />
                    <span className="absolute bottom-1 right-0 pr-[25%] flex items-end pointer-events-none">
                        %
                    </span>
                    </div>

                </div>
            */}
            <div className="flex">
                <div className="modal-item w-1/3">
                    <p>Nombre de alimento:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="text" name="NombreAlimento" value={nombreAlimentoV} onChange={(e) => setNombreAlimentoV(e.target.value)} required/>
                </div>
                <div className="modal-item w-1/3">
                    <p>Cantidad:</p> <input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="number" name="cantidad" value={cantidadV} onChange={(e) => setCantidadV(e.target.value)} required/>
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
                {/*
                <div className="modal-item w-1/3">
                    <p>Complemento de alimento:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="text" name="complemento1" value={complemento1V} onChange={(e) => setComplemento1V(e.target.value)} required/>
                </div>
                */}
            </div>
            {/*
            <div className="flex">

                <div className="modal-item w-1/3">
                    <p>Complemento de alimento 2:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="text" name="complemento2" value={complemento2V} onChange={(e) => setComplemento2V(e.target.value)} />
                </div>
            </div>
            */}
        </div>
        <div className="flex pt-5 justify-center text-lg bold">
            <h2>Total: {total}</h2>
        </div>
    </form>
    )
}
export default CalcuForm;