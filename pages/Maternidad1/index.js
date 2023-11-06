import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import StaticMeta from '@/components/atoms/StaticMeta';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import TableMaternidad1 from '@/components/molecules/TableMaternidad1';
const axios = require('axios');

const Maternidad1 = ({ title, description, image }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [data, setData] = useState([ 
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001",Description: "Almacén de Maternidad1s",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001",Description: "Almacén de Maternidad1s",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001",Description: "Almacén de Maternidad1s",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001",Description: "Almacén de Maternidad1s",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001",Description: "Almacén de Maternidad1s",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001",Description: "Almacén de Maternidad1s",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
        { campo1: "2022",campo2: "1",campo3: "F-15379201",campo4: "139001",Description: "Almacén de Maternidad1s",Employee_ID: "ADM68027",Receipt_Employee_ID: "ADM68027",Vendor_ID: "PR12678",PO_Name: "Pisa Agropecuaria SA de CV",Purch_Order_ID: "OC21018740",Item_ID: "401249",Item_Name: "Reakap",Purch_Order_Date: "24/11/2021",Unit_of_Measure: "Pza",Uni_Compra: "191.1",Pur_Conv_Factor: "1",AP_Currency_Rate: "1",SumadeReceipt_Qty: "40",SumadePO_Unit_Price: "191.1",SumadeImportePartida: "7,644.00"},
    ])

    return (
        <div className={`${isDarkMode ? "darkMode" : "lightMode" } full-viewport`}>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Maternidad 1"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Elementos existentes</h2>
                <div className="mt-10">
                    <TableMaternidad1 data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}
export default Maternidad1;

export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Dashboard de Maternidad1";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
  };