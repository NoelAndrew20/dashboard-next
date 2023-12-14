import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const PerfilProveedor = ({ data }) => {
  const [productoExpandido, setProductoExpandido] = useState(false);
  const [licitacionExpandido, setLicitacionExpandido] = useState(false);
  const router = useRouter();

  return (
    <div>
        <div className="expanded-menu" >
            <div className="font-bold text-blue-600 flex justify-between" onClick={() => router.push("./PerfilProveedor/UserData")}>
                <div>
                    Datos de Usuario
                </div>
                <div>
                    <Image src={"/images/svg/black-arrow.svg"} 
                        width={30}
                        height={30}
                        alt="Black Arrow" className="ml-2"
                    />
                </div>
            </div>
        </div>
        <div className="expanded-menu" >
            <div className="font-bold text-blue-600 flex justify-between" onClick={() => router.push("./Proveedor/Productos")}>
                <div>
                    Producto
                </div>
                <div>
                    <Image src={"/images/svg/black-arrow.svg"} 
                        width={30}
                        height={30}
                        alt="Black Arrow" className={`${ !productoExpandido ? "" : "transition-transform transform rotate-90"} ml-2`} 
                    />
                </div>
            </div>
            {productoExpandido && (
                <ul className="mt-2 leading-10 w-full"
                onClick={() => setProductoExpandido(!productoExpandido)}
                >
                    {data[0].responsabilidad.map((item, index)=> (
                            <li key={index}>{item.nombre}</li>
                    ))}
                </ul>

            )}
        </div>
        <div className="expanded-menu" >
            <div className="font-bold text-blue-600 flex justify-between" onClick={() => router.push("./Proveedor/LicitacionPro")}>
                <div>
                    Licitación
                </div>
                <div>
                    <Image src={"/images/svg/black-arrow.svg"} 
                        width={30}
                        height={30}
                        alt="Black Arrow" className={`${ !licitacionExpandido ? "" : "transition-transform transform rotate-90"} ml-2`} 
                    />
                </div>
            </div>
            {licitacionExpandido && (
                <ul className="mt-2 leading-10 w-full"
                onClick={() => setLicitacionExpandido(!licitacionExpandido)}
                >
                    <li>Ciudad: Puebla</li>
                    <li>País: Mexico</li>
                </ul>
            )}
        </div>
    </div>
  );
};

export default PerfilProveedor;
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