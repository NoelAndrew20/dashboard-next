import Image from "next/image";
import Logo from "@/public/images/icon/logotermo.png"
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center">
        <div className="flex justify-center items-center">
          <Image src={Logo} width={70} height={70} alt="termo"/>
          <span>&copy; 2023 Constanza</span>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  