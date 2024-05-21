import React from 'react'

interface StoryProps {
    img: string;
    username: string;
}

const Story: React.FC<StoryProps> = ({ img, username }) => {
    return (
        <div>
            <div className='bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px] rounded-full'>
                <div className="bg-white rounded-full p-1">
                    <img className="h-14 w-14 rounded-full" src={img} alt="" />
                </div>
            </div>
            <p className='text-xs w-16 truncate text-center pt-1'>{username}</p>
        </div>
    );
}

export default Story;