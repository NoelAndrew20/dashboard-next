
import Navigation from '@/components/molecules/Navigation'
import PieChart from '@/components/atoms/PieChart'
import BarChart from '@/components/atoms/BarChart'
import StaticMeta from '@/components/atoms/StaticMeta'
import TableIndex from '@/components/atoms/TableIndex'
import TableIndex1 from '@/components/atoms/TableIndexVacuna'
import jsonData from '../public/api/pronostico/python/output.json'
import jsonData1 from '../public/api/pronostico/python/config.json'
import { useState } from 'react'
import TableIndexZona from '@/components/atoms/TableIndexZona'
export default function Home({ title, description, image }) {


    return (
      <div>
        <StaticMeta
          title={title}
          description={description}
          image={image}
        />      
        <Navigation/>
        <div className="bienvenida">
          <h1>Bienvenido a Constanza</h1>
        </div>
        <main
          className={`flex min-h-screen flex-col items-center p-24`}
        >
          <div className="row-container mt-10">
            <div>
              <h1>Costo total</h1>
              <h2>${jsonData.ganancias.ganancia}</h2>
              <p>Periodo de {jsonData1.config.fecha_inicial} a {jsonData1.config.fecha_final}</p>
            </div>
          </div>
          <div className="row-container mt-10">
          <div>
              <h1>Costo total de Alimento</h1>
              <h2>${jsonData.ganancias.kg.vientre+jsonData.ganancias.kg.lechon+jsonData.ganancias.kg.sementalCIA+jsonData.ganancias.kg.sementalG}</h2>
              <p>Periodo de {jsonData1.config.fecha_inicial} a {jsonData1.config.fecha_final}</p>
            </div>
            <div className="grid items-center">
              <TableIndex/>
            </div>
          </div>
          <div className="row-container mt-10 h-150 w-full flex justify-center">
            <TableIndexZona/>
            <div className='flex'>
              <PieChart/>
            </div>
          </div>
          <div className="row-container mt-10 h-80 w-full flex justify-center">
            <BarChart/>
          </div>
        <div className="row-container mt-10">
          <div>
              <h1>Costo total de Vacunas</h1>
              <h2>${jsonData.vacunas.costo_total_V.Vientre}</h2>
              <p>Periodo de {jsonData1.config.fecha_inicial} a {jsonData1.config.fecha_final}</p>
            </div>
            <div className="grid items-center">
              
            </div>
          </div>
          <div className="row-container mt-10 h-150 w-full flex justify-center">
              <TableIndex1/>
            <div className='flex'>
              <PieChart/>
            </div>
          </div>
          <div className="row-container mt-10 h-80 w-full flex justify-center">
            <BarChart/>
          </div>  
        </main>
      </div>

    )
  }


export const getServerSideProps = async () => {
  const title = "Constanza";
  const description =
    "Dashboard de Constanza";
  const image = "images/icon/logo-400.png";
  return {
    props: {
      title,
      description,
      image,
    },
  };
};