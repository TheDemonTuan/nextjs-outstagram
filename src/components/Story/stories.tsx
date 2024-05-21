import React, { useRef, useState } from 'react'
import stories from './stories.json'
import Story from './story'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';

const Stories: React.FC = () => {
    const storiesRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false)
    const [showRight, setShowRight] = useState(true)

    const onScroll = () => {
        if (storiesRef.current && storiesRef.current.scrollLeft > 0) {
            setShowLeft(true);
        } else {
            setShowLeft(false);
        }
        if (storiesRef.current && storiesRef.current.scrollLeft == storiesRef.current?.scrollWidth - storiesRef.current?.clientWidth) {
            setShowRight(false)
        } else {
            setShowLeft(true)
        }
    }

    return (
        <div className="relative w-max">
            <div onScroll={onScroll} ref={storiesRef} className="flex space-x-2 overflow-x-scroll max-w-xl bg-white border-gray-200 scroll-smooth scrollbar-hide">
                {stories.map(story => (
                    <Story
                        key={story.id}
                        img={story.avatar}
                        username={`${story.first_name} ${story.last_name}`}
                    />
                ))}
            </div>
            <div className="absolute top-0 p-7 pt-3 w-full h-full flex justify-between z-10 items-center">
                <button onClick={() => {
                    if (storiesRef.current) {
                        storiesRef.current.scrollLeft = storiesRef.current.scrollLeft - 300;
                    }
                }}>
                    <FaCircleChevronLeft color="white" size="20" className={`cursor-pointer drop-shadow-lg filter ${showLeft ? 'visible' : 'invisible'}`} />
                </button>
                <button onClick={() => {
                    if (storiesRef.current) {
                        storiesRef.current.scrollLeft = storiesRef.current.scrollLeft + 300;
                    }
                }}>
                    <FaCircleChevronRight color="white" size="20" className={`cursor-pointer drop-shadow-lg filter ${showRight ? 'visible' : 'invisible'}`} />
                </button>

            </div>
        </div>
    );
}


export default Stories