'use client'
import Image from "next/image";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { CatalogProps } from "@/app/mock/productsMock";

export default function CardsCarrosel({ payload, title }: { payload: CatalogProps['payload'], title: string[] }) {
  const { productsMock } = payload;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const itemsPerPage = 2;
  const totalSlides = Math.ceil(productsMock.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(handleNext, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused, currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full mx-auto overflow-hidden bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className="text-black pl-10 text-orange-400 font-bold">{title[0]}</h3>
      <h1 className="text-black pl-10 text-3xl font-light">{title[1]}</h1>
      <IoMdArrowDropleftCircle
        className="absolute z-20 left-0 text-black top-1/2 transform -translate-y-1/2 ml-5 w-10 h-10 opacity-40 cursor-pointer hover:opacity-80 transition-opacity duration-300"
        onClick={handlePrev}
      />
      
      <div
        className="flex transition-transform duration-500 ease-in-out items-center pl-2.5 pt-10 content-center gap-4"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {productsMock.map(({ image, productName, price, parcel }, index) => (
          <div 
            className="w-80 h-80 flex-shrink-0 flex flex-col items-center shadow rounded-xl hover:shadow-md"
            key={`${productName}-${index}`}
          >
            <Image className="w-32 h-32" src={image} alt={productName} width={90} height={90} />
            <div>
              <h1 className="text-sky-950 font-bold pb-12">{productName}</h1>
              <h2 className="text-sky-950 font-bold text-xl">R$ {price.toFixed(2)}</h2>
              <p className="text-gray-600">ou {parcel}x de {(price / parcel).toFixed(2)} sem juros</p>
            </div>
            <button className="bg-green-500 text-white py-2 px-20 mt-2 rounded-xl">Comprar</button>
          </div>        
        ))}
      </div>

      <IoMdArrowDroprightCircle
        className="absolute z-20 right-4 text-black top-1/2 transform -translate-y-1/2 ml-5 w-10 h-10 opacity-40 cursor-pointer hover:opacity-80 transition-opacity duration-300"
        onClick={handleNext}
      />

      <div className="flex justify-center mt-4 space-x-2 py-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-green-500' : 'bg-gray-300'}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <div className="flex flex-row-reverse">
        <a className="mr-10 mb-4 text-orange-500">Ver mais</a>
      </div>
    </div>

  );
}
