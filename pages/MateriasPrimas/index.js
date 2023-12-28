import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableMaterias from '@/components/molecules/TableMaterias';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
const axios = require('axios');

const Medicamento = ({ title, description, image }) => {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState([
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
    ]);
    const [tokenVerified, setTokenVerified] = useState(false);
  
    useEffect(() => {
        const checkToken = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              router.push('/Login');
              return;
            }
    
            const decodedToken = jwt.decode(token);
            // Haz algo con las variables del token si es necesario
	    
	    const granja = decodedToken.granja;
            const usuario = decodedToken.usuario;
            const nombre = decodedToken.nombre;
            const apellidop = decodedToken.apellidop;
            const apellidom = decodedToken.apellidom;
            const proveedor = decodedToken.proveedor;

            // Hacer algo con estas variables
            console.log("Granja:", granja);
            console.log("Usuario:", usuario);
            console.log("Nombre:", nombre);
            console.log("Apellido Paterno:", apellidop);
            console.log("Apellido Materno:", apellidom);
            console.log("Proveedor:", proveedor);
    
    
            // Marcar la verificación del token como completada
            setTokenVerified(true);
          } catch (error) {
            console.error('Error al verificar el token:', error);
            // Marcar la verificación del token como completada incluso si hay un error
            setTokenVerified(true);
          }
        };
    
        checkToken();
      }, [router]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3040/getAllMateriaPrima');
            const jsonData = response.data;
            setData(jsonData.data);
          } catch (error) {
            console.error('Error al obtener datos:', error);
          }
        };
    
        // Solo hacer la llamada a la API si el token ha sido verificado
        if (tokenVerified) {
          fetchData();
        }
      }, [tokenVerified]);
    
      if (!tokenVerified) {
        // Puedes mostrar un indicador de carga aquí si lo deseas
        return null;
      }

      return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Materias Primas"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Materias primas existentes</h2>
                {/*<Search data={data} setData={setData} word={"item"}/>*/}
                <div className="mt-10">
                    <TableMaterias data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}

export default Medicamento;

export const getServerSideProps = async () => {
  const title = "Constanza";
  const description = 
  "Dashboard de Medicamentos";
  const image = "images/icon/logo-400.png";
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
