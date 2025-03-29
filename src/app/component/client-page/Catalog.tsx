"use client"
import CardsCarrosel from "./CardsCarrosel";
import productsMock from "../../mock/productsMock";


export default function Catalog() { 
  const payloadProducts = {
    productsMock
  }

  return (
    <div className="flex h-auto mt-12">
        <CardsCarrosel payload={ payloadProducts } title={["Navegue por", "Produtos mais vendidos"]}/>
        <div className="border-l-2 border-orange-300"/>
        <CardsCarrosel payload={ payloadProducts } title={["Referencia de mercado", "Contrate os melhores especialistas"]}/>
    </div>
  );
}