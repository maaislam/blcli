import { h } from "preact";
import shared from "../../../../../../../core-files/shared";
import { fireEvent } from "../../../../../../../core-files/services";

const { ID } = shared;

const PickerButton = ({ text, isSale, onClick, url, external }) => {
  return (
    <li
      className={`${ID}-picker-button ${isSale ? "sale" : ""}`}
      onClick={() => fireEvent(`Category button clicked - ${text}`)}
    >
      {external ? (
        <a href={url}>{text}</a>
      ) : (
        <button onClick={onClick}>{text}</button>
      )}
    </li>
  );
};

export default PickerButton;
