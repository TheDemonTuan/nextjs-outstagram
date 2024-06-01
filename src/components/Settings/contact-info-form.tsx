"use client";

import React from "react";
import { Spinner } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";
import { EmailIcon, PhoneContactIcon } from "@/icons";
import { MdKeyboardArrowRight } from "react-icons/md";
import ChangeEmailModal, { ChangeEmailModalKey } from "./change-email-modal";
import { useModalStore } from "@/stores/modal-store";
import ChangePhoneModal, { ChangePhoneModalKey } from "./change-phone-modal";
import ConfirmDeletePost, { ConfirmDeletePostModalKey } from "../Post/confirm-delete-post";
import EditPost, { EditPostModalKey } from "../Post/edit-post";

const ContactInfoForm = () => {
  const { authData, authIsLoading } = useAuth();
  const { modalOpen } = useModalStore();
  if (authIsLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">
          Manage your mobile numbers and emails to make sure your contact info is accurate and up to date.
        </div>
        <div className="flex flex-col border-1 h-28 my-5 rounded-2xl justify-evenly shadow-sm">
          <button onClick={() => modalOpen(ChangeEmailModalKey)}>
            <div className="mx-5 justify-center items-center cursor-pointer ">
              <div className="flex justify-between ">
                <div className="flex flex-row">
                  <div className="">
                    <EmailIcon />
                  </div>
                  <div className="mx-2 font-medium">{authData?.email}</div>
                </div>
                <div>
                  <MdKeyboardArrowRight size={25} color="#425564" />
                </div>
              </div>
            </div>
          </button>

          <hr />
          <button onClick={() => modalOpen(ChangePhoneModalKey)}>
            <div className="mx-5 justify-center items-center cursor-pointer">
              <div className="flex justify-between">
                <div className="flex flex-row">
                  <div>
                    <PhoneContactIcon />
                  </div>
                  <div className="mx-2 font-medium">{authData?.phone}</div>
                </div>
                <div>
                  <MdKeyboardArrowRight size={25} color="#425564" />
                </div>
              </div>
            </div>
          </button>
        </div>
        <hr />
        <button onClick={() => modalOpen(EditPostModalKey)}>
          <div className="mx-5 justify-center items-center cursor-pointer">
            <div className="flex justify-between">
              <div className="flex flex-row">
                <div>
                  <PhoneContactIcon />
                </div>
                <div className="mx-2 font-medium">{authData?.phone}</div>
              </div>
              <div>
                <MdKeyboardArrowRight size={25} color="#425564" />
              </div>
            </div>
          </div>
        </button>
        <hr />
        <button onClick={() => modalOpen(ConfirmDeletePostModalKey)}>
          <div className="mx-5 justify-center items-center cursor-pointer">
            <div className="flex justify-between">
              <div className="flex flex-row">
                <div>
                  <PhoneContactIcon />
                </div>
                <div className="mx-2 font-medium">{authData?.phone}</div>
              </div>
              <div>
                <MdKeyboardArrowRight size={25} color="#425564" />
              </div>
            </div>
          </div>
        </button>
      </div>
      <EditPost />
      <ConfirmDeletePost />
      <ChangeEmailModal />
      <ChangePhoneModal />
    </div>
  );
};

export default ContactInfoForm;
