// DatosContext.js
import React, { createContext, useContext, useState } from 'react';

const DatosContext = createContext();

export const DatosProvider = ({ children }) => {
  const [datosApi, setDatosApi] = useState(null);

  const actualizarDatosApi = (datos) => {
    setDatosApi(datos);
  };

  return (
    <DatosContext.Provider value={{ datosApi, actualizarDatosApi }}>
      {children}
    </DatosContext.Provider>
  );
};

export const useDatosContext = () => {
  return useContext(DatosContext);
};
