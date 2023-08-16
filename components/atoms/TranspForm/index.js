import { useState } from 'react';

const TranspForm = ({ data, setData, closeModal }) => {
    const [inputFecha, setInputFecha] = useState("");
    const [inputGranja, setInputGranja] = useState("");
    const [inputCamion, setInputCamion] = useState("");
    const [inputJaula, setInputJaula] = useState("");
    const [inputOperador, setInputOperador] = useState("");
    const [inputCliente, setInputCliente] = useState("");
    const [inputDestino, setInputDestino] = useState("");
    const [inputHrSalida, setInputHrSalida] = useState("");
    const [inputHrLlegada, setInputHrLlegada] = useState("");
    const [inputTmpRecorrido, setInputTmpRecorrido] = useState("");
    const [inputHrInicio, setInputHrInicio] = useState("");

    const [inputKgSalida, setInputKgSalida] = useState("");
    const [inputKgDesembarque, setInputKgDesembarque] = useState("");
    const [inputRango, setInputRango] = useState("");
    const [inputMuertos, setInputMuertos] = useState("");
    const [inputParada, setInputParada] = useState("");
    const [inputAuditor, setInputAuditor] = useState("");
    const [inputIncidencias, setInputIncidencias] = useState("");
    const [inputRevision, setInputRevision] = useState("");
    const [inputFinalDesembarque, setInputFinalDesembarque] = useState("");
    const [inputMerma, setInputMerma] = useState("");
    const [inputCtCerdos, setInputCtCerdos] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const addTransport = async () => {
        try {
          if (
            inputFecha !== "", 
            inputGranja !== "", 
            inputCamion !== "", 
            inputJaula !== "", 
            inputOperador !== "", 
            inputCliente !== "", 
            inputDestino !== "", 
            inputHrSalida !== "", 
            inputHrLlegada !== "", 
            inputTmpRecorrido !== "", 
            inputHrInicio !== "",
        
            inputKgSalida !== "", 
            inputKgDesembarque !== "", 
            inputRango !== "", 
            inputMuertos !== "", 
            inputParada !== "", 
            inputAuditor !== "", 
            inputIncidencias !== "", 
            inputRevision !== "", 
            inputFinalDesembarque !== "", 
            inputMerma !== "", 
            inputCtCerdos !== ""
        
          ) {
            const newTranspot = {
            fecha: inputFecha ,
            granja: inputGranja ,
            camion: inputCamion ,
            jaula: inputJaula ,
            operador: inputOperador ,
            cliente: inputCliente ,
            destino: inputDestino ,
            salida: inputHrSalida ,
            hrLlegada: inputHrLlegada ,
            tmpRecorrido: inputTmpRecorrido ,
            hrInicio:inputHrInicio,
        
            kgSalida: inputKgSalida ,
            kgDesembarque: inputKgDesembarque ,
            rango: inputRango ,
            muertos: inputMuertos ,
            parada:inputParada ,
            auditor:inputAuditor ,
            incidencias:inputIncidencias ,
            revision:inputRevision ,
            hrFinal: inputFinalDesembarque ,
            merma: inputMerma ,
            ctCerdos: inputCtCerdos ,
            };


            const axios = require("axios");
            const apiUrl = "./api/transporte/registroTransporte";
            axios.post(apiUrl, newTranspot)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });




            const newData = [...data, newTranspot];
            setData(newData);
            setInputFecha("")
            setInputGranja("")
            setInputCamion("")
            setInputJaula("")
            setInputOperador("")
            setInputCliente("")
            setInputDestino("")
            setInputHrSalida("")
            setInputHrLlegada("")
            setInputTmpRecorrido("")
            setInputHrInicio ("")
            setInputKgSalida("")
            setInputKgDesembarque("")
            setInputRango("")
            setInputMuertos("")
            setInputParada("")
            setInputAuditor("")
            setInputIncidencias("")
            setInputRevision("")
            setInputFinalDesembarque("")
            setInputMerma("")
            setInputCtCerdos("")
            setSuccessMessage("Transporte guardado exitosamente");
            setErrorMessage("");
          } else {
            setErrorMessage("Por favor completa los cambios");
            setSuccessMessage("");
          }
        } catch (error) {
          setErrorMessage("Hubo un error al guardar el transporte");
          setSuccessMessage("");
        }
      };
    return (
        <>
        <div className="flex justify-between modal-header">
            <div>
                <h1 className="modal-title">Agregar Datos</h1>
            </div>
            <div>
                <button onClick={()=>{closeModal(), setErrorMessage(""), setSuccessMessage("")}}>
                    <img src="images/svg/x.svg" height={15} width={15} />
                </button>
            </div>
        </div>
        {successMessage && <div className="alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert-error">{errorMessage}</div>}
        <form className="form-container pt-10">
            <div className="modal-cel pt-10">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="fecha" className="modal-label">Fecha:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="date" id="fecha" name="fecha" className="modal-input" value={inputFecha} onChange={(event) => setInputFecha(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="granja" className="modal-label">Granja:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="granja" name="granja" className="modal-input" value={inputGranja} onChange={(event) => setInputGranja(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div >
                        <label htmlFor="camion" className="modal-label">Camión:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="camion" name="camion" className="modal-input" value={inputCamion} onChange={(event) => setInputCamion(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="jaula" className="modal-label">Jaula:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="jaula" name="jaula" className="modal-input" value={inputJaula} onChange={(event) => setInputJaula(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="operador" className="modal-label">Operador:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="operador" name="operador" className="modal-input" value={inputOperador} onChange={(event) => setInputOperador(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="cliente" className="modal-label">Cliente:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="cliente" name="cliente" className="modal-input" value={inputCliente} onChange={(event) => setInputCliente(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="destino" className="modal-label">Destino:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="destino" name="destino" className="modal-input" value={inputDestino} onChange={(event) => setInputDestino(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="hora-salida" className="modal-label">Hora salida de granja:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="time" id="hora-salida" name="hora-salida" className="modal-input" value={inputHrSalida} onChange={(event) => setInputHrSalida(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="hora-llegada" className="modal-label">Hora de llegada:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="time" id="hora-llegada" name="hora-llegada" className="modal-input" value={inputHrLlegada} onChange={(event) => setInputHrLlegada(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="tiempo-recorrido" className="modal-label">Tiempo recorrido granja destino:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="tiempo-recorrido" name="tiempo-recorrido" className="modal-input" value={inputTmpRecorrido} onChange={(event) => setInputTmpRecorrido(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="hora-inicio-desembarque" className="modal-label">Hora inicio desembarque:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="time" id="hora-inicio-desembarque" name="hora-inicio-desembarque" className="modal-input" value={inputHrInicio} onChange={(event) => setInputHrInicio(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="hora-final-desembarque" className="modal-label">Hora final desembarque:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="hora-final-desembarque" name="hora-final-desembarque" className="modal-input" value={inputFinalDesembarque} onChange={(event) => setInputFinalDesembarque(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="kg-salida" className="modal-label">KG a salida de granja:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="kg-salida" name="kg-salida" className="modal-input" value={inputKgSalida} onChange={(event) => setInputKgSalida(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="kg-desembarque" className="modal-label">KG al desembarque:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="kg-desembarque" name="kg-desembarque" className="modal-input" value={inputKgDesembarque} onChange={(event) => setInputKgDesembarque(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="merma" className="modal-label">Merma:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="merma" name="merma" className="modal-input" value={inputMerma} onChange={(event) => setInputMerma(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="cantidad-cerdos" className="modal-label">Cantidad de cerdos:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="cantidad-cerdos" name="cantidad-cerdos" className="modal-input" value={inputCtCerdos} onChange={(event) => setInputCtCerdos(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="rango" className="modal-label">Rango programado:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="rango" name="rango" className="modal-input" value={inputRango} onChange={(event) => setInputRango(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="muertos" className="modal-label">Muertos en viaje:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="muertos" name="muertos" className="modal-input" value={inputMuertos} onChange={(event) => setInputMuertos(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="paradas" className="modal-label">Paradas en viaje:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="paradas" name="paradas" className="modal-input" value={inputParada} onChange={(event) => setInputParada(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="revision" className="modal-label">Revisión de cerdo:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="revision" name="revision" className="modal-input" value={inputRevision} onChange={(event) => setInputRevision(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="auditor" className="modal-label">Auditor:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="auditor" name="auditor" className="modal-input" value={inputAuditor} onChange={(event) => setInputAuditor(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="incidencias" className="modal-label">Incidencias de viaje:</label>
                    </div>
                    <div className="modal-input-container">
                        <input type="text" id="incidencias" name="incidencias" className="modal-input" value={inputIncidencias} onChange={(event) => setInputIncidencias(event.target.value)} required/>
                    </div>
                </div>

            </div>
            <div className="flex justify-center">
                <div>
                    <button id="ButtonG" className="button primary" onClick={()=> addTransport()}>Guardar</button>
                </div>
            </div>
        </form>
        </>
    )
}
export default TranspForm;