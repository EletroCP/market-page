'use client'
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import CarrosseulImage1 from "../../res/imagesCarrossel/1.png";
import CarrosseulImage2 from "../../res/imagesCarrossel/2.png";
import CarrosseulImage3 from "../../res/imagesCarrossel/3.png";
import CarrosseulImage4 from "../../res/imagesCarrossel/4.png";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";

export default function Carrossel() {
  const images: StaticImageData[] = [CarrosseulImage1, CarrosseulImage2, CarrosseulImage3, CarrosseulImage4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextImage();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <div 
      className="relative flex bg-red-500 w-50 h-96 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <hr className="border-orange-500 border-2 absolute z-40 w-full shadow-md shadow-sky" />
      <IoMdArrowDropleftCircle 
        onClick={prevImage} 
        className="absolute z-20 left-0 top-1/2 transform -translate-y-1/2 ml-5 w-14 h-14 opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300" 
      />
      
      <div className="w-full h-full flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={`image-${index}`} className="min-w-full h-full">
            <Image src={image} alt="imagem promocional" className="w-full h-full object-fit" />
          </div>
        ))}
      </div>

      <IoMdArrowDroprightCircle 
        onClick={nextImage} 
        className="absolute z-20 right-0 top-1/2 transform -translate-y-1/2 mr-5 w-14 h-14 opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300" 
      />
    </div>
  );
}
