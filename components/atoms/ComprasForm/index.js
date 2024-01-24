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
  const [ordenCompra, setOrdenCompra] = useState('');
const [fechaCompra, setFechaCompra] = useState('');
  const [solicitudData, setSolicitudData] = useState({
    codigo: '',
    descripcion: '',
    cantidad: '',
    unidad: '',
    pu: '',
    total: '',
  });

  const [fiscaldata, setfiscaldata] = useState({
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
    celularCompra: '',
    correoCompra1: '',
    correoCompra2: '',
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
    celularCompra: '',
    correoCompra1: '',
    correoCompra2: '',
  });

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
          nombreCompra: jsonData.nombre || '',
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

  /*useEffect(() => {
    let tipoDeLicitacion;

    if (primerosDosCaracteres === 'Al') {
      tipoDeLicitacion = 'Alimento';
    } else if (primerosDosCaracteres === 'Vi') {
      tipoDeLicitacion = 'Vientres';
    } else {
      console.error('Usuario no reconocido');
      return;
    }
    const apiUrl = `http://192.168.100.10:3086/getAllSolicitudCompra`;
    axios
      .get(apiUrl, {
        params: {
          tipoDeLicitacion: tipoDeLicitacion,
        },
      })
      .then((response) => {
        const jsonData = response.data;
        setDataLic(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [primerosDosCaracteres]);*/

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
      celularCompra: e.target.celularCompra.value,
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
              <Text>Celular de compra: {formData[0].celularCompra}</Text>
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
            <div className="w-1/12 flex flex-col justify-between">
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
            </div>
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
                  type="date"
                  name="fechaCompra"
                  className={isDarkMode ? 'modal-input-d' : 'modal-input'}
                  value={fechaCompra}
                  onChange={(e) => setFechaCompra(e.target.value)}
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
