import React from "react";
import { LikeHeartIcon, MessageCircleIcon, MultiFileIcon } from "@/icons";
import Image from "next/image";

const ExplorePage = () => {
  return (
    <div className="max-w-5xl mx-5 p-8 xl:mx-auto">
      <div className="grid grid-cols-3 grid-rows-2 gap-1">
        <div className="relative cursor-pointer  group">
          <div className="col-span-1 row-span-1 w-full h-full">
            <img
              src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative cursor-pointer  group">
          <div className="col-span-1 row-span-1 w-full h-full">
            <img
              src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-2 relative">
          <div className="w-full h-[40rem] group">
            <img
              src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative cursor-pointer  group">
          <div className="col-span-1 row-span-1 w-full h-full">
            <img
              src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative cursor-pointer  group">
          <div className="col-span-1 row-span-1 w-full h-full">
            <img
              src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-1 mt-1">
        <div className="col-span-1 row-span-2 relative">
          <div className="w-full h-[40rem] group">
            <img
              src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative cursor-pointer  group">
          <div className="col-span-1 row-span-1 w-full h-full">
            <img
              src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative cursor-pointer  group">
          <div className="col-span-1 row-span-1 w-full h-full">
            <img
              src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative cursor-pointer  group">
          <div className="col-span-1 row-span-1 w-full h-full">
            <img
              src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative cursor-pointer  group">
          <div className="col-span-1 row-span-1 w-full h-full">
            <img
              src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
