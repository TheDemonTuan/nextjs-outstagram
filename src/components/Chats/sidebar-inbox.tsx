import { EditIcon } from "@/icons";
import { Avatar } from "@nextui-org/react";
import UserBox from "./user-box";

function SideBarInbox() {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="flex items-center justify-between p-5">
        <div className="text-xl font-bold text-black-700 py-4 mt-1">Ninh_dan123</div>
        <EditIcon className="mr-3" />
      </div>
      <div className="p-2 px-6">
        <Avatar
          src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
          className="w-20 h-20"
        />
        <p className="text-gray-500 text-sm p-1 pl-2">Your note</p>
      </div>
      <div className="flex items-center justify-between p-2 px-6">
        <div className="text-base font-bold text-black-700">Messages</div>
        <div className="text-sm font-semibold text-gray-500">Requests</div>
      </div>
      <div className="flex flex-col">
        <div className="px-5 active:bg-[#EFEFEF] hover:bg-[#EFEFEF]">
          <div className="cursor-pointer">
            <UserBox />
          </div>
        </div>
        <div className="px-5 active:bg-[#EFEFEF] hover:bg-[#EFEFEF]">
          <div className="cursor-pointer">
            <UserBox />
          </div>
        </div>
        <div className="px-5 active:bg-[#EFEFEF] hover:bg-[#EFEFEF]">
          <div className="cursor-pointer">
            <UserBox />
          </div>
        </div>
        <div className="px-5 active:bg-[#EFEFEF] hover:bg-[#EFEFEF]">
          <div className="cursor-pointer">
            <UserBox />
          </div>
        </div>
        <div className="px-5 active:bg-[#EFEFEF] hover:bg-[#EFEFEF]">
          <div className="cursor-pointer">
            <UserBox />
          </div>
        </div>
        <div className="px-5 active:bg-[#EFEFEF] hover:bg-[#EFEFEF]">
          <div className="cursor-pointer">
            <UserBox />
          </div>
        </div>
        <div className="px-5 active:bg-[#EFEFEF]">
          <div className="cursor-pointer hover:opacity-75 transition  ">
            <UserBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarInbox;
