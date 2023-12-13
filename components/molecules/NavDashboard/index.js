import Image from "next/image";

const NavDashboard = ({ svg, section, id }) => {
    return (
        <div className="dashboard-nav">
            <div className="rounded-full object-cover border-solid border-4 border-white cursor-pointer mb-5">
                <Image src={ svg } width={ 50 } height={ 50 } alt="icon" className="p-3" />
            </div>
            <div className="dashboard-section">
                <h1>{ section }</h1>
            </div>
        </div>
    )
}
export default NavDashboard;