import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navigation from '@/components/molecules/Navigation'
import Table from '@/components/molecules/Table'
import PieChart from '@/components/atoms/PieChart'
import BarChart from '@/components/atoms/BarChart'
import StaticMeta from '@/components/atoms/StaticMeta'
import TableIndex from '@/components/atoms/TableIndex'
import { useState } from 'react'
export default function Home({ title, description, image }) {
  return (
    <div>
      <StaticMeta
        title={title}
        description={description}
        image={image}
      />      
      <Navigation/>
      <main
        className={`flex min-h-screen flex-col items-center p-24`}
      >
        <div className="row-container">
          <div>
            <TableIndex/>
          </div>
          <div>
            <PieChart/>
          </div>
        </div>
        <div className="row-container">
          <div>
            <h1>Costo tota de medicamentos / vacunas</h1>
            <h2>$12000</h2>
            <p>Periodo de 2023-04-24 a 2023-3-32</p>
          </div>
          <div>
            <TableIndex/>
          </div>
        </div>
        <div className="h-80 w-full flex justify-center">
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