import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navigation = () => {
    const router = useRouter();
    const currentPage = router.pathname;
    const [navbarClass, setNavbarClass] = useState("");
    const getNavbarClass = () => {
        currentPage === '/' ?
            setNavbarClass("navbar")
            : 
            setNavbarClass("navbar-porcinos")
        }
    useEffect(() => {
        getNavbarClass();
    }, [])

    return(
    <>
    <header className={navbarClass}>
    <div className="navigation">
        <div className="flex items-center">
            <Link href="/" className="flex items-center">
                <div className="mr-5 flex">
                    <img src="images/icon/logo_color.png"/>
                </div>
                <div className="flex justify-center items-center">
                    <label className="font-semibold">Constanza</label>
                </div>  
            </Link>
        </div>
        {/*
        <div className="flex searchbar justify-center items-center">
            <div className="searchbar-icon">
            <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 15.5L19 19" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
            <input type="text" placeholder="Buscar en Constanza" size="30" className="search-input"/>
        </div>
    */}
        <div className="flex justify-center items-center">
            <div className="mr-5 flex">
                <Link href="../../Alertas" className="pr-2">
                <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </Link>
            </div>
            <div className="flex">
                <Link href="../../RegistroUsuarios" className="pr-2">
                    Usuarios
                </Link>
                <Link href="../../RegistroTransporte" className="pr-2">
                    Transportes
                </Link>
                <Link href="../../Medicamento" className="pr-2">
                    Medicamento
                </Link>
                <Link href="../../MateriasPrimas" className="pr-2">
                    Materias primas
                </Link>
                <Link href="../../Pronostico" className="pr-2">
                    Pronóstico
                </Link>
                <Link href="../../Aduana" className="pr-2">
                    Aduana
                </Link>
            </div>  
        </div>
    </div>
    </header>
    </>
    )
}
export default Navigation;