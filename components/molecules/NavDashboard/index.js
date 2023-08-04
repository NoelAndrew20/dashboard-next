const NavDashboard = ({ svg, section, id }) => {
    return (
        <div className="dashboard-nav" id={ id }>
            <div className="dashboard-section">
                <h1>Dashboard: { section }</h1>
            </div>
        </div>
    )
}
export default NavDashboard;