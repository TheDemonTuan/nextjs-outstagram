import { useState, useEffect } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
}) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((img) => (
          <img src={img} alt="" className="rounded-sm" />
        ))}
      </div>
      {slides.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button onClick={prev} className={`${curr === 0 ? "invisible" : ""}`}>
              <FaCircleChevronLeft size={23} color="#B7B8B6" />
            </button>
            <button onClick={next} className={`${curr === slides.length - 1 ? "invisible" : ""}`}>
              <FaCircleChevronRight size={23} color="#B7B8B6" />
            </button>
          </div>
          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-1">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`
                    transition-all w-2 h-2 bg-white rounded-full
                    ${curr === i ? "p-1" : "bg-opacity-50"}
                  `}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
