import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import { useState } from 'react';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableAlertas from '@/components/molecules/TableAlertas';
const Alertas = ({ title, description, image }) => {
    const [data, setData] = useState([
        { Fecha:"2023-08-85", Hora: "14:02", Tipo: "cerdo araña", Imagen: "/images/puerco_araña.jpg" }, 
        { Fecha:"2023-08-85", Hora: "14:02", Tipo: "cerdo araña", Imagen: "/images/puerco_araña.jpg" }, 
        { Fecha:"2023-08-85", Hora: "14:02", Tipo: "cerdo araña", Imagen: "/images/puerco_araña.jpg" }, 
        { Fecha:"2023-08-85", Hora: "14:02", Tipo: "cerdo araña", Imagen: "/images/puerco_araña.jpg" }, 
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
                <NavDashboard section="Alertas" id="alertas"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Elementos existentes</h2>
                <Search data={data} setData={setData} />
                <div className="mt-10">
                    <TableAlertas data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Alertas;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Alertas";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };