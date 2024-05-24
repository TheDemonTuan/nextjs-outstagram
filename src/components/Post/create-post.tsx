import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostResponse, postCreate, postKey } from "@/api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react";
import { useModalStore } from "@/stores/modal-store";
import Image from "next/image";

export const CreatePostModalKey = "CreatePost";

const CreatePost = () => {
  const { modalClose, modalKey } = useModalStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const captionRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const { mutate: createMutate, isPending: createIsPending } = useMutation<
    ApiSuccessResponse<PostResponse>,
    ApiErrorResponse,
    FormData
  >({
    mutationFn: async (params) => await postCreate(params),
    onSuccess: (res) => {
      toast.success("Add new post successfully!");
      queryClient.setQueryData([postKey, "me"], (oldData: ApiSuccessResponse<PostResponse[]>) =>
        oldData ? { ...oldData, data: [res.data, ...oldData.data] } : oldData
      );
      setSelectedFiles([]);
      setPreviews([]);
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Add new post failed!");
    },
  });

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [selectedFiles, previews]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles([...selectedFiles, ...newFiles]);

    const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  const handleAddPost = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("caption", captionRef.current?.value || "");
    createMutate(formData);
  };

  return (
    <Modal
      size="xl"
      scrollBehavior="inside"
      isDismissable={false}
      hideCloseButton={createIsPending}
      isOpen={modalKey === CreatePostModalKey}
      onOpenChange={modalClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              <h2 className="mt-5 text-3xl font-bold text-gray-900">New Post</h2>
              <p className="mt-2 text-sm text-gray-400">Create new post to share for everyone.</p>
            </ModalHeader>
            <ModalBody>
              <div className="relative flex items-center justify-center">
                <div className="sm:max-w-lg w-full bg-white rounded-xl z-10">
                  <form className="space-y-4" action="#" method="POST">
                    <div className="grid grid-cols-1 space-y-2">
                      <Textarea
                        className="w-full border-transparent ring-transparent"
                        placeholder="Write something here..."
                        label="Caption"
                        variant="bordered"
                        ref={captionRef}
                      />
                    </div>
                    {!previews.length && (
                      <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                            <div className="h-full w-full text-center flex flex-col items-center justify-center">
                              <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                <img className="has-mask h-36 object-center" src="/upload.webp" alt="upload" />
                              </div>
                              <p className="pointer-none text-gray-500 ">
                                <span className="text-sm">Drag and drop</span> files here <br /> or{" "}
                                <a href="" id="" className="text-blue-600 hover:underline">
                                  select a file
                                </a>{" "}
                                from your computer
                              </p>
                            </div>
                            <input
                              onChange={handleImageChange}
                              type="file"
                              className="hidden"
                              accept=".webp,.png,.jpg,.mp4"
                              multiple
                            />
                          </label>
                        </div>
                      </div>
                    )}
                    {previews.length > 0 && (
                      <div className="slide-container">
                        <ImageGallery
                          items={previews.map((image, index) => {
                            return {
                              original: image,
                              thumbnail: image,
                              index,
                            };
                          })}
                          renderItem={(item: any) => {
                            return (
                              <div className="w-full h-96 relative">
                                <Image alt={"demo"} src={item.original} className="w-full h-full object-contain" fill />
                                <button
                                  onClick={() => handleRemoveImage(item?.index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:opacity-85">
                                  &times;
                                </button>
                              </div>
                            );
                          }}
                        />
                      </div>
                    )}
                    <p className="text-sm text-gray-300">
                      <span>File type: png, webp, jpg, mp4</span>
                    </p>
                  </form>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} isLoading={createIsPending}>
                Close
              </Button>
              <Button color="primary" onPress={handleAddPost} isLoading={createIsPending}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreatePost;
