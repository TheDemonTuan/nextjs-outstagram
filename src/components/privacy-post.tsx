import { Tooltip } from "@nextui-org/react";
import React from "react";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";

const PostPrivacy = ({ privacy }: { privacy: number }) => {
  return (
    <>
      <span className="ml-1 cursor-pointer">
        {privacy === 0 && (
          <Tooltip content="Public" placement="top" className="px-3 py-2 rounded-lg bg-black text-white bg-opacity-65">
            <div>
              <MdOutlinePublic size={12} color="#65676B" />
            </div>
          </Tooltip>
        )}
        {privacy === 2 && (
          <Tooltip content="Private" placement="top" className="px-3 py-2 rounded-lg bg-black text-white bg-opacity-65">
            <div>
              <FaLock size={12} color="#65676B" />
            </div>
          </Tooltip>
        )}
        {privacy === 1 && (
          <Tooltip content="Friends" placement="top" className="px-3 py-2 rounded-lg bg-black text-white bg-opacity-65">
            <div>
              <FaUserFriends size={12} color="#65676B" />
            </div>
          </Tooltip>
        )}
      </span>
    </>
  );
};

export default PostPrivacy;
