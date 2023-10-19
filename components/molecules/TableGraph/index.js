import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import CalcuForm from '@/components/atoms/CalcuForm';
import CalcuFormOther from '@/components/atoms/CalcuFormOther';

const TableGraph = ({ data, setData, dataOrder, setDataOrder, dataList, setDataList }) => {
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
    const [proteinaObjV, setProteinaObjV] = useState("");
    const [showForms, setShowForms] = useState({});
    const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [complementoData, setComplementoData] = useState([
        {
          _id: "651c2f33be9c9264651f04f9",
          fecha: "2023-09-29T19:56:57.031Z",
          nombreAlimento: "Maíz amarirello",
          tipo: 0,
          proteina: 7.5,
          precio: 7.5,
          precioVariable: 8.25
        },
        {
          _id: "651c2f33be9c9264651f04fa",
          fecha: "2023-09-29T19:56:57.031Z",
          nombreAlimento: "Sorego",
          tipo: 0,
          proteina: 8,
          precio: 6,
          precioVariable: 6.6
        },
        {
          _id: "651c2f33be9c9264651f04fb",
          fecha: "2023-09-29T19:56:57.031Z",
          nombreAlimento: "Trieffgo",
          tipo: 0,
          proteina: 9,
          precio: 19.5,
          precioVariable: 21.45
        },
        {
          _id: "651d7d5478524b5ca0cd6892",
          fecha: "2023-10-04T14:57:24.628Z",
          nombreAlimento: "Maízd",
          tipo: 0,
          proteina: 8.5,
          precio: 10,
          precioVariable: 11
        },
        {
            _id: "651d7d5478524b5ca0cd6892",
            fecha: "2023-10-04T14:57:24.628Z",
            nombreAlimento: "Makízd",
            tipo: 0,
            proteina: 8.5,
            precio: 10,
            precioVariable: 11
        },
        {
            _id: "651d7d5478524b5ca0cd6892",
            fecha: "2023-10-04T14:57:24.628Z",
            nombreAlimento: "jhik",
            tipo: 0,
            proteina: 8.5,
            precio: 10,
            precioVariable: 11
        }
      ]);
    const [complementoData2, setComplementoData2] = useState([]);
    const [selectedFoodData, setSelectedFoodData] = useState(); // Estado para almacenar los datos del alimento seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formDataList, setFormDataList] = useState([]);
    const [ dataAux, setDataAux ] = useState([])
    const [dataAuxComplemento, setDataAuxComplemento] = useState([])
    const [dataAuxComplemento2, setDataAuxComplemento2] = useState([])
    const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
    const [dataFinal, setDataFinal] = useState()
    const axios = require('axios');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const addFormData = (formData) => {
        setFormDataList([...formDataList, formData]);
    };

    const generateJSON = (e) => {
        e.preventDefault();
        const jsonData = Object.values(
          formDataList.reduce((acc, formData) => {
            acc[formData.nombreAlimento] = formData;
            return acc;
          }, {})
        );
      
        const combinedData = {
          solicitudes: jsonData.map((item) => ({
            nombreAlimento: item.nombreAlimento,
            cantidad: item.cantidad,
          })),
        };
      
        setShowForms({});
        setDataList([...dataList, combinedData]);
        setSelectedFoodData(null);
        
        const apiUrl = 'http://localhost:3082/addSolicitudCompraAlimento';
            axios.post(apiUrl, combinedData)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });

        console.log(combinedData);
      };
  
      const handleCheckboxChange = (event, item) => {
        setSelectedCheckboxIndex(true)
        const updatedShowForms = { ...showForms };
        data.forEach((item) => {
          if (item.nombreAlimento !== item.nombreAlimento) {
            updatedShowForms[item.nombreAlimento] = event.target.checked;
          } else {
            updatedShowForms[item.nombreAlimento] = false;
          }
        });
      
        setShowForms(updatedShowForms);
        const selectedFood = data.find(food => food.nombreAlimento === item.nombreAlimento);
        setSelectedFoodData(selectedFood);
        setShowForms(prevShowForms => ({
        ...prevShowForms,
        [item.nombreAlimento]: !prevShowForms[item.nombreAlimento]
        }));
        const oneSelected = Object.values(updatedShowForms).some((isSelected) => isSelected);
        setIsCheckboxSelected(oneSelected);
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

          } else {
            setErrorMessage('Por favor completa los cambios');
            setSuccessMessage("");
          }
        } catch (error) {
          setErrorMessage('Hubo un error al guardar el usuario');
          setSuccessMessage("");
        }
      };
      const handleDeselectAllCheckboxes = () => {
        
        const updatedShowForms = { ...showForms };
      
        // Deseleccionar todos los checkboxes
        Object.keys(updatedShowForms).forEach((key) => {
          updatedShowForms[key] = false;
        });
      
        setShowForms(updatedShowForms);
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
        <div className={`${isDarkMode ? "fake-table-d" : "fake-table"} flex justify-around`}>
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
                        onChange={(event) => {
                            handleCheckboxChange(event, item)
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
                    <h2>Complemento de Alimento</h2>
                    {complementoData.map((item, index) => (
                        <li key={item.nombreAlimento}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="complemento"
                                    value={item.nombreAlimento}
                                    onChange={() => {
                                        const selectedFood = complementoData.find(food => food.nombreAlimento === item.nombreAlimento);
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
                {/*{selectedCheckboxIndex === true ?
                    {/*<button className="button mt-8 flex float-right"onClick={handleDeselectAllCheckboxes}>Agregar receta</button>
                 : ""}*/}
            </div>
        </div>
        <div>
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
            <button className="button mt-2" onClick={openModal}>Agregar alimento</button>
        </div>
        {selectedFoodData ? (
            <form
                className={`${isDarkMode ? "edit-modal-d" : "edit-modal"} bg-white p-4 rounded shadow-md mt-10`}
                onSubmit={generateJSON}
            >               
                {Object.entries(showForms).map(([alimento, showForm]) => {
                if (showForm) {
                    return (
                    <CalcuForm
                        addFormData={addFormData}
                        selectedFoodData={selectedFoodData}
                        alimento={alimento}
                    />
                    );
                }
                return "";
                })}
            
            <button className="button mt-2" type="submit">
                    Agregar receta
            </button>
            </form>
            ) : ""}
        </>
    )
}

export default TableGraph;