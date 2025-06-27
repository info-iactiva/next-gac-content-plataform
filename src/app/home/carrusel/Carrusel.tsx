import React, { useEffect, useState } from "react";
import { carouselData } from "./gac_b2f_carousel_completo";    
import { parseISO, isAfter, isEqual, startOfDay } from "date-fns";

const CarouselB2F = () => {
  const [data] = useState(carouselData.days);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const card = data[currentIndex];  
  const isUnlocked = card.status === "unlocked";


  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 px-2">
        {carouselData.campaign_title}
      </h2>

      <div className="relative flex flex-col sm:flex-row items-center">
        
        {/* <button
          onClick={goPrev}
          className="
            p-3 rounded-full 
            text-gray-700 
            hover:bg-gray-200 hover:bg-opacity-50 
            transition 
            duration-200 
            ease-in-out
            select-none
            mb-4 sm:mb-0
            sm:mr-4
            w-10 h-10
            flex items-center justify-center
          "
          aria-label="Anterior"
          style={{ userSelect: "none" }}
        >
          &#8592;
        </button> */}

        {/* Card */}
        <div className="w-[260px] sm:w-[400px]  lg:w-[700px] h-[380px] bg-white border shadow rounded-lg p-4 flex flex-col justify-between">

          <h3 className="text-base font-semibold mb-2">{card.title}</h3>

          {isUnlocked ? (
            <>
              <img
                src={card.content.image}
                alt={card.title}
                className="w-full h-28 object-cover rounded mb-2"
              />
              <h4 className="text-sm font-bold mb-1">{card.content.headline}</h4>
              <p className="text-xs text-gray-700 mb-3">{card.content.text}</p>
              {card.content.cta_link && (
                <a
                  href={card.content.cta_link}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {card.content.cta_label}
                </a>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-gray-500 italic text-xs">
              {card.teaser_text}
            </div>
          )}

          {/* Indicadores puntitos */}
          <div className="flex justify-center mt-4 space-x-2">
            {data.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300
                  ${
                    idx === currentIndex
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }
                `}
                aria-label={`Ir a card ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
{/*         
        <button
          onClick={goNext}
          className="
            p-3 rounded-full 
            text-gray-700 
            hover:bg-gray-200 hover:bg-opacity-50 
            transition 
            duration-200 
            ease-in-out
            select-none
            mt-4 sm:mt-0
            sm:ml-4
            w-10 h-10
            flex items-center justify-center
          "
          aria-label="Siguiente"
          style={{ userSelect: "none" }}
        >
          &#8594;
        </button> */}

        
      </div>
    </section>
  );
};

export default CarouselB2F;
