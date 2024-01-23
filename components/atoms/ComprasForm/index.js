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

  const [fiscaldata, setfiscaldata] = useState({
    actividadEconomica: [
      {
        actividad: 'Instalaciones eléctricas en construcciones',
        fechaFinal: 'N/A',
        fechaInicio: '02/03/2020',
        numeroOrden: '1',
        porcentaje: '70',
      },
      {
        actividad:
          'Comercio al por menor de lámparas ornamentales y pantallas para lámparas y candiles',
        fechaFinal: 'N/A',
        fechaInicio: '01/07/2003',
        numeroOrden: '3',
        porcentaje: '30',
      },
    ],
    datosContribuyente: {
      calle1: 'AVENIDA ROSENDO MARQUEZ',
      calle2: 'CALLE 45 SUR',
      colonia: 'BELISARIO DOMINGUEZ',
      cp: '72180',
      entidad: 'PUEBLA',
      localidad: 'HEROICA PUEBLA DE ZARAGOZA',
      municipio: 'PUEBLA',
      numeroExterior: '4307',
      numeroInterior: 'LETRA A',
      tipoVialidad: 'AVENIDA (AV.)',
      vialidad: '25 PONIENTE',
    },
    domicilioRegistrado: {
      denominacion: 'TERMOMAGNETICOS Y CONTROL DE RADIACIONES',
      estatusPadron: 'ACTIVO',
      fechaInicioOperacion: '01 DE JULIO DE 2003',
      fechaUltimoCambioEstado: '01 DE JULIO DE 2003',
      nombreComercial: '',
      regimenCapital: 'SOCIEDAD ANONIMA DE CAPITAL VARIABLE',
      rfc: 'TCR030701IN7',
    },
    contacto: {
      nombre: 'Miguel Osorio Moreda',
      telefono: '2222576165',
      celular: '2211389377',
    },
    regimen: [
      {
        descripcion: 'Régimen General de Ley Personas Morales',
        fechaFin: 'N/A',
        fechaInicio: '01/07/2003',
      },
    ],
  });

  const [dataFiscal2, setDataFiscal2] = useState({
    denominacionCompra: '',
    ordenCompra: '',
    fechaCompra: '',
    nombreCompra: '',
    vialidadCompra: '',
    exteriorCompra: '',
    interiorCompra: '',
    coloniaCompra: '',
    cpCompra: '',
    municipioCompra: '',
    estadoCompra: '',
    telefonoCompra: '',
    correoCompra1: '',
    correoCompra2: '',
  });

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
          nombreCompra: jsonData.nombre || '',
          vialidadCompra: jsonData.vialidad || '',
          exteriorCompra: jsonData.exterior || '',
          interiorCompra: jsonData.interior || '',
          coloniaCompra: jsonData.colonia || '',
          cpCompra: jsonData.cp || '',
          municipioCompra: jsonData.municipio || '',
          estadoCompra: jsonData.entidad || '',
          telefonoCompra: jsonData.telefono || '',
          correoCompra1: jsonData.correo || '',
        });
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
      const updatedData = {
        ...prevFiscaldata,
        domicilioRegistrado: {
          ...prevFiscaldata.domicilioRegistrado,
          [name]: value,
        },
        datosContribuyente: {
          ...prevFiscaldata.datosContribuyente,
          [name]: value,
        },
        contacto: {
          ...prevFiscaldata.contacto,
          [name]: value,
        },
      };

      return updatedData;
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = {
      empresa: e.target.empresa.value,
      denominacion: e.target.denominacion.value,
      rfc: e.target.rfc.value,
      cp: e.target.cp.value,
      vialidad: e.target.vialidad.value,
      exterior: e.target.exterior.value,
      interior: e.target.interior.value,
      colonia: e.target.colonia.value,
      municipio: e.target.municipio.value,
      estado: e.target.estado.value,
      telefono: e.target.telefono.value,
      celular: e.target.celular.value,
      ordenCompra: e.target.ordenCompra.value,
      fechaCompra: e.target.fechaCompra.value,
      nombreCompra: e.target.nombreCompra.value,
      denominacionCompra: e.target.denominacionCompra.value,
      vialidadCompra: e.target.vialidadCompra.value,
      exteriorCompra: e.target.exteriorCompra.value,
      interiorCompra: e.target.interiorCompra.value,
      coloniaCompra: e.target.coloniaCompra.value,
      cpCompra: e.target.cpCompra.value,
      municipioCompra: e.target.municipioCompra.value,
      estadoCompra: e.target.estadoCompra.value,
      telefonoCompra: e.target.telefonoCompra.value,
      correoCompra1: e.target.correoCompra1.value,
      partida: e.target.partida.value,
      descripcion: e.target.descripcion.value,
      cantidadT: e.target.cantidadT.value,
      unitario: e.target.unitario.value,
      pu: e.target.pu.value,
      total: e.target.total.value,
      nombreFactura: e.target.nombreFactura.value,
      rfcFactura: e.target.rfcFactura.value,
      vialidadFactura: e.target.vialidadFactura.value,
      exteriorFactura: e.target.exteriorFactura.value,
      interiorFactura: e.target.interiorFactura.value,
      coloniaFactura: e.target.coloniaFactura.value,
      cpFactura: e.target.cpFactura.value,
      municipioFactura: e.target.municipioFactura.value,
      estadoFactura: e.target.estadoFactura.value,
      pagoFactura: e.target.pagoFactura.value,
      tiempoEntrega: e.target.tiempoEntrega.value,
      condicionesEntrega: e.target.condicionesEntrega.value,
      formaFactura: e.target.formaFactura.value,
      tipoCambio: e.target.tipoCambio.value,
      nombreElaborado: e.target.nombreElaborado.value,
      puestoElaborado: e.target.puestoElaborado.value,
    };

    setFormData([...formData, newFormData]);
    setShowPdf(true);
  };
  useEffect(() => {
    if (pdfGenerated) {
      const pdfDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Empresa: {formData[0].empresa}</Text>
              <Text>Denominación: {formData[0].denominacion}</Text>
              <Text>RFC: {formData[0].rfc}</Text>
              <Text>Código postal: {formData[0].cp}</Text>
              <Text>Vialidad: {formData[0].vialidad}</Text>
              <Text>No. exterior: {formData[0].exterior}</Text>
              <Text>No. interior: {formData[0].interior}</Text>
              <Text>Colonia: {formData[0].colonia}</Text>
              <Text>Municipio: {formData[0].municipio}</Text>
              <Text>Estado: {formData[0].estado}</Text>
              <Text>Teléfono: {formData[0].telefono}</Text>
              <Text>Celular: {formData[0].celular}</Text>
              <Text>Orden de compra: {formData[0].ordenCompra}</Text>
              <Text>Fecha de compra: {formData[0].fechaCompra}</Text>
              <Text>Nombre de compra: {formData[0].nombreCompra}</Text>
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
              <Text>Nombre de la factura: {formData[0].nombreFactura}</Text>
              <Text>FRC de la factura: {formData[0].rfcFactura}</Text>
              <Text>Vialidad de la factura: {formData[0].vialidadFactura}</Text>
              <Text>
                No. exterior de la factura: {formData[0].exteriorFactura}
              </Text>
              <Text>
                No. interior de la factura: {formData[0].interiorFactura}
              </Text>
              <Text>Colonia de la factura: {formData[0].coloniaFactura}</Text>
              <Text>
                Código postal de la factura: {formData[0].coloniaFactura}
              </Text>
              <Text>
                Municipio de la factura: {formData[0].municipioFactura}
              </Text>
              <Text>Estado de la factura: {formData[0].estadoFactura}</Text>
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

              {/*     empresa: e.target.empresa.value,
            denominacion: e.target.denominacion.value,
            rfc: e.target.rfc.value,
            cp: e.target.cp.value,
            vialidad: e.target.vialidad.value,
            exterior: e.target.exterior.value,
            interior: e.target.interior.value,
            colonia: e.target.colonia.value,
            municipio: e.target.municipio.value,
            estado: e.target.estado.value,
            telefono: e.target.telefono.value,
            celular: e.target.celular.value,
            ordenCompra: e.target.ordenCompra.value,
            fechaCompra: e.target.fechaCompra.value, */}
            </View>
          </Page>
        </Document>
      );

      pdfViewer.current.updateContainer(pdfDoc);
    }
  }, [pdfGenerated, formData]);
  const PDFDocument = (
    <Document>
      {formData.map((data, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>Empresa: {data.empresa}</Text>
            <Text>Denominación: {data.denominacion}</Text>
            <Text>RFC: {data.rfc}</Text>
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
            <div className="modal-item w-1/2">
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
                  value={fiscaldata.domicilioRegistrado.denominacion}
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
                  value={fiscaldata.datosContribuyente.vialidad}
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
                  value={fiscaldata.datosContribuyente.colonia}
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
                  value={fiscaldata.datosContribuyente.municipio}
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
                  value={fiscaldata.datosContribuyente.entidad}
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
                  value={fiscaldata.datosContribuyente.cp}
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
                  value={fiscaldata.datosContribuyente.numeroExterior}
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
                  value={fiscaldata.datosContribuyente.numeroInterior}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
            <div className="modal-item w-1/3">
              <label>Celular:</label>
              <div
                className={
                  isDarkMode
                    ? 'modal-input-container-d'
                    : 'modal-input-container'
                }
              >
                <input
                  type="text"
                  name="celular"
                  value={fiscaldata.contacto.celular}
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
                  value={fiscaldata.contacto.telefono}
                  onChange={handleInputChange}
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center">
          <h2 className="text-xl font-bold pb-2">Vendedor</h2>
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
                />
              </div>
            </div>
          </div>
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
          </div>
          <div className="modal-cel">
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
            <div className="modal-item w-1/3"></div>
          </div>
        </div>
        <div
          className={`${
            isDarkMode ? 'bg-[#151515]' : 'bg-white'
          }  justify-around mt-5 p-5 w-100`}
        >
          <div className="flex">
            <div className="w-1/4">
              <ul>
                <h2>Partida</h2>
                <li>
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
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-3/4">
              <ul>
                <h2>Descripción</h2>
                <li>
                  <div
                    className={
                      isDarkMode
                        ? 'modal-input-container-d'
                        : 'modal-input-container'
                    }
                    style={{ width: '90%' }}
                  >
                    <input
                      type="text"
                      name="descripcion"
                      className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="w-1/4">
              <ul>
                <h2>Cantidad</h2>
                <li>
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
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-1/4">
              <ul>
                <h2>Unidad de medida</h2>
                <li>
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
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-1/4">
              <ul>
                <h2>Precio Unitario</h2>
                <li>
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
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-1/4">
              <ul>
                <h2>Total</h2>
                <li>
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
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-xl font-bold mt-5 pb-2">Facturar a:</h2>
            <div className="modal-cel mt-2">
              <div className="modal-item w-1/3">
                <label>
                  Razón social o persona física a la que va a facturar:
                </label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    name="nombreFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>

              <div className="modal-item w-1/3">
                <label>RFC:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    name="rfcFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
              <div className="modal-item w-1/3">
                <label>Nombre de vialidad:</label>
                <div
                  className={
                    isDarkMode
                      ? 'modal-input-container-d'
                      : 'modal-input-container'
                  }
                >
                  <input
                    type="text"
                    name="vialidadFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
            </div>
            <div className="modal-cel mt-2">
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
                    name="exteriorFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
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
                    name="interiorFactura"
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
                    name="coloniaFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
            </div>
            <div className="modal-cel mt-2">
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
                    name="cpFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
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
                    name="municipioFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
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
                    name="estadoFactura"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  />
                </div>
              </div>
            </div>
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
                    <option value="credito">Credito</option>
                    <option value="pago inmediato">Pago inmediato</option>
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
                    type="text"
                    name="tiempoEntrega"
                    className={isDarkMode ? 'modal-input-d' : 'modal-input'}
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
                    <option value="transferencia">Transferencia</option>
                    <option value="efectivo">Efectivo</option>
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
                  <Text>Empresa: {formData[0].empresa}</Text>
                  <Text>Denominación: {formData[0].denominacion}</Text>
                  <Text>RFC: {formData[0].rfc}</Text>
                  <Text>Código postal: {formData[0].cp}</Text>
                  <Text>Vialidad: {formData[0].vialidad}</Text>
                  <Text>No. exterior: {formData[0].exterior}</Text>
                  <Text>No. interior: {formData[0].interior}</Text>
                  <Text>Colonia: {formData[0].colonia}</Text>
                  <Text>Municipio: {formData[0].municipio}</Text>
                  <Text>Estado: {formData[0].estado}</Text>
                  <Text>Teléfono: {formData[0].telefono}</Text>
                  <Text>Celular: {formData[0].celular}</Text>
                  <Text>Orden de compra: {formData[0].ordenCompra}</Text>
                  <Text>Fecha de compra: {formData[0].fechaCompra}</Text>
                  <Text>Nombre de compra: {formData[0].nombreCompra}</Text>
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
                  <Text>Nombre de la factura: {formData[0].nombreFactura}</Text>
                  <Text>FRC de la factura: {formData[0].rfcFactura}</Text>
                  <Text>
                    Vialidad de la factura: {formData[0].vialidadFactura}
                  </Text>
                  <Text>
                    No. exterior de la factura: {formData[0].exteriorFactura}
                  </Text>
                  <Text>
                    No. interior de la factura: {formData[0].interiorFactura}
                  </Text>
                  <Text>
                    Colonia de la factura: {formData[0].coloniaFactura}
                  </Text>
                  <Text>
                    Código postal de la factura: {formData[0].coloniaFactura}
                  </Text>
                  <Text>
                    Municipio de la factura: {formData[0].municipioFactura}
                  </Text>
                  <Text>Estado de la factura: {formData[0].estadoFactura}</Text>
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
