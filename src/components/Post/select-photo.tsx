import { DragPhotoVideoIcon } from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { ChangeEvent, useRef, useState } from "react";
import AddPostModal, { AddPostModalKey } from "./add-post";
import Carousel from "./carousel";
import CarouselDetailPost from "./carousel-detail-post";

export const SelectPhotoModalKey = "SelectPhotoModal";

const SelectPhotoModal = () => {
  const { modalOpen, modalClose, modalKey, modalData, setModalData } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filesWithType, setFilesWithType] = useState<{ id: string; url: string; type: number }[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setModalData({ ...modalData, selectedFiles: filesArray });

      const filesWithType = filesArray.map((file, index) => {
        const fileType = file.type.startsWith("image/") ? 0 : 1;
        return {
          id: index.toString(),
          url: URL.createObjectURL(file),
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
    console.log(`Number of files selected: ${filesWithType.length}`);
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
                  <button onClick={onClose} className="cursor-pointer font-normal text-sm ">
                    Cancel
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
              <ModalBody className="flex items-center justify-center p-0">
                {filesWithType.length > 0 ? (
                  <CarouselDetailPost
                    slides={filesWithType.map((file) => {
                      return {
                        id: file.id || "",
                        url: file.url || "",
                        type: file.type ? 0 : 1,
                      };
                    })}
                    onDelete={handleDelete}
                  />
                ) : (
                  <>
                    <DragPhotoVideoIcon />
                    <span className="text-xl">Drag photos and videos here</span>
                    <div>
                      <Button size="md" className="bg-sky-400 font-medium text-white px-10" onClick={handleButtonClick}>
                        Select From Computer
                      </Button>
                    </div>
                  </>
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
        accept=".webp,.png,.jpg,.mp4"
        multiple
        onChange={handleFileChange}
      />
      <AddPostModal />
    </>
  );
};

export default SelectPhotoModal;
