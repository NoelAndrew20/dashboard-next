const GraphInfo = ({label, cant, id}) => {
    return (
        <div className="graph-info mt-2" id={id}>
            <label>{label}</label>
            <p>{cant}</p>
        </div>
    )
}
export default GraphInfo;