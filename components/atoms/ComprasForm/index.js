import { useDarkMode } from '@/context/DarkModeContext';
import { useEffect, useState } from 'react';
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import srs from '@/public/Logos/ACELogo.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Image from 'next/image';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
    borderBottom: '1px solid black',
  },
});
import jwt from 'jsonwebtoken';
const axios = require('axios');

const ComprasForm = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState([]);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [ordenCompra, setOrdenCompra] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');
  const [solicitudData, setSolicitudData] = useState({});
  const [fiscaldata, setfiscaldata] = useState({});
  const [dataFiscal2, setDataFiscal2] = useState({});

  useEffect(() => {
    const usuario = 'IMPI';
    axios
      .get('http://192.168.100.10:3070/getDatosProveedor', {
        params: {
          usuario: usuario,
        },
      })
      .then((response) => {
        const jsonData = response.data;
        setfiscaldata({
          denominacion: jsonData.denominacion || '',
          nombre: jsonData.nombre || '',
          vialidad: jsonData.vialidad || '',
          exterior: jsonData.exterior || '',
          interior: jsonData.interior || '',
          colonia: jsonData.colonia || '',
          cp: jsonData.cp || '',
          municipio: jsonData.municipio || '',
          estado: jsonData.entidad || '',
          telefono: jsonData.telefono || '',
          celular: jsonData.celular || '',
          correo: jsonData.correo || '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const usuario = localStorage.getItem('selectedUsername');
    const solicitud = localStorage.getItem('selectedNumeroSolicitud');
    axios
      .get('http://192.168.100.10:3070/getDatosProveedor', {
        params: {
          usuario: usuario,
        },
      })
      .then((response) => {
        const jsonData = response.data;
        setDataFiscal2({
          denominacionCompra: jsonData.denominacion || '',
          //nombreCompra: jsonData.nombre || '',
          vialidadCompra: jsonData.vialidad || '',
          exteriorCompra: jsonData.exterior || '',
          interiorCompra: jsonData.interior || '',
          coloniaCompra: jsonData.colonia || '',
          cpCompra: jsonData.cp || '',
          municipioCompra: jsonData.municipio || '',
          estadoCompra: jsonData.entidad || '',
          telefonoCompra: jsonData.telefono || '',
          celularCompra: jsonData.celular || '',
          correoCompra1: jsonData.correo || '',
        });
      })
      .catch((error) => {
        console.error(error);
      });

    const apiUrl = `http://192.168.100.10:3083/getOneSolicitudLicitacion`;
    axios
      .get(apiUrl, {
        params: {
          usuario: usuario,
          solicitud: solicitud,
        },
      })
      .then((response) => {
        const jsonData = response.data;
        setSolicitudData({
          codigo: jsonData.solicitud[0].codigo || '',
          descripcion: jsonData.solicitud[0].nombre || '',
          cantidad: jsonData.solicitud[0].cantidad || '',
          unitario: jsonData.solicitud[0].metodo || '',
          pu: jsonData.solicitud[0].precio || '',
          total: jsonData.solicitud[0].cantidad * jsonData.solicitud[0].precio || '',
          fechaEntrega: jsonData.solicitud[0].fechaEntrega || '',
        });
        setOrdenCompra(jsonData.numeroSolicitud || '');
        setFechaCompra(new Date().toISOString().split('T')[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChangeDataFiscal2 = (e) => {
    const { name, value } = e.target;

    setDataFiscal2((prevDataFiscal2) => {
      return {
        ...prevDataFiscal2,
        [name]: value,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setfiscaldata((prevFiscaldata) => {
      return {
        ...prevFiscaldata,
        [name]: value,
      };
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = {
      denominacion: e.target.denominacion.value,
      cp: e.target.cp.value,
      vialidad: e.target.vialidad.value,
      exterior: e.target.numeroExterior.value,
      interior: e.target.numeroInterior.value,
      colonia: e.target.colonia.value,
      municipio: e.target.municipio.value,
      estado: e.target.entidad.value,
      telefono: e.target.telefono.value,
      correo: e.target.correo.value,
      //celular: e.target.celular.value,
      ordenCompra: e.target.ordenCompra.value,
      fechaCompra: fechaCompra,
      //nombreCompra: e.target.nombreCompra.value,
      denominacionCompra: e.target.denominacionCompra.value,
      vialidadCompra: e.target.vialidadCompra.value,
      exteriorCompra: e.target.exteriorCompra.value,
      interiorCompra: e.target.interiorCompra.value,
      coloniaCompra: e.target.coloniaCompra.value,
      cpCompra: e.target.cpCompra.value,
      municipioCompra: e.target.municipioCompra.value,
      estadoCompra: e.target.estadoCompra.value,
      telefonoCompra: e.target.telefonoCompra.value,
      //celularCompra: e.target.celularCompra.value,
      correoCompra1: e.target.correoCompra1.value,
      partida: e.target.partida.value,
      descripcion: e.target.descripcion.value,
      cantidadT: e.target.cantidadT.value,
      //unitario: e.target.unitario.value,
      pu: e.target.pu.value,
      total: e.target.total.value,
      pagoFactura: e.target.pagoFactura.value,
      tiempoEntrega: e.target.tiempoEntrega.value,
      condicionesEntrega: e.target.condicionesEntrega.value,
      formaFactura: e.target.formaFactura.value,
      tipoCambio: e.target.tipoCambio.value,
      nombreElaborado: e.target.nombreElaborado.value,
      puestoElaborado: e.target.puestoElaborado.value,
    };
    
    console.log(newFormData); 

    const axios = require('axios');
    const apiUrl = 'http://192.168.100.10:3090/addCompra';
    axios
      .post(apiUrl, newFormData)
      .then((response) => {
        console.log('Respuesta de la API:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
      
      setFormData([...formData, newFormData]);
      generatePdf(newFormData);
  };  

  const generatePdf = (formData) => {
    setShowPdf(true);
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Factura', 20, 20);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Fecha de Emisión: ' + new Date().toLocaleDateString(), 20, 30);
    doc.text('Orden de Compra: ' + formData.ordenCompra, 140, 30);

    const vendedorData = [
      ['Denominación:', formData.denominacion],
      ['Vialidad:', formData.vialidad],
      ['Colonia:', formData.colonia],
      ['Municipio:', formData.municipio],
      ['Estado:', formData.estado],
      ['Código postal:', formData.cp],
      ['No. exterior:', formData.exterior],
      ['No. interior:', formData.interior],
      ['Teléfono:', formData.telefono],
      ['Correo:', formData.correo],
    ];

    const compradorData = [
      ['Denominacion:', formData.denominacionCompra],
      ['Vialidad:', formData.vialidadCompra],
      ['Colonia:', formData.coloniaCompra],
      ['Municipio:', formData.municipioCompra],
      ['Estado:', formData.estadoCompra],
      ['Código Postal:', formData.cpCompra],
      ['No. exterior:', formData.exteriorCompra],
      ['No. interior:', formData.interiorCompra],
      ['Teléfono:', formData.telefonoCompra],
      ['Correo:', formData.correoCompra1],
    ];

    const combinedData = vendedorData.map((vendedor, index) => vendedor.concat(compradorData[index]));

    let yOffset = 38;
    yOffset = createTable(doc, combinedData, 20, yOffset);
  
    const productosData = [
      {
        producto: formData.partida,
        descripcion: formData.descripcion,
        cantidad: formData.cantidadT,
        precio: formData.pu,
        total: formData.total,
      },
    ];
    
    yOffset = createTable2(doc, productosData, 20, yOffset + 10);
  
      doc.text('Tipo de pago de la factura: ' + formData.pagoFactura, 20, yOffset + 10);
      doc.text('Tiempo de entrega: ' + formData.tiempoEntrega, 110, yOffset + 10);
      doc.text('Condiciones de entrega: ' + formData.condicionesEntrega, 20, yOffset + 18);
      doc.text('Forma de la factura: ' + formData.formaFactura, 110, yOffset + 18);
      doc.text('Tipo de cambio: ' + formData.tipoCambio, 20, yOffset + 26);
      doc.text('Nombre de quién la elaboró: ' + formData.nombreElaborado, 110, yOffset + 26);
      doc.text('Puesto de quién la elaboró: ' + formData.puestoElaborado, 20, yOffset + 34);
    window.open(doc.output('bloburl'), '_blank');
  };
  const createTable = (doc, data, startX, startY) => {
    const cellPadding = 2;

    const tableStyles = {
      lineWidth: 0.2, // Ancho de línea
      lineColor: [0, 0, 0], // Color de línea (negro)
    };

    const columnStyles = {
      0: { cellWidth: 40, fillColor: [173, 216, 230] },
      1: { cellWidth: 40, fillColor: [173, 216, 230] },
      2: { cellWidth: 40, fillColor: [144, 238, 144] },
      3: { cellWidth: 40, fillColor: [144, 238, 144]},
    };

    doc.autoTable({
      head: [
        [{ content: 'Vendedor', colSpan: 2, styles: { fillColor: [173, 216, 230], textColor: [0, 0, 0], halign: 'center' } }, { content: 'Comprador', colSpan: 2, styles: { fillColor: [144, 238, 144], textColor: [0, 0, 0], halign: 'center' } }],
      ],
      body: data,
      theme: 'grid',
      styles: tableStyles,
      columnStyles: columnStyles,
      margin: { left: startX },
      startY: startY,
    });

    return doc.autoTable.previous.finalY + cellPadding;
  };

  const createTable2 = (doc, data, startX, startY) => {
    const cellPadding = 2;
  
    const tableStyles = {
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    };
  
    const columns = ['Producto', 'Descripción', 'Cantidad', 'Precio Unitario', 'Total'];
    const rows = data.map((producto) => [
      producto.producto,
      producto.descripcion,
      producto.cantidad,
      `$${producto.precio}`,
      `$${producto.precio * producto.cantidad}`,
    ]);
  
    doc.autoTable({
      startY: startY,
      head: [columns],
      body: rows,
      theme: 'grid',
      styles: tableStyles,
      margin: { left: startX },
    });
  
    return doc.autoTable.previous.finalY + cellPadding;
  };





  /*useEffect(() => {
    if (pdfGenerated) {
      const pdfDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Denominación: {formData[0].denominacion}</Text>
              <Text>Código postal: {formData[0].cp}</Text>
              <Text>Vialidad: {formData[0].vialidad}</Text>
              <Text>No. exterior: {formData[0].exterior}</Text>
              <Text>No. interior: {formData[0].interior}</Text>
              <Text>Colonia: {formData[0].colonia}</Text>
              <Text>Municipio: {formData[0].municipio}</Text>
              <Text>Estado: {formData[0].estado}</Text>
              <Text>Teléfono: {formData[0].telefono}</Text>
              <Text>Orden de compra: {formData[0].ordenCompra}</Text>
              <Text>Fecha de compra: {formData[0].fechaCompra}</Text>
              <Text>
                Denominación de compra: {formData[0].denominacionCompra}
              </Text>
              <Text>Vialidad de compra: {formData[0].vialidadCompra}</Text>
              <Text>Exterior de compra: {formData[0].exteriorCompra}</Text>
              <Text>Interior de compra: {formData[0].interiorCompra}</Text>
              <Text>Colonia de compra: {formData[0].coloniaCompra}</Text>
              <Text>Código postal de compra: {formData[0].cpCompra}</Text>
              <Text>Municipio de compra: {formData[0].municipioCompra}</Text>
              <Text>Estado de compra: {formData[0].estadoCompra}</Text>
              <Text>Teféfono de compra: {formData[0].telefonoCompra}</Text>
              <Text>Correo de compra: {formData[0].correoCompra1}</Text>
              <Text>Partida: {formData[0].partida}</Text>
              <Text>Descripción: {formData[0].descripcion}</Text>
              <Text>Cantidad: {formData[0].cantidadT}</Text>
              <Text>Unitario: {formData[0].unitario}</Text>
              <Text>PU: {formData[0].pu}</Text>
              <Text>Total: {formData[0].total}</Text>
              <Text>Tipo de pago de la factura: {formData[0].pagoFactura}</Text>
              <Text>Tempo de entrega: {formData[0].tiempoEntrega}</Text>
              <Text>
                Condiciones de entrega: {formData[0].condicionesEntrega}
              </Text>
              <Text>Forma de la factura: {formData[0].formaFactura}</Text>
              <Text>Tipo de cambio: {formData[0].tipoCambio}</Text>
              <Text>
                Nombre de quien la elaboró: {formData[0].nombreElaborado}
              </Text>
              <Text>
                Puesto de quien la elaboró: {formData[0].puestoElaborado}
              </Text>
            </View>
          </Page>
        </Document>
      );

      pdfViewer.current.updateContainer(pdfDoc);
    }
  }, [pdfGenerated, formData]);*/
  const PDFDocument = (
    <Document>
      {formData.map((data, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Denominación: {data.denominacion}</Text>
            {/* ... (agrega el resto de los campos del formulario) */}
          </View>
        </Page>
      ))}
    </Document>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="justify-around">
          <h2 className="text-xl font-bold pb-2">
            Empresa que solicita la compra
          </h2>
          <div className="modal-cel">
            <div className="modal-item w-1/1">
              <label>Denominación / Razón social:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="denominacion"
                  value={fiscaldata.denominacion}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label></label>
            </div>
          </div>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Nombre de vialidad (calle):</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="vialidad"
                  value={fiscaldata.vialidad}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Nombre de la colonia:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="colonia"
                  value={fiscaldata.colonia}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Nombre del municipio:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="municipio"
                  value={fiscaldata.municipio}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
          </div>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Estado:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="entidad"
                  value={fiscaldata.estado}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Código postal:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="cp"
                  value={fiscaldata.cp}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Número exterior:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="numeroExterior"
                  value={fiscaldata.exterior}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
          </div>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Número Interior:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="numeroInterior"
                  value={fiscaldata.interior}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Número de teléfono:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="telefono"
                  value={fiscaldata.telefono}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
          </div>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Correo Electrónico:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="email"
                  name="correo"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={fiscaldata.correo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center">
          <h2 className="text-xl font-bold pb-2">Vendedor</h2>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Denominación / Razón social:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="denominacionCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.denominacionCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
          </div>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Nombre de vialidad (calle):</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="vialidadCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.vialidadCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Nombre de la colonia:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="coloniaCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.coloniaCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Municipio:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="municipioCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.municipioCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
          </div>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Estado:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="estadoCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.estadoCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Código postal:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="cpCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.cpCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Número exterior:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="exteriorCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.exteriorCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
          </div>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Número Interior:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="interiorCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.interiorCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Número de teléfono:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="telefonoCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.telefonoCompra}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
          </div>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Correo Electrónico:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="email"
                  name="correoCompra1"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={dataFiscal2.correoCompra1}
                  onChange={handleInputChangeDataFiscal2}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="justify-center">
          <h2 className="text-xl font-bold pb-2">Factura</h2>
          <div className="modal-cel">
            <div className="modal-item w-1/3">
              <label>Orden de compra:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="ordenCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={ordenCompra}
                  onChange={(e) => setOrdenCompra(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-item w-1/3">
              <label>Fecha:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="date"
                  name="fechaCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={fechaCompra}
                  onChange={(e) => setFechaCompra(e.target.value)}
                  readOnly
                />
              </div>
            </div>
          </div>
          </div>


        <div
          className={`${
            isDarkMode ? 'bg-[#151515]' : 'bg-white'
          }  justify-around mt-5 p-5 w-100`}
        >
          <div className="position">
            <div className="w-1/12 flex flex-col justify-between">
              <h2>Código</h2>

              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="partida"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={solicitudData.codigo}
                />
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <h2>Descripción</h2>

              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
                style={{ width: '95%' }}
              >
                <input
                  type="text"
                  name="descripcion"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={solicitudData.descripcion}
                />
              </div>
            </div>
            <div className="w-1/12 flex flex-col justify-between">
              <h2>Cantidad</h2>

              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="cantidadT"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={solicitudData.cantidad}
                />
              </div>
            </div>
           {/* <div className="w-1/12 flex flex-col justify-between">
              <h2>Unidad de medida</h2>

              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="unitario"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={solicitudData.unidad}
                />
              </div>
            </div>*/}
            <div className="w-1/12 flex flex-col justify-between">
              <h2>Precio Unitario</h2>

              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="pu"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={solicitudData.pu}
                />
              </div>
            </div>
            <div className="w-1/12 flex flex-col justify-between">
              <h2>Total</h2>

              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="total"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={solicitudData.total}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="modal-cel mt-2">
              <div className="modal-item w-1/3">
                <label>Pago:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <select
                    name="pagoFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  >
                    <option value="" defaultValue>
                      Selecciona una opción...
                    </option>
                    <option value="Crédito">Credito</option>
                    <option value="PagoInmediato">Pago inmediato</option>
                  </select>
                </div>
              </div>
              <div className="modal-item w-1/3">
              <label>Tiempo de entrega:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="date"
                  name="tiempoEntrega"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={solicitudData.fechaEntrega}
                  onChange={(e) => setFechaCompra(e.target.value)}
                  readOnly
                />
              </div>
            </div>


              <div className="modal-item w-1/3">
                <label>Condiciones de entrega:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    name="condicionesEntrega"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
            </div>
            <div className="modal-cel mt-2">
              <div className="modal-item w-1/3">
                <label>Forma de pago:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <select
                    name="formaFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  >
                    <option value="" defaultValue>
                      Selecciona una opción...
                    </option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Efectivo">Efectivo</option>
                  </select>
                </div>
              </div>
              <div className="modal-item w-1/3">
                <label>Tipo de cambio de hoy:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    name="tipoCambio"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
              <div className="modal-item w-1/3"></div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div>
            <h2 className="text-xl font-bold mt-5 pb-2">Elaborado por:</h2>
            <div className="modal-item w-3/4">
              <label>Nombre:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="nombreElaborado"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>

            <div className="modal-item w-3/4">
              <label>Puesto:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="puestoElaborado"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-item mt-5">
          <button type="submit" className="button">
            Guardar
          </button>
        </div>
      </form>
      <div className="mt-5 flex justify-center">
        {showPdf && (
          <PDFViewer width="1000" height="600">
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <Text style={styles.heading}>Datos del formulario</Text>
                  <Text>Denominación: {formData[0].denominacion}</Text>
                  <Text>Código postal: {formData[0].cp}</Text>
                  <Text>Vialidad: {formData[0].vialidad}</Text>
                  <Text>No. exterior: {formData[0].exterior}</Text>
                  <Text>No. interior: {formData[0].interior}</Text>
                  <Text>Colonia: {formData[0].colonia}</Text>
                  <Text>Municipio: {formData[0].municipio}</Text>
                  <Text>Estado: {formData[0].estado}</Text>
                  <Text>Teléfono: {formData[0].telefono}</Text>
                  <Text>Orden de compra: {formData[0].ordenCompra}</Text>
                  <Text>Fecha de compra: {formData[0].fechaCompra}</Text>
                  <Text>
                    Denominación de compra: {formData[0].denominacionCompra}
                  </Text>
                  <Text>Vialidad de compra: {formData[0].vialidadCompra}</Text>
                  <Text>Exterior de compra: {formData[0].exteriorCompra}</Text>
                  <Text>Interior de compra: {formData[0].interiorCompra}</Text>
                  <Text>Colonia de compra: {formData[0].coloniaCompra}</Text>
                  <Text>Código postal de compra: {formData[0].cpCompra}</Text>
                  <Text>
                    Municipio de compra: {formData[0].municipioCompra}
                  </Text>
                  <Text>Estado de compra: {formData[0].estadoCompra}</Text>
                  <Text>Teféfono de compra: {formData[0].telefonoCompra}</Text>
                  <Text>Correo de compra: {formData[0].correoCompra1}</Text>
                  <Text>Correo de compra 2: {formData[0].correoCompra2}</Text>
                  <Text>Partida: {formData[0].partida}</Text>
                  <Text>Descripción: {formData[0].descripcion}</Text>
                  <Text>Cantidad: {formData[0].cantidadT}</Text>
                  <Text>Unitario: {formData[0].unitario}</Text>
                  <Text>PU: {formData[0].pu}</Text>
                  <Text>Total: {formData[0].total}</Text>
                  <Text>
                    Tipo de pago de la factura: {formData[0].pagoFactura}
                  </Text>
                  <Text>Tempo de entrega: {formData[0].tiempoEntrega}</Text>
                  <Text>
                    Condiciones de entrega: {formData[0].condicionesEntrega}
                  </Text>
                  <Text>Forma de la factura: {formData[0].formaFactura}</Text>
                  <Text>Tipo de cambio: {formData[0].tipoCambio}</Text>
                  <Text>
                    Nombre de quien la elaboró: {formData[0].nombreElaborado}
                  </Text>
                  <Text>
                    Puesto de quien la elaboró: {formData[0].puestoElaborado}
                  </Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        )}
      </div>
    </>
  );
};
export default ComprasForm;
