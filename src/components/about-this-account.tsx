import { useModalStore } from "@/stores/modal-store";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaRegCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { IoLocationOutline, IoPeopleOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { VerifiedIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { FaLocationDot } from "react-icons/fa6";
import { GoUnverified } from "react-icons/go";

export const AboutThisAccountModalKey = "AboutThisAccount";
const AboutThisAccount = ({ isProfile = false }: { isProfile?: boolean }) => {
  const { modalClose, modalKey, modalData } = useModalStore();

  const dataUser = isProfile === false ? modalData.user : modalData;

  return (
    <>
      <Modal size="sm" isOpen={modalKey === AboutThisAccountModalKey} onOpenChange={modalClose} hideCloseButton={true}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold items-center text-base border-b py-3">
                About this account
              </ModalHeader>

              <ModalBody className="my-2">
                <div className="flex flex-col items-center justify-center space-y-4 ">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={getUserAvatarURL(dataUser.avatar)} />
                    <AvatarFallback>
                      <Spinner size="md" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="font-bold text-base flex items-center space-x-1">
                    <span>{dataUser.username}</span>
                    {dataUser.role && <VerifiedIcon className="w-3 h-3" />}
                  </div>
                  <p className="text-xs text-[#737373] text-center">
                    To help keep our community authentic, we&apos;re showing <br /> information about accounts on
                    Instagram. <span className="text-[#00376b]">See why this information is important.</span>
                  </p>
                </div>
                <div className="flex flex-col mt-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaRegCalendarAlt size={25} />
                    <div className="flex flex-col -space-y-1">
                      <span>Date joined</span>
                      <span className="text-sm text-[#737373]">
                        {new Date(dataUser.created_at).toLocaleString("en-us", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaLocationDot size={25} />
                    <div className="flex flex-col -space-y-1">
                      <span>Account based in</span>
                      <span className="text-sm text-[#737373]">Not shared</span>
                    </div>
                  </div>

                  {dataUser.role ? (
                    <div className="flex items-center space-x-3">
                      <MdOutlineVerified size={25} />
                      <div className="flex flex-col -space-y-1">
                        <span>Verified admin</span>
                        <span className="text-sm text-[#737373]">
                          {new Date(dataUser.created_at).toLocaleString("en-us", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <GoUnverified size={25} />
                      <div className="flex flex-col -space-y-1">
                        <span>Verified member</span>
                      </div>
                    </div>
                  )}
                  {dataUser.updated_at !== dataUser.created_at && (
                    <div className="flex items-center space-x-3">
                      <FaRegUserCircle size={25} />
                      <div className="flex flex-col -space-y-1">
                        <span>Last updated</span>
                        <span className="text-sm text-[#737373]">
                          {" "}
                          {new Date(dataUser.updated_at).toLocaleString("en-us", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter
                className="flex flex-col gap-1 items-center text-base border-t py-2 cursor-pointer"
                onClick={modalClose}>
                Close
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutThisAccount;
