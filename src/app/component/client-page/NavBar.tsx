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


export const NavBar = () => {
  const [showProducts, setShowProducts] = useState(false)
  const [showServices, setShowServices] = useState(false)
  const [showVacancy, setShowVacancy] = useState(false)

  const productsList: string[] = ["Estação Local", "Receptor GNSS", "Drones", "Laser", "Scanner", "Batimetria", "Nívies", "Teodolitos", "Outros", "Agricultura de Precisão","Saldão"]
  const servicesList: string[] = ["Aerofotometria com Drone", "Aerofotometria Laser + Drone", "Georreferenciamento Rural e Urbano", "Levantamento Topográfico Planialtimétrico com GPS/Estação Total", "Levantamento Topográfico Planialtimétrico com Laser Scanner", "Perícia Técnica", "Medição de Volumer", "Batimetria", "Levantamento Planialtimétrico Cadastral", "Cadastro Urbano", "Levantamento de Rodovias GPS/Estação Total", "Levantamento de Rodovias Lase Scanner","BIM","Asbuilt(Levantamento Industrial com Laser Scanner)","Agricultura de Precisão","Outros"]
  const vacancyList: string[] = ["Vagas"];

  const hoverEnterHandler = (component: string) => {
    if(component === "products") setShowProducts(true);
    else if (component === "services") setShowServices(true);
    else if (component === "vacancy") setShowVacancy(true);
  };

  const hoverExitHandler = () => {
    setShowProducts(false);
    setShowServices(false);
    setShowVacancy(false);
  };

  return (
    <header className="bg-sky-950 h-24 flex flex-row justify-center">
      <div className="flex gap-5 items-center justify-center">
      <div className="flex items-center gap-1 pr-2 cursor-pointer">
        <Image
          className="max-w-14"
          src={logoImage}
          alt="Logo"
          width={180}
          height={38}
          layout="responsive"
        />
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-0.5">
            Geo
          </h2>
          <h2 className="font-bold text-xl pl-1.5 pb-6 -mt-2">
            Market
          </h2>
        </div>
      </div>
        <nav className="flex flex-row gap-2">
          <a className="text-white cursor-pointer font-bold py-2 flex items-center relative" onMouseEnter={() => hoverEnterHandler("products")} onMouseLeave={hoverExitHandler}>
            Produtos
            <RiArrowDropDownFill />
          {showProducts && <MenuHide itens={productsList}/>}
          </a>
          <a className="text-white cursor-pointer font-bold py-2 flex items-center relative" onMouseEnter={() => hoverEnterHandler("services")} onMouseLeave={hoverExitHandler}>
            Serviços
            <RiArrowDropDownFill />
            {showServices && <MenuHide itens={servicesList}/>}
          </a>
          <a className="text-white cursor-pointer font-bold py-2 flex items-center relative" onMouseEnter={() => hoverEnterHandler("vacancy")} onMouseLeave={hoverExitHandler}>
            Vagas
            <RiArrowDropDownFill />
            {showVacancy && <MenuHide itens={vacancyList}/>}
          </a>
          <a className="text-white cursor-pointer font-bold py-2">Crusos</a>
          <a className="text-white cursor-pointer font-bold bg-orange-500 hover:bg-orange-400 px-7 py-2 ml-2 rounded-xl">Anuncie</a>
        </nav>
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquise aqui"
            className="form-control pl-5 pr-4 py-2 w-80 rounded-full"
          />
          <HiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
        </div>
        <nav className="w-56 h-10 flex items-center">
          <div className="w-1/4">
            <VscAccount className="w-7 h-7"/>
          </div>
          <div className="w-3/4">
            <p className="text-white font-bold">Bem-vindo!</p>
            <p className="text-white"><a>Entre</a> ou <a>Cadastre-se</a></p>
          </div>
        </nav>
      <RxHamburgerMenu className="w-7 h-7"/>
      <IoCartOutline className="w-14 h-11 bg-orange-500 rounded-xl px-3 hover:bg-orange-400"/>
      </div>
    </header>
  );
};