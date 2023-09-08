import { useState, useEffect } from 'react';
import Image from 'next/image';
import StaticMeta from '@/components/atoms/StaticMeta';
import Link from 'next/link';
import usuarios from '../../utils/usuarios.json';
import { useRouter } from 'next/router'

const Login = ({ title, description, image }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter()
  const [dataIndex, setDataIndex] = useState(0);
  const [error, setError] = useState(null);
  
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Correo electrónico no válido");
    } else {
      setEmailError("");
    }

    setIsButtonDisabled(!validateForm(value, password)); 
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
    } else {
      setPasswordError("");
    }

    setIsButtonDisabled(!validateForm(email, value)); 
  };

  const validateForm = (email, password) => {
    return email.trim() !== "" && password.trim() !== "" && validateEmail(email) && password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usuarios.find((userData) => userData.email === email);
    if (!user) {
      setError("No hay ninguna cuenta con este correo.");
    } else if (user.password !== password) {
      setError("Contraseña incorrecta.");
    } else {
      router.push("../")
    }
}

  //esta funcion está para rellenar los datos de prueba
  useEffect(() => {
    setEmail(usuarios[dataIndex].email);
    setPassword(usuarios[dataIndex].password);
  }, [dataIndex]);

  return (
    <>
      <StaticMeta
        title={title}
        description={description}
        image={image}
      />
      <div className="flex min-h-screen flex-col items-center p-24">
        <div className="wrapper flex justify-center">
          <div className="pt-10 w-1/2">
            <div className="flex justify-center">
              <div className="mr-5">
                <Image src="/images/icon/logo_color.png" width={30} height={30} alt="logo" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
              </div>
            </div>
            {error && (
                <div className="text-red-500 font-bold mt-2">
                    {error}
                </div>
            )}
            <span className="text-xs italic">solo borren la m en .com y vuelvan a ponerla para loguearse</span>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border rounded-md focus:border-blue-500 focus:outline-none"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </div>
              <div className="flex justify-center">
                <button
                    type="submit"
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={isButtonDisabled}
                >
                    Iniciar sesión
                </button>
              </div>
            </form>
            <div className="mt-5 text-xs flex justify-center text-blue-500">
              <Link href="../Register">
                No tienes cuenta? Registrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
export const getServerSideProps = async () => {
    const title = "Constanza - Login";
    const description = "Login de Constanza";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
};
