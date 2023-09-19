import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Table from '@/components/molecules/Table';
import Modal from '@/components/atoms/Modal';
import UserForm from '@/components/atoms/UserForm';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableSolicitud from '@/components/molecules/TableSolicitud';
import SolicitudForm from '@/components/atoms/SolicitudForm';

const axios = require('axios');

const SolicitudCompra = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem3', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem3', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},  {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem3', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},  {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem3', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},  {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'lorem3', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
        {usuario: 'hola', password: 'lorem', email: 'lorem', nombre: 'lorem', apellido: 'lorem', fechaNacimiento: 'lorem', genero: 'lorem', puesto: 'lorem', salario: 'lorem', horario: 'lorem', fechaContratacion: 'lorem', departamento: 'lorem', statu: 'lorem', contacto: 'lorem', grupo: 'lorem', calle: 'lorem', ciudad: 'lorem', estado: 'lorem', cp: 'lorem', id: 'lorem', nombreGrupo: 'lorem'},
    ])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get('http://192.168.100.20:3020/getAllUsuario')
        .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setData(jsonData.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Solicitud de compra"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Solicitudes existentes</h2>
                {/*<Search data={data} setData={setData} word={"usuario"} />*/}
                <div className="mt-10">
                    <TableSolicitud data={data} setData={setData}/>
                </div>
                <div className="mt-10 flex justify-end">
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <SolicitudForm 
                        data={data} 
                        setData={setData} 
                        closeModal={closeModal}/>
                    </Modal>
                    <button className="button" onClick={openModal}>Agregar solicitud</button>
            </div>
            </div>
        </div>
    )
}
export default SolicitudCompra;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Solicitud de compra";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };