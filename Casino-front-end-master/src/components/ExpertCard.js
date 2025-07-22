import React from "react";
import groupIcon from "../assets/icon/Group.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ExpertCard = ({ logo, name, onClick }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-between bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      {/* Crown Icon - always visible, top center, outside card */}
      <img
        src={groupIcon}
        alt="Hot Casino Categories"
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full border-4 border-red-500 shadow-lg z-20"
      />
      <div className="pt-10 flex flex-col items-center w-full">
        {" "}
        {/* Padding to prevent overlap */}
        <LazyLoadImage
          src={logo}
          alt={`${name} Logo`}
          className="w-20 h-20 mb-10"
          effect="blur"
        />
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
    </div>
  );
};

export default ExpertCard;
