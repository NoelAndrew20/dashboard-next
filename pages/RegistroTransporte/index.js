import NavDashboard from "@/components/molecules/NavDashboard";
import Navigation from "@/components/molecules/Navigation";
import Table from "@/components/molecules/Table";
import Modal from "@/components/atoms/Modal";
import { useState } from "react";
const RegistroTransporte = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div>
                <Navigation/>
                <NavDashboard section="Usuarios"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Usuarios existentes</h2>
                <div className="flex justify-between">
                    <div className="flex inner-search">
                        <div className="">
                            <input type="text" placeholder="Buscar"/>
                        </div>
                        <div className="inner-search-icon">
                            <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 15.5L19 19" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <label>Show entries:</label>
                        <select className="entries-container">
                            <option value="volvo">10</option>
                            <option value="saab">Opcion 1</option>
                            <option value="mercedes">Opcion 2</option>
                            <option value="audi">Opcion 3</option>
                        </select>
                    </div>
                </div>
                <div className="mt-10">
                    <Table/>
                </div>
                <div className="mt-10 flex justify-end">
                    <button className="button" onClick={openModal}>Agregar usuario</button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <div className="flex justify-between modal-header">
                            <div>
                                <h1 className="modal-title pb-10">Agregar Datos</h1>
                            </div>
                            <div>
                                <button onClick={closeModal}>Cerrar Modal</button>
                            </div>
                        </div>
                        <form className="form-container">
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="username" className="modal-label">Username:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="username" name="username" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="password" className="modal-label">Password:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="password" id="password" name="password" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div >
                                        <label htmlFor="email" className="modal-label">Email:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="email" id="email" name="email" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="nombre" className="modal-label">Nombre:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="nombre" name="nombre" className="modal-input "required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="apellido" className="modal-label">Apellido:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="apellido" name="apellido" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="fechaNacimiento" className="modal-label">Fecha de Nacimiento:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="genero" className="modal-label">Género:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <select id="genero" name="genero" className="modal-input" required>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="puesto" className="modal-label">Puesto:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="puesto" name="puesto" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="calle" className="modal-label">Calle:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="calle" name="calle" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-cel">
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="ciudad" className="modal-label">Ciudad:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="ciudad" name="ciudad" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="estado" className="modal-label">Estado:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="estado" name="estado" className="modal-input" required/>
                                    </div>
                                </div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="codigoPostal" className="modal-label">Código Postal:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="codigoPostal" name="codigoPostal" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="modal-item w-1/3">
                                    <div>
                                        <label htmlFor="nombreGrupo" className="modal-label">Nombre del Grupo:</label>
                                    </div>
                                    <div className="modal-input-container">
                                        <input type="text" id="nombreGrupo" name="nombreGrupo" className="modal-input" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div>
                                    <button id="ButtonG" className="button primary" onClick="">Guardar</button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default RegistroTransporte;