const NavDashboard = ({ svg, section, id }) => {
    return (
        <div className="dashboard-nav">
            <div className="dashboard-section">
                <h1>Dashboard: { section }</h1>
            </div>
        </div>
    )
}
export default NavDashboard;