import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableMaterias from '@/components/molecules/TableMaterias';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
const axios = require('axios');

const Medicamento = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState([ 
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
    ])

    useEffect(() => {
        axios.get('http://192.168.100.20:3040/getAllMateriaPrima')
        .then(response => {
            const jsonData = response.data; // Datos de respuesta en formato JSON
            setData(jsonData.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

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