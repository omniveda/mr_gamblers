import React from "react";
import "./PokerCardAnimation.css";

const cardIcons = ["🂡", "🂢", "🂣", "🂤", "🂥"];

const CardFan = () => (
  <div className="w-60 h-48 flex justify-center items-end relative">
    {cardIcons.map((icon, index) => (
      <div key={index} className={`card card-${index}`}>
        {icon}
      </div>
    ))}
  </div>
);

const CardAnimation = () => {
  return (
    <div className="w-full mt-[18rem] flex justify-center md:justify-between px-4">
      {/* Left card fan - only visible on large screens */}
      <div className="hidden lg:flex">
        <CardFan />
      </div>

      {/* Center (mobile) or right (desktop) card fan */}
      <div className="flex">
        <CardFan />
      </div>
    </div>
  );
};

export default CardAnimation;
