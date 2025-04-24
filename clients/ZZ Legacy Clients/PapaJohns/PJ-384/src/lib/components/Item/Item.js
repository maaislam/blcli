import { h } from "preact";
import { fireEvent } from "../../../../../../../core-files/services";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function Item({
  name,
  info,
  price,
  image,
  quantity,
  onAdd,
  onRemove,
  disabled,
}) {
  return (
    <li
      className={`${ID}-item ${name.replace(/\W+/g, "-").toLowerCase()} ${
        disabled ? `${ID}-disabled` : ""
      }`}
    >
      <div
        className={`${ID}-item__image`}
        onClick={() => fireEvent("Tap on product image")}
      >
        <img src={image} alt={name} />
      </div>
      <div className={`${ID}-item__content`}>
        <div className={`${ID}-item__content-text`}>
          <h3>{name}</h3>
          <small>{info}</small>
          <span>£{price}</span>
        </div>
        <div className={`${ID}-item__content-controls`}>
          <button
            className={`${ID}-item__content-controls-button`}
            onClick={onRemove}
          >
            <span className={`${ID}-visually-hidden`}>
              Remove One {name} Papadia from the basket
            </span>
            <svg
              width="12"
              height="2"
              viewBox="0 0 12 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#fff" d="M0 0h12v2H0z" />
            </svg>
          </button>
          <span className={`${ID}-item__content-controls-display`}>
            {quantity}
          </span>
          <button
            className={`${ID}-item__content-controls-button`}
            onClick={onAdd}
          >
            <span className={`${ID}-visually-hidden`}>
              Add One {name} Papadia to the basket
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 8H8v6H6V8H0V6h6V0h2v6h6v2Z" fill="#fff" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
