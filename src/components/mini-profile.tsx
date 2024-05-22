"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { Avatar, Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useModalStore } from "@/stores/modal-store";
import { toast } from "sonner";
import { clearJWT } from "@/actions";

const MiniProfile = () => {
  const { authData } = useAuth();
  const { modalOpen } = useModalStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="rounded-full">
          <Avatar src={getUserAvatarURL(authData?.avatar)} />
        </div>
        <div className="flex-1 mx-4">
          <h2 className="font-bold">{authData?.username}</h2>
          <h3 className="text-sm text-gray-400">{authData?.full_name}</h3>
        </div>
      </div>
      <button
        className="text-blue-400 text-sm font-semibold hover:text-red-500"
        onClick={() => modalOpen(SignOutModalKey)}>
        Sign Out
      </button>
      <SignOutAlert />
    </div>
  );
};

export default MiniProfile;

const SignOutModalKey = "SignOut";

const SignOutAlert = () => {
  const { modalKey, modalClose } = useModalStore();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    toast.promise(clearJWT(), {
      loading: "Logging out... 🚪",
      success: "Logged out successfully! 👋",
      error: "Failed to log out! 😵",
    });
    queryClient.clear();
    modalClose();
  };

  return (
    <Modal isOpen={SignOutModalKey === modalKey} onOpenChange={modalClose}>
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
