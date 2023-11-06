import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableGestacion5 from '@/components/molecules/TableGestacion5';
const axios = require('axios');

const Gestacion5 = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState([ 
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001"},
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
                <NavDashboard section="Gestación 5"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Elementos existentes</h2>
                <div className="mt-10">
                    <TableGestacion5 data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Gestacion5;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Gestacion5";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };