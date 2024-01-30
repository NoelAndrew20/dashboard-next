import Image from 'next/image';
import Logo from '@/public/images/icon/logotermo.png';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="flex justify-center items-center">
        <Image src={Logo} width={70} height={70} alt="termo" loading="lazy" />
        <span>&copy; 2023 Constanza</span>
        {router.pathname === '/Proveedor/LicitacionPro' ||
        router.pathname === '/Proveedor/Productos' ? (
          <Link href={"/aviso-privacidad"}><span className="ml-10 cursor-pointer">Aviso de privacidad</span></Link>
        ) : (
          ''
        )}
      </div>
    </footer>
  );
};

export default Footer;
