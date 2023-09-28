import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import CalcuForm from '@/components/atoms/CalcuForm';

const TableGraph = ({ data, setData, dataOrder, setDataOrder }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
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
    const [proteinaObjV, setProteinaObjV] = useState("");
    const [showForms, setShowForms] = useState({});

    /*const [showForm0, setShowForm0] = useState(false);
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
    const [showForm40, setShowForm40] = useState(false);*/
    const [otroAlimento, setOtroAlimento] = useState("");

    const [complementoData, setComplementoData] = useState([]);
    const [complementoData2, setComplementoData2] = useState([]);

    const axios = require('axios');

    useEffect(() => {
        axios.get('http://localhost:3081/getAllalimentot0')
        .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setData(jsonData);
            console.log(jsonData)
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3081/getAllalimentot1')
        .then(response => {
            const jsonData = response.data;
            setComplementoData(jsonData);
            console.log(jsonData)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3081/getAllalimentot2')
        .then(response => {
            const jsonData = response.data;
            setComplementoData2(jsonData);
            console.log(jsonData);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    

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
                    {data.map((item, index) => (
                    <li key={item.nombreAlimento}>
                        <label>
                        <input
                            type="checkbox"
                            name="alimento"
                            value={item.nombreAlimento}
                            onChange={() => {
                                setShowForms(prevShowForms => ({
                                    ...prevShowForms,
                                    [item.nombreAlimento]: !prevShowForms[item.nombreAlimento]
                                }));
                            }}
                            checked={showForms[item.nombreAlimento]}
                        />
                        &nbsp;{item.nombreAlimento}
                        </label>
                    </li>
                    ))}
                </ul>
                
                <div>
                    <p>Otro alimento</p>
                    <input type="text" name="otro alimento" value={otroAlimento} onChange={(e) => setOtroAlimento(e.target.value)} className={isDarkMode ? "edit-input-container-d" : "edit-input-container"}/>
                </div>
            
            </div>
            <div className="w-1/3">
                <ul>
                    <h2>Complemento de Alimento</h2>
                    {complementoData.map((item, index) => (
                        <li key={item.nombreAlimento}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="complemento"
                                    value={item.nombreAlimento}
                                    onChange={() => {
                                        setShowForms(prevShowForms => ({
                                            ...prevShowForms,
                                            [item.nombreAlimento]: !prevShowForms[item.nombreAlimento]
                                        }));
                                    }}
                                    checked={showForms[item.nombreAlimento]}
                                />
                                &nbsp;{item.nombreAlimento}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-1/3">
    <ul>
        <h2>Complemento extra de Alimento </h2>
        {complementoData2.map((item, index) => (
            <li key={item._id}>
                <label>
                    <input
                        type="checkbox"
                        name="complemento2"
                        value={item.nombreAlimento}
                        onChange={() => {
                            setShowForms(prevShowForms => ({
                                ...prevShowForms,
                                [item.nombreAlimento]: !prevShowForms[item.nombreAlimento]
                            }));
                        }}
                        checked={showForms[item.nombreAlimento]}
                    />
                    &nbsp;{item.nombreAlimento}
                </label>
            </li>
        ))}
     </ul>
            </div>
        </div>
        {Object.entries(showForms).map(([alimento, showForm]) => {
            if (showForm) {
                return <CalcuForm key={alimento} addOrder={addOrder} alimento={alimento} />;
            }
            return null;
        })}
        </>
    )
}

export default TableGraph;