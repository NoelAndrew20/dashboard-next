import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const TablePProducts = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState([ 
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
        { ID: "lorem",sku: "1",descripcion: "lorem ipsum",unidad: "139001",precio: "lorem ipsum"},
    ]);
  return (
    <>
      <div className={isDarkMode ? "table-d" : "table"}>
          <table className={isDarkMode ? "table-container-d" : "table-container"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Descripción</th>
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
                <td>{item.sku}</td>
                <td>{item.descripcion}</td>
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
