import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
const axios = require('axios');

const TablePProducts = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();
    const [ data, setData ] = useState([]);
    const [newPswd, setNewPswd] = useState(data.password);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    let email = "";
    if (token) {
        const decodedToken = jwt.decode(token);
        email = decodedToken.email;
    } 
    else {
        console.error("No se encontró el token en localStorage.");
    }
  
    useEffect(() => {
        axios.get('http://192.168.100.10:3070/getProducto', {
            params: {
                email: email
            }
        })
        .then(response => {
        const jsonData = response.data; // Datos de respuesta en formato JSON
        console.log(jsonData);
    
        // Asegúrate de que data sea un arreglo
        setData(jsonData);
        })
        .catch(error => {
        console.error(error);
        });
    }, []);
    //const [data, setData] = useState([ 
       /* { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},*/
    //]);

    /*useEffect(() => {
      axios.get('http://192.168.100.10:3070/getAllMedicamento')
      .then(response => {
          const jsonData = response.data; // Datos de respuesta en formato JSON
          setData(jsonData.data);
      })
      .catch(error => {
          console.error(error);
      });
  }, [])*/

  return (
    <>
      <div className={isDarkMode ? "table-d" : "table"}>
          <table className={isDarkMode ? "table-container-d" : "table-container"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Unidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
              key={index}
              className="table-row">  
                <td>{item.ID}</td>
                <td>{item.SKU}</td>
                <td>{item.nombre}</td>
                <td>{item.unidad}</td>
                <td>{item.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TablePProducts;
