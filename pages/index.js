import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navigation from '@/components/molecules/Navigation'
import Table from '@/components/molecules/Table'
import PieChart from '@/components/atoms/PieChart'
import BarChart from '@/components/atoms/BarChart'

export default function Home() {
  return (
    <div>
      <Navigation/>
      <main
        className={`flex min-h-screen flex-col items-center p-24`}
      >
        <div className="row-container">
          <div>
            <Table/>
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
            <Table/>
          </div>
        </div>
        <div className="h-80 w-full flex justify-center">
          <BarChart/>
        </div>
      </main>
    </div>

  )
}
