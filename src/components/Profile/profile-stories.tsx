"use client";

import React from "react"

const ProfileStories = () => {
    return (
        <div>
            <div className="h-24 w-24 bg-gradient-to-tr from-yellow-500 to-red-600 p-[1px] rounded-full mt-14 flex justify-center overflow-hidden">
                <div className="bg-white rounded-full ">
                    <img className="h-24 w-24 rounded-full p-1" src="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </div>
            </div>
            <p className="text-xs w-20 truncate text-center mt-2">username</p>
        </div>
    )
}

export default ProfileStories