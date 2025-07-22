import React from "react";
import { Link } from "react-router-dom";
import groupIcon from "../assets/icon/Group.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CategoryCard = ({ icon, label, link }) => {
  return (
    <Link to={link}>
      <div className="relative flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer">
        {/* Crown Icon - always visible, top center, outside card */}

        <img
          src={groupIcon}
          alt="Hot Casino Categories"
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full border-4 border-red-500 shadow-lg z-20"
        />
        <div className="pt-10 flex flex-col items-center">
          {" "}
          {/* Padding to prevent overlap */}
          <LazyLoadImage
            src={icon}
            alt={label}
            className="w-20 h-20 mb-2 transition-transform duration-300 hover:scale-110"
            effect="blur"
          />
          <p
            className="text-black font-bold text-center"
            style={{
              fontFamily: "BigNoodleTitling",
              lineHeight: "1.2",
              wordSpacing: "0.1em",
              fontWeight: "100",
              letterSpacing: "0.05em",
            }}
          >
            {label}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
