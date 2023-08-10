import InfoCard from '../../atoms/InfoCard';
const Herramientas = () => {
    return (
    <div className="herramientas">
        <div className="herramientas-title">
            <h1>Herramientas</h1>
            <h5>Dashboard generales</h5>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-3">
                <InfoCard/>
            </div>
            <div className="col-md-3">
                <InfoCard/>
            </div>
            <div className="col-md-3">
                <InfoCard/>
            </div>
        </div>
        <div className="row d-flex justify-content-center pt-5">
            <div className="col-md-3">
                <InfoCard/>
            </div>
            <div className="col-md-3">
                <InfoCard/>
            </div>
            <div className="col-md-3">
            <   InfoCard/>
            </div>
      </div>   
    </div>   
    )
}
export default Herramientas;