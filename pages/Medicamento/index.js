import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableMedicamentos from '@/components/molecules/TableMedicamento';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
const axios = require('axios');

const Medicamento = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState([ 
        { AñoRecibo: "2022",MesRecibo: "1",Vendor_Packslip_ID: "F-15379201",Project_ID: "139001",Description: "Almacén de Medicamentos",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { AñoRecibo: "2022",MesRecibo: "1",Vendor_Packslip_ID: "F-15379201",Project_ID: "139001",Description: "Almacén de Medicamentos",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { AñoRecibo: "2022",MesRecibo: "1",Vendor_Packslip_ID: "F-15379201",Project_ID: "139001",Description: "Almacén de Medicamentos",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { AñoRecibo: "2022",MesRecibo: "1",Vendor_Packslip_ID: "F-15379201",Project_ID: "139001",Description: "Almacén de Medicamentos",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { AñoRecibo: "2022",MesRecibo: "1",Vendor_Packslip_ID: "F-15379201",Project_ID: "139001",Description: "Almacén de Medicamentos",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { AñoRecibo: "2022",MesRecibo: "1",Vendor_Packslip_ID: "F-15379201",Project_ID: "139001",Description: "Almacén de Medicamentos",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { AñoRecibo: "2022",MesRecibo: "1",Vendor_Packslip_ID: "F-15379201",Project_ID: "139001",Description: "Almacén de Medicamentos",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
    ])

    useEffect(() => {
        axios.get('http://192.168.100.20:3030/getAllMedicamento')
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
                <NavDashboard section="Medicamento"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Medicamentos existentes</h2>
                {/*<Search data={data} setData={setData} word={"nombre de PO"}/>*/}
                <div className="mt-10">
                    <TableMedicamentos data={data} setData={setData}/>
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