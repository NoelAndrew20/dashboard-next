import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const UserForm = ({ data, setData, closeModal }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [inputUser, setInputUser] = useState("");
    const [inputPsw, setInputPsw] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputLastName, setInputLastName] = useState("");
    const [inputLastNamedos, setInputLastNamedos] = useState("");
    const [inputBirth, setInputBirth] = useState("");
    const [inputGenre, setInputGenre] = useState("");
    const [inputSchedule, setInputSchedule] = useState("");
    const [inputHireDate, setInputHireDate] = useState("");
    const [inputDepartment, setInputDepartment] = useState("");
    const [inputStatus, setInputStatus] = useState("");
    const [inputContact, setInputContact] = useState("");
    const [inputSalary, setInputSalary] = useState("");
    const [inputGranja, setInputGranja] = useState("");
    const [inputResponsabilidad, setInputResponsabilidad] = useState("");
    const [inputArea, setInputArea] = useState("");
    const [inputStreet, setInputStreet] = useState("");
    const [inputNumeroI, setInputNumeroI] = useState("");
    const [inputNumeroE, setInputNumeroE] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [inputState, setInputState] = useState("");
    const [inputCp, setInputCp] = useState("");
    const [inputTarea, setInputTarea] = useState("");
    const [inputEPP, setInputEPP] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const addPerson = async () => {
        try {
          if (
             inputUser !== "", 
             inputPsw !== "",
             inputEmail !== "", 
             inputName !== "", 
             inputLastName !== "",
             inputLastNamedos !== "",  
             inputResponsabilidad !== "", 
             inputGranja !== "",
             inputBirth !== "", 
             inputGenre !== "", 
             inputSchedule !== "", 
             inputHireDate !== "", 
             inputDepartment !== "",
             inputStatus !== "",
             inputContact !== "", 
             inputSalary !== "",
             inputArea !== "", 
             inputStreet !== "",
             inputNumeroI !== "",
             inputNumeroE !== "",
             inputCity !== "", 
             inputState !== "",
             inputCp !== "", 
             inputTarea !== "", 
             inputEPP !== ""
          ) {
            const newPerson = {
                usuario: inputUser,
                nombre: inputName,
                apellidop: inputLastName,
                apellidom: inputLastNamedos,
                granja: inputGranja,
                responsabilidad: inputResponsabilidad,
                area: inputArea,
                password: inputPsw,
                email: inputEmail, 
                fechaNacimiento: inputBirth, 
                genero: inputGenre, 
                horario: inputSchedule, 
                fechaContratacion: inputHireDate, 
                departamento: inputDepartment,
                status: inputStatus,
                contacto: inputContact, 
                salario: inputSalary,
                calle: inputStreet,
                numeroI: inputNumeroI,
                numeroE: inputNumeroE,
                ciudad: inputCity, 
                estado: inputState,
                cp: inputCp, 
                tarea: inputTarea, 
                epp: inputEPP, 
            };

            const axios = require("axios");
            //axios.get('http://localhost:3010/getAllTransporte')
            //const apiUrl = "../api/transporte/registroTransporte";
            const apiUrl = 'http://192.168.100.10:3020/addUsuario';
            //const apiUrl = 'http://localhost:3020/addUsuario';
            axios.post(apiUrl, newPerson)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });

            const newData = [...data, newPerson];
            setData(newData);
            setInputUser("");
            setInputPsw("");
            setInputEmail("");
            setInputName("");
            setInputLastName("");
            setInputLastNamedos("");
            setInputBirth("");
            setInputGenre("");
            setInputSchedule("");
            setInputHireDate("");
            setInputDepartment("");
            setInputStatus("");
            setInputContact("");
            setInputSalary("");
            setInputResponsabilidad("");
            setInputArea("");
            setInputGranja("");
            setInputStreet("");
            setInputNumeroI("");
            setInputNumeroE("");
            setInputCity("");
            setInputState("");
            setInputCp("");
            setInputTarea("");
            setInputEPP("");
            setSuccessMessage('Usuario guardado exitosamente');
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
    return(
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
                        <label htmlFor="username" className="modal-label">Username:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="username" name="username" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputUser} onChange={(event) => setInputUser(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div >
                        <label htmlFor="email" className="modal-label">Email:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="email" id="email" name="email" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputEmail} onChange={(event) => setInputEmail(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="password" className="modal-label">Password:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="password" id="password" name="password" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputPsw} onChange={(event) => setInputPsw(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="nombre" className="modal-label">Nombre:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="nombre" name="nombre" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputName} onChange={(event) => setInputName(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="apellidop" className="modal-label">Apellido Paterno:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="apellidop" name="apellidop" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputLastName} onChange={(event) => setInputLastName(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="apellidom" className="modal-label">Apellido Materno:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="apellidom" name="apellidom" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputLastNamedos} onChange={(event) => setInputLastNamedos(event.target.value)} required/>
                    </div>
                </div>
            
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="fechaNacimiento" className="modal-label">Fecha de Nacimiento:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="date" id="fechaNacimiento" name="fechaNacimiento" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputBirth} onChange={(event) => setInputBirth(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="genero" className="modal-label">Género:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select id="genero" name="genero" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputGenre} onChange={(event) => setInputGenre(event.target.value)} required>
                            <option value="">Selecciona...</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="modal-cel">

            <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="granja" className="modal-label">Granja:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="granja" name="granja" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputGranja} onChange={(event) => setInputGranja(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="responsabilidad" className="modal-label">Responsabilidad:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="responsabilidad" name="responsabilidad" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputResponsabilidad} onChange={(event) => setInputResponsabilidad(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="salario" className="modal-label">Salario Dario:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="salario" name="salario" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputSalary} onChange={(event) => setInputSalary(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="horario" className="modal-label">Horario:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="horario" name="horario" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputSchedule} onChange={(event) => setInputSchedule(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="fecha-contratacion" className="modal-label">Fecha de contratación:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="date" id="fecha-contratacion" name="fecha-contratacion" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputHireDate} onChange={(event) => setInputHireDate(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="departamento" className="modal-label">Departamento:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="departamento" name="departamento" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputDepartment} onChange={(event) => setInputDepartment(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="statu" className="modal-label">Estatus:</label>
                    </div>
                        
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="statu" name="statu" value={inputStatus} onChange={(event) => setInputStatus(event.target.value)} required>
                            <option value="">Selecciona...</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="contacto" className="modal-label">Contacto:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="contacto" name="contacto" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputContact} onChange={(event) => setInputContact(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="calle" className="modal-label">Calle:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="calle" name="calle" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputStreet} onChange={(event) => setInputStreet(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="numeroI" className="modal-label">Numero Interior:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="numeroI" name="numeroI" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputNumeroI} onChange={(event) => setInputNumeroI(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="numeroE" className="modal-label">Numero Exterior:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="numeroE" name="numeroE" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputNumeroE} onChange={(event) => setInputNumeroE(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="ciudad" className="modal-label">Ciudad:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="ciudad" name="ciudad" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputCity} onChange={(event) => setInputCity(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="estado" className="modal-label">Estado:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="estado" name="estado" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputState} onChange={(event) => setInputState(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="cp" className="modal-label">Código postal:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="cp" name="cp" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputCp} onChange={(event) => setInputCp(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="tarea" className="modal-label">Tarea:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="tarea" name="tarea" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputTarea} onChange={(event) => setInputTarea(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="epp" className="modal-label">Equipo de proteción personal:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="EPP" name="EPP" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputEPP} onChange={(event) => setInputEPP(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="area" className="modal-label">Área:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="area" name="area" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputArea} onChange={(event) => setInputArea(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                </div>
            </div>
            <div className="flex justify-center">
                <div>
                    <button id="ButtonG" className="button primary" onClick={()=> addPerson()}>Guardar</button>
                </div>
            </div>
        </form>
        </>
    )
}
export default UserForm;