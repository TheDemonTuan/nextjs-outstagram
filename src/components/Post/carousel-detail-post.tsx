import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useState, useEffect, useCallback, Fragment } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import ReactPlayer from "react-player/lazy";
import { Waypoint } from "react-waypoint";

export default function CarouselDetailPost({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
  onDelete,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: { id: string; url: string; type: 0 | 1 }[];
  onDelete: (id: string) => void;
}) {
  const [curr, setCurr] = useState(0);
  const [muted, setMuted] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(false);

  const handleEnterViewport = () => {
    setShouldPlay(true);
  };

  const handleExitViewport = () => {
    setShouldPlay(false);
  };

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = useCallback(() => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1)), [slides.length]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="overflow-hidden relative bg-black">
      <div
        className="flex transition-transform ease-out duration-500 w-full h-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((slide, index) => (
          <Fragment key={index}>
            {slide.type ? (
              <div className="relative flex-shrink-0 w-full">
                <Image
                  key={`image-${slide.id}`}
                  src={slide.url}
                  alt=""
                  className="rounded-sm h-[450px] w-full object-cover flex-shrink-0 "
                  width={590}
                  height={590}
                  priority
                />
                <div
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:opacity-85 cursor-pointer"
                  onClick={() => onDelete(slide.id)}>
                  &times;
                </div>
              </div>
            ) : (
              <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
                <div className="w-full flex-shrink-0 relative">
                  <ReactPlayer
                    key={`video-${slide.id}`}
                    url={slide.url}
                    width="100%"
                    height="100%"
                    className="rounded-sm h-[450px]  w-full object-contain flex-shrink-0"
                    controls
                    playing={shouldPlay}
                    muted={muted}
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:opacity-85 cursor-pointer"
                    onClick={() => onDelete(slide.id)}>
                    &times;
                  </button>
                </div>
              </Waypoint>
            )}
          </Fragment>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 right-0 left-0 z-10">
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
      )}

      {slides.length > 1 && (
        <>
          <div className="absolute  inset-0 p-4 z-10 h-7 my-auto">
            <div className="flex items-center justify-between">
              <button onClick={prev} className={`${curr === 0 ? "invisible" : ""}  `}>
                <FaCircleChevronLeft size={23} color="#B7B8B6" />
              </button>
              <button onClick={next} className={`${curr === slides.length - 1 ? "invisible" : ""}`}>
                <FaCircleChevronRight size={23} color="#B7B8B6" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
