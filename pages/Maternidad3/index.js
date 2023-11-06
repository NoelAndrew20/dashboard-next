import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableMaternidad3 from '@/components/molecules/TableMaternidad3';
const axios = require('axios');

const Maternidad3 = ({ title, description, image }) => {
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
                <NavDashboard section="Maternidad 3"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Elementos existentes</h2>
                <div className="mt-10">
                    <TableMaternidad3 data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Maternidad3;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Maternidad3";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };