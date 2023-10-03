import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import CalcuForm from '@/components/atoms/CalcuForm';
import CalcuFormOther from '@/components/atoms/CalcuFormOther';

const TableGraph = ({ data, setData, dataOrder, setDataOrder }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
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
    const [proteinaObjV, setProteinaObjV] = useState("");
    const [showForms, setShowForms] = useState({});
    const [otroAlimento, setOtroAlimento] = useState("");
    const [complementoData, setComplementoData] = useState([]);
    const [complementoData2, setComplementoData2] = useState([]);
    const [selectedFoodData, setSelectedFoodData] = useState(); // Estado para almacenar los datos del alimento seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [ dataAux, setDataAux ] = useState([])
    const [dataAuxComplemento, setDataAuxComplemento] = useState([])
    const [dataAuxComplemento2, setDataAuxComplemento2] = useState([])
    const axios = require('axios');
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        axios.get('http://localhost:3081/getAllalimentot0')
        .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setDataAux(jsonData)
            setData(jsonData);
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
            setDataAuxComplemento(jsonData);
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
            setDataAuxComplemento2(jsonData);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    

    const addOrder = async () => { //Crea el arrelo general
        try {
          if (
            nombreAlimentoV !== "" && tipoV !== "" && proteinaV != ""
            && precioV  !== "" && precioVariableV  !== ""
            //verifica que lo required no este vacio
          ) {
            const newOrder = { //crea el nuevo arreglo
                nombreAlimentoV: nombreAlimentoV,
                tipoV: tipoV,
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
            setTipoV("");
            setProteinaV("");
            setPrecioV("");
            setPrecioVariableV("");
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
                            const selectedFood = dataAux.find(food => food.nombreAlimento === item.nombreAlimento);
                            setSelectedFoodData(selectedFood);
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
                <div className="">
                    <div className={`modal ${isModalOpen ? 'block' : 'hidden'}`}>
                        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={closeModal}></div>
                        <div className={`${isDarkMode ? "modal-content-d" : "modal-content " } bg-white p-4 rounded shadow-md absolute top-[60vh] left-1/2 transform -translate-x-1/2 overflow-y-auto z-50`}>
                            <CalcuFormOther 
                                data={data} 
                                setData={setData} 
                                closeModal={closeModal}
                            />
                        </div>
                    </div>                      
                    <button className="button" onClick={openModal}>Agregar alimento</button>
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
                                        const selectedFood = dataAuxComplemento.find(food => food.nombreAlimento === item.nombreAlimento);
                                        {console.log(selectedFood)}
                                        setSelectedFoodData(selectedFood);
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
                                        const selectedFood = dataAuxComplemento2.find(food => food.nombreAlimento === item.nombreAlimento);
                                        setSelectedFoodData(selectedFood);
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
        {otroAlimento !== "" ? 
            <CalcuFormOther addOrder={addOrder} alimento={otroAlimento} />
         : ""
        }
        {Object.entries(showForms).map(([alimento, showForm]) => {
        if (showForm) {
            return <CalcuForm
            selectedFoodData={selectedFoodData}
            key={alimento}
            addOrder={addOrder}
            alimento={alimento}
            />;
        }
        return null;
        })}


        </>
    )
}

export default TableGraph;