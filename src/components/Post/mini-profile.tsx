import { Avatar } from '@nextui-org/react'
import React from 'react'

const MiniProfile = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">

                <div className="rounded-full">
                    <Avatar src="https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600" />
                </div>
                <div className="flex-1 mx-4">
                    <h2 className="font-bold">Ninhdan1</h2>
                    <h3 className="text-sm text-gray-400">welcome to Instagram</h3>
                </div>
            </div>
            <button className="text-blue-400 text-sm font-semibold">
                Sign Out
            </button>
        </div>

    )
}

export default MiniProfile