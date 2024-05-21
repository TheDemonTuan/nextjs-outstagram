import React from 'react';

const ExplorePage = () => {
  return (
    <div className='max-w-5xl mx-5 p-8 xl:mx-auto'>
      <div className="grid grid-cols-3 grid-rows-2 gap-1">
        <div className='relative cursor-pointer  group'>
          <div className='col-span-1 row-span-1 w-full h-full'>
            <img src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <div className="text-white">
                Hover Content
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-1 row-span-1 w-full h-full'>
          <img src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>
        <div className='col-span-1 row-span-2 w-full h-[40rem]'>
          <img src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>
        <div className='col-span-1 row-span-1 w-full h-full'>
          <img src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>
        <div className='col-span-1 row-span-1 w-full h-full'>
          <img src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-1 mt-1">
        <div className='col-span-1 row-span-2 w-full h-[40rem]'>
          <img src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>
        <div className='col-span-1 row-span-1 w-full h-79'>
          <img src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>
        <div className='col-span-1 row-span-1 w-full h-79'>
          <img src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>

        <div className='col-span-1 row-span-1 w-full h-79'>
          <img src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>
        <div className='col-span-1 row-span-1 w-full h-79'>
          <img src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=600" className='w-full h-full object-cover' />
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
