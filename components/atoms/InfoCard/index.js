const InfoCard = () => {
    return (
        <div className="info-card d-flex flex-column">
            <div className="d-flex p-2">
                <div className="cerdito">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="#231f20"><path d="m29 12h-1.85a.42.42 0 0 1 -.4-.33 4.82 4.82 0 0 0 -3.4-3.51l.72-2.92a1 1 0 0 0 -.27-1 1 1 0 0 0 -.95-.24l-1.43.37a5.66 5.66 0 0 0 -4 3.6h-7.08a6.9 6.9 0 0 0 -6.06 3.62l.11-.31a1 1 0 0 0 -.64-1.26 1 1 0 0 0 -1.27.64l-.36 1.1a2.48 2.48 0 0 0 .35 2.24 2.37 2.37 0 0 0 1.95 1h.1a1 1 0 0 0 1-.81 4.94 4.94 0 0 1 4.82-4.19h7.84a1 1 0 0 0 .95-.69l.17-.52a3.75 3.75 0 0 1 2.43-2.41l-.58 2.38a1 1 0 0 0 .18.86 1 1 0 0 0 .79.38 2.78 2.78 0 0 1 2.69 2.15 2.41 2.41 0 0 0 2.34 1.85h.85v2h-.84a2.29 2.29 0 0 0 -2.24 1.78 5.7 5.7 0 0 1 -.7 1.69 5.84 5.84 0 0 1 -.92 1.12 3.77 3.77 0 0 0 -1.2 2.76v2.65h-1.93v-4a1 1 0 0 0 -2 0h-2.25a2.86 2.86 0 0 0 .29-.79 3.35 3.35 0 0 0 0-1.41 1 1 0 0 0 -2 .4 1.31 1.31 0 0 1 0 .59c-.19.86-1.28 1.25-1.33 1.27l-.1.05-.2.14-.09.09a1.37 1.37 0 0 0 -.13.2.31.31 0 0 0 -.05.1 1 1 0 0 0 -.07.35v3h-1.91v-2.22a4.14 4.14 0 0 0 -2-3.53l-.56-.35a5 5 0 0 1 -2-2.28 1 1 0 1 0 -1.77.78 7 7 0 0 0 1.89 2.61l-.41.83a4.55 4.55 0 0 0 -.48 2v3.17a1 1 0 0 0 1 1h3a1 1 0 0 0 .17 0h.16 3.94a1 1 0 0 0 1-1v-3h.73v3a1 1 0 0 0 1 1h7.1a1 1 0 0 0 1-1v-3.65a1.75 1.75 0 0 1 .56-1.3 7.61 7.61 0 0 0 1.25-1.52 7.39 7.39 0 0 0 1-2.3.29.29 0 0 1 .29-.23h1.8a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-22 11.83a2.47 2.47 0 0 1 .27-1.13l.28-.57a2.15 2.15 0 0 1 .78 1.64v2.23h-1.33zm10 .17h1.17v2h-1.17z"/><path d="m23.14 13a1 1 0 0 0 -1-1 1 1 0 1 0 1 1z"/></g></svg>
                </div>
                <div className="d-flex flex-column justify-content-center p-2">
                    <h3>Cerdos</h3>
                    <h5>Información general</h5>
                </div>
            </div>
            <div>
                <img src="/images/imagenes/graphic_placeholder.png" height={180} className="info-chart"/>
            </div>
            <p>
                Dashboard con información acerca de la cantidad de cerdos totales y la cantidad de cerdos por área, etapa y tipo. Se puede consultar información acerca de la variación de la cantidad de cerdos a través del tiempo entre otros datos.
            </p>
            <div className="d-flex justify-content-center">
                <button>
                    Ver más
                </button>
            </div>
        </div>
    )
}
export default InfoCard;