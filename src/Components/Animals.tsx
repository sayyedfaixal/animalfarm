import React from "react";
import "./Animals.css"

function Animals({ animalType, animalName, animalAge }) {
  return (
    <li className="animalList">
      <strong>{animalType}</strong> {animalName} ({animalAge} year old)
    </li>
  );
}

export default Animals;
