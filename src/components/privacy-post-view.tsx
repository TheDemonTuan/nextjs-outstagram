import { Tooltip } from "@nextui-org/react";
import React from "react";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";

const PostPrivacyView = ({
  privacy,
  size,
  color = "#65676B",
  disabledTooltip = false,
}: {
  privacy: number;
  size: number;
  color?: string;
  disabledTooltip?: boolean;
}) => {
  return (
    <>
      <span className="ml-1 cursor-pointer">
        {privacy === 0 && (
          <Tooltip
            content="Public"
            placement="top"
            className="px-3 py-2 rounded-lg bg-black text-white bg-opacity-65"
            isDisabled={disabledTooltip}>
            <div>
              <MdOutlinePublic size={size} color={color} />
            </div>
          </Tooltip>
        )}
        {privacy === 2 && (
          <Tooltip
            content="Private"
            placement="top"
            className="px-3 py-2 rounded-lg bg-black text-white bg-opacity-65"
            isDisabled={disabledTooltip}>
            <div>
              <FaLock size={size} color={color} />
            </div>
          </Tooltip>
        )}
        {privacy === 1 && (
          <Tooltip
            content="Friends"
            placement="top"
            className="px-3 py-2 rounded-lg bg-black text-white bg-opacity-65"
            isDisabled={disabledTooltip}>
            <div>
              <FaUserFriends size={size} color={color} />
            </div>
          </Tooltip>
        )}
      </span>
    </>
  );
};

export default PostPrivacyView;
