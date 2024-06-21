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
import React, { ChangeEvent, useRef, useState } from "react";
import AddPostModal, { AddPostModalKey } from "./add-post";
import CarouselDetailPost from "./carousel-detail-post";
import { FaCropSimple } from "react-icons/fa6";
import { MdCropDin, MdOutlineCropLandscape, MdOutlineCropPortrait } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";

export const SelectPhotoModalKey = "SelectPhotoModal";

const SelectPhotoModal = () => {
  const { modalOpen, modalClose, modalKey, modalData, setModalData } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filesWithType, setFilesWithType] = useState<{ id: string; url: File; type: number }[]>([]);
  const [selectedTab, setSelectedTab] = useState<"photos" | "reels">("photos");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      if (selectedTab === "reels" && filesArray.length > 1) return;

      const filesWithType = filesArray.map((file, index) => {
        const fileType = file.type.startsWith("image/") ? 0 : 1;
        return {
          id: index.toString(),
          url: file,
          type: fileType,
        };
      });

      setFilesWithType(filesWithType);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleNextClick = () => {
    setModalData({ ...modalData, selectedFiles: filesWithType.map((file) => file.url) });
    setFilesWithType([]);
    modalOpen(AddPostModalKey);
  };

  const closeModalClick = () => {
    setFilesWithType([]);
    modalClose();
  };

  const handleDelete = (id: string) => {
    setFilesWithType((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const backSelectPhoto = () => {
    setFilesWithType([]);
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
                  <div className="text-lg font-medium">Choose Photo</div>
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
                          type: file.type ? 0 : 1,
                        };
                      })}
                      onDelete={handleDelete}
                    />
                    {/* <div className="absolute bottom-2 left-2">
                      <Dropdown placement="top-start" className="p-0 rounded-md  border-small border-divider">
                        <DropdownTrigger>
                          <button className=" rounded-full p-2 bg-black opacity-50  items-center cursor-pointer">
                            <FaCropSimple color="white" />
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu className="rounded-md">
                          <DropdownItem
                            key="original"
                            title={
                              <div className="flex items-center space-x-2">
                                <span className="font-bold">Original</span>
                                <IoImageOutline size={20} />
                              </div>
                            }>
                            <Divider />
                          </DropdownItem>

                          <DropdownItem
                            key="1:1"
                            title={
                              <div className="flex items-center space-x-2">
                                <span className="font-bold">1:1</span>
                                <MdCropDin size={20} />
                              </div>
                            }></DropdownItem>

                          <DropdownItem
                            key="4:5"
                            title={
                              <div className="flex items-center space-x-2">
                                <span className="font-bold">4:5</span>
                                <MdOutlineCropLandscape size={20} />
                              </div>
                            }></DropdownItem>
                          <DropdownItem
                            key="16:9"
                            title={
                              <div className="flex items-center space-x-2">
                                <span className="font-bold"> 16:9 </span>
                                <MdOutlineCropPortrait size={20} />
                              </div>
                            }></DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div> */}
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
