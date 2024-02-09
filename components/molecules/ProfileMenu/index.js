import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const ProfileMenu = ({ data }) => {
  const [datosUsuarioExpandido, setDatosUsuarioExpandido] = useState(false);
  const [responsabilidadesExpandido, setResponsabilidadesExpandido] = useState(false);
  const [ubicacionTrabajoExpandido, setUbicacionTrabajoExpandido] = useState(false);
  const [eppExpandido, setEppExpandido] = useState(false);
  const router = useRouter();

  return (
    <div>
        <div className="expanded-menu" >
            <div className="font-bold flex justify-between" onClick={() => router.push("./PerfilUsuario/UserData")}>
                <div>
                    Datos de Usuario
                </div>
                <div>
                    <Image src={"/images/svg/black-arrow.png"} 
                        width={30}
                        height={30}
                        alt="Black Arrow" className="ml-2"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
        <div className="expanded-menu" >
            <div className="font-bold flex justify-between" onClick={() => setResponsabilidadesExpandido(!responsabilidadesExpandido)}>
                <div>
                    Responsabilidades
                </div>
                <div>
                    <Image src={"/images/svg/black-arrow.png"} 
                        width={30}
                        height={30}
                        alt="Black Arrow" className={`${ !responsabilidadesExpandido ? "" : "transition-transform transform rotate-90"} ml-2`} 
                        loading="lazy"
                    />
                </div>
            </div>
            {responsabilidadesExpandido && (
                <ul className="mt-2 leading-10 w-full"
                onClick={() => setResponsabilidadesExpandido(!responsabilidadesExpandido)}
                >
                    {data[0].responsabilidad.map((item, index)=> (
                            <li key={index}>{item.nombre}</li>
                    ))}
                </ul>

            )}
        </div>
        <div className="expanded-menu" >
            <div className="font-bold flex justify-between" onClick={() => setUbicacionTrabajoExpandido(!ubicacionTrabajoExpandido)}>
                <div>
                    Ubicación de Trabajo
                </div>
                <div>
                    <Image src={"/images/svg/black-arrow.png"} 
                        width={30}
                        height={30}
                        alt="Black Arrow" className={`${ !ubicacionTrabajoExpandido ? "" : "transition-transform transform rotate-90"} ml-2`} 
                        loading="lazy"
                    />
                </div>
            </div>
            {ubicacionTrabajoExpandido && (
                <ul className="mt-2 leading-10 w-full"
                onClick={() => setUbicacionTrabajoExpandido(!ubicacionTrabajoExpandido)}
                >
                    <li>Ciudad: Puebla</li>
                    <li>País: Mexico</li>
                </ul>
            )}
        </div>
        <div className="expanded-menu" >
            <div className="font-bold flex justify-between" onClick={() => setEppExpandido(!eppExpandido)}>
                <div>
                    EPP
                </div>
                <div>
                    <Image src={"/images/svg/black-arrow.png"} 
                        width={30}
                        height={30}
                        alt="Black Arrow" className={`${ !eppExpandido ? "" : "transition-transform transform rotate-90"} ml-2`}
                        loading="lazy"
                    />
                </div>
            </div>
            {eppExpandido && (
                <ul className="mt-2 leading-10 w-full"
                onClick={() => setEppExpandido(!eppExpandido)}
                >
                {data.map((item, index)=> (
                    <li key={index}>{item.epp}</li>
                ))}
             </ul>
            )}
        </div>
    </div>
  );
};

export default ProfileMenu;
export const getServerSideProps = async () => {
    const title = "Constanza";
    const description =
      "Perfil de usuarios";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
};