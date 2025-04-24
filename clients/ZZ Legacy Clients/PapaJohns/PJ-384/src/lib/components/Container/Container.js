import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function Container({ children, button, onClose }) {
  return (
    <div className={`${ID}-container ${ID}-transitions-only-after-page-load`}>
      <div className={`${ID}-container__close-button-wrapper`}>
        <button className={`${ID}-container__close-button`} onClick={onClose}>
          <span className={`${ID}-visually-hidden`}>Close</span>
        </button>
      </div>
      <div className={`${ID}-container__banner`}>
        <img src="/images/papadias/offers/papadias.jpg" alt="" />
      </div>
      <div className={`${ID}-container__header`}>
        <h2>Have you tried our new Papadias?</h2>
        <p>
          Our new Papadias are part pizza, part sandwich and full on flavour
        </p>
      </div>
      <ul className={`${ID}-container__product-list`}>{children}</ul>
      <div className={`${ID}-container__action-button`}>{button}</div>
    </div>
  );
}
