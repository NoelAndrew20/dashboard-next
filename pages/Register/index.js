import StaticMeta from '@/components/atoms/StaticMeta';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Register = ({ title, description, image }) => {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nombre:", name);
    console.log("Email:", email);
    console.log("Contraseña:", password);
  };

  return (
    <>
    <StaticMeta
        title={title}
        description={description}
        image={image}
    />
    <div className="flex min-h-screen flex-col items-center p-24">
        <div className="wrapper flex justify-center">
            <div className="w-1/2">
                <div className="flex justify-center">
                    <div className="mr-5">
                        <Image src="/images/icon/logo_color.png" width={30} height={30} alt="logo" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Registrate</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 w-full border rounded-md focus:border-blue-500 focus:outline-none"
                            value={name}
                            onChange={handleNameChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full border rounded-md focus:border-blue-500 focus:outline-none"
                            value={email}
                            onChange={handleEmailChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full border rounded-md focus:border-blue-500 focus:outline-none"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
                <div className="mt-5 text-xs flex justify-center text-blue-500">
                    <Link href="../Login">
                        Ya tienes cuenta? Inicia sesión
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Register;

export const getServerSideProps = async () => {
    const title = "Constanza - Registro";
    const description =
      "Registro de constanza";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
};
