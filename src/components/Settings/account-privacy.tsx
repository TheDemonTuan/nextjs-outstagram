import { Switch } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmPublicAccount, { ConfirmPublicAccountModalKey } from "./confirm-public-account";
import { useModalStore } from "@/stores/modal-store";
import { useAuth } from "@/hooks/useAuth";

const AccountPrivacy = () => {
  const { modalOpen } = useModalStore();
  const { authData } = useAuth();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(authData?.is_private ?? false);
  }, [authData]);

  const handlePrivateEdit = (isPrivate: boolean) => {
    setIsSelected(isPrivate);
  };

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between my-4">
          <div className="text-lg">Private account</div>
          <div>
            {" "}
            <Switch isSelected={isSelected} size="md" onChange={() => modalOpen(ConfirmPublicAccountModalKey)} />
          </div>
        </div>

        <div className="text-xs text-gray-500 max-w-xl my-2">
          When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they
          don’t have an Instagram account.
        </div>
        <div className="text-xs text-gray-500 max-w-xl my-2">
          When your account is private, only the followers you approve can see what you share, including your photos or
          videos on hashtag and location pages, and your followers and following lists.{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            <span>Learn more</span>
          </Link>
        </div>
      </div>
      <ConfirmPublicAccount onPrivateEdit={handlePrivateEdit} />
    </div>
  );
};

export default AccountPrivacy;
