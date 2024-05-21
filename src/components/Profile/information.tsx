import { SettingIcon, VerifiedIcon } from "@/icons"
import { Avatar, Link } from "@nextui-org/react"
import React from "react"
import { useModalStore } from "@/stores/modal-store";
import ProfileSettings, { ProfileSettingModalKey } from "./profile-settings";

const Information = () => {
    const { modalOpen } = useModalStore();
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-4 ">
                <div className="col-span-1">
                    <div className="rounded-full w-40 h-40">
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-37 h-37 text-large" />
                    </div>
                </div>
                <div className="col-span-2 ml-5">
                    <div className=" inline-flex">
                        <span className="text-black-700 text-2xl mr-4 leading-6">
                            username <VerifiedIcon className="inline-flex" />
                        </span>
                    </div>

                    <div className="cursor-pointer inline-flex items-center justify-center text-xs text-gray-700 font-semibold py-2 px-3 border-none rounded mr-4 bg-[#DBDBDB] w-24">
                        <span>Edit profile</span>

                    </div>
                    <div className="cursor-pointer inline-flex items-center justify-center text-xs text-gray-700 font-semibold py-2 px-3 border-none rounded mr-4 bg-[#DBDBDB] w-24">
                        <span>View archive</span>
                    </div>
                    <ProfileSettings />

                    <SettingIcon className="cursor-pointer h-6 inline-block " onClick={() => modalOpen(ProfileSettingModalKey)} />
                    <div className="mt-5 flex">
                        <div><span className="font-semibold text-sm leading-5">200</span> <span className="font-normal text-sm leading-5">posts</span> </div>
                        <div className="ml-10"><span className="font-semibold text-sm leading-5">200</span> <span className="font-normal text-sm leading-5">followers</span></div>
                        <div className="ml-10"><span className="font-semibold text-sm leading-5">200</span> <span className="font-normal text-sm leading-5">following</span></div>
                    </div>

                    <div>
                        <div className=" pt-5">
                            <span className="text-base font-semibold text-black-700 mr-2 leading-5">fullname</span>
                        </div>
                        <div className="">
                            <p className="text-base text-black-700 mr-2 leading-5">bio</p>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Information