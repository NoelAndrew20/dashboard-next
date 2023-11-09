import { useDarkMode } from '@/context/DarkModeContext';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

const ComprasForm = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState([]);
    const [pdfGenerated, setPdfGenerated] = useState(false);

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
            correoCompra2: e.target.correoCompra2.value,
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

        const axios = require("axios");
            const apiUrl = 'http://localhost:3090/addCompra';
            //const apiUrl = 'http://192.168.100.10:3090/addCompra';
            axios.post(apiUrl, newFormData)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
            });

        console.log(newFormData);
        
        const marginBottom = 20; 
        const pageHeight = 297 - marginBottom; // Alto de la página (tamaño A4 estándar)

        const doc = new jsPDF();

        let currentPage = 1;
        let yPosition = 10;

        formData.forEach((data, index) => {
            const keys = Object.keys(data);
            let hasField = false; 

            keys.forEach((key, i) => {
                const value = data[key];
                if (value) {
                    hasField = true;
                    if (yPosition + 10 > pageHeight) {
                        doc.addPage();
                        currentPage++;
                        yPosition = 10;
                    }
                    const formattedData = `${key}: ${value}`;
                    doc.text(formattedData, 10, yPosition);
                    yPosition += 10;
                }
            });

            if (hasField && index < formData.length - 1) {
                if (yPosition + 10 > pageHeight) {
                    doc.addPage();
                    currentPage++;
                    yPosition = 10;
                } else {
                    yPosition += 10;
                }
            }
        });

        if (currentPage > 1) {
            doc.save('compra_form.pdf');
        }

        setPdfGenerated(true);

        e.target.reset();
    };
    const downloadButton = pdfGenerated ? (
        <div className="modal-item mt-5">
            <a href="compra_form.pdf" download>
                <button className="button">
                    Descargar PDF
                </button>
            </a>
        </div>
    ) : null;

    return (
        <form onSubmit={handleSubmit}>
            <div className="position justify-around">
                <div className="w-1/2 flex justify-center">
                    <div>
                        <h2 className="font-bold pb-2">Empresa que solicita la compra</h2>
                        <div className="modal-item">
                            <label>Nombre de la empresa que solicita la compra:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="empresa" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>

                        <div className="modal-item">
                            <label>Denominación / Razon social:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="denominacion" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>RFC:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="rfc" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        
                        <div className="modal-item">
                            <label>Código postal:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="cp" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Nombre de vialidad (calle):</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="vialidad" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Número exterior:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="exterior" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Número Interior:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="interior" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Nombre de la colonia:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="colonia" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Nombre del municipio:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="municipio" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Estado:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="estado" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Celular:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="number" name="celular" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Número de teléfono:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="number" name="telefono" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                    </div>              
                </div>
                <div className="w-1/2 flex justify-center">
                    <div>
                        <h2 className="font-bold pb-2">Orden de compra</h2>
                        <div className="modal-item">
                            <label>Orden de compra:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="ordenCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>

                        <div className="modal-item">
                            <label>Fecha:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="date" name="fechaCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Nombre de la empresa o quien solicita:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="nombreCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Denominación / Razón social:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="denominacionCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        
                        <div className="modal-item">
                            <label>Nombre de vialidad:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="vialidadCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Número exterior:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="exteriorCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Número Interior:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="interiorCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Nombre de la colonia:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="coloniaCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Código postal:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="cpCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Municipio:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="municipioCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Estado:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="estadoCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Número de teléfono:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="number" name="telefonoCompra" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Correo Electrónico :</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="email" name="correoCompra1" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item">
                            <label>Correo Electrónico 2:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="email" name="correoCompra2" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                    </div>                 
                </div>
            </div>
            <div className={`${isDarkMode ? "fake-table-d" : "fake-table"} flex justify-around mt-5`}>
                <div className="w-1/6">
                    <ul>
                        <h2>Partida</h2>
                        <li>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="partida" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </li>
        
                    </ul>           
                </div>
                <div className="w-1/6">
                    <ul>
                        <h2>Descripción</h2>
                        <li>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="descripcion" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </li>
                    </ul>
                    
                </div>
                <div className="w-1/6">
                    <ul>
                        <h2>Cantidad</h2>
                        <li>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="cantidadT" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </li>
                    </ul>
                    
                </div>
                <div className="w-1/6">
                    <ul>
                        <h2>Unitario</h2>
                        <li >
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="unitario" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </li>
   
                    </ul>
                    
                </div>
                <div className="w-1/6">
                    <ul>
                        <h2>P.U</h2>
                        <li >
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="pu" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </li>
                    </ul>
                    
                </div>
                <div className="w-1/6">
                    <ul>
                        <h2>Total</h2>
                        <li>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="total" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div>
                    <h2 className="font-bold mt-5 pb-2">Facturar a:</h2>
                    <div className="modal-cel mt-2">
                        <div className="modal-item w-1/3">
                            <label>Ración social o persona física a la que va a facturar:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="nombreFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>

                        <div className="modal-item w-1/3">
                            <label>RFC:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="rfcFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>         
                        <div className="modal-item w-1/3">
                            <label>Nombre de vialidad:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="vialidadFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-cel mt-2">
                        <div className="modal-item w-1/3">
                            <label>Número exterior:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="exteriorFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item w-1/3">
                            <label>Número Interior:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="interiorFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item w-1/3">
                            <label>Nombre de la colonia:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="coloniaFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-cel mt-2">
                        <div className="modal-item w-1/3">
                            <label>Código postal:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="cpFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item w-1/3">
                            <label>Municipio:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="municipioFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item w-1/3">
                            <label>Estado:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="estadoFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-cel mt-2">
                        <div className="modal-item w-1/3">
                            <label>Pago:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <select name="pagoFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}>
                                    <option value="" selected>Selecciona una opción...</option>
                                    <option value="credito">Credito</option>
                                    <option value="pago inmediato">Pago inmediato</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-item w-1/3">
                            <label>Tiempo de entrega:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="tiempoEntrega" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item w-1/3">
                            <label>Condiciones de entrega:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="condicionesEntrega" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-cel mt-2">

                        <div className="modal-item w-1/3">
                            <label>Forma de pago:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <select name="formaFactura" className={isDarkMode ? "modal-input-d" : "modal-input"}>
                                    <option value="" selected>Selecciona una opción...</option>
                                    <option value="transferencia">Transferencia</option>
                                    <option value="efectivo">Efectivo</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-item w-1/3">
                            <label>Tipo de cambio de hoy:</label>
                            <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                                <input type="text" name="tipoCambio" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                            </div>
                        </div>
                        <div className="modal-item w-1/3">
                        </div>
                    </div>
                </div>                 
            </div>
            <div className="w-1/2">
                <div>
                    <h2 className="font-bold mt-5 pb-2">Elaborado por:</h2>
                    <div className="modal-item">
                        <label>Nombre:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" name="nombreElaborado" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                        </div>
                    </div>

                    <div className="modal-item">
                        <label>Puesto:</label>
                        <div className={isDarkMode ? "modal-input-container-d" : "modal-input-container"}>
                            <input type="text" name="puestoElaborado" className={isDarkMode ? "modal-input-d" : "modal-input"}/>
                        </div>
                    </div>         
                </div>               
            </div>
            <div className="modal-item mt-5">
                <button type="submit" className="button">
                    Guardar
                </button>
            </div>
            {downloadButton}
        </form>
    )
}
export default ComprasForm;