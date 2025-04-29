import React from 'react'

const TopBar = () => {
  return (
    <div className="relative  w-full h-64 bg-sky-400 overflow-hidden">
      <div className="absolute left-0">
        <img
          src="/Group (1).png"
          alt="Ice pattern background"
          className="object-contain w-[900px] "
        />
      </div>

      <div className="relative flex justify-between items-center h-full px-8">
        <div className="w-3/5">
          <h1 className="text-2xl font-bold text-black ml-2 mb-2">
            Nouns for person, place or thing
          </h1>
          <div className='absolute left-0'>
            <img src="/Frame 29.png" alt="Info box" className="w-[750px] h-[100px]" />
          </div>
        </div>

        <div className="w-2/5 px-2 mt-10 h-full flex items-end justify-end">
          <div className="relative bottom-0 right-0">
            <img
              src="/Group 9.png"
              alt="Polar bear"
              className="object-contain h-64"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar