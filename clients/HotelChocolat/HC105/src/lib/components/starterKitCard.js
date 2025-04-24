import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const starterKitCard = (image, title, wasPrice, price, id, onClick) => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-starter-kit-card`);
  el.innerHTML = /* HTML */ `
    <div class="${ID}-starter-kit-card__image">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="${ID}-starter-kit-card__content">
      <h5 class="${ID}-starter-kit-card__title">${title}</h5>
      <span class="${ID}-starter-kit-card__price-was">${wasPrice}</span>
      <span class="${ID}-starter-kit-card__price-is">${price}</span>
    </div>
    <button
      class="${ID}-starter-kit-card__button"
      data-starter-kit-card-button
      data-starter-kit-id="${id}"
    ></button>
  `;

  el.addEventListener("click", onClick);

  return el;
};

export default starterKitCard;
