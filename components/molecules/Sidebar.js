import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/router";
import ChatWindow from './ChatWindow';

const sidebarItems = [
  {
    name: "Herramienta 1",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Herramienta 2",
    href: "/porcinos",
    icon: BsPeople,
  },
  {
    name: "Herramienta 3",
    href: "/registro-porcinos",
    icon: FiMail,
  },
  {
    name: "Herramienta 4",
    href: "/contact",
    icon: TiContacts,
  },
  {
    name: "Herramienta 5",
    href: "",
    icon: TiContacts,
  },
];
const sidebarItems2 = [
  {
    name: "Herramienta 1",
    href: "",
    icon: AiOutlineHome,
  },
  {
    name: "Herramienta 2",
    href: "",
    icon: BsPeople,
  },
  {
    name: "Herramienta 3",
    href: "",
    icon: FiMail,
  },
  {
    name: "Herramienta 4",
    href: "",
    icon: TiContacts,
  },
  {
    name: "Herramienta 5",
    href: "",
    icon: TiContacts,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <button className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        
        <span className="sidebar_title">Camaras</span>
        <div className="sidebar_div"></div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${
                    router.pathname === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <span className="sidebar_title">RH</span>
        <div className="sidebar_div"></div>
        <ul className="sidebar__list">
          {sidebarItems2.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${
                    router.pathname === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <div>
        <ChatWindow></ChatWindow>
      </div>
    </div>
  );
};

export default Sidebar;
