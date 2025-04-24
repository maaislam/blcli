import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const Tile = ({ text, category, isActive, onClick }) => {
  return (
    <li className={`${ID}-tile ${category} ${isActive ? "active" : ""}`}>
      <button onClick={onClick}>
        <span className="category-icon"></span>
        {text}
      </button>
    </li>
  );
};

export default Tile;
