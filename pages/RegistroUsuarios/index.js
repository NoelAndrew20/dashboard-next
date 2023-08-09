import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Table from '@/components/molecules/Table';
import Modal from '@/components/atoms/Modal';
import { useState } from 'react';
import UserForm from '@/components/atoms/UserForm';
import Search from '@/components/atoms/Search';
const RegistroUsuarios = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem3', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},

    ])
    const filteredData = data.map(item => ({
        usuario: item.usuario,
        nombre: item.nombre,
        apellido: item.apellido,
        puesto: item.puesto,
        grupo: item.grupo
    }));
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
                <Search data={data} setData={setData} />
                <div className="mt-10">
                    <Table data={filteredData}/>
                </div>
                <div className="mt-10 flex justify-end">
                    <button className="button" onClick={openModal}>Agregar usuario</button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <UserForm 
                        data={data} 
                        setData={setData} 
                        closeModal={closeModal}/>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default RegistroUsuarios;