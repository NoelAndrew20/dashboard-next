import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import Table from '@/components/molecules/Table';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import Modal from '@/components/atoms/Modal';
import AlimentosForm from '@/components/atoms/AlimentosForm';
import TableAlimentos from '@/components/molecules/TableAlimentos';
import svg from '@/public/images/svg/food.png';
const axios = require('axios');

const RegistroAlimentos = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get('http://192.168.100.10:3080/getAllSolicitudAlimento')
      .then((response) => {
        const jsonData = response.data;
        setData(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <div>
        <Navigation />
        <NavDashboard section="Alimentos registrados" id={"menu-bg"} svg={svg} />
      </div>
      <div className="wrapper">
        <h2 className="text-xl mt-5 mb-5">Alimentos existentes</h2>
        <div className="mt-10">
          <TableAlimentos data={data} setData={setData} />
        </div>
        <div className="mt-10 flex justify-end">
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <AlimentosForm
              data={data}
              setData={setData}
              closeModal={closeModal}
            />
          </Modal>
          <button className="button" onClick={openModal}>
            Agregar Alimento
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegistroAlimentos;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de Alimentos';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
