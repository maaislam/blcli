import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const TextButton = ({ text, onClick, href }) => {
  if (href) {
    return (
      <a className={`${ID}-text-button`} href={href}>
        <span>{text}</span>
      </a>
    );
  }

  return (
    <button className={`${ID}-text-button`} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

export default TextButton;
