import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Table from '@/components/molecules/Table';
import Modal from '@/components/atoms/Modal';
import { useState, useEffect } from 'react';
import TranspForm from '@/components/atoms/TranspForm';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';

//import axios from 'axios';
const axios = require('axios');
//import { postHandler, getHandler } from 'pages/api/transporte/registroTransporte';

const RegistroTransporte = ({ title, description, image }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState([
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "lorem", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "hola", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},
        {fecha: "lorem2", granja: "lorem2", camion: "hola", jaula: "lorem2", operador: "lorem2", cliente: "lorem2", destino: "lorem2", salida: "lorem2", hrLlegada: "lorem2", tmpRecorrido: "lorem2", hrInicio: "lorem2", hrFinal: "lorem2", kgSalida: "lorem2", kgDesembarque: "lorem2", hrDesembarque: "lorem2", merma: "lorem2", ctCerdos: "lorem2", auditor: "lorem", incidencias:"lorem", revision:"lorem"},

    ])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    /*const obtenerValoresTransporte = async() => {
        axios.get('./api/transporte/registroTransporte')
          .then(response => {
            console.log(response.data);
            //setTransportes(response.data);
          })
          .catch(error => {
            console.error('Error en la petición:', error);
          });
      };*/

      
     /* const obtenerValoresTransporte = async () => {
        const apiUrl = './api/transporte/registroTransporte';
        try {
          const response = await axios.get(apiUrl);
          console.log(response.data);
          // setTransportes(response.data);
        } catch (error) {
          console.error('Error en la petición:', error);
        }
      };*/




     /* useEffect(() => {
        const obtenerValoresTransporte = async () => {
            try {
                const response = await axios.get('./api/transporte/registroTransporte');
                console.log(response.data);
                //setTransportes(response.data);
            } catch (error) {
                console.error('Error en la petición:', error);
            }
        };
        obtenerValoresTransporte(); // Llamar a la función dentro del useEffect
    }, []);*/



    /*useEffect(() => {
        axios.get('./api/transporte/registroTransporte')
        .then(response => {
            console.log(response.data); // Aquí puedes manejar los datos de respuesta
        })
        .catch(error => {
            console.error(error);
        });
    }, [])*/

    return (
        <div>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Transporte" id="transporte"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Transportes existentes</h2>
                <Search data={data} setData={setData} />
                <div className="mt-10">
                    <Table data={data}/>
                </div>
                <div className="mt-10 flex justify-end">
                    <button className="button" onClick={openModal}>Agregar transporte</button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <TranspForm
                        data={data} 
                        setData={setData} 
                        closeModal={closeModal}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default RegistroTransporte;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Transporte";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };