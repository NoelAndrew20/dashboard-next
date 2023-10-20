import Link from 'next/link';
import Image from 'next/image';
import burguer from '@/public/images/svg/hamburguer.svg'
import x from '@/public/images/svg/x-w.svg'
import srs from '@/public/images/icon/srs.png'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Cookies from 'js-cookie';

const Navigation = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();
    const currentPage = router.pathname;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const usuariojson = Cookies.get('userData');
    const userData = usuariojson ? JSON.parse(usuariojson) : null;
    //console.log(userData);

    // console.log('Grupo usuario:',currentUser.user.grupo);
    return (
        <>
            <header className="navbar flex items-center justify-between bg-gray-700 text-white text-sm py-4 px-4">
                <button onClick={toggleSidebar}>
                    <Image src={burguer} width={20} height={20} alt="burguer"/>
                </button>
                <div className="flex items-center">
                    <div className="cursor-pointer flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="mr-5 flex">
                                <img src="images/icon/logo_color.png" alt="Logo"/>
                            </div>
                            <div className="flex justify-center items-center">
                                <label className="font-semibold">Constanza</label>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex">
                    <Link href="../../Alertas" className={`pr-5 ${currentPage === '/Alertas' ? 'active' : ''}`}>
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </Link>
                </div>
            </header>
            <div
                className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity ${
                    isSidebarOpen ? 'block' : 'hidden'
                }`}
                onClick={toggleSidebar}
            ></div>

            <div className={`sidebar z-50 h-screen text-white w-64 p-4 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out fixed top-0 left-0`}>
                <div onClick={toggleSidebar} className="flex justify-end items-end pt-1">
                    <Image src={x} width={20} height={20} alt="x"/>
                </div>
                <div className="flex pt-5" onClick={toggleDarkMode}>
                    {isDarkMode ? 
                        <Image src={"/images/svg/moon.svg"} width={30} height={30} alt="moon" />
                        :
                        <Image src={"/images/svg/sun.svg"} width={30} height={30} alt="sun" />
                    }
                </div>
                <div className="side flex flex-col space-y-2 overflow-hidden" >
                    <div id="inner" className='flex flex-col space-y-2'>
                    {/*{userData.user.grupo === 'Grupo A' && (*/}
                    <Link href="/" className={`hover:font-semibold ${currentPage === '/' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/home.svg"} width={20} height={20} alt="user" className="mr-2" /> Home
                        </div>
                    </Link>
                      {/*})} */}
                      {/*{userData.user.grupo === 'Grupo B' &&  (*/}
                    <Link href="../../RegistroUsuarios" className={`hover:font-semibold ${currentPage === '/RegistroUsuarios' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/user.svg"} width={20} height={20} alt="user" className="mr-2" /> Usuarios
                        </div>
                    </Link>
                    {/*})}*/}
                        {/*{userData.user.grupo === 'Grupo B' &&(*/}
                    <Link href="../../RegistroTransporte" className={`hover:font-semibold ${currentPage === '/RegistroTransporte' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/truck.svg"} width={20} height={20} alt="transporte" className="mr-2" />Transportes
                        </div>
                    </Link>
                        {/*)}*/}
                    <Link href="../../Medicamento" className={`hover:font-semibold ${currentPage === '/Medicamento' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/medicine.svg"} width={20} height={20} alt="medicine" className="mr-2" />Medicamento
                        </div>
                    </Link>
                    <Link href="../../MateriasPrimas" className={`hover:font-semibold ${currentPage === '/MateriasPrimas' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/hammer.svg"} width={20} height={20} alt="hammer" className="mr-2" />Materias primas
                        </div>
                    </Link>
                    <Link href="../../Pronostico" className={`hover:font-semibold ${currentPage === '/Pronostico' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/calculator.svg"} width={20} height={20} alt="calculator" className="mr-2" />Pronóstico
                        </div>
                    </Link>
                    <Link href="../../RFID" className={`hover:font-semibold ${currentPage === '/RFID' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/label.svg"} width={20} height={20} alt="label" className="mr-2" />RFID
                        </div>
                    </Link>
                    <Link href="../../RegistroAlimentos" className={`hover:font-semibold ${currentPage === '/RegistroAlimentos' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/food.svg"} width={20} height={20} alt="label" className="mr-2" />Alimentos
                        </div>
                    </Link>
                    <Link href="../../RegistroCerdos" className={`hover:font-semibold ${currentPage === '/RegistroCerdos' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/pig.svg"} width={20} height={20} alt="pig" className="mr-2" />Cerdos
                        </div>
                    </Link>
                    <Link href="../../RegistroInseminacion" className={`hover:font-semibold ${currentPage === '/RegistroInseminacion' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/drop.svg"} width={20} height={20} alt="drop" className="mr-2" />Inseminacion
                        </div>
                    </Link>
                    <Link href="../../Graphicator" className={`hover:font-semibold ${currentPage === '/Graphicator' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/graph.svg"} width={25} height={25} alt="graph" className="mr-2" />Menú de alimentos
                        </div>
                    </Link>
                    <Link href="../../PreRegistro" className={`hover:font-semibold ${currentPage === '/PreRegistro' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/pre.svg"} width={20} height={20} alt="graph" className="mr-2" />Pre registro
                        </div>
                    </Link>
                    <Link href="../../RegistroProveedores" className={`hover:font-semibold ${currentPage === '/RegistroProveedores' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/provider.svg"} width={20} height={20} alt="graph" className="mr-2" />Registro de proveedores
                        </div>
                    </Link>
                    <Link href="../../Licitacion" className={`hover:font-semibold ${currentPage === '/Licitacion' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/licitacion.svg"} width={20} height={20} alt="graph" className="mr-2" />Licitación
                        </div>
                    </Link>
                    <Link href="../../Compras" className={`hover:font-semibold ${currentPage === '/Compras' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/shopping.svg"} width={20} height={20} alt="graph" className="mr-2" />Compras
                        </div>
                    </Link>
                    <Link href="../../SeleccionProveedor" className={`hover:font-semibold ${currentPage === '/SeleccionProveedor' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/selection.svg"} width={20} height={20} alt="graph" className="mr-2" />Seleccion de proveedor
                        </div>
                    </Link>
                    </div>
                    <div className="flex justify-center pt-2 pb-20">
                        <Image src={srs} width={100} height={100} alt="srs-logo" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;
