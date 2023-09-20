import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const UserForm = ({ data, setData, closeModal }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [inputUser, setInputUser] = useState("");
    const [inputPsw, setInputPsw] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputLastName, setInputLastName] = useState("");
    const [inputBirth, setInputBirth] = useState("");
    const [inputGenre, setInputGenre] = useState("");
    const [inputSchedule, setInputSchedule] = useState("");
    const [inputHireDate, setInputHireDate] = useState("");
    const [inputDepartment, setInputDepartment] = useState("");
    const [inputStatus, setInputStatus] = useState("");
    const [inputContact, setInputContact] = useState("");
    const [inputSalary, setInputSalary] = useState("");
    const [inputPosition, setInputPosition] = useState("");
    const [inputGroup, setInputGroup] = useState("");
    const [inputStreet, setInputStreet] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [inputState, setInputState] = useState("");
    const [inputCp, setInputCp] = useState("");
    const [inputIDGroup, setInputIDGroup] = useState("");
    const [inputGroupName, setInputGroupName] = useState("");
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
             inputBirth !== "", 
             inputGenre !== "", 
             inputSchedule !== "", 
             inputHireDate !== "", 
             inputDepartment !== "",
             inputStatus !== "",
             inputContact !== "", 
             inputSalary !== "",
             inputPosition !== "", 
             inputGroup !== "", 
             inputStreet !== "",
             inputCity !== "", 
             inputState !== "",
             inputCp !== "", 
             inputIDGroup !== "", 
             inputGroupName !== ""
          ) {
            const newPerson = {
                usuario: inputUser,
                nombre: inputName,
                apellido: inputLastName,
                puesto: inputPosition,
                grupo: inputGroup,
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
                puesto: inputPosition, 
                grupo: inputGroup, 
                calle: inputStreet,
                ciudad: inputCity, 
                estado: inputState,
                cp: inputCp, 
                id: inputIDGroup, 
                nombreGrupo: inputGroupName, 
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
            setInputBirth("");
            setInputGenre("");
            setInputSchedule("");
            setInputHireDate("");
            setInputDepartment("");
            setInputStatus("");
            setInputContact("");
            setInputSalary("");
            setInputPosition("");
            setInputGroup("");
            setInputStreet("");
            setInputCity("");
            setInputState("");
            setInputCp("");
            setInputIDGroup("");
            setInputGroupName("");
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
                    <div>
                        <label htmlFor="password" className="modal-label">Password:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="password" id="password" name="password" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputPsw} onChange={(event) => setInputPsw(event.target.value)} required/>
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
                        <label htmlFor="apellido" className="modal-label">Apellido:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="apellido" name="apellido" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputLastName} onChange={(event) => setInputLastName(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="fechaNacimiento" className="modal-label">Fecha de Nacimiento:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="date" id="fechaNacimiento" name="fechaNacimiento" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputBirth} onChange={(event) => setInputBirth(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="genero" className="modal-label">Género:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select id="genero" name="genero" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputGenre} onChange={(event) => setInputGenre(event.target.value)} required>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="puesto" className="modal-label">Puesto:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="puesto" name="puesto" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputPosition} onChange={(event) => setInputPosition(event.target.value)} required/>
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
                        <input type="text" id="fecha-contratacion" name="fecha-contratacion" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputHireDate} onChange={(event) => setInputHireDate(event.target.value)} required/>
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
                        <label htmlFor="statu" className="modal-label">Status:</label>
                    </div>
                        
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <select  className={isDarkMode ? "modal-input-d" : "modal-input"} id="statu" name="statu" value={inputStatus} onChange={(event) => setInputStatus(event.target.value)} required>
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
                        <label htmlFor="grupo" className="modal-label">Grupo:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="grupo" name="grupo" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputGroup} onChange={(event) => setInputGroup(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="calle" className="modal-label">Calle:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="calle" name="calle" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputStreet} onChange={(event) => setInputStreet(event.target.value)} required/>
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
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="estado" className="modal-label">Estado:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="estado" name="estado" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputState} onChange={(event) => setInputState(event.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="modal-cel">
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
                        <label htmlFor="IDG" className="modal-label">ID del grupo:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="IDG" name="IDG" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputIDGroup} onChange={(event) => setInputIDGroup(event.target.value)} required/>
                    </div>
                </div>
                <div className="modal-item w-1/3">
                    <div>
                        <label htmlFor="nombreGrupo" className="modal-label">Nombre del Grupo:</label>
                    </div>
                    <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                        <input type="text" id="nombreGrupo" name="nombreGrupo" className={isDarkMode ? "modal-input-d" : "modal-input"} value={inputGroupName} onChange={(event) => setInputGroupName(event.target.value)} required/>
                    </div>
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