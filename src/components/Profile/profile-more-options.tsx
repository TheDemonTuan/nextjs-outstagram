import React from "react";
import { Link } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useModalStore } from "@/stores/modal-store";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import AboutThisAccount, { AboutThisAccountModalKey } from "../about-this-account";
import ShareModal, { ShareModalKey } from "../Post/share-modal";
import ConfirmBanAccount, { ConfirmBanAccountModalKey } from "./confirm-ban-account";
import ReportModal, { ReportModalKey } from "../Report/report-modal";
import { ReportType } from "@/api/report";

export const ProfileMoreOptionsModalKey = "ProfileMoreOptions";

const UserNotMeMoreOptions = [
  {
    title: "Block",
    className: "text-red-500 font-semibold",
  },
  {
    title: "Report",
    className: "text-red-500 font-semibold",
    action: true,
  },
  {
    title: "Share to ...",
    action: true,
  },
  {
    title: "About this account",
    action: true,
  },
  {
    title: "Cancel",
    action: true,
  },
];

const ProfileMoreOptions = () => {
  const { modalClose, modalKey, modalData, setModalData, modalOpen } = useModalStore();
  const { authData } = useAuth();

  const UserAdminMoreOptions = [
    {
      title: modalData.active === true ? "Ban account" : "Unban account",
      className: "text-red-500 font-semibold",
      action: true,
    },
    {
      title: "Block",
      className: "text-red-500 font-semibold",
    },
    {
      title: "Report",
      className: "text-red-500 font-semibold",
      action: true,
    },
    {
      title: "Share to ...",
      action: true,
    },
    {
      title: "About this account",
      action: true,
    },
    {
      title: "Cancel",
      action: true,
    },
  ];

  return (
    <>
      <Modal isOpen={modalKey === ProfileMoreOptionsModalKey} onOpenChange={modalClose} hideCloseButton={true}>
        <ModalContent>
          {() => {
            const listOptionItem = authData?.role === true ? UserAdminMoreOptions : UserNotMeMoreOptions;
            return (
              <>
                <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0">
                  {listOptionItem.map((optionItem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div
                          key={index}
                          className="flex items-center gap-2"
                          onClick={() => {
                            if (optionItem?.action) {
                              switch (optionItem.title) {
                                case "Ban account":
                                  setModalData(modalData);
                                  modalOpen(ConfirmBanAccountModalKey);
                                  break;
                                case "Unban account":
                                  setModalData(modalData);
                                  modalOpen(ConfirmBanAccountModalKey);
                                  break;
                                case "About this account":
                                  setModalData(modalData);
                                  modalOpen(AboutThisAccountModalKey);
                                  break;
                                case "Share to ...":
                                  setModalData(modalData);
                                  modalOpen(ShareModalKey);
                                  break;
                                case "Report":
                                  setModalData(modalData);
                                  modalOpen(ReportModalKey);
                                  break;
                                case "Cancel":
                                  modalClose();
                                  break;
                                default:
                                  break;
                              }
                            }
                          }}>
                          <p className={cn("text-black", optionItem?.className)}>{optionItem.title}</p>
                        </div>
                        {index !== listOptionItem.length - 1 && <hr className="w-full border-gray-300" />}
                      </React.Fragment>
                    );
                  })}
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
      <AboutThisAccount isProfile={true} />
      <ShareModal isProfile={true} />
      <ConfirmBanAccount />
      <ReportModal type={ReportType.User} />
    </>
  );
};

export default ProfileMoreOptions;
