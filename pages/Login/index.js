import { useState, useEffect } from 'react';
import Image from 'next/image';
import StaticMeta from '@/components/atoms/StaticMeta';
import Link from 'next/link';
import usuarios from '../../utils/usuarios.json';
import { useRouter } from 'next/router';
import srs from '@/public/Logos/ACELogo.png';
import Cookies from 'js-cookie';
import load from '../../components/molecules/Carga/index.js';
import { motion, AnimetePresence, AnimatePresence } from 'framer-motion';
import { duration } from 'moment-timezone';
const axios = require('axios');
import jwt from 'jsonwebtoken';

const Login = ({ title, description, image }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();
  const [dataIndex, setDataIndex] = useState(0);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError('Correo electrónico no válido');
    } else {
      setEmailError('');
    }

    setIsButtonDisabled(!validateForm(value, password));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
    } else {
      setPasswordError('');
    }

    setIsButtonDisabled(!validateForm(email, value));
  };
  // //Codigo por si no cuentas con la base de datos
  const validateForm = (email, password) => {
    return (
      email.trim() !== '' &&
      password.trim() !== '' &&
      validateEmail(email) &&
      password.length >= 6
    );
  };

  const apiUrl = 'http://192.168.100.10:3020/login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, { email, password });
      if (response.data.message === 'Inicio de sesión exitoso') {
        localStorage.setItem('token', response.data.token);

        const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        const proveedor = decodedToken.proveedor;

        if (proveedor === 0) {
          router.push('../PerfilUsuario'); // Redirige a la página principal
        }

        if (proveedor === 1) {
          router.push('../Proveedor'); // Redirige a la página licitacion
        }
      } else {
        setError(response.data.message || 'Error en la autenticación');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError('Error al comunicarse con el servidor');

      setEmail('usuario1@example.com');
      setPassword('contraseña1');
      setIsButtonDisabled(false);
      router.push('../');
    }
  };

  return (
    <>
      <StaticMeta title={title} description={description} image={image} />
      <AnimatePresence>
        <motion.div
          initial="initialState"
          animate="animateState"
          exit="exitState"
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },
            exitState: {},
          }}
          transition={{ duration: 2, delay: 1.5 }}
          className="srs-image"
        >
          <div>
            <Image
              src={srs}
              width={200}
              height={200}
              alt="srs-logo"
              className="p-5"
              loading="lazy"
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className=" flex flex-col pr-5 full-viewport">
        <div className="flex justify-center">
          <div>
            <AnimatePresence>
              <motion.div
                initial="initialState"
                animate="animateState"
                exit="exitState"
                variants={{
                  initialState: {
                    y: 100,
                    scale: 4,
                  },
                  animateState: {
                    scale: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: 1,
                      ease: 'easeInOut',
                    },
                  },
                  exitState: {},
                }}
                transition={{ duration: 15 }}
                className="base-page-size"
              >
                <div className="flex flex-col">
                  <div className="flex justify-center border-b border-solid border-black pb-5">
                    <img
                      src="/images/Constanzalogo2.gif"
                      style={{ width: '200px' }}
                    />
                  </div>
                  <div className="flex justify-center pt-2">
                    <h1 className="text-2xl font-semibold mb-4 text-[#818cf8]">
                      Bienvenido!
                    </h1>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {error && (
              <div className="text-red-500 font-bold mt-2">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <AnimatePresence>
                <motion.div
                  initial="initialState"
                  animate="animateState"
                  exit="exitState"
                  variants={{
                    initialState: {
                      opacity: 0,
                      y: 100,
                    },
                    animateState: {
                      opacity: 1,
                      y: 0,
                    },
                    exitState: {},
                  }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="page"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm text-xl font-bold text-gray-700"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 p-2 w-full border rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm">{emailError}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm text-xl font-bold text-gray-700"
                    >
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 p-2 w-full border rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className={`px-4 py-2 button text-white rounded-md hover:bg-blue-600 ${
                        isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      disabled={isButtonDisabled}
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </form>
            <div className="mt-5 text-xs flex justify-center text-blue-500"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
export const getServerSideProps = async () => {
  const title = 'Constanza - Login';
  const description = 'Login de Constanza';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};
/*import { useState, useEffect } from 'react';
import Image from 'next/image';
import StaticMeta from '@/components/atoms/StaticMeta';
import Link from 'next/link';
import usuarios from '../../utils/usuarios.json';
import { useRouter } from 'next/router'
import srs from '@/public/Logos/ACELogo.png'
import pig from '@/public/images/imagenes/cerdo1.png'
import Cookies from 'js-cookie';
import load from '../../components/molecules/Carga/index.js'
import {motion, AnimetePresence, AnimatePresence } from "framer-motion";
import { duration } from 'moment-timezone';


const Login = ({ title, description, image }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter()
  const [dataIndex, setDataIndex] = useState(0);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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
// //Codigo por si no cuentas con la base de datos
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

// //Aqui acaba el codigo si no tienes base de datos



//-------||||||||Comentar si no se tiene base de datos a partir de aqui :D 
//-------vvvvvvvv

// const validateForm = (email, password) => {
//   return (
//     email.trim() !== '' &&
//     password.trim() !== '' &&
//     validateEmail(email) &&
//     password.length >= 6
//   );
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetch('http://localhost:3002/api/pronostico/js/autentificacion/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     console.log(email);
//     console.log(password);
//     if (response.status === 200) {
//       const userData = await response.json(); 
//       console.log(userData);
//       setCurrentUser(userData);
//       Cookies.set('userData',JSON.stringify(userData), {expires: 7});
//       router.push('../');
//     } else {
//       const data = await response.json();
//       setError(data.error || 'Error de autenticación');
//     }
//   } catch (error) {
//     setError('Error de conexión');
//   }
// };

//comentar hasta aqui -----------------


  return (
    <>
      <StaticMeta
        title={title}
        description={description}
        image={image}
      />
      <AnimatePresence>
        <motion.div 
        initial="initialState"
        animate="animateState"
        exit="exitState"
        variants={{
          initialState: {
            opacity: 0,
          },
          animateState: {
            opacity: 1,
          },
          exitState: {

          },
        }}
        transition={{duration: 2,delay: 1.5}}
        className='srs-image'
        >
          <div >
            <Image src={srs} width={200} height={200} alt="srs-logo" className="p-5"/>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="full-viewport">
        <div className=" flex flex-col pr-5">
          <div className="flex justify-center">
            <div>
              <AnimatePresence>
                <motion.div 
                initial="initialState"
                animate="animateState"
                exit="exitState"
                variants={{
                  initialState: {
                    y: 100,
                    scale: 4,
                  },
                  animateState: {
                    scale: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: 1,
                      ease: "easeInOut",
                    },
                   
                  },
                  exitState: {
                    
                  },
                }}
                transition={{duration: 15}}
                className='base-page-size'
                >
                  <div className="flex flex-col">
                    <div className="flex justify-center border-b border-solid border-black pb-5">
                      <img src="/images/Constanzalogo2.gif" style={{width:"200px"}}/>
                    </div>
                    <div className='flex justify-center pt-2'>
                      <h1 className="text-2xl font-semibold mb-4 text-[#3E120A]">Bienvenido!</h1>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {error && (
                  <div className="text-red-500 font-bold mt-2">
                      {error}
                  </div>
              )}
              
             
              <form onSubmit={handleSubmit}>
              <AnimatePresence>
              <motion.div 
                initial="initialState"
                animate="animateState"
                exit="exitState"
                variants={{
                  initialState: {
                    opacity: 0,
                    y: 100,
                  },
                  animateState: {
                    opacity: 1,
                    y: 0,
                  },
                  exitState: {

                  },
                }}
                transition={{duration: 1,delay: 1.5}}
                className='page'>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm text-xl font-bold text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 p-2 w-full border rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm text-xl font-bold text-gray-700">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 p-2 w-full border rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <div className="flex justify-center">
                  <button
                      type="submit"
                      className={`px-4 py-2 button text-white rounded-md hover:bg-blue-600 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={isButtonDisabled}
                  >
                      Iniciar sesión
                  </button>
                </div>
                </motion.div>
                </AnimatePresence>
                
              </form>
              <div className="mt-5 text-xs flex justify-center text-blue-500">
              </div>
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
};*/
