import React from 'react';

const Navabr = ({ questionNumber = 1, totalQuestions = 4 }) => {
  return (
    <div>
      <div className="h-10 w-full px-4 sm:px-6 flex items-center justify-between text-sm flex-wrap">
        <p className="text-gray-700">Rahul</p>
        <p className="font-bold uppercase text-center sm:text-right w-full sm:w-auto">
          Nouns for person, place or thing
        </p>
      </div>

      {/* Header */}
      <div
        style={{ backgroundImage: "url('/Frame (2).png')" }}
        className="w-full py-4 px-4 sm:px-6 flex flex-wrap sm:flex-nowrap items-center justify-between relative bg-cover bg-center"
      >
        {/* Left - Igloo + Home Button */}
        <div className="flex items-end space-x-4 mb-4 sm:mb-0">
          <img src="/igloo (1) 1.png" alt="Igloo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <button className="text-black absolute left-2 bottom-1 font-semibold">HOME</button>
        </div>

        {/* Center Text */}
        <div className="w-full sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-center text-black mb-4 sm:mb-0">
          <h1 className="text-base sm:text-lg font-semibold px-2">
            A Noun is a word that names a person, place or thing.
          </h1>
          <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs sm:text-sm font-bold px-2">
            <p>DOCTOR <span className="text-[10px] sm:text-xs font-normal">(PERSON)</span></p>
            <p>PARK <span className="text-[10px] sm:text-xs font-normal">(PLACE)</span></p>
            <p>TABLE</p>
            <p>SPOON</p>
            <p>BALL <span className="text-[10px] sm:text-xs font-normal">(THINGS)</span></p>
          </div>
        </div>

        {/* Right - Question Button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <button className="border-2 border-[#41AABA] text-black font-semibold bg-white px-4 sm:px-6 h-[44px] sm:h-[54px] w-[180px] sm:w-[200px] hover:bg-gray-100">
            QUESTION {questionNumber}/{totalQuestions}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navabr;
;
