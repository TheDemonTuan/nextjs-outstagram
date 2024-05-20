"use client";
import React from 'react'


const Gallery = () => {
    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="relative group cursor-pointer">
                <img className="object-cover overflow-hidden h-64 fill" src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <div className="text-white">
                        Hover Content
                    </div>
                </div>
            </div>
            <img className="object-cover overflow-hidden h-64 fill" src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <img className="object-cover overflow-hidden h-64 fill" src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <img className="object-cover overflow-hidden h-64 fill" src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <img className="object-cover overflow-hidden h-64 fill" src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>

    )
}

export default Gallery