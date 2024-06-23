// import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from "@nextui-org/react";
// import Image from "next/image";
// import { useState, useEffect, useCallback, Fragment } from "react";
// import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
// import ReactPlayer from "react-player/lazy";
// import { Waypoint } from "react-waypoint";
// import { RiCloseLargeFill } from "react-icons/ri";

// export default function CarouselDetailPost({
//   autoSlide = false,
//   autoSlideInterval = 3000,
//   slides,
//   onDelete,
// }: {
//   autoSlide?: boolean;
//   autoSlideInterval?: number;
//   slides: { id: string; url: string; type: 0 | 1 }[];
//   onDelete: (id: string) => void;
// }) {
//   const [curr, setCurr] = useState(0);
//   const [muted, setMuted] = useState(true);
//   const [shouldPlay, setShouldPlay] = useState(false);

//   const handleEnterViewport = () => {
//     setShouldPlay(true);
//   };

//   const handleExitViewport = () => {
//     setShouldPlay(false);
//   };

//   const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
//   const next = useCallback(() => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1)), [slides.length]);

//   useEffect(() => {
//     if (!autoSlide) return;
//     const slideInterval = setInterval(next, autoSlideInterval);
//     return () => clearInterval(slideInterval);
//   }, [autoSlide, autoSlideInterval, next]);

//   const handleDelete = (id: string) => {
//     const newSlides = slides.filter((slide) => slide.id !== id);
//     onDelete(id);
//     if (curr >= newSlides.length) {
//       setCurr((prev) => (prev === 0 ? 0 : prev - 1));
//     }
//   };

//   return (
//     <div className="overflow-hidden relative bg-white">
//       <div
//         className="flex transition-transform ease-out duration-500 w-full h-full"
//         style={{ transform: `translateX(-${curr * 100}%)` }}>
//         {slides.map((slide, index) => (
//           <Fragment key={index}>
//             {slide.type ? (
//               <div className="relative flex-shrink-0 w-full">
//                 <Image
//                   key={`image-${slide.id}`}
//                   src={slide.url}
//                   alt=""
//                   className="rounded-sm h-[450px] w-full object-cover flex-shrink-0 "
//                   width={590}
//                   height={590}
//                   priority
//                 />
//                 <div
//                   className="absolute top-2 right-2 bg-black opacity-40 text-white rounded-full w-7 h-7 flex items-center justify-center hover:opacity-85 cursor-pointer"
//                   onClick={() => handleDelete(slide.id)}>
//                   <RiCloseLargeFill />
//                 </div>
//               </div>
//             ) : (
//               <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
//                 <div className="w-full flex-shrink-0 relative">
//                   <ReactPlayer
//                     key={`video-${slide.id}`}
//                     url={slide.url}
//                     width="100%"
//                     height="100%"
//                     className="rounded-sm h-[450px] w-full object-cover flex-shrink-0"
//                     controls
//                     playing={shouldPlay}
//                     muted={muted}
//                   />
//                   <button
//                     className="absolute top-2 right-2 bg-black opacity-40 text-white rounded-full w-7 h-7 flex items-center justify-center hover:opacity-85 cursor-pointer"
//                     onClick={() => handleDelete(slide.id)}>
//                     <RiCloseLargeFill />
//                   </button>
//                 </div>
//               </Waypoint>
//             )}
//           </Fragment>
//         ))}
//       </div>

//       {slides.length > 1 && (
//         <div className="absolute bottom-4 right-0 left-0 z-10">
//           <div className="flex items-center justify-center gap-1">
//             {slides.map((_, i) => (
//               <div
//                 key={i}
//                 className={`
//                       transition-all w-2 h-2 bg-white rounded-full
//                       ${curr === i ? "p-1" : "bg-opacity-50"}
//                     `}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {slides.length > 1 && (
//         <>
//           <div className="absolute  inset-0 p-4 z-10 h-7 my-auto">
//             <div className="flex items-center justify-between">
//               <button onClick={prev} className={`${curr === 0 ? "invisible" : ""}  `}>
//                 <FaCircleChevronLeft size={23} color="#B7B8B6" />
//               </button>
//               <button onClick={next} className={`${curr === slides.length - 1 ? "invisible" : ""}`}>
//                 <FaCircleChevronRight size={23} color="#B7B8B6" />
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useState, useEffect, useCallback, Fragment } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight, FaCropSimple } from "react-icons/fa6";
import ReactPlayer from "react-player/lazy";
import { Waypoint } from "react-waypoint";
import { RiCloseLargeFill } from "react-icons/ri";
// import ReactCrop, { Crop } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
import Cropper, { Area } from "react-easy-crop";
import { MdCropDin, MdOutlineCropLandscape, MdOutlineCropPortrait } from "react-icons/md";

export default function CarouselDetailPost({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
  onDelete,
  cropRatio = 1,
  videoRatio = 16 / 9,
}: // cropRatio = "original",
{
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: { id: string; url: string; type: 0 | 1 }[];
  onDelete: (id: string) => void;
  cropRatio?: number;
  videoRatio?: number;
}) {
  const [curr, setCurr] = useState(0);
  const [muted, setMuted] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  // const [cropRatio, setCropRatio] = useState<number>(1);

  // const [videoCropRatio, setVideoCropRatio] = useState<number>(16 / 9);

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    // Explicitly define type for crop
    setCrop(crop);
  }, []);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    // Explicitly define type for croppedArea
    // Handle cropped area if needed
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    // Explicitly define type for zoom
    setZoom(zoom);
  }, []);

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

  const handleDelete = (id: string) => {
    const newSlides = slides.filter((slide) => slide.id !== id);
    onDelete(id);
    if (curr >= newSlides.length) {
      setCurr((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  return (
    <div className="overflow-hidden relative bg-white">
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
                  className="rounded-sm h-[450px] w-full object-cover flex-shrink-0 bg-black"
                  width={590}
                  height={590}
                  priority
                />

                <Cropper
                  image={slide.url}
                  crop={crop}
                  aspect={cropRatio}
                  onCropChange={onCropChange}
                  onCropComplete={onCropComplete}
                  zoom={zoom}
                  onZoomChange={onZoomChange}
                  style={{ containerStyle: { overflow: "hidden" } }}
                  showGrid={false}
                />
                <div
                  className="absolute top-2 right-2 bg-black opacity-40 text-white rounded-full w-7 h-7 flex items-center justify-center hover:opacity-85 cursor-pointer"
                  onClick={() => handleDelete(slide.id)}>
                  <RiCloseLargeFill />
                </div>
              </div>
            ) : (
              <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
                <div className="w-full flex-shrink-0 relative">
                  <ReactPlayer
                    key={`video-${slide.id}`}
                    url={slide.url}
                    width="100%"
                    height="450px"
                    className="rounded-sm h-[450px] w-full object-cover flex-shrink-0"
                    controls
                    playing={shouldPlay}
                    muted={muted}
                  />
                  <Cropper
                    video={slide.url}
                    crop={crop}
                    aspect={videoRatio}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    zoom={zoom}
                    onZoomChange={onZoomChange}
                    style={{ containerStyle: { overflow: "hidden" } }}
                    showGrid={false}
                  />
                  <button
                    className="absolute top-2 right-2 bg-black opacity-40 text-white rounded-full w-7 h-7 flex items-center justify-center hover:opacity-85 cursor-pointer"
                    onClick={() => handleDelete(slide.id)}>
                    <RiCloseLargeFill />
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
