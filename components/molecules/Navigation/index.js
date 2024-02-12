import Link from 'next/link';
import Image from 'next/image';
import burguer from '@/public/images/svg/hamburguer.png';
import srs from '@/public/Logos/ACELogo.png';
import logo from '@/public/images/icon/logo_blanco.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import foto from '@/public/images/imagenes/user.png';
import config from '../../../config.json';

const Navigation = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [tokenVerified, setTokenVerified] = useState(false);
  const currentPage = router.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGestationOpen, setIsGestationOpen] = useState(false);
  const [isMaternidadOpen, setIsMaternidadOpen] = useState(false);
  const [rango, setRango] = useState('');
  const [isZenOpen, setIsZenOpen] = useState(false);
  const [data, setData] = useState([
    {
      picture: foto,
      nombre: 'Usuario',
    },
  ]);
  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    let rango = '';
    if (token) {
      const decodedToken = jwt.decode(token);
      rango = decodedToken.rango;
      setRango(rango);
    } else {
      console.error('No se encontró el token en localStorage.');
    }
  }, []);

  const toggleGestation = () => {
    setIsGestationOpen(!isGestationOpen);
    if (isMaternidadOpen) {
      setIsMaternidadOpen(false);
    }
  };

  const toggleMaternidad = () => {
    setIsMaternidadOpen(!isMaternidadOpen);
    if (isGestationOpen) {
      setIsGestationOpen(false);
    }
  };

  const toggleZen = () => {
    setIsZenOpen(!isZenOpen);
    if (isZenOpen) {
      setIsZenOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const usuariojson = Cookies.get('userData');
  const userData = usuariojson ? JSON.parse(usuariojson) : null;

  const tienePermiso = (rango, ruta) => {
    const permisosConfig = config.permisos;

    if (permisosConfig.hasOwnProperty(rango)) {
      const permisoConfig = permisosConfig[rango];

      if (permisoConfig.hasOwnProperty('ruta')) {
        const rutasPermitidas = permisoConfig.ruta;

        if (rutasPermitidas === true) {
          return true;
        } else if (Array.isArray(rutasPermitidas)) {
          return rutasPermitidas.includes(ruta);
        }
      }
    }
    return false;
  };

  const cerrarSesion = () => {
    localStorage.clear();
    router.push('/Login');
  };

  return (
    <>
      <header className="navbar flex items-center justify-between bg-gray-700 text-white text-sm py-4 px-4">
        <button onClick={toggleSidebar}>
          <Image src={burguer} width={20} height={20} alt="burguer" />
        </button>
        <div className="flex items-center">
          <div className="cursor-pointer flex items-center">
            <Link href="/" className="flex items-center">
              <div className="mr-5 flex">
                <Image
                  src={logo}
                  width={40}
                  height={40}
                  alt="Logo"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-center items-center">
                <label className="font-semibold">Constanza</label>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex">
          <Image
            src={srs}
            width={100}
            height="auto"
            alt="srs-logo"
            loading="lazy"
          />
        </div>
      </header>
      <div
        className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`sidebar z-50 h-screen text-white w-64 p-4 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out fixed top-0 left-0`}
      >
        <div
          onClick={toggleSidebar}
          className="flex justify-end items-end pt-1"
        >
          <Image src={'/images/svg/x-w.png'} width={20} height={20} alt="x" />
        </div>
        <div className="flex pt-5" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <Image
              src={'/images/svg/moon.png'}
              width={30}
              height={30}
              alt="moon"
            />
          ) : (
            <Image src={'/images/svg/sun.png'} width={30} height={30} alt="sun" />
          )}
        </div>
        <div className="side flex flex-col space-y-2 overflow-hidden">
          <div id="inner" className="flex flex-col space-y-2">
            {tienePermiso(rango, '/Alertas') && (
              <Link
                href="../../Alertas"
                className={`pr-5 ${currentPage === '/Alertas' ? 'active' : ''}`}
              >
                <div className="flex pt-5">
                  <svg
                    width="24"
                    height="24"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-2 nav-icon"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88208 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Alertas
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/') && (
              <Link
                href="/"
                className={`hover:font-semibold ${
                  currentPage === '/' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/home.png'}
                    width={20}
                    height={20}
                    alt="user"
                    className="mr-2 nav-icon"
                  />{' '}
                  Home
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/RegistroUsuarios') && (
              <Link
                href="../../RegistroUsuarios"
                className={`hover:font-semibold ${
                  currentPage === '/RegistroUsuarios' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/user.png'}
                    width={20}
                    height={20}
                    alt="user"
                    className="mr-2 nav-icon"
                  />{' '}
                  Usuarios
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/RegistroTransporte') && (
              <Link
                href="../../RegistroTransporte"
                className={`hover:font-semibold ${
                  currentPage === '/RegistroTransporte' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/truck.png'}
                    width={20}
                    height={20}
                    alt="transporte"
                    className="mr-2 nav-icon"
                  />
                  Transportes
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/Medicamento') && (
              <Link
                href="../../Medicamento"
                className={`hover:font-semibold ${
                  currentPage === '/Medicamento' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/medicine.png'}
                    width={20}
                    height={20}
                    alt="medicine"
                    className="mr-2 nav-icon"
                  />
                  Medicamento
                </div>
              </Link>
            )}
            {/*<Link href="../../MateriasPrimas" className={`hover:font-semibold ${currentPage === '/MateriasPrimas' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/hammer.png"} width={20} height={20} alt="hammer" className="mr-2" />Materias primas
                        </div>
                    </Link>*/}
            {tienePermiso(rango, '/RFID') && (
              <Link
                href="../../RFID"
                className={`hover:font-semibold ${
                  currentPage === '/RFID' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/label.png'}
                    width={20}
                    height={20}
                    alt="label"
                    className="mr-2 nav-icon"
                  />
                  Cerdos
                </div>
              </Link>
            )}
            {/*<Link href="../../RegistroAlimentos" className={`hover:font-semibold ${currentPage === '/RegistroAlimentos' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/food.png"} width={20} height={20} alt="label" className="mr-2" />Alimentos
                        </div>
                    </Link>*/}
            {tienePermiso(rango, '/RegistroCerdos') && (
              <Link
                href="../../RegistroCerdos"
                className={`hover:font-semibold ${
                  currentPage === '/RegistroCerdos' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/pig.png'}
                    width={20}
                    height={20}
                    alt="pig"
                    className="mr-2 nav-icon"
                  />
                  Registro Cerdos
                </div>
              </Link>
            )}
            {/*<Link href="../../RegistroInseminacion" className={`hover:font-semibold ${currentPage === '/RegistroInseminacion' ? 'font-semibold' : ''} pt-5`}>
                        <div className="flex">
                            <Image src={"/images/svg/drop.png"} width={20} height={20} alt="drop" className="mr-2" />Inseminacion
                        </div>
                    </Link>*/}
            {tienePermiso(rango, '/Graphicator') && (
              <Link
                href="../../Graphicator"
                className={`hover:font-semibold ${
                  currentPage === '/Graphicator' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/graph.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Solicitud de alimentos
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/RegistroProveedores') && (
              <Link
                href="../../RegistroProveedores"
                className={`hover:font-semibold ${
                  currentPage === '/RegistroProveedores' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/provider.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Registro de proveedores
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/Licitacion') && (
              <Link
                href="../../Licitacion"
                className={`hover:font-semibold ${
                  currentPage === '/Licitacion' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/licitacion.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Licitación
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/Compras') && (
              <Link
                href="../../Compras"
                className={`hover:font-semibold ${
                  currentPage === '/Compras' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/shopping.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Compras
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/SolicitudCerdo') && (
              <Link
                href="../../SolicitudCerdo"
                className={`hover:font-semibold ${
                  currentPage === '/SolicitudCerdo' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/solicitud.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Solicitud de cerdo
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/SeleccionProveedor') && (
              <Link
                href="../../SeleccionProveedor"
                className={`hover:font-semibold ${
                  currentPage === '/SeleccionProveedor' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/selection.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Seleccion de proveedor
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/SolicitudVacunas') && (
              <Link
                href="../../SolicitudVacunas"
                className={`hover:font-semibold ${
                  currentPage === '/SolicitudVacunas' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/vaccine.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Solicitud de vacunas
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/Chat') && (
              <Link
                href="../../Chat"
                className={`hover:font-semibold ${
                  currentPage === '/Chat' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/chat.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Chat
                </div>
              </Link>
            )}
            {tienePermiso(rango, '/Proveedor') && (
              <Link
                href="../../Proveedor"
                className={`hover:font-semibold ${
                  currentPage === '/Proveedor' ? 'font-semibold' : ''
                } pt-5`}
              >
                <div className="flex">
                  <Image
                    src={'/images/svg/box.png'}
                    width={20}
                    height={20}
                    alt="graph"
                    className="mr-2 nav-icon"
                  />
                  Perfil proveedor
                </div>
              </Link>
            )}
            {/*
                    <div className="pt-5">
                        <div className="flex justify-between cursor-pointer" onClick={toggleGestation}>
                            Gestaciones
                            <Image src={"/images/svg/arrow.png"} width={20} height={20} alt="arrow" className={`transform ${isGestationOpen ? 'rotate-90' : ''}`} />
                        </div>
                        {isGestationOpen && (
                            <div className="pl-5 grid">
                                <Link href="../../Gestacion1" className="hover:font-semibold">Gestación 1</Link>
                                <Link href="../../Gestacion2" className="hover:font-semibold">Gestación 2</Link>
                                <Link href="../../Gestacion3" className="hover:font-semibold">Gestación 3</Link>
                                <Link href="../../Gestacion4" className="hover:font-semibold">Gestación 4</Link>
                                <Link href="../../Gestacion5" className="hover:font-semibold">Gestación 5</Link>
                            </div>
                        )}
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-between cursor-pointer" onClick={toggleMaternidad}>
                            Maternidades
                            <Image src={"/images/svg/arrow.png"} width={20} height={20} alt="arrow" className={`transform ${isMaternidadOpen ? 'rotate-90' : ''}`} />
                        </div>
                        {isMaternidadOpen && (
                            <div className="pl-5 grid">
                                <div><Link href="../../Maternidad1" className="hover:font-semibold">Maternidad 1</Link></div>
                                <div><Link href="../../Maternidad2" className="hover:font-semibold">Maternidad 2</Link></div>
                                <div><Link href="../../Maternidad3" className="hover:font-semibold">Maternidad 3</Link></div>
                                <div><Link href="../../Maternidad4" className="hover:font-semibold">Maternidad 5</Link></div>
                                <div><Link href="../../Maternidad5" className="hover:font-semibold">Maternidad 6</Link></div>

                            </div>
                        )}
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-between cursor-pointer" onClick={toggleZen}>
                            Zen
                            <Image src={"/images/svg/arrow.png"} width={20} height={20} alt="arrow" className={`transform ${isZenOpen ? 'rotate-90' : ''}`} />
                        </div>
                        {isZenOpen && (
                            <div className="pl-5 grid">
                                <div><Link href="../../Zen1" className="hover:font-semibold">Zen 1</Link></div>
                                <div><Link href="../../Zen2" className="hover:font-semibold">Zen 2</Link></div>
                                <div><Link href="../../Zen3" className="hover:font-semibold">Zen 3</Link></div>
                                <div><Link href="../../Zen4" className="hover:font-semibold">Zen 5</Link></div>
                                <div><Link href="../../Zen5" className="hover:font-semibold">Zen 6</Link></div>

                            </div>
                        )}
                    </div>
                        */}
          </div>
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-center pt-2 pb-20 flex-col text-center"
            >
              {tienePermiso(rango, '/PerfilUsuario') && (
                <Link href="../../PerfilUsuario">
                  <div className="flex justify-center">
                    <Image
                      src={item.picture}
                      width={50}
                      height={50}
                      alt="profile-pic"
                      className="rounded-full w-10 h-10 object-cover border-solid border-2 border-indigo-400 cursor-pointer"
                    />
                  </div>
                  <p>Ver perfil</p>
                </Link>
              )}
              <div
                className="flex pt-2 justify-center cursor-pointer"
                onClick={cerrarSesion}
              >
                <Image
                  src={'/images/svg/sesion.png'}
                  width={20}
                  height={20}
                  alt="graph"
                  className="mr-2 nav-icon"
                />
                Cerrar sesión
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
