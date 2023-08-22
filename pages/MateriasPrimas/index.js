import NavDashboard from '@/components/molecules/NavDashboard';
import Navigation from '@/components/molecules/Navigation';
import { useState } from 'react';
import Search from '@/components/atoms/Search';
import StaticMeta from '@/components/atoms/StaticMeta';
import TableMedicamentos from '@/components/molecules/TableMedicamento';
import TableMaterias from '@/components/molecules/TableMaterias';
const Medicamento = ({ title, description, image }) => {
    const [data, setData] = useState([ 
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
        { AñoRecibo: "2022",MesRecibo: "1",VendorPackslip_ID: "5456",Project_ID: "111002",Description: "Planta Alimento 1 Silos y Almacén",Employee_ID: "ADM72440",ReceiptEmployee_ID: "ADM72440",Vendor_ID: "PR12957",PO_Name: "Jose Gonzalez Perez",Purch_Order_ID: "OC22000164",Item_ID: "301100R-Granulado",Item_Name: "Calcio Granulado",Años: "2022",PurchOrder_Date: "ene",Unit_ofMeasure: "Kg",UniCompra: "0.45",Pur_ConvFactor: "1000",AP_CurrencyRate: "1",SumaDeReceipt_Qty: "11.5",SumaDePOUnit_Price: "450",SumaDeImportePartida: "$5,175.00" },
    ])

    return (
        <div>
            <StaticMeta
                title={title}
                description={description}
                image={image}
            />     
            <div>
                <Navigation/>
                <NavDashboard section="Materias Primas" id="materias"/>
            </div>
            <div className="wrapper">
                <h2 className="text-xl mt-5 mb-5">Medicamentos existentes</h2>
                <Search data={data} setData={setData} />
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