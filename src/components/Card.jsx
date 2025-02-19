import React, { useEffect, useState } from "react";
import "./card.css";
const Card = ({ card, choicehandler, flipped, disabled }) => {
  const [clickDisabled, setClickDisabled] = useState(false);

  const handleClick = () => {
    if (!disabled && !clickDisabled) {
      setClickDisabled(true);
      choicehandler(card);

      // Enable clicking again after a short delay
      setTimeout(() => {
        setClickDisabled(false);
      }, 500);
    }
  };

  return (
    <div className="card">
      <div
        className={`h-24 w-24 sm:h-26 sm:w-26 m-2 ${flipped ? "flipped" : ""}`}
      >
        <img
          src={"images/" + card.src}
          alt="card front"
          className="w-[90%] h-[90%] border-4 border-yellow-600 rounded-xl front"
        />
        <img
          src="images/cover.jpg"
          alt="card back"
          onClick={handleClick}
          className="w-full h-full border-4 border-yellow-600 rounded-xl back cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Card;
