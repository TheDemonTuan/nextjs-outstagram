"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { Button, Spinner } from "@nextui-org/react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useModalStore } from "@/stores/modal-store";
import { toast } from "sonner";
import { logoutToken } from "@/actions";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerifiedIcon } from "@/icons";
import LogoutModal, { LogoutModalKey } from "./logout-modal";

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
          <div className="flex space-x-1 items-center">
            <Link href={`/${authData?.username}`} className="font-bold text-sm">
              {authData?.username}
            </Link>
            {authData?.role && <VerifiedIcon className="w-4 h-4" />}
          </div>
          <span className="text-sm text-gray-400">{authData?.full_name}</span>
        </div>
      </div>
      <button
        className="text-blue-400 text-sm font-semibold hover:text-red-500"
        onClick={() => modalOpen(LogoutModalKey)}>
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
