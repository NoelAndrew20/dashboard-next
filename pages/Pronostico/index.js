import Navigation from "@/components/molecules/Navigation";

const Pronostico = () => {
    return(
        <>
        <Navigation />
        <div className="wrapper pronostico mt-10">
            <div>
                <h1 className="modal-header">Herramienta de pronóstico</h1>
            </div>
            <div className="flex justify-between mt-5">
                <div className="pronostico-container">
                    <label>Fecha inicial</label>
                    <div className="pronostico-input">
                        <input type="date"/>
                    </div>
                </div>
                <div className="pronostico-container">
                    <label>Fecha final</label>
                    <div className="pronostico-input">
                        <input type="date" />
                    </div>
                </div>
                <div className="pronostico-container">
                    <label>Descendencia por vientre</label>
                    <div className="pronostico-input">
                        <input type="text" />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div>
                    <h2>Lotes de vientres</h2>
                </div>
                <div className="flex justify-between">
                    <div className="w-1/2 mt-5">
                        <div>
                            <label>Ingreso a cuarentena</label>
                            <div className="pronostico-input">
                                <input type="date" />
                            </div>
                        </div>
                        <div>
                            <label>Vientres en lotes</label>
                            <div className="pronostico-input">
                                <input type="number" />
                            </div>
                        </div>
                        <div>
                            <button className="pronostico-btn">Agregar lote</button>
                            <button className="pronostico-btn">Eliminar último lote</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h2>No hay lotes para mostrar</h2>
                    </div>
                </div> 
            </div>   
            <div className="mt-5">
                <div>
                    <h2>Lotes de sementales CIA</h2>
                </div>
                <div className="flex justify-between mt-5">
                    <div className="w-1/2">
                        <div>
                            <label>Ingreso a cuarentena</label>
                            <div className="pronostico-input">
                                <input type="date" />
                            </div>
                        </div>
                        <div>
                            <label>Sementales en lotes</label>
                            <div className="pronostico-input">
                                <input type="number" />
                            </div>
                        </div>
                        <div>
                            <button className="pronostico-btn">Agregar lote</button>
                            <button className="pronostico-btn">Eliminar último lote</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h2>No hay lotes para mostrar</h2>
                    </div>
                </div> 
            </div>   
            <div className="mt-5">
                <div>
                    <h2>Lotes de sementales gestión</h2>
                </div>
                <div className="flex justify-between mt-5">
                    <div className="w-1/2">
                        <div>
                            <label>Ingreso a cuarentena</label>
                            <div className="pronostico-input">
                                <input type="date" />
                            </div>
                        </div>
                        <div>
                            <label>Sementales en lotes</label>
                            <div className="pronostico-input">
                                <input type="number" />
                            </div>
                        </div>
                        <div>
                            <button className="pronostico-btn">Agregar lote</button>
                            <button className="pronostico-btn">Eliminar último lote</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h2>No hay lotes para mostrar</h2>
                    </div>
                </div> 
            </div>   
            <div>
                <button className="button mt-5">Aplicar cambios</button>
            </div> 
        </div>
    </>
    )
}
export default Pronostico;