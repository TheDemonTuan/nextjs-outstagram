import { ArrowLeftIcon, DragPhotoVideoIcon, GalleryIcon, VideoAddIcon } from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import AddPostModal, { AddPostModalKey } from "./add-post";
import CarouselDetailPost from "./carousel-detail-post";
import { FaCropSimple } from "react-icons/fa6";
import { MdCropDin, MdOutlineCropLandscape, MdOutlineCropPortrait } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import { Area } from "react-easy-crop";

export const SelectPhotoModalKey = "SelectPhotoModal";

const SelectPhotoModal = () => {
  const { modalOpen, modalClose, modalKey, modalData, setModalData } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filesWithType, setFilesWithType] = useState<{ id: string; url: File; type: number }[]>([]);

  const [selectedTab, setSelectedTab] = useState<"photos" | "reels">("photos");
  const [imageCropRatio, setImageCropRatio] = useState<number>(1);

  const [videoCropRatio, setVideoCropRatio] = useState<number>(16 / 9);

  const tempCroppedAreas = useRef<{ [key: string]: Area }>({});
  const tempCroppedAreaPixels = useRef<{ [key: string]: Area }>({});

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      console.log(event.target.files);

      if (selectedTab === "reels" && filesArray.length > 1) return;

      const filesWithType = filesArray.map((file, index) => {
        const fileType = file.type.startsWith("image/") ? 1 : 0;
        return {
          id: index.toString(),
          url: file,
          type: fileType,
        };
      });

      setFilesWithType(filesWithType);

      event.target.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const closeModalClick = () => {
    setFilesWithType([]);
    setSelectedTab("photos");
    modalClose();
  };

  const handleDelete = (id: string) => {
    setFilesWithType((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const backSelectPhoto = () => {
    setFilesWithType([]);
  };

  const handleImageCropSelect = (ratio: number) => {
    setImageCropRatio(ratio);
  };

  const handleVideoCropSelect = (ratio: number) => {
    setVideoCropRatio(ratio);
  };

  const getCroppedImg = (imageSrc: string, newName: string, typeNew: string, pixelCrop: Area): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to create canvas context"));
          return;
        }

        canvas.width = pixelCrop.width || 0;
        canvas.height = pixelCrop.height || 0;

        ctx.drawImage(
          img,
          pixelCrop.x || 0,
          pixelCrop.y || 0,
          pixelCrop.width || 0,
          pixelCrop.height || 0,
          0,
          0,
          pixelCrop.width || 0,
          pixelCrop.height || 0
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob"));
            return;
          }
          const file = new File([blob], newName, { type: typeNew, lastModified: Date.now() });

          resolve(file);
        }, typeNew);
      };

      img.onerror = (err) => {
        reject(new Error("Failed to load image"));
      };
    });
  };

  const getCroppedVideo = async (
    videoSrc: string,
    newName: string,
    typeNew: string,
    pixelCrop: Area
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = videoSrc;
      video.crossOrigin = "anonymous";

      let loadedMetadataCount = 0;
      // Event listener for when metadata is loaded
      video.onloadedmetadata = async () => {
        console.log(`Loaded metadata ${video.duration} time(s)`);
        try {
          // Wait for metadata to be loaded completely
          // await new Promise<void>((resolve) => {
          //   video.onloadedmetadata = () => {
          //     loadedMetadataCount++;
          //     console.log(`Loaded metadata ${loadedMetadataCount} time(s)`);
          //     resolve();
          //   };
          // });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Failed to create canvas context"));
            return;
          }

          // Set canvas dimensions based on the pixelCrop or video dimensions
          const { width, height } = video;
          canvas.width = pixelCrop.width || width;
          canvas.height = pixelCrop.height || height;

          // Draw cropped video frame onto canvas
          ctx.drawImage(
            video,
            pixelCrop.x || 0,
            pixelCrop.y || 0,
            pixelCrop.width || width,
            pixelCrop.height || height,
            0,
            0,
            canvas.width,
            canvas.height
          );

          // Convert canvas content to blob
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }

            // Create a File object from blob
            const file = new File([blob], newName, {
              type: typeNew,
              lastModified: Date.now(),
            });

            resolve(file);
          }, typeNew);
        } catch (error) {
          reject(error);
        }
      };

      video.onerror = (err) => {
        reject(new Error("Failed to load video"));
      };

      // Start loading the video
      video.load();
    });
  };

  const handleNextClick = async () => {
    try {
      const newFilesWithType = await Promise.all(
        filesWithType.map(async (file) => {
          const croppedAreaPixels = tempCroppedAreaPixels.current[file.id];
          let croppedFile: File | undefined;

          console.log(file.type);

          if (file.type === 0) {
            const croppedImage = await getCroppedImg(
              URL.createObjectURL(file.url),
              file.url.name,
              file.url.type,
              croppedAreaPixels
            );
            croppedFile = croppedImage;
          }
          // else {
          //   const croppedVideo = await getCroppedVideo(
          //     URL.createObjectURL(file.url),
          //     file.url.name,
          //     file.url.type,
          //     croppedAreaPixels
          //   );
          //   croppedFile = croppedVideo;
          // }

          console.log(croppedFile);

          return { ...file, url: croppedFile! };
        })
      );

      // setFilesWithType(newFilesWithType);
      // setModalData({ ...modalData, selectedFiles: newFilesWithType.map((file) => file.url) });

      if (newFilesWithType[0].type === 0 && newFilesWithType.length > 0) {
        setFilesWithType(newFilesWithType);
        setModalData({ ...modalData, selectedFiles: newFilesWithType.map((file) => file.url) });
      } else {
        setModalData({ ...modalData, selectedFiles: filesWithType.map((file) => file.url) });
      }
      setFilesWithType([]);
      modalOpen(AddPostModalKey);
    } catch (error) {
      console.error("Error cropping:", error);
    }
  };

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area, slideId: string) => {
    tempCroppedAreas.current[slideId] = croppedArea;
    tempCroppedAreaPixels.current[slideId] = croppedAreaPixels;
  };

  return (
    <>
      <Modal size="md" isOpen={modalKey === SelectPhotoModalKey} onOpenChange={closeModalClick} hideCloseButton={true}>
        <ModalContent className="h-[500px]">
          {(onClose) => (
            <>
              {filesWithType.length <= 0 ? (
                <ModalHeader className="flex gap-1 items-center justify-center p-3">Create new post</ModalHeader>
              ) : (
                <ModalHeader className="flex justify-between items-center my-[-5px]">
                  <button onClick={backSelectPhoto} className="cursor-pointe font-normal text-sm ">
                    <ArrowLeftIcon className="w-3 h-3 " />
                  </button>
                  <div className="text-lg font-medium">Crop</div>
                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="cursor-pointer text-sky-500 text-sm font-medium hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500">
                    Next
                  </button>
                </ModalHeader>
              )}
              <Divider />
              <ModalBody className="flex items-center justify-center p-0 relative">
                {filesWithType.length > 0 ? (
                  <>
                    <CarouselDetailPost
                      slides={filesWithType.map((file) => {
                        return {
                          id: file.id || "",
                          url: URL.createObjectURL(file.url) || "",
                          type: file.type ? 1 : 0,
                        };
                      })}
                      onDelete={handleDelete}
                      cropRatio={imageCropRatio}
                      videoRatio={videoCropRatio}
                      setCropComplete={handleCropComplete}
                    />
                    <div className="absolute bottom-2 left-2 z-20">
                      {filesWithType[0]?.type ? (
                        <>
                          <Dropdown
                            placement="top-start"
                            className="p-0 rounded-md border-small border-divider bg-black bg-opacity-70 
                            ">
                            <DropdownTrigger>
                              <button className="rounded-full p-2 bg-black bg-opacity-65 items-center cursor-pointer">
                                <FaCropSimple color="white" />
                              </button>
                            </DropdownTrigger>
                            <DropdownMenu
                              className="rounded-md my-2"
                              variant="light"
                              closeOnSelect={false}
                              selectionMode="single">
                              <DropdownItem
                                key="9:16"
                                textValue="9/16"
                                onPress={() => handleVideoCropSelect(9 / 16)}
                                className={videoCropRatio === 9 / 16 ? " text-white" : "text-gray-400"}>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold">9:16</span>
                                  <MdOutlineCropPortrait size={25} />
                                </div>
                              </DropdownItem>
                              <DropdownItem
                                key="16:9"
                                textValue="16/9"
                                onPress={() => handleVideoCropSelect(16 / 9)}
                                className={videoCropRatio === 16 / 9 ? " text-white" : "text-gray-400"}>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold">16:9</span>
                                  <MdOutlineCropLandscape size={25} />
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </>
                      ) : (
                        <>
                          <Dropdown placement="top-start" className="p-0 rounded-lg  bg-black bg-opacity-70">
                            <DropdownTrigger>
                              <button className="rounded-full p-2 bg-black bg-opacity-65 items-center cursor-pointer ">
                                <FaCropSimple color="white" />
                              </button>
                            </DropdownTrigger>
                            <DropdownMenu
                              className="rounded-md my-2"
                              variant="light"
                              closeOnSelect={false}
                              selectionMode="single">
                              <DropdownItem
                                key="1:1"
                                textValue="1/1"
                                onPress={() => handleImageCropSelect(1)}
                                className={imageCropRatio === 1 ? " text-white" : "text-gray-400"}>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold">1:1</span>
                                  <MdCropDin size={25} />
                                </div>
                              </DropdownItem>

                              <DropdownItem
                                key="4:5"
                                textValue="4/5"
                                onPress={() => handleImageCropSelect(4 / 5)}
                                className={imageCropRatio === 4 / 5 ? " text-white" : "text-gray-400"}>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold">4:5</span>
                                  <MdOutlineCropPortrait size={25} />
                                </div>
                              </DropdownItem>

                              <DropdownItem
                                key="16:9"
                                textValue="16/9"
                                onPress={() => handleImageCropSelect(16 / 9)}
                                showDivider={true}
                                className={imageCropRatio === 16 / 9 ? " text-white" : "text-gray-400"}>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold ">16:9</span>
                                  <MdOutlineCropLandscape size={25} />
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key as "photos" | "reels")}>
                    <Tab
                      key="photos"
                      title={
                        <div className="flex items-center space-x-2">
                          <GalleryIcon />
                          <span>Photos</span>
                        </div>
                      }>
                      <div className="flex flex-col items-center space-y-2">
                        <DragPhotoVideoIcon />
                        <span className="text-xl">Drag photos here</span>
                        <div>
                          <Button
                            size="md"
                            className="bg-sky-400 font-medium text-white px-10"
                            onClick={handleButtonClick}>
                            Select From Computer
                          </Button>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      key="reels"
                      title={
                        <div className="flex items-center space-x-2">
                          <VideoAddIcon />
                          <span>Reels</span>
                        </div>
                      }>
                      <div className="flex flex-col items-center space-y-2">
                        <DragPhotoVideoIcon />
                        <span className="text-xl">Drag videos here</span>
                        <div>
                          <Button
                            size="md"
                            className="bg-[#EA284E] font-medium text-white px-10"
                            onClick={handleButtonClick}>
                            Select From Computer
                          </Button>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={selectedTab === "photos" ? ".webp,.png,.jpg" : ".mp4"}
        multiple={selectedTab === "photos"}
        onChange={handleFileChange}
      />
      <AddPostModal />
    </>
  );
};

export default SelectPhotoModal;
