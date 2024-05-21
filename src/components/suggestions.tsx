import { Avatar } from '@nextui-org/react'
import React from 'react'

const Suggestions = () => {
    return (
        <div className="space-y-2">
            <div className=''>
                <div className="flex justify-between text-sm mb-5">
                    <h3 className="text-sm font-semibold text-gray-400">Suggestions</h3>
                    <button className='text-gray-600 font-semibold'>See All</button>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className=''>
                        <div className="rounded-full w-8 h-8">
                            <Avatar src="https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600" />
                        </div>
                    </div>
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">jack200</h2>
                        <h3 className="text-xs text-gray-400">New to Instagram</h3>

                    </div>
                    <button className="text-blue-400 text-xs font-bold">Follow</button>
                </div>
                <div className="flex items-center justify-between mt-5">
                    <div className=''>
                        <div className="rounded-full w-8 h-8">
                            <Avatar src="https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600" />
                        </div>
                    </div>
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">jack200</h2>
                        <h3 className="text-xs text-gray-400">New to Instagram</h3>

                    </div>
                    <button className="text-blue-400 text-xs font-bold">Follow</button>
                </div>
                <div className="flex items-center justify-between mt-5">
                    <div className=''>
                        <div className="rounded-full w-8 h-8">
                            <Avatar src="https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600" />
                        </div>
                    </div>
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">jack200</h2>
                        <h3 className="text-xs text-gray-400">New to Instagram</h3>

                    </div>
                    <button className="text-blue-400 text-xs font-bold">Follow</button>
                </div>
            </div>
        </div>

    )
}

export default Suggestions