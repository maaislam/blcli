import { h, Fragment } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function Button({
  text,
  secondary = false,
  loading = false,
  onClick,
}) {
  return (
    <button
      className={`${ID}-button ${secondary ? `${ID}-white` : ""}`}
      onClick={onClick}
    >
      {loading ? (
        <Fragment>
          <svg
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            xmlSpace="preserve"
          >
            <path
              fill="#fff"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          <span className={`${ID}-visually-hidden`}>
            Adding items to basket, please wait.
          </span>
        </Fragment>
      ) : (
        text
      )}
    </button>
  );
}
