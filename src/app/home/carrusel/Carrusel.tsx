"use client";

import React, { useEffect, useState } from "react";
import { carouselData } from "./gac_b2f_carousel_completo";    
import { useRouter } from "next/navigation";


export default function CarouselB2F ()  {
  const [data] = useState(carouselData.days);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);


  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const card = data[currentIndex];  
  const isUnlocked = card.status === "unlocked";

  const router = useRouter();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 px-2">
        {carouselData.campaign_title}
      </h2>

      <div className="relative flex flex-col sm:flex-row items-center">
        
        <div className="w-[260px] sm:w-[400px]  lg:w-[700px] h-[380px]  lg:h-[500px] bg-white border shadow rounded-lg p-4 flex flex-col justify-between">

          <h3 className="text-base font-semibold mb-2">{card.title}</h3>

          {isUnlocked ? (
            <>

            <div className="flex flex-col h-full">
            <div className="w-full h-64 sm:h-72 md:h-80 lg:h-[350px] overflow-hidden rounded mb-4">
              <img
                src={card.content.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div> 
            
            <div className="flex-1 flex flex-col">
              <h4 className="text-sm font-bold mb-1">{card.content.headline}</h4>
              <p className="text-xs text-gray-700 mb-2 line-clamp-3">
                {card.content.text}
              </p>

              {card.content.cta_link && (
                // <a
                //   href={card.content.cta_link}
                //   className="text-blue-600 hover:underline text-sm mt-auto"
                // >
                  
                // </a>
                 <button
                          type="button"
                          onClick={() => router.push(card.content.cta_link)}
                          className="underline text-blue-600"
                        >
                          {card.content.cta_label}
                </button>
                )}
            </div>
          </div>


              {/* <img
                src={card.content.image}
                alt={card.title}
                className="w-auto h-28 object-cover rounded mb-2"
              /> */}
              {/* <div className="w-full h-40 sm:h-52 md:h-60 lg:h-64 overflow-hidden rounded mb-2">
              <img
                src={card.content.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div> */}
            {/* <img
            src={card.content.image}
            alt={card.title}
            className="w-full h-full object-contain"
          /> */}

                {/* <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded mb-2">
        <img
          src={card.content.image}
          alt={card.title}
          className="max-h-full object-contain"
        />
      </div> */}

              {/* <h4 className="text-sm font-bold mb-1">{card.content.headline}</h4>
              <p className="text-xs text-gray-700 mb-3">{card.content.text}</p>
              {card.content.cta_link && (
                <a
                  href={card.content.cta_link}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {card.content.cta_label}
                </a>
              )} */}


            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-gray-500 italic text-xs">
              {card.teaser_text}
            </div>
          )}
          
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
        
      </div>
    </section>
  );
};

