"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { Button, Spinner } from "@nextui-org/react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useModalStore } from "@/stores/modal-store";
import { toast } from "sonner";
import { clearJWT } from "@/actions";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MiniProfile = () => {
  const { authData } = useAuth();
  const { modalOpen } = useModalStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Link href={`/${authData?.username}`}>
          <Avatar className="w-11 h-11">
            <AvatarImage className="object-cover" src={getUserAvatarURL(authData?.avatar)} />
            <AvatarFallback>
              <Spinner size="sm" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 mx-4 flex flex-col">
          <Link href={`/${authData?.username}`} className="font-bold text-sm">
            {authData?.username}
          </Link>
          <span className="text-sm text-gray-400">{authData?.full_name}</span>
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
