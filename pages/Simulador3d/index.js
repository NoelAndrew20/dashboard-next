// pages/index.js
import React, { useState } from 'react'
import InteractiveModel from '../../components/molecules/Simulador3D'
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
    <div style={{
      backgroundColor: '#000000'
      }} >
      <Navigation/>
      <div style={{
      backgroundColor: '#000000'
      }} >
          <InteractiveModel/>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }} >
        <div id="informacionFigura" style={{
        position: 'fixed',
        right: 0,
        height: '49%',
        width: '25%', 
        backgroundColor: '#333', 
        color: '#fff', 
        padding: '20px', 
        overflow: 'auto' 
      }} ></div>
      <div id="graficapermanente" style={{
        top: '55%',
        position: 'fixed',
        right: 0,
        height: '42%',
        width: '25%', 
        backgroundColor: '#333', 
        color: '#fff', 
        padding: '20px', 
        overflow: 'auto' 
      }} >
      </div>
      </div>
    </div>
  )
}

<<<<<<< HEAD
export default IndexPage
=======
export default IndexPage
>>>>>>> 4f43e64 (Merge pull request #147 from NoelAndrew20/hotfix/search-patch)
