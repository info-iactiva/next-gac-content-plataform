// "use client";

// import React, { useEffect, useState } from "react";
// import { carouselData } from "./gac_b2f_carousel_completo";
// import { useRouter } from "next/navigation";

// export default function CarouselB2F() {
//   const [data] = useState(carouselData.days);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [data.length]);

//   const goToIndex = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const card = data[currentIndex];
//   const isUnlocked = card.status === "unlocked";

//   return (
//     <section className="w-full max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
//       <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 px-2 text-gray-800">
//         {carouselData.campaign_title}
//       </h2>

//       <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white border rounded-xl shadow-lg overflow-hidden flex flex-col">
//         <div className="px-4 py-3 border-b">
//           <h3 className="text-base sm:text-lg font-semibold text-gray-700">
//             {card.title}
//           </h3>
//         </div>

//       {isUnlocked ? (
//   <>
//     <div className="w-full relative aspect-video sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden">
//       <img
//         src={card.content.image}
//         alt={card.title}
//         className="object-cover w-full h-full"
//       />
//     </div>

//     <div className="p-4 flex flex-col flex-1">
//       <h4 className="text-sm sm:text-base font-bold mb-1 text-gray-800">
//         {card.content.headline}
//       </h4>
//       <p className="text-xs sm:text-sm text-gray-700 mb-3">
//         {card.content.text}
//       </p>

//       {card.content.cta_link && (
// <button
//   onClick={() => router.push(card.content.cta_link)}
//   className="mt-3 text-xs sm:text-sm text-blue-600 underline hover:text-blue-800 transition"
//   type="button"
// >
//   {card.content.cta_label}
// </button>

//       )}
//     </div>
//   </>
// ) : (
//   <div className="w-full relative aspect-video sm:aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-center p-6">
//     <div className="flex flex-col items-center space-y-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-12 w-12 text-gray-400"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M4.93 4.93l14.14 14.14M20 12a8 8 0 10-16 0 8 8 0 0016 0z"
//         />
//       </svg>
//       <p className="text-sm sm:text-base text-gray-500 italic max-w-xs">
//         {card.teaser_text}
//       </p>
//     </div>
//   </div>
// )}

//         <div className="flex justify-center items-center p-3 border-t space-x-2 bg-gray-50">
//           {data.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => goToIndex(idx)}
//               className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                 idx === currentIndex
//                   ? "bg-blue-600"
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//               aria-label={`Ir a card ${idx + 1}`}
//               type="button"
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { carouselData } from "./gac_b2f_carousel_completo";
import { useRouter } from "next/navigation";

export default function CarouselB2F() {
  const router = useRouter();

  // Filtrar sólo las cards activas
  const activeCards = carouselData.days.filter(card => card.status === "unlocked");
  // Verificar si hay cards inactivas
  const hasInactiveCards = carouselData.days.some(card => card.status !== "unlocked");

  const [currentIndex, setCurrentIndex] = useState(0);

  // Queremos un índice extra para la pantalla "prepárate"
  // O sea, los índices van 0..activeCards.length (último índice = pantalla de "prepárate")
  const totalSlides = hasInactiveCards ? activeCards.length + 1 : activeCards.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Si currentIndex es menor que activeCards.length, mostramos card activa,
  // si es igual a activeCards.length y hay inactivos, mostramos pantalla "prepárate"
  if (currentIndex < activeCards.length) {
    const card = activeCards[currentIndex];
    return (
      <section className="w-full max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 px-2 text-gray-800">
          {carouselData.campaign_title}
        </h2>

        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white border rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700">
              {card.title}
            </h3>
          </div>

          <div className="w-full relative aspect-video sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden">
            <img
              src={card.content.image}
              alt={card.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="p-4 flex flex-col flex-1">
            <h4 className="text-sm sm:text-base font-bold mb-1 text-gray-800">
              {card.content.headline}
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 mb-3">
              {card.content.text}
            </p>

            {card.content.cta_link && (
              <button
                onClick={() => router.push(card.content.cta_link)}
                className="mt-3 text-xs sm:text-sm text-blue-600 underline hover:text-blue-800 transition"
                type="button"
              >
                {card.content.cta_label}
              </button>
            )}
          </div>

          <div className="flex justify-center items-center p-3 border-t space-x-2 bg-gray-50">
            {activeCards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  idx === currentIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a card ${idx + 1}`}
                type="button"
              />
            ))}

            {/* Indicador para pantalla "prepárate" */}
            {hasInactiveCards && (
              <button
                onClick={() => goToIndex(activeCards.length)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === activeCards.length ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label="Prepárate para el próximo contenido"
                type="button"
              />
            )}
          </div>
        </div>
      </section>
    );
  } else {
    // Pantalla "Prepárate para el próximo contenido"
    return (
      <section className="w-full max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 px-2 text-gray-800">
          {carouselData.campaign_title}
        </h2>

        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white border rounded-xl shadow-lg overflow-hidden flex flex-col">

          <div className="w-full relative aspect-video sm:aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-center p-6">
            <div className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M4.93 4.93l14.14 14.14M20 12a8 8 0 10-16 0 8 8 0 0016 0z"
                />
              </svg>
              <p className="text-sm sm:text-base text-gray-500 italic max-w-xs">
                Prepárate para el próximo contenido.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center p-3 border-t space-x-2 bg-gray-50">
            {activeCards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  idx === currentIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a card ${idx + 1}`}
                type="button"
              />
            ))}
            <button
              onClick={() => goToIndex(activeCards.length)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === activeCards.length ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label="Prepárate para el próximo contenido"
              type="button"
            />
          </div>
        </div>
      </section>
    );
  }
}

