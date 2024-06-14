"use client";
import { ArchiveIcon } from "@/icons";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const ArchivePage = () => {
  return (
    <div className="max-w-6xl mx-5 xl:mx-auto mt-10">
      <div className="flex items-center space-x-2">
        <button onClick={() => history.back()}>
          <FaArrowLeftLong className="text-xl text-gray-800 " />
        </button>

        <h1 className="text-xl">Archive</h1>
      </div>

      <div className="flex justify-center gap-10">
        <button className=" border-gray-800 border-b py-4 text-sm  flex gap-2 text-gray-800">
          <ArchiveIcon width="10" height="10" /> STORIES
        </button>
      </div>
      <hr className="border-gray-300 mb-7" />

      <div className="flex items-center space-x-2 mb-7">
        <p className="text-xs">Only you can see your archived stories unless you choose to share them.</p>
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-3 mb-1">
        <div className="col-span-1 row-span-2 w-full h-[29rem]">
          <img
            src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 w-full h-[29rem]">
          <img
            src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 w-full h-[29rem]">
          <img
            src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 w-full h-[29rem]">
          <img
            src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-3 mb-2">
        <div className="col-span-1 row-span-2 w-full h-[29rem]">
          <img
            src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 w-full h-[29rem]">
          <img
            src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 w-full h-[29rem]">
          <img
            src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 w-full h-[29rem]">
          <img
            src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
