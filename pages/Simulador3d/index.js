// pages/index.js
import React, { useState } from 'react'
import InteractiveModel from '../../components/molecules/Simulador3D/index.js'
import Navigation from '@/components/molecules/Navigation';

const IndexPage = () => {
  // Estado para almacenar los datos del archivo JSON
  const [jsonData, setJsonData] = useState(null)

  // Función para cargar y mostrar datos desde el JSON
  const showDataForModel = (modelId) => {
    fetch(`/data.json`)
      .then((response) => response.json())
      .then((data) => {
        const modelData = data[modelId]
        setJsonData(modelData)
      })
  }
  

  return (
    <div>
      <Navigation/>
      <main>
      <div>
        <div className='bg-white'>
            <div className='h-1/2'>
              <InteractiveModel/>
            </div>
          </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }} >
        
      <div id="informacionFigura" className="fixed top-1/2 right-0 h-1/2 w-1/4 bg-gray-800 text-white p-5 overflow-auto">
      </div>
      </div>
      </main>
    </div>
  )
}

export default IndexPage
