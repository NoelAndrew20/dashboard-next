import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';
import CalcuForm from '@/components/atoms/CalcuForm';

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
    const [showForm0, setShowForm0] = useState(false);
    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [showForm3, setShowForm3] = useState(false);
    const [showForm4, setShowForm4] = useState(false);
    const [showForm5, setShowForm5] = useState(false);
    const [showForm6, setShowForm6] = useState(false);
    const [showForm7, setShowForm7] = useState(false);
    const [showForm8, setShowForm8] = useState(false);
    const [showForm9, setShowForm9] = useState(false);
    const [showForm10, setShowForm10] = useState(false);
    const [showForm11, setShowForm11] = useState(false);
    const [showForm12, setShowForm12] = useState(false);
    const [showForm13, setShowForm13] = useState(false);
    const [showForm14, setShowForm14] = useState(false);
    const [showForm15, setShowForm15] = useState(false);
    const [showForm16, setShowForm16] = useState(false);
    const [showForm17, setShowForm17] = useState(false);
    const [showForm18, setShowForm18] = useState(false);
    const [showForm19, setShowForm19] = useState(false);
    const [showForm20, setShowForm20] = useState(false);
    const [showForm21, setShowForm21] = useState(false);
    const [showForm22, setShowForm22] = useState(false);
    const [showForm23, setShowForm23] = useState(false);
    const [showForm24, setShowForm24] = useState(false);
    const [showForm25, setShowForm25] = useState(false);
    const [showForm26, setShowForm26] = useState(false);
    const [showForm27, setShowForm27] = useState(false);
    const [showForm28, setShowForm28] = useState(false);
    const [showForm29, setShowForm29] = useState(false);
    const [showForm30, setShowForm30] = useState(false);
    const [showForm31, setShowForm31] = useState(false);
    const [showForm32, setShowForm32] = useState(false);
    const [showForm33, setShowForm33] = useState(false);
    const [showForm34, setShowForm34] = useState(false);
    const [showForm35, setShowForm35] = useState(false);
    const [showForm36, setShowForm36] = useState(false);
    const [showForm37, setShowForm37] = useState(false);
    const [showForm38, setShowForm38] = useState(false);
    const [showForm39, setShowForm39] = useState(false);
    const [showForm40, setShowForm40] = useState(false);


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
      const handleCheckboxChange = () => {
        setShowForm(true);
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
                    {data.map((item, index) => (
                    <li key={item.nombreAlimento}>
                        <label>
                        <input
                            type="checkbox"
                            name="alimento"
                            value={item.nombreAlimento}
                            onChange={() => {
                                const setShowForm = eval(`setShowForm${index}`);
                                setShowForm((prevValue) => !prevValue);
                              }}
                              checked={eval(`showForm${index}`)}
                  
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
                            <input type="checkbox" name="complemento" value="Pasta de soya" onChange={()=> setShowForm33(!showForm33)}/> Pasta de soya
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Harina de carne" onChange={()=> setShowForm34(!showForm34)}/> Harina de carne
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Harina de sangre" onChange={()=> setShowForm35(!showForm35)}/> Harina de sangre
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Harina de pescado" onChange={()=> setShowForm36(!showForm36)}/> Harina de pescado
                        </label>
                    </li>
          
                </ul>
            </div>
            <div className="w-1/3">
                <ul>
                    <h2>Complementos</h2>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="cslcio" onChange={()=> setShowForm37(!showForm37)}/> Calcio
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Acido de grasas" onChange={()=> setShowForm36(!showForm36)}/> Acido de grasas
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Ortofosfato" onChange={()=> setShowForm37(!showForm37)}/> Ortofosfato
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Lisina" onChange={()=> setShowForm38(!showForm38)}/> Lisina
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Metionina" onChange={()=> setShowForm39(!showForm39)}/> Metionina
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="complemento" value="Sal" onChange={()=> setShowForm40(!showForm40)}/> Sal
                        </label>
                    </li>
                </ul>
            </div>
        </div>
        {showForm0 ? 
            <CalcuForm addOrder={addOrder} alimento={data[0]?.nombreAlimento}/>
         : ""
        }
        {showForm1 ? 
            <CalcuForm addOrder={addOrder} alimento={data[1]?.nombreAlimento} />
         : ""
        }
        {showForm2 ? 
            <CalcuForm addOrder={addOrder} alimento={data[2]?.nombreAlimento} />
         : ""
        }{showForm3 ? 
            <CalcuForm addOrder={addOrder} alimento={data[3]?.nombreAlimento} />
         : ""
        }{showForm4 ? 
            <CalcuForm addOrder={addOrder} alimento={data[4]?.nombreAlimento} />
         : ""
        }{showForm5 ? 
            <CalcuForm addOrder={addOrder} alimento={data[5]?.nombreAlimento} />
         : ""
        }{showForm6 ? 
            <CalcuForm addOrder={addOrder} alimento={data[6]?.nombreAlimento} />
         : ""
        }{showForm7 ? 
            <CalcuForm addOrder={addOrder} alimento={data[7]?.nombreAlimento} />
         : ""
        }{showForm8 ? 
            <CalcuForm addOrder={addOrder} alimento={data[8]?.nombreAlimento} />
         : ""
        }{showForm9 ? 
            <CalcuForm addOrder={addOrder} alimento={data[9]?.nombreAlimento} />
         : ""
        }{showForm10 ? 
            <CalcuForm addOrder={addOrder} alimento={data[10]?.nombreAlimento} />
         : ""
        }{showForm11 ? 
            <CalcuForm addOrder={addOrder} alimento={data[11]?.nombreAlimento} />
         : ""
        }{showForm12 ? 
            <CalcuForm addOrder={addOrder} alimento={data[12]?.nombreAlimento} />
         : ""
        }{showForm13 ? 
            <CalcuForm addOrder={addOrder} alimento={data[13]?.nombreAlimento} />
         : ""
        }{showForm14 ? 
            <CalcuForm addOrder={addOrder} alimento={data[14]?.nombreAlimento} />
         : ""
        }{showForm15 ? 
            <CalcuForm addOrder={addOrder} alimento={data[15]?.nombreAlimento} />
         : ""
        }{showForm16 ? 
            <CalcuForm addOrder={addOrder} alimento={data[16]?.nombreAlimento} />
         : ""
        }{showForm17 ? 
            <CalcuForm addOrder={addOrder} alimento={data[17]?.nombreAlimento} />
         : ""
        }{showForm18 ? 
            <CalcuForm addOrder={addOrder} alimento={data[18]?.nombreAlimento} />
         : ""
        }{showForm19 ? 
            <CalcuForm addOrder={addOrder} alimento={data[19]?.nombreAlimento} />
         : ""
        }{showForm20 ? 
            <CalcuForm addOrder={addOrder} alimento={data[20]?.nombreAlimento} />
         : ""
        }{showForm21 ? 
            <CalcuForm addOrder={addOrder} alimento={data[21]?.nombreAlimento} />
         : ""
        }{showForm22 ? 
            <CalcuForm addOrder={addOrder} alimento={data[22]?.nombreAlimento} />
         : ""
        }{showForm23 ? 
            <CalcuForm addOrder={addOrder} alimento={data[23]?.nombreAlimento} />
         : ""
        }{showForm24 ? 
            <CalcuForm addOrder={addOrder} alimento={data[24]?.nombreAlimento} />
         : ""
        }{showForm25 ? 
            <CalcuForm addOrder={addOrder} alimento={data[25]?.nombreAlimento} />
         : ""
        }{showForm26 ? 
            <CalcuForm addOrder={addOrder} alimento={data[26]?.nombreAlimento} />
         : ""
        }{showForm27 ? 
            <CalcuForm addOrder={addOrder} alimento={data[27]?.nombreAlimento} />
         : ""
        }{showForm28 ? 
            <CalcuForm addOrder={addOrder} alimento={data[28]?.nombreAlimento} />
         : ""
        }{showForm29 ? 
            <CalcuForm addOrder={addOrder}/>
         : ""
        }{showForm30 ? 
            <CalcuForm addOrder={addOrder} alimento={data[29]?.nombreAlimento} />
         : ""
        }{showForm31 ? 
            <CalcuForm addOrder={addOrder} alimento={data[30]?.nombreAlimento} />
         : ""
        }{showForm32 ? 
            <CalcuForm addOrder={addOrder} alimento={data[31]?.nombreAlimento} />
         : ""
        }{showForm33 ? 
            <CalcuForm addOrder={addOrder} alimento={data[32]?.nombreAlimento} />
         : ""
        }{showForm34 ? 
            <CalcuForm addOrder={addOrder} alimento={data[33]?.nombreAlimento} />
         : ""
        }{showForm35 ? 
            <CalcuForm addOrder={addOrder} alimento={"Calcio"} />
         : ""
        }{showForm36 ? 
            <CalcuForm addOrder={addOrder} alimento={"Acido de grasas"} />
         : ""
        }{showForm37 ? 
            <CalcuForm addOrder={addOrder} alimento={"Ortofosfato"} />
         : ""
        }{showForm38 ? 
            <CalcuForm addOrder={addOrder} alimento={"Lisina"} />
         : ""
        }{showForm39 ? 
            <CalcuForm addOrder={addOrder} alimento={"Metionina"} />
         : ""
        }{showForm40 ? 
            <CalcuForm addOrder={addOrder} alimento={"Sal"} />
         : ""
        }
        </>
    )
}
export default TableGraph;