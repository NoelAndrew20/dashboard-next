import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import ProveedorForm from '@/components/molecules/ProveedorForm';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import ComprasForm from '@/components/atoms/ComprasForm';
const Compras = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return(
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
        <StaticMeta
            title={title}
            description={description}
            image={image}
        />     
        <div>
            <Navigation/>
            <NavDashboard section="Compras"/>
        </div>
        <div className="wrapper">
          <div className="mt-3">
            <ComprasForm/>
          </div>
        </div>
    </div>
    )
}
export default Compras;

export const getServerSideProps = async () => {
const title = "Constanza";
const description =
  "Dashboard de Compras";
const image = "images/icon/logo-400.png";
return {
  props: {
    title,
    description,
    image,
  },
};
};