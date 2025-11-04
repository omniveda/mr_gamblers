import React from "react";

const CardSkeleton = () => {
  return (
    <div className="relative bg-white rounded-3xl shadow-lg w-48 transform transition-transform duration-300 ease-in-out animate-pulse">
      {/* Flag/Crown skeleton */}
      <div
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-300 w-12 h-12 rounded-full border-4 border-gray-300 z-10 flex items-center justify-center"
      >
        <div className="w-6 h-6 bg-gray-400 rounded"></div>
      </div>

      {/* Background image skeleton */}
      <div className="mt-10 h-32 flex items-center justify-center bg-gray-200 rounded-t-3xl">
        <div className="w-20 h-20 bg-gray-300 rounded"></div>
      </div>

      <div className="flex justify-between mt-0 items-center px-4 py-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="ml-2 w-8 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
      </div>

      <div className="bg-gray-300 mx-5 mb-3 text-white py-2 text-lg rounded-lg">
        <div className="w-full h-6 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
