import shared from "../../../../../../core-files/shared";
import { sendHttpRequest } from "../../../../../../lib/utils";

const { ID } = shared;

const trayCard = (image, title, wasPrice, price, id, callback) => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-starter-kit-card`);
  el.innerHTML = /* HTML */ `
    <div class="${ID}-starter-kit-card__image">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="${ID}-starter-kit-card__content">
      <h5 class="${ID}-starter-kit-card__title">${title}</h5>
      ${wasPrice
        ? `<span class="${ID}-starter-kit-card__price-was">${wasPrice}</span>`
        : ""}
      <span class="${ID}-starter-kit-card__price-is">${price}</span>
    </div>
    <button
      class="${ID}-extras-card__button"
      data-extras-card-button
      data-extra-id="${id}"
    >
      Add to bag
    </button>
  `;

  el.querySelector("[data-extras-card-button]").addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      sendHttpRequest(
        "POST",
        "https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax",
        `Quantity=1&cartAction=add&pid=${id}`
      ).then(callback(e));
    }
  );

  return el;
};

export default trayCard;
