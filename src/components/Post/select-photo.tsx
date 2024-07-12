import { ArrowLeftIcon, DragPhotoVideoIcon, GalleryIcon, VideoAddIcon } from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs } from "@nextui-org/react";
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import AddPostModal, { AddPostModalKey } from "./create-post";
import CarouselDetailPost from "./carousel-detail-post";
import { PostType } from "@/api/post";

export const SelectPhotoModalKey = "SelectPhotoModal";

const SelectPhotoModal = ({ defaultTab = "photos" }: { defaultTab?: "photos" | "reels" }) => {
  const { modalOpen, modalClose, modalKey, modalData, setModalData } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filesWithType, setFilesWithType] = useState<{ id: string; url: File; type: number }[]>([]);

  const [selectedTab, setSelectedTab] = useState<"photos" | "reels">(defaultTab);

  useEffect(() => {
    if (modalData?.selectedFiles) {
      const existingFiles = modalData.selectedFiles.map((file: File, index: number) => ({
        id: index.toString(),
        url: file,
        type: file.type.startsWith("image/") ? PostType.DEFAULT : PostType.REEL,
      }));
      setFilesWithType(existingFiles);
    }
  }, [modalData]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      if (selectedTab === "reels" && filesArray.length > 1) return;

      const filesWithType = filesArray.map((file, index) => {
        const fileType = file.type.startsWith("image/") ? PostType.DEFAULT : PostType.REEL;
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

  const handleNextClick = async () => {
    setModalData({ ...modalData, selectedFiles: filesWithType.map((file) => file.url) });
    modalOpen(AddPostModalKey);
  };

  const resetFilesWithType = () => {
    setFilesWithType([]);
  };

  return (
    <>
      <Modal size="md" isOpen={modalKey === SelectPhotoModalKey} onOpenChange={closeModalClick} hideCloseButton={true}>
        <ModalContent className="h-[500px]">
          {() => (
            <>
              {filesWithType.length <= 0 ? (
                <ModalHeader className="flex gap-1 items-center justify-center p-3">
                  {selectedTab === "photos" ? "Create new post" : "Create new reel"}
                </ModalHeader>
              ) : (
                <ModalHeader className="flex justify-between items-center my-[-5px]">
                  <button onClick={resetFilesWithType} className="cursor-pointe font-normal text-sm ">
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
                          type: file.type ? PostType.DEFAULT : PostType.REEL,
                        };
                      })}
                      onDelete={handleDelete}
                    />
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
        accept={selectedTab === "photos" ? ".webp,.png,.jpg,.jpeg" : ".mp4"}
        multiple={selectedTab === "photos"}
        onChange={handleFileChange}
      />
      <AddPostModal onResetModalSelectPhoto={resetFilesWithType} />
    </>
  );
};

export default SelectPhotoModal;
