import React from "react";
import crown from "../assets/images/crown.png";
import certified from "../assets/images/Certified.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card2 = ({ rating, bgImage, flagCode, onClick }) => {
  const handleClick = (e) => {
    if (e.ctrlKey || e.metaKey) {
      // If Control or Command key is pressed, prevent default and handle new tab
      e.preventDefault();
      e.stopPropagation();
      // For Card2 component, we need to handle this differently since it doesn't have a direct URL
      // We'll assume the onClick handler can handle this case
      if (onClick) {
        onClick(true); // Pass true to indicate new tab
      }
    } else {
      // Normal click behavior
      if (onClick) {
        onClick(false);
      }
    }
  };

  return (
    <div
      className="relative bg-white rounded-3xl shadow-lg w-48 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      {/* Flag or fallback crown inside circle */}
      <div
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white w-12 h-12 rounded-full border-4 border-black z-10 flex items-center justify-center"
        style={{ boxShadow: "inset 0 0 0 3px red" }}
      >
        {flagCode ? (
          <LazyLoadImage
            src={`https://flagcdn.com/w40/${flagCode.toLowerCase()}.png`}
            alt="Flag"
            className="w-6 h-4 rounded-sm"
            effect="blur"
          />
        ) : (
          <LazyLoadImage
            src={certified}
            alt="Crown"
            className="w-6 h-6"
            effect="blur"
          />
        )}
      </div>

      {/* Background image */}
      <div
        className="mt-10 h-32 flex items-center justify-center bg-white rounded-t-3xl"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {!bgImage && <span className="text-gray-500 text-sm">No image</span>}
      </div>

      <div className="flex justify-between mt-0 items-center px-4 py-4">
        <div className="flex items-center">
          <span className="text-orange-500 text-2xl">★</span>
          <span className="ml-2 text-xl text-gray-600">{rating}</span>
        </div>
        <span className="text-gray-500 text-sm underline cursor-pointer">
          Read Review
        </span>
      </div>

      <div
        className="bg-red-600 mx-5 mb-3 text-white py-2 text-lg rounded-lg hover:bg-red-700 transition-colors duration-300 text-center cursor-pointer"
        onClick={onClick}
      >
        Play Now
      </div>
    </div>
  );
};

export default Card2;
