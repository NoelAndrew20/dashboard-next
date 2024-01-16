import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableInventario from '@/components/molecules/TableInventario';
import GraphInventario from '@/components/atoms/GraphInventario';
import svg from '@/public/images/icon/insumos-index.png';

const axios = require('axios');

const Inventario = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState( 
        [
            {
              _id: "CerdoEngordaD",
              count: 11455
            },
            {
              _id: "CerdoEngordaA",
              count: 11465
            },
            {
              _id: "CerdoEngordaC",
              count: 11498
            },
            {
              _id: "CerdoEngordaB",
              count: 11450
            },
            {
              _id: "DesarrrolloB",
              count: 11450
            },
            {
              _id: "CIA",
              count: 936
            },
            {
              _id: "Transporte",
              count: 234
            },
            {
              _id: "Maternidad1",
              count: 130
            },
            {
              _id: "DesarrrolloA",
              count: 11500
            },
            {
              _id: "Gestacion1",
              count: 520
            },
            {
              _id: "Cuarentena",
              count: 468
            },
            {
              _id: "Lechon",
              count: 11432
            },
            {
              _id: "Gestacion2",
              count: 520
            }
          ])

    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Total de inventario" svg={svg}/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Inventario existente</h2>
                <div className="position justify-around">
                <div className="half-graph bg-white rounded-lg p-2">
                    <GraphInventario data={data} setData={setData}/>
                </div>
                <div>
                    <TableInventario data={data} setData={setData}/>
                </div>
                </div>
                
            </div>
        </div>
    )
}
export default Inventario;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Inventario";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };