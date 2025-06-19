import React from "react";

const ExpertCard = ({ logo, name, onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <img src={logo} alt={`${name} Logo`} className="w-20 h-20 mb-10" />
      <p
        className="font-bold text-gray-800 mb-4"
        style={{
          fontFamily: "BigNoodleTitling",
          lineHeight: "1.2",
          wordSpacing: "0.1em",
          fontWeight: "100",
          letterSpacing: "0.05em",
        }}
      >
        {name}
      </p>
      <button
        className="bg-red-500 text-white py-1 px-10 rounded-full hover:bg-red-600 transition-colors"
        aria-label={`Play ${name}`}
      >
        Play
      </button>
    </div>
  );
};

export default ExpertCard;
