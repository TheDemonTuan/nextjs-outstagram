import { logoutToken } from "@/actions";
import { useModalStore } from "@/stores/modal-store";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export const LogoutModalKey = "Logout";

const LogoutModal = () => {
  const { modalKey, modalClose } = useModalStore();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    toast.promise(logoutToken(), {
      loading: "Logging out... 🚪",
      success: "Logged out successfully! 👋",
      error: "Failed to log out! 😵",
    });
    queryClient.clear();
    modalClose();
  };

  return (
    <Modal isOpen={LogoutModalKey === modalKey} onOpenChange={modalClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Sign Out</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to sign out?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                No
              </Button>
              <Button color="primary" onPress={handleSignOut}>
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
