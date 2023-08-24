import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import { useState } from 'react';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableAduana from '@/components/molecules/TableAduana';
const Aduana = ({ title, description, image }) => {
    const [data, setData] = useState([
        { fecha: { $date: "2023-08-22T16:03:12.135Z" }, unixTime: 1692741792, config: {sensor: "120398", puerta: "1", nave: "Desarrollo", granja: "granajPrueba", zona: "Maternidad" }, rfid: "71D1433F", },
        { fecha: { $date: "2023-08-22T16:03:12.135Z" }, unixTime: 1692741792, config: {sensor: "120398", puerta: "1", nave: "Desarrollo", granja: "granajPrueba", zona: "Maternidad" }, rfid: "71D1433F", },
        { fecha: { $date: "2023-08-22T16:03:12.135Z" }, unixTime: 1692741792, config: {sensor: "120398", puerta: "1", nave: "Desarrollo", granja: "granajPrueba", zona: "Maternidad" }, rfid: "71D1433F", },
    ])

    return (
        <div>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Aduana" id="aduana"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Elementos existentes</h2>
                <Search data={data} setData={setData} word={"RFID"} />
                <div className="mt-10">
                    <TableAduana data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Aduana;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Aduana";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };