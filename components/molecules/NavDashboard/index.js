const NavDashboard = ({ svg, section, id }) => {
    return (
        <div className="dashboard-nav" id={ id }>
            <div className="dashboard-section">
                <div className="cerdito">
                    <img src={ svg } />                          
                </div>
                <h1>Dashboard: { section }</h1>
            </div>
            <div className="dashboard-filtro">
                <label>Filtrar por zona:</label>
                <select>
                    <option value="volvo">Santiago</option>
                    <option value="saab">Opcion 1</option>
                    <option value="mercedes">Opcion 2</option>
                    <option value="audi">Opcion 3</option>
                </select>
            </div>
        </div>
    )
}
export default NavDashboard;