'use client'
import Image from "next/image";
import logoImage from "../../res/logo.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { VscAccount } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCartOutline } from "react-icons/io5";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useState } from "react";
import { MenuHide } from "./MenuHide";
import { IconType } from "react-icons";
import { BsBriefcase } from "react-icons/bs";
import { TbClipboardCheck } from "react-icons/tb";
import { FiHelpCircle } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BiCommentDots } from "react-icons/bi";
import Link from "next/link";

export const NavBar = () => {
  type MenuItem = {
    label: string;
    href?: string;
    subItems?: MenuItem[];
  };

  const [showProducts, setShowProducts] = useState(false)
  const [showServices, setShowServices] = useState(false)
  const [showVacancy, setShowVacancy] = useState(false)
  const [showHamburger, setShowHamburger] = useState(false);

  const iconsList: IconType[] = [BsBriefcase, TbClipboardCheck, FiHelpCircle, IoShieldCheckmarkOutline, BiCommentDots];
  const servicesList: MenuItem[] = [
    { label: "Todos", href: 'todos' },
    { label: "Aerofotometria com Drone", href: 'aerofotometria-com-drone' },
    { label: "Aerofotometria Laser + Drone", href: 'aerofotometria-laser-drone' },
    { label: "Georreferenciamento Rural e Urbano", href: 'georreferenciamento-rural-e-urbano' },
    { label: "Levantamento Topográfico Planialtimétrico com GPS/Estação Total", href: 'levantamento-topografico-planialtimetrico-com-gps-estacao-total' },
    { label: "Levantamento Topográfico Planialtimétrico com Laser Scanner", href: 'levantamento-topografico-planialtimetrico-com-laser-scanner' },
    { label: "Perícia Técnica", href: 'pericia-tecnica' },
    { label: "Medição de Volumer", href: 'medicao-de-volumer' },
    { label: "Batimetria", href: 'batimetria' },
    { label: "Levantamento Planialtimétrico Cadastral", href: 'levantamento-planialimetrico-cadastral' },
    { label: "Cadastro Urbano", href: 'cadastro-urbano' },
    { label: "Levantamento de Rodovias GPS/Estação Total", href: 'levantamento-de-rodovias-gps-estacao-total' },
    { label: "Levantamento de Rodovias Laser Scanner", href: 'levantamento-de-rodovias-laser-scanner' },
    { label: "BIM", href: 'bim' },
    { label: "Asbuilt (Levantamento Industrial com Laser Scanner)", href: 'asbuilt-levantamento-industrial-com-laser-scanner' },
    { label: "Agricultura de Precisão", href: 'agricultura-de-precision' },
    { label: "Outros", href: 'outros' }
  ];
  
  const vacancyList: MenuItem[] = [
    { label: "Vagas", href: 'vagas' }
  ];
  
  const hamburgerList: MenuItem[] = [
    { label: "Quem somos", href: 'quem-somos' },
    { label: "Planos", href: 'planos' },
    { label: "Ajuda", href: 'ajuda' },
    { label: "Políticas", href: 'politicas' },
    { label: "Fale Conosco", href: 'fale-conosco' }
  ];
  
  const productsList: MenuItem[] = [
    { label: "Todos", href: 'produtos' },
    { label: "Estação Local", subItems: [{ label: "Estação Nova", href: 'products/estacao-nova' }, { label: "Estação Usada", href: 'products/estacao-usada' }, { label: "Estação - Acessório", href: 'products/estacao-acessorio' }] },
    { label: "Receptor GNSS", href: 'products/receptor-gnss' },
    { label: "Drones", href: 'products/drones' },
    { label: "Laser", subItems: [{ label: "Scanner", href: 'products/scanner' }, { label: "Outros", href: 'products/outros' }] },
    { label: "Batimetria", href: 'products/batimetria' },
    { label: "Níveis", href: 'products/niveis' },
    { label: "Teodolitos", href: 'products/teodolitos' },
    { label: "Outros", href: 'products/outros' },
    { label: "Agricultura de Precisão", href: 'products/agricultura-de-precisao' },
    { label: "Saldão", href: 'products/saldo' }
  ];
  

  const hoverEnterHandler = (component: string) => {
    if(component === "products") setShowProducts(true);
    else if (component === "services") setShowServices(true);
    else if (component === "vacancy") setShowVacancy(true);
    else if (component === "hamburger") setShowHamburger(true);
  };

  const hoverExitHandler = () => {
    setShowProducts(false);
    setShowServices(false);
    setShowVacancy(false);
    setShowHamburger(false);
  };

  return (
    <header className="bg-sky-950 h-24 flex flex-row justify-center relative z-50">
      <div className="flex gap-4 items-center justify-center">
      <Link className="flex items-center pr-2 cursor-pointer" href="/">
        <Image
          className="max-w-20"
          src={logoImage}
          alt="Logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-0.5 text-white">
            Geo
          </h2>
          <h2 className="font-bold text-xl pl-1.5 pb-6 -mt-2 text-white">
            Market
          </h2>
        </div>
      </Link>
        <nav className="flex flex-row gap-2">
          <div className="text-white cursor-pointer font-bold py-2 flex items-center relative" onMouseEnter={() => hoverEnterHandler("products")} onMouseLeave={hoverExitHandler}>
            Produtos
            <RiArrowDropDownFill />
          {showProducts && <MenuHide itens={productsList} icons={[]} positionRight="-right-40" hamburgerCss=""/>}
          </div>
          <div className="text-white cursor-pointer font-bold py-2 flex items-center relative" onMouseEnter={() => hoverEnterHandler("services")} onMouseLeave={hoverExitHandler}>
            Serviços
            <RiArrowDropDownFill />
            {showServices && <MenuHide itens={servicesList} icons={[]} positionRight="-right-40" hamburgerCss=""/>}
          </div>
          <div className="text-white cursor-pointer font-bold py-2 flex items-center relative" onMouseEnter={() => hoverEnterHandler("vacancy")} onMouseLeave={hoverExitHandler}>
            Vagas
            <RiArrowDropDownFill />
            {showVacancy && <MenuHide itens={vacancyList} icons={[]} positionRight="-right-40" hamburgerCss=""/>}
          </div>
          <Link className="text-white cursor-pointer font-bold py-2" href="/cursos">Crusos</Link>
          <Link className="text-white cursor-pointer font-bold bg-orange-500 hover:bg-orange-400 px-7 py-2 ml-2 rounded-xl" href="compra-plano">Anuncie</Link>
        </nav>
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquise aqui"
            className="form-control pl-5 pr-4 py-2 w-80 rounded-full"
          />
          <HiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 " />
        </div>
        <nav className="w-56 h-10 flex items-center">
          <div className="w-1/4">
            <VscAccount className="w-7 h-7 text-white"/>
          </div>
          <div className="w-3/4">
            <p className="text-white font-bold">Bem-vindo!</p>
            <p className="text-white"><Link href="/login">Entre</Link> ou <Link href="/login">Cadastre-se</Link></p>
          </div>
        </nav>
        <div className="relative" onMouseEnter={() => hoverEnterHandler("hamburger")} onMouseLeave={hoverExitHandler}>
          <RxHamburgerMenu className="w-10 h-10 -ml- text-white"/>
          {showHamburger && <MenuHide itens={hamburgerList} icons={iconsList} positionRight="-right-10" hamburgerCss="flex gap-3 pl-0"/>}
        </div>
        <Link className="relative" href="/cart">
          <p className="bg-black text-white rounded-full w-6 h-6 text-center absolute -top-2 -right-2">0</p>
          <IoCartOutline className="w-14 h-11 bg-orange-500 rounded-xl px-3 hover:bg-orange-400"/>
        </Link>
      </div>
    </header>
  );
};