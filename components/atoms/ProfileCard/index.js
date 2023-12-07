import { useDarkMode } from "@/context/DarkModeContext";
import Image from "next/image";
import { useState } from "react";
const ProfileCard = ({ data }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return(
        <>
        {data.map((item, index) => (
            <div key={index}>
                <div className="flex justify-center">
                    <Image 
                        src={ item.picture } 
                        width={150} 
                        height={150} 
                        alt="profile-pic" 
                        className="rounded-full w-48 h-48 object-cover border-solid border-8 border-indigo-400 cursor-pointer"
                        onClick={openModal}
                    />
                </div>
                <div className={`modal ${isModalOpen ? 'block' : 'hidden'}`}>
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={closeModal}></div>
                    <div className="rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto z-50 flex justify-center">
                        <Image 
                        src={ item.picture } 
                        height={300} 
                        width={300}
                        alt="profile-pic" 
                        />                    
                    </div>
                </div>
             
                <div className="flex justify-center font-bold mt-3">
                    <p>{ item.nombre } {item.apellidop} {item.apellidom}</p>
                </div>
            </div>
        ))}
        </>
    )
}
export default ProfileCard;