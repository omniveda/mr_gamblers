import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ icon, label, link }) => {
  return (
    <Link to={link}>
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer">
        <img
          src={icon}
          alt={label}
          className="w-20 h-20 mb-2 transition-transform duration-300 hover:scale-110"
        />
        <p
          className="text-black font-bold text-center"
          style={{
            fontFamily: 'BigNoodleTitling',
            lineHeight: '1.2',
            wordSpacing: '0.1em',
            fontWeight: '100',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
