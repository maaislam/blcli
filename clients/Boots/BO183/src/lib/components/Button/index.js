import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const Button = ({ text, onClick, href, white }) => {
  if (href) {
    return (
      <a className={`${ID}-button ${white ? "white" : ""}`} href={href}>
        <span>{text}</span>
      </a>
    );
  }

  return (
    <button
      className={`${ID}-button ${white ? "white" : ""}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
