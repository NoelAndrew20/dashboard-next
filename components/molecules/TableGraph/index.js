import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';

const TableGraph = ({ data, setData, dataOrder, setDataOrder }) => {
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
 
    const addOrder = async () => { //Crea el arrelo general
        try {
          if (
            nombreAlimentoV !== "" && cantidadV !== "" && proteinaV != ""
            && precioV  !== "" && precioVariableV  !== "" && complemento1V !== "" && complemento2V !== ""
            && proteinaObjV !== ""
            //verifica que lo required no este vacio
          ) {
            const newOrder = { //crea el nuevo arreglo
                nombreAlimentoV: nombreAlimentoV,
                cantidadV: cantidadV,
                proteinaV: proteinaV,
                precioV: precioV,
                precioVariableV: precioVariableV,
                complemento1V: complemento1V,
                complemento2V: complemento2V,
                proteinaObjV: proteinaObjV
            };


            const newData = [...dataOrder, newOrder]; //arregla el nuevo arreglo al arreglo que viene del back
            setDataOrder(newData);
            setNombreAlimentoV("");
            setCantidadV("");
            setProteinaV("");
            setPrecioV("");
            setPrecioVariableV("");
            setComplemento1V("");
            setComplemento2V("");
            setProteinaObjV("")
            setSuccessMessage('Orden guardada exitosamente');
            setErrorMessage("");
            console.log(dataOrder);

          } else {
            setErrorMessage('Por favor completa los cambios');
            setSuccessMessage("");
          }
        } catch (error) {
          setErrorMessage('Hubo un error al guardar el usuario');
          setSuccessMessage("");
        }
      };
    return (
        <>
        <div className="search-container mb-5">
            <div className={isDarkMode ? "flex inner-search-d" : "flex inner-search"}>
                <div>
                    <input
                        type="text"
                        className={isDarkMode ? "bg-black" : "bg-white"}
                        placeholder="Buscar por Nombre"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value.toLocaleLowerCase())}
                    />
                </div>
                <div className="inner-search-icon">
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 15.5L19 19" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div className={`${isDarkMode ? "fake-table-d" : "fake-table"} flex`}>
            <div className="w-1/3">
                <ul>
                    <h2>Nombre de Alimento</h2>
                    {data.map((item) => (
                    <li key={item.nombreAlimento}>
                        <label>
                        <input
                            type="checkbox"
                            name="alimento"
                            value={item.nombreAlimento}
                        />
                        &nbsp;{item.nombreAlimento}
                        </label>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="w-1/3">
                <ul>
                    <h2>Complemento de Alimento</h2>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Pasta de soya" /> Pasta de soya
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Harina de carne" /> Harina de carne
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Harina de sangre" /> Harina de sangre
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Harina de pescado" /> Harina de pescado
                        </label>
                    </li>
          
                </ul>
            </div>
            <div className="w-1/3">
                <ul>
                    <h2>Complementos</h2>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="cslcio" /> Calcio
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Acido de grasas" /> Acido de grasas
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Ortofosfato" /> Ortofosfato
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Lisina" /> Lisina
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Metionina" /> Metionina
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Sal" /> Sal
                        </label>
                    </li>
                </ul>
            </div>
        </div>
       
            <form className={`${isDarkMode ? "edit-modal-d" : "edit-modal" } bg-white p-4 rounded shadow-md mt-10`}>
                <h2 className="text-lg">Generar calculo</h2>
                <div>
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
                        <div className="modal-item w-1/3">
                            <p>Complemento de alimento:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="text" name="complemento1" value={complemento1V} onChange={(e) => setComplemento1V(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="flex">

                        <div className="modal-item w-1/3">
                            <p>Complemento de alimento 2:</p><input className={isDarkMode ? "edit-input-container-d" : "edit-input-container"} type="text" name="complemento2" value={complemento2V} onChange={(e) => setComplemento2V(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex">
                    </div>
                </div>
                <div className="mt-5 flex justify-between">
                    <button className="button" onClick={addOrder}>Generar</button>
                </div>
                <div className="flex justify-center text-lg bold">
                    <h2>Total: {total}</h2>
                </div>
            </form>
        </>
    )
}
export default TableGraph;