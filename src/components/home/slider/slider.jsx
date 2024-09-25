import React, { useState, useEffect } from "react";
import slider1 from "../../../assets/images/slider1.png";
import slider2 from "../../../assets/images/slider2.jpg";
import slider3 from "../../../assets/images/slider3.jpg";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../../assets/logo1.svg"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const images = [slider1, slider2, slider3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigator = useNavigate();

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // 5 saniyede bir slaytı değiştir

    return () => clearInterval(interval); // Component unmount olduğunda interval'ı temizle
  }, []);

  const navigateShop = () => {
    navigator("/shop");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative"
            style={{ height: "100vh" }}
          >
            <img
              src={image}
              alt={`slide ${index}`}
              className="w-full h-full object-cover"
            />
            {/* Orta kısma eklenen büyük dörtgen */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div
                className="bg-white bg-opacity-40 p-16 rounded-lg shadow-lg text-center cursor-pointer"
                onClick={() => navigateShop()}
              >
                <div className="flex flex-col items-center justify-center">
                <img src={logo} alt="" className="w-32 h-32 mb-6 opacity-70" /> {/* Logo yerine SVG kullanıldı */}
                {/* Shop ikonu büyütüldü ve opaklık uygulandı */}
                  <h2 className="text-6xl font-bold text-[#3B82F6] uppercase opacity-70 font-serif">
                    Alışverişe Başla
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-7xl bg-black bg-opacity-0 p-3 rounded-full hover:bg-opacity-90 focus:outline-none"
        onClick={goToPrev}
      >
        &#8249;
      </button>

      {/* Next Button */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-7xl bg-black bg-opacity-0 p-3 rounded-full hover:bg-opacity-90 focus:outline-none"
        onClick={goToNext}
      >
        &#8250;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-4 h-4 rounded-full bg-white cursor-pointer ${
              index === currentIndex ? "bg-opacity-100" : "bg-opacity-50"
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Home;
