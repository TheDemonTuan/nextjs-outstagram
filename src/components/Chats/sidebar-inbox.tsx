"use client";
import { EditIcon } from "@/icons";
import { Avatar } from "@nextui-org/react";
import UserBox from "./user-box";

function SildeBarInbox({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 pb-20 lg:pb-0 lg:block overflow-y-auto overflow-x-hidden border-r border-gray-200 block w-[400]">
        <div className="px-0 py-5">
          <div className="flex-col">
            <div className="flex flex-row items-center px-5">
              <div className="text-xl font-bold text-black-700 py-4">
                Ninh_dan123
              </div>
              <div className="ml-52">
                <EditIcon />
              </div>
            </div>
            <div className="px-5">
              <Avatar
                src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="w-20 h-20 mt-10"
              />
              <div className="text-gray-500 text-sm p-1 pl-2">
                <p>Your note</p>
              </div>
            </div>
            <div className="px-5 mb-4">
              <div className="flex flex-row items-center mt-7">
                <div className="text-base font-bold text-black-700">
                  Messages
                </div>
                <div className="ml-52 text-sm font-semibold text-gray-500">
                  Requests
                </div>
              </div>
            </div>
            <div>
              <div className="mb-3 w-[400] px-5 active:bg-[#EFEFEF] hover:bg-[#EFEFEF]">
                <div className="cursor-pointer">
                  <UserBox />
                </div>
              </div>

              <div className="mb-3 w-[400] px-5 active:bg-[#EFEFEF]">
                <div className="cursor-pointer hover:opacity-75 transition  ">
                  <UserBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default SildeBarInbox;
